export class ProfileController {

    constructor($http) {
        'ngInject';
        this.$http = $http;
        this.$inputs = [];
        this.getProfile();
    }

    getProfile() {
        var vm = this;
        this.$http.get('http://localhost:5000/api/profiles').then(function (result) {
            vm.profile = result.data;
        });
    }

    postProfile() {
        this.$http.post('http://localhost:5000/api/profiles', this.$inputs).then(function (result) {

        });
    }

    showInput(age, height, weight) {
        var age = document.getElementById("profileAge").value
        var height = document.getElementById("profileHeight").value
        var weight = document.getElementById("profileWeight").value

        var display = (age + " " + height + " " + weight);
        this.$inputs.push({
            age: age,
            height: height,
            weight: weight
        });
        this.loadInputs();
        //document.getElementById('display').innerHTML = document.getElementById("profileAge").value;
    }

    submitInputs() {
        console.log(this.$inputs);
        this.postProfile();
    }



    loadInputs() {
        var cart_list = document.getElementById("cart-list");
        cart_list.innerHTML = "<ul></ul>";
        for (var i = 0; i < this.$inputs.length; i++) {
            cart_list.innerHTML += "<li>" + " Age: " + this.$inputs[i].age + "  Height: " + this.$inputs[i].height + "  Weight: " + this.$inputs[i].weight + "</li>";
        }
        console.log(this.$inputs);
    }
}
