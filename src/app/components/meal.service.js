export class MealService {
    constructor($log, $http, $window, AuthService) {
        'ngInject';

        this.$log = $log;
        this.$http = $http;
        this.$window = $window;
        this.$food_type = "";
        this.$types = ['Breakfast', 'Lunch', 'Dinner', 'Snack'];
        this.$mealType = this.$types[0];
        this.$selections = [];
        this.$authService = AuthService;
    }
    
    updateType() {
        
    }

    removeSelection(index) {
        this.$selections.splice(index, 1);
    }

    submitSelections() {
        this.postFoods();
        this.$selections = [];
        this.$window.location.href = "#/result";
    }

    postFoods() {
        var email = this.$authService.getEmail();
        this.$http.post('http://localhost:5000/api/foods', [email, new Date(), this.$mealType, this.$selections]).then(function (result) {

        });
    }
}
