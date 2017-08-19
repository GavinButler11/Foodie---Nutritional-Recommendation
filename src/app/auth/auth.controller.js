export class AuthController {

    constructor($auth, $window, $http, AuthService, MealService) {
        'ngInject';
        this.$http = $http;
        this.$window = $window;
        this.$auth = $auth;
        this.$authService = AuthService;
        this.$mealService = MealService;
        //this.getUser();
        this.isAuthenticated = $auth.isAuthenticated;
        this.getUser();
    }

    register() {
        var vm = this;
        this.$auth.signup(this.user).then(function (token) {
            vm.$auth.setToken(token);
        });


    }

    login() {
        var email = document.getElementById('email').value;
        var vm = this;
        this.$auth.login(this.login.user).then(function (token) {
            vm.$auth.setToken(token);
            if (token) {
                vm.$authService.setEmail(email);
                console.log(email);
                vm.$window.location.href = "#/first";
            }
        });


    }
    
    getUser() {
        var vm = this;
        var config = {
            params: {
                type: this.$authService.$email
            }
        }
        this.$http.get('http://localhost:5000/api/users', config).then(function (result) {
            vm.users = result.data;
            console.log(result);
            
        });
    } 
    
   /* getUser() {
        var vm = this;
        this.$http.get('http://localhost:5000/api/users').then(function (result) {
            vm.users = result.data;
            console.log(vm.users); 
        });        
    } */
    
    setEmail() {
        var e = document.getElementById('email').value;
        this.$authService.setEmail(e);
    }
    


}
