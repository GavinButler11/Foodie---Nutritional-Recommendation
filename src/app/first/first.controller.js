export class FirstController {

    constructor(AuthService) {
        'ngInject';

        this.$authService = AuthService;
        this.displayUsername();
    }
    
    displayUsername() {
        this.username = this.$authService.$email
        console.log(this.username);
    }
}