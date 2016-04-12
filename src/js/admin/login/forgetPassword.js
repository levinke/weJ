WeChatApp.controller('ForgetPasswordViewController', function($scope) {

	$scope.modefiyTelphone = "18094012541";
	$scope.modefiyPassword = "123456";

	$scope.get_modefiyCode = function() {
		apiconn.send_obj_now({
			"obj": "person",
			"act": "getcode",
			"phoneNo": $scope.modefiyTelphone,
			"type": "modify"
		});
		setTime($("#modefiyIdentifyingCode"));
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

	$scope.modefiy = function() {
		apiconn.send_obj_now({
			"obj": "person",
			"act": "changePwd",
			"action": "phone_setPwd",
			"phoneNo": $scope.modefiyTelphone,
			"verifycode": $scope.modefiyIdentifiyCode, //验证码
			"new_pwd": $scope.modefiyPassword
		});
	};

	$scope.$on("RESPONSE_RECEIVED_HANDLER", function(event, jo) {

		if (jo.obj == "person" && jo.act == "changePwd") {
			console.log("changePwd:" + jo.status);
		}

	});

});