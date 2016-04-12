WeChatApp.controller('LoginViewController', function($scope) {

	//$scope.login_name = "13067235236";
	//$scope.login_passwd = "ysys66";
	$scope.login_passwd1 = "ysys66";


	$scope.login = function() {
		apiconn.credential($scope.login_name, $scope.login_passwd);
		apiconn.send_obj_now({
			"obj": "person",
			"act": "login",
			"login_name": $scope.login_name,
			"login_passwd": $scope.login_passwd,
			"verbose": "1"
		});
	};

	$scope.register_goto = function(event) {
		goto_view("admin/RegisterView");
	};

	$scope.$on("RESPONSE_RECEIVED_HANDLER", function(event, jo) {
		
		if (jo.obj == "person" && jo.act == "login") {
			// l1~.用户名
			rootScope.person_name = jo.user_info.person_name;
			// l1~.用户id
			rootScope.person_id = jo.user_info._id;
			goto_view("admin/MainView");
		}
		/*
输出:
{
    obj: "person", 
    act: "login", 
    user_info: {
        _id: "o14477397324317851066", 
        person_name: "黄浩", 
        person_type: "common", 
        status: "active"
    }
}
		 */
		
	});
	
});