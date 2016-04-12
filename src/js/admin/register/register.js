WeChatApp.controller('RegisterViewController', function($scope) {

	$scope.get_code = function() {
		apiconn.send_obj_now({
			"obj": "person",
			"act": "getcode",
			"phoneNo": $scope.registerNumber,
			"type": "register"
		});
		setTime($("#identifiyingCode"));
	};
	var wait = 60;

	function setTime(o) {
		if (wait == 0) {
			o.removeAttr("disabled");
			o.css('background', '#95C040');
			o.val("免费获取验证码");
			wait = 60;
		} else {
			o.attr("disabled", true);
			o.css('background', '#DDDDDD');
			o.val("重新发送(" + wait + ")");
			wait--;
			setTimeout(function() {
					setTime(o)
				},
				1000)
		}
	}

	$scope.register = function() {
		if (rootScope.code == $scope.indentifyingCode) {
			apiconn.send_obj_now({
				"obj": "person",
				"act": "register",
				"device_id": "15556", //设备ID
				"data": {
					"phoneNo": $scope.registerNumber, //电话号码
					"login_passwd": $scope.registerPassword //密码
				}
			});
			apiconn.connect();
		} else {
			console.log("indentifyingCode is error");
		}
	};

	$scope.$on("RESPONSE_RECEIVED_HANDLER", function(event, jo) {
		
		if (jo.obj == "person" && jo.act == "register") {
			console.log("注册成功");
		}
		
		if (jo.obj == "person" && jo.act == "getcode") {
			// r3~.验证码 | f3~.验证码
			rootScope.code = jo.code;
			console.log(jo.code);
		}
		
	});
	
});