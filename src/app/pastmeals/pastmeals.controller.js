export class PastMealsController {

    constructor($http) {
        'ngInject';
        this.$http = $http;
        this.getMeal();
        //this.getNutritionData();
        this.$mealsArray = [];
        //this.$carbs;
    }

    getMeal() {
        var vm = this;
        this.$http.get('http://localhost:5000/api/results').then(function (result) {
            vm.meals = result.data;
            vm.lastMeal = [vm.meals[vm.meals.length - 1]];
            console.log(vm.lastMeal);
            
            vm.secondlastMeal = [vm.meals[vm.meals.length - 2]];
            console.log(vm.secondlastMeal);
            
            vm.thirdlastMeal = [vm.meals[vm.meals.length - 3]];
            console.log(vm.thirdlastMeal);
        });
    }
}