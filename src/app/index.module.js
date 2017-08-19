/* global malarkey:false, moment:false */

import { config } from './index.config';
import { routerConfig } from './index.route';
import { runBlock } from './index.run';
import { MainController } from './main/main.controller';
import { AuthController } from './auth/auth.controller';
import { LogDietController } from './logdiet/logdiet.controller';
import { NavbarController } from './components/navbar/navbar.controller';
import { FirstController } from './first/first.controller';
import { ProfileController } from './profile/profile.controller';
import { MealController } from './meal/meal.controller';
import { ResultController } from './result/result.controller';
import { PastMealsController } from './pastmeals/pastmeals.controller';
import { CompareToDirective } from './directives/compareTo.directive';
import { GithubContributorService } from '../app/components/githubContributor/githubContributor.service';
import { WebDevTecService } from '../app/components/webDevTec/webDevTec.service';
import { MealService } from '../app/components/meal.service';
import { AuthService } from '../app/components/auth.service';
import { NavbarDirective } from '../app/components/navbar/navbar.directive';
import { MalarkeyDirective } from '../app/components/malarkey/malarkey.directive';
import { MealDirective } from '../app/meal/meal.directive';

angular.module('myMessageFront', ['ui.router', 'ui.bootstrap', 'toastr', 'satellizer','chart.js' ])
  .constant('API_URL', 'http://localhost:5000/')
  .constant('malarkey', malarkey)
  .constant('moment', moment)
  .config(config)
  .config(routerConfig)
  .run(runBlock)
  .service('githubContributor', GithubContributorService)
  .service('webDevTec', WebDevTecService)
  .service('MealService', MealService)
  .service('AuthService', AuthService)
  .controller('MainController', MainController)
  .controller('AuthController', AuthController)
  .controller('LogDietController', LogDietController)
  .controller('FirstController', FirstController)
  .controller('ProfileController', ProfileController)
  .controller('NavbarController', NavbarController)
  .controller('MealController', MealController)
  .controller('ResultController',  ResultController)
  .controller('PastMealsController', PastMealsController)
  .directive('acmeNavbar', NavbarDirective)
  .directive('acmeMalarkey', MalarkeyDirective)
  .directive('compareTo', CompareToDirective)
  .directive('acmeMeal', MealDirective);
