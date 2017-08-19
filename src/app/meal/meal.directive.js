export function MealDirective() {
  'ngInject';

  let directive = {
    restrict: 'E',
    templateUrl: 'app/meal/meal.html',
    scope: {
        creationDate: '='
    },
    controller: MealController,
    controllerAs: 'vm',
    bindToController: true
  };

  return directive;
}

class MealController {
  constructor (moment) {
    'ngInject';

    // "this.creationDate" is available by directive option "bindToController: true"
    this.relativeDate = moment(this.creationDate).fromNow();
  }
}