// Based on AngularJS 1.4.2

var WeChatApp = angular.module('WeChatApp', ['ngRoute']);

WeChatApp.config(['$routeProvider',
	function($routeProvider) {
		$routeProvider.
		when('/admin/LoginView', {
			templateUrl: 'admin/login/LoginView.html',
			controller: 'LoginViewController'
		}).
		when('/admin/RegisterView', {
			templateUrl: 'admin/register/RegisterView.html',
			controller: 'RegisterViewController'
		}).
		when('/admin/ForgetPasswordView', {
			templateUrl: 'admin/login/ForgetPasswordView.html',
			controller: 'ForgetPasswordViewController'
		}).
		when('/admin/MainView', {
			templateUrl: 'admin/ProjectMainView.html',
			controller: 'MainViewController'
		}).
		when('/admin/TaskView', {
			templateUrl: 'admin/TaskMainView.html',
			controller: 'TaskViewController'
		}).
		when('/admin/ContactView', {
			templateUrl: 'admin/ContactMainView.html',
			controller: 'ContactViewController'
		}).
		when('/admin/DateView', {
			templateUrl: 'admin/DateMainView.html',
			controller: 'DateViewController'
		}).
		otherwise({
			redirectTo: '/admin/LoginView'
		});
	}
]);

// save a handle to the $rootScope obj 
var rootScope;

WeChatApp.run(['$rootScope', function($rootScope) {
	rootScope = $rootScope;
}]);

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function goto_view(v) {
	var baseUrl = window.location.href;
	baseUrl = (baseUrl.indexOf('#') > 0 ? baseUrl.substr(0, baseUrl.indexOf('#')) : baseUrl);
	window.location.href = baseUrl + "#/" + v;
}

var apiconn = new APIConnection();
var un_handle_count=0;
var menu_id="project_menu";
var upload_path="http://112.124.70.60:8081/cgi-bin/upload.pl";
var download_path="http://112.124.70.60:8081/cgi-bin/download.pl?fid=";

var imgs = [];
var imgobj = {};
var imgu = new IMAGEUpload("http://112.124.70.60:8081/cgi-bin/upload.pl", "taskfile", "http://112.124.70.60:8081/cgi-bin/download.pl?fid=", null, imgobj);
var imgus = new IMAGEUpload("http://112.124.70.60:8081/cgi-bin/upload.pl", "taskfile1", "http://112.124.70.60:8081/cgi-bin/download.pl?fid=", null, imgobj);


apiconn.client_info.clienttype = "web";

apiconn.state_changed_handler = function() {
	console.log("state: " + apiconn.from_state + " => " + apiconn.conn_state);
	apiconn.connect();
};

apiconn.response_received_handler = function(jo) {
	rootScope.$apply(function() {
		rootScope.$broadcast("RESPONSE_RECEIVED_HANDLER", jo);
	});
};

apiconn.wsUri = "ws://112.124.70.60:51717/we";
apiconn.connect();

WeChatApp.filter('FileName',function(){
	var filename = function(filename){
		if(filename.length > 30) {
				filename = filename.substring(0,17)+"..."+filename.substring(filename.length-8,filename.length);
				return filename;
		}
		return filename;
	};
	return filename;
});

WeChatApp.filter('femaleDif',function(){
	var femaleImage = function(female){
		if(female == "女") {
				female = "../img/icon_female.png";
				return female;
		}
		return "../img/icon_female.png";
	};
	return femaleImage;
});