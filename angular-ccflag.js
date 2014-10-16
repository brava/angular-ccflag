(function() {
  'use strict';

  angular.module('App', [])
    .directive('widgetCardFlag', widgetCardFlag);
  console.log('ok');
  function widgetCardFlag($compile) {
    return {
      restrict: 'A',
      link: function(scope, el, attrs) {

        scope.cards = {
          'Visa': [4],
          'Mastercard': [51, 52, 53, 54, 55],
          'American Express': [34, 37],
          'Diners Club': [300, 301, 302, 303, 304, 305, 309, 2014, 2149, 36]
        };

        function flag(value) {

          for (var card in scope.cards) {
            for (var i in scope.cards[card]) {
              var r = new RegExp('^' + scope.cards[card][i]);
              if (r.test(value)) {
                scope.cardflag = card;
                console.log(scope.cardflag);
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
