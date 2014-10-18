(function() {
  'use strict';

  angular.module('App', [])
    .directive('widgetCardFlag', widgetCardFlag);
  
  function widgetCardFlag($compile) {
    return {
      restrict: 'A',
      scope: function(scope) {
        console.log(scope);
      },
      link: function(scope, el, attrs) {

        scope.cards = {
          'visa': [4],
          'mastercard': [51, 52, 53, 54, 55],
          'amex': [34, 37],
          'diners': [300, 301, 302, 303, 304, 305, 309, 2014, 2149, 36]
        };

        function flag(value) {

          for (var card in scope.cards) {
            for (var i in scope.cards[card]) {
              var r = new RegExp('^' + scope.cards[card][i]);
              if (r.test(value)) {
                scope.cardflag = card;
                return true;
              }
            }
          }

          delete scope.cardflag;
          return false;

        }

        scope.$watch(attrs.ngModel, function(value) {
          flag(value);
        });

      }
    };
  }

})();
