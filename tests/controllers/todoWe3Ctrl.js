/*global angular*/

define([
  'intern/chai!expect',
  'intern!bdd',
  'intern/order!angular/angular',
  'intern/order!todowe/framework/angular-route.js',
  'intern/order!angular-mocks/angular-mocks',
  'intern/order!todowe/framework/APIConnection.min',
  'intern/order!todowe/framework/IMAGEUpload.min',
  'intern/order!todowe/js/admin/app',
  'intern/order!todowe/js/admin/login/forgetPassword'
], function (expect, bdd) {

  function inject (fn) {
    return function() {
      angular.injector(['ng', 'ngMock', 'WeChatApp']).invoke(fn);
      console.log("test");
    }
  }

  bdd.describe('WE ForgetPasswordViewController Controller', function () {

    var ctrl, scope;

    bdd.beforeEach(inject(function ($controller, $rootScope) {
      scope = $rootScope.$new();
      ctrl = $controller('ForgetPasswordViewController', { $scope: scope });
    }));

    bdd.it('WE should not have an edited Todo on start', function () {
      expect(scope.modefiyPassword).to.equal('123456');
    });



  });
});
