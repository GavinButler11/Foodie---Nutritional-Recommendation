export class LogDietController {

    constructor($http, MealService, AuthService) {
        'ngInject';

        this.$http = $http;
        this.$mealService = MealService;
        this.$authService = AuthService;
    }
    
    setFoodType(foodType) {
        this.$mealService.$food_type = foodType;
        console.log(foodType);
        console.log(this.$authService.$email);
    }
    
    
}