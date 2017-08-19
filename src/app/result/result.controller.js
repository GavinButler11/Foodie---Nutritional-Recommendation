export class ResultController {

    constructor($scope, $http) {
        'ngInject';
        this.$http = $http;
        this.getMeal();
        this.$mealsArray = [];
        this.$fat = 0;
        this.$carbs = 0;
        this.$protein = 0;

        this.usersCarbsPercentage = 0;
        this.usersFatPercentage = 0;
        this.usersProteinPercentage = 0;

        this.$scope = $scope;
        this.drawChart($scope);
    }

    getMeal() {
        var vm = this;

        this.$http.get('http://localhost:5000/api/results').then(function (result) {
            vm.meals = result.data;
            vm.lastMeal = [vm.meals[vm.meals.length - 1]];

            for (var i = 0, l = vm.lastMeal.length; i < l; i++) {
                vm.carbs = vm.lastMeal[i].nutrition.carbs;
                vm.carbsRounded = (Math.round(vm.carbs * 100) / 100);
                vm.protein = vm.lastMeal[i].nutrition.protein;
                vm.fat = vm.lastMeal[i].nutrition.fat;
            } 
            console.log(vm.carbsRounded);
        });
    }

    dailyIntakeCalculations() {
        var dailyProtein = 50;
        var dailyCarbs = 310;
        var dailyFat = 61;

        this.usersCarbsPercentage = (100 / dailyCarbs * this.carbs);
        this.usersCarbsPercentage = this.usersCarbsPercentage.toFixed(2);
        this.usersProteinPercentage = (100 / dailyProtein * this.protein);
        this.usersProteinPercentage = this.usersProteinPercentage.toFixed(2);
        this.usersFatPercentage = (100 / dailyFat * this.fat);
        this.usersFatPercentage = this.usersFatPercentage.toFixed(2);

        if (this.usersCarbsPercentage < 80 || this.usersCarbsPercentage > 120) {
            document.getElementById("recommendationCarbsPercent").style.color = "#ff0000";
        } else {
            document.getElementById("recommendationCarbsPercent").style.color = "#00FF00";
        }

        if (this.usersProteinPercentage < 80 || this.usersProteinPercentage > 120) {
            document.getElementById("recommendationProteinPercent").style.color = "#ff0000";
        } else {
            document.getElementById("recommendationProteinPercent").style.color = "#00FF00";
        }

        if (this.usersFatPercentage < 80 || this.usersFatPercentage > 120) {
            document.getElementById("recommendationFatPercent").style.color = "#ff0000";
        } else {
            document.getElementById("recommendationFatPercent").style.color = "#00FF00";
        }

        //Recommendation

        var allPercentages = [this.usersCarbsPercentage, this.usersProteinPercentage, this.usersFatPercentage];
        var carbsResult;
        var proteinResult;
        var fatResult;

        var carbsTooLow;
        var carbsTooHigh;
        var carbsJustRight;
        var proteinTooLow;
        var proteinTooHigh;
        var proteinJustRight;
        var fatTooLow;
        var fatTooHigh;
        var fatJustRight;

        if (this.usersCarbsPercentage < 80) {
            carbsResult = (this.usersCarbsPercentage);
            document.getElementById("carbstooLow").innerHTML = ("Carbs " + carbsResult);
        } else if (this.usersCarbsPercentage > 120) {
            carbsResult = (this.usersCarbsPercentage);
            document.getElementById("carbstooHigh").innerHTML = ("Carbs " + carbsResult);
        } else {
            carbsResult = (this.usersCarbsPercentage);
            document.getElementById("carbsjustRight").innerHTML = ("Carbs " + carbsResult);
        }

        if (this.usersProteinPercentage < 80) {
            proteinResult = (this.usersProteinPercentage);
            document.getElementById("proteintooLow").innerHTML = ("Protein " + proteinResult);
        } else if (this.usersProteinPercentage > 120) {
            proteinResult = (this.usersProteinPercentage);
            document.getElementById("proteintooHigh").innerHTML = ("Protein " + proteinResult);
        } else {
            proteinResult = (this.usersProteinPercentage);
            document.getElementById("proteinjustRight").innerHTML = ("Protein " + proteinResult);
        }

        if (this.usersFatPercentage < 80) {
            fatResult = (this.usersFatPercentage);
            document.getElementById("fattooLow").innerHTML = ("Fat " + fatResult);
        } else if (this.usersFatPercentage > 120) {
            fatResult = (this.usersFatPercentage);
            document.getElementById("fattooHigh").innerHTML = ("Fat " + fatResult);
        } else {
            fatResult = (this.usersFatPercentage);
            document.getElementById("fatjustRight").innerHTML = ("Fat" + fatResult);
        }
        
        
        // recommend a food
        
        var missingCarbs = dailyCarbs - this.carbs;
        var missingProtein = dailyProtein - this.protein;
        var missingFat = dailyFat - this.fat;
        var missing = [{name: 'carbs', value: missingCarbs},
                       {name: 'protein', value: missingProtein},
                        {name: 'fat', value: missingFat}];
        
        var vm = this;
        
        // get food names from last meal
        var mealFoods = "";
        this.lastMeal[0].foods.forEach(function(element) {
            mealFoods += element.name + ',';
            //console.log(element);
        });
        mealFoods = mealFoods.substr(0, mealFoods.length - 1);
        
        //get info for each element 
        missing.forEach(function(element) {
            vm.$http.get('http://localhost:5000/api/findRecommendedFood?type=' + element.name + '&value=' + element.value + '&foods=' + mealFoods).then(function (result) {
                //access html id's
                var e = document.getElementById(element.name + 'Recommended');
                e.innerHTML = 'Foods to help reach your daily recommended intake of ' + element.name + ': ' + result.data;
            });
        });
    }

    drawChart($scope) {

        var vm = this;

        this.$http.get('http://localhost:5000/api/results').then(function (result) {
            vm.meals = result.data;
            vm.lastMeal = [vm.meals[vm.meals.length - 1]];
            //console.log(vm.lastMeal)

            for (var i = 0, l = vm.lastMeal.length; i < l; i++) {
                vm.carbs = vm.lastMeal[i].nutrition.carbs;
                vm.protein = vm.lastMeal[i].nutrition.protein;
                vm.fat = vm.lastMeal[i].nutrition.fat;
            }

            $scope.labels = ["Carbs", "Protein", "Fat", "Fibre", "Sugar"];
            //$scope.series = ['Series A', 'Series B'];
            $scope.data = [
                [vm.carbs, vm.protein, vm.fat, 0, 0]
                //[310, 50, 61, 19, 86, 27, 90]
              ];
            $scope.onClick = function (points, evt) {
                console.log(points, evt);
            };
            $scope.datasetOverride = [{
                yAxisID: 'y-axis-1'
        }, {
                yAxisID: 'y-axis-2'
        }];
            $scope.options = {
                scales: {
                    yAxes: [
                        {
                            id: 'y-axis-1',
                            type: 'linear',
                            display: true,
                            position: 'left'
                    },
                        {
                            id: 'y-axis-2',
                            type: 'linear',
                            display: true,
                            position: 'right'
                    }
                  ]
                }
            };
        });
    }
}
