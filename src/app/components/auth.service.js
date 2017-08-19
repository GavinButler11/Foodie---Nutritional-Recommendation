export class AuthService {
    constructor($http) {
        'ngInject';
        this.$http = $http;
        this.$email = "";
    }
    
    getEmail() {
        return this.$email;
    }
    
    setEmail(email) {
        this.$email = email;
    }
}