(function() {
  'use strict';

  angular.module('App', [])
    .directive('widgetCardFlag', widgetCardFlag);

  function widgetCardFlag($compile) {
    return {
      restrict: 'A',

      link: function(scope, el, attrs) {

        scope.cards = {
          'visa': [4],
          'mastercard': [51, 52, 53, 54, 55],
          'amex': [34, 37],
          'diners': [300, 301, 302, 303, 304, 305, 309, 2014, 2149, 36],
          'discover': [6011, 622, 64, 65],
          'aura':[50],
          'hipercard':[38, 60],
          'elo':[636368, 438935, 504175, 451416, 36297, 5067, 4576, 4011]
        };

        el[0].focus();

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

        function validate(val) {
          var nondigits = new RegExp(/[^0-9]+/g);
          var number = val.replace(nondigits, '');
          var pos, digit, i, sub_total, sum = 0;
          var strlen = number.length;
          if (strlen < 13) {
            scope.validation = false;
            return false;
          }
          for (i = 0; i < strlen; i++) {
            pos = strlen - i;
            digit = parseInt(number.substring(pos - 1, pos));
            if (i % 2 == 1) {
              sub_total = digit * 2;
              if (sub_total > 9) {
                sub_total = 1 + (sub_total - 10);
              }
            } else {
              sub_total = digit;
            }
            sum += sub_total;
          }
          if (!sum || sum % 10 === 0) {
            scope.validation = true;
            return true;
          }
          scope.validation = false;
          return false;
        }

        scope.$watch(attrs.ngModel, function(value) {
          flag(value);
          if(value) {
            validate(value);
          }
        }, true);

      }
    };
  }

})();