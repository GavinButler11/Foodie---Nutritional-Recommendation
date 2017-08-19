export function routerConfig($stateProvider, $urlRouterProvider) {
    'ngInject';
    $stateProvider
        .state('home', {
            url: '/',
            templateUrl: 'app/main/main.html',
            controller: 'MainController',
            controllerAs: 'main'
        })
        .state('auth', {
            url: '/auth',
            templateUrl: 'app/auth/auth.html',
            controller: 'AuthController',
            controllerAs: 'auth'
        })
        .state('logdiet', {
            url: '/logdiet',
            templateUrl: 'app/logdiet/logdiet.html',
            controller: 'LogDietController',
            controllerAs: 'logdiet'
        })
        .state('first', {
            url: '/first',
            templateUrl: 'app/first/first.html',
            controller: 'FirstController',
            controllerAs: 'first'
        })
        .state('fruit', {
            url: '/fruit',
            templateUrl: 'app/fruit/fruit.html',
            controller: 'FruitController',
            controllerAs: 'fruit'
        })
        .state('profile', {
            url: '/profile',
            templateUrl: 'app/profile/profile.html',
            controller: 'ProfileController',
            controllerAs: 'profile'
        })
        .state('meal', {
            url: '/meal',
            templateUrl: '/app/meal/meal.html',
            controller: 'MealController',
            controllerAs: 'meal'
        })
        .state('result', {
            url: '/result',
            templateUrl: '/app/result/result.html',
            controller: 'ResultController',
            controllerAs: 'result'
        })
        .state('pastmeals', {
            url: '/pastmeals',
            templateUrl: '/app/pastmeals/pastmeals.html',
            controller: 'PastMealsController',
            controllerAs: 'pastmeals'
        });

    $urlRouterProvider.otherwise('/');
}
