/*global angular*/

define([
	'intern/chai!expect',
	'intern!bdd',
	'intern!tdd',
	'intern/order!angular/angular',
	'intern/order!todowe/framework/angular-route.js',
	'intern/order!angular-mocks/angular-mocks',
	'intern/order!todowe/framework/APIConnection.min',
	'intern/order!todowe/framework/IMAGEUpload.min',
	'intern/order!todowe/js/admin/app',
	'intern/order!todowe/js/admin/login/login'
], function(expect, bdd, tdd) {
	

	function inject(fn) {
		return function() {
			angular.injector(['ng', 'ngMock', 'WeChatApp']).invoke(fn);
		}
	}

	bdd.describe('WE LoginView Controller', function() {

		var ctrl, scope;

		bdd.beforeEach(inject(function($controller, $rootScope) {
			scope = $rootScope.$new();
			ctrl = $controller('LoginViewController', {
				$scope: scope
			});
		}));

		bdd.it('WE should not have an edited Todo on start', function() {
			expect(scope.login_passwd1).to.have.length(6);
		});

	});


	tdd.suite('Suite name', function() {
		
		var ctrl, scope;

		tdd.beforeEach(inject(function($controller, $rootScope) {
			scope = $rootScope.$new();
			ctrl = $controller('LoginViewController', {
				$scope: scope
			});
		}));

		tdd.test('Test tdd', function() {
			// another test case
			expect(scope.login_passwd1).to.have.length(6);
		});

		// …
	});

});