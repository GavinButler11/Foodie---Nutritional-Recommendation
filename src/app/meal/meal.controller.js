export class MealController {

    constructor($http, $window, MealService, AuthService) {
        'ngInject';
        this.$http = $http;
        this.$window = $window;
        this.$mealService = MealService;
        this.$authService = AuthService;
        this.getFoods();
    }

    getFoods() {
        var vm = this;
        var config = {
            params: {
                type: this.$mealService.$food_type
            }
        }
        this.$http.get('http://localhost:5000/api/foods', config).then(function (result) {
            vm.foods = result.data;
            console.log(result);
        });
    }

    getImage() {
        if (this.$mealService.$food_type == "Fruit") {
            return "assets/images/apple.png";
        } else if (this.$mealService.$food_type == "Vegetable") {
            return "assets/images/harvest.png";
        } else if (this.$mealService.$food_type == "Meat") {
            return "assets/images/steak.png";
        } else if (this.$mealService.$food_type == "Dairy") {
            return "assets/images/cheese.png";
        } else if (this.$mealService.$food_type == "Bread") {
            return "assets/images/bread.png";
        } else if (this.$mealService.$food_type == "Snacks") {
            return "assets/images/chocolate.png";
        } else if (this.$mealService.$food_type == "Drinks") {
            return "assets/images/coke.png";
        }
        
    }

    logSelection(food, size) {
        this.$mealService.$selections.push({
            food: food,
            size: size
        });
    }

}
