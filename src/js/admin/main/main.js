WeChatApp.controller('MainViewController', function($scope) {
	$scope.name = "levinke";

	$scope.send = function(event) {
		// 典型的请求都有这两个字段，
		// 聊天接口还有这个参数
		apiconn.send_obj({
			"obj": "chat",
			"act": "send",
			"msg": $scope.msg
		});

		// 典型的接口请求，构造一个请求包 调用 send 就可以了
		// 就是这个send可能会被SDK拒绝。接收后，如果服务端超时，
		// 会在15秒内给出响应： uerr: ERR_CONNECTION_EXCEPTION

	};

	$scope.logout = function(event) {

		sessionStorage.setItem("login_name", "");
		sessionStorage.setItem("login_passwd", "");
		sessionStorage.setItem("credential_data", "");

		// 注销只需要把密码收回SDK就自动和服务端登出了，不会重连的
		apiconn.credential("", "");
		apiconn.connect();
	};

	/*
	{
	    io: "o", 
	    obj: "push", 
	    act: "group_members", 
	    durable_at: 0, 
	    members: "[join: test96694] ONLINE: test38544; test78; test; test96694"
	}

	{
	    io: "o", 
	    obj: "chat", 
	    act: "sent", 
	    durable_at: 0, 
	    from_name: "test96694", 
	    from_pid: "o14341157272497889995", 
	    msg: "ab cd"
	}
	*/

	$scope.messages = [];

	$scope.$on("RESPONSE_RECEIVED_HANDLER", function(event, jo) {

		// 约定是响应的JSON里面如果有 uerr 错误码字段，说明用户
		// 要处理。 ustr 是文本字符串的错误说明
		// 另外是 derr 是说明程序错误，不是用户导致的。用户不用作处理。

		// 是服务端给的消息成员上线，离线的消息	
		if (jo.obj == "push" && jo.act == "group_members") {
			var message = {
				"msg": jo.members,
				"from_name": "SYSTEM",
				"from_pid": "0",
				"et": Date()
			};
			
			$scope.messages.push(message);
		}

		// 是聊天返回的消息，或群聊别人调用接口，服务端给我推送的消息
		if (jo.obj == "chat" && jo.act == "sent") {
			var message = {
				"msg": jo.msg,
				"from_name": jo.from_name,
				"from_pid": jo.from_pid,
				"et": Date()
			};
			
			$scope.messages.push(message);
		}

		// u6@.退出
		if (jo.obj == "person" && jo.act == "logout") {
			goto_view("admin/LoginView");
		}
		
	});

});