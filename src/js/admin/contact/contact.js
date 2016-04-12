WeChatApp.controller('ContactViewController', function($scope) {
	
	$scope.initData = function() {
		$scope.login_name = rootScope.person_name;

		if ($scope.login_name == null) {
			goto_view('/admin/LoginView');
		}
		
		// 项目list
		apiconn.send_obj({
			"obj": "person",
			"act": "getAll"
		});
		
	};
	$scope.showProfile = function(){
		document.getElementById('Xiugaiziliao').style.display = 'block';
	}
	
	$scope.getPersonID = function(contact) {
		document.getElementById("ContactDetails").style.display = "block";
		//$scope.presonID = contact._id;
		apiconn.send_obj({
			"obj": "person",
			"act": "get_info",
			"person_id": contact._id //用户的id
		});
	};
	
	$scope.$on("RESPONSE_RECEIVED_HANDLER", function(event, jo) {
		if (jo.obj == "person" && jo.act == "getAll") {
			$scope.contactLists = jo.list;
			console.log("contaicList"+$scope.contactLists);
		}
		if (jo.act == "get_info") {
			$scope.presonData = jo.data;
		}
		
	});
	
});
var mouseover = function(){
		document.getElementById('CloseDiv').innerHTML='x';	
	};
	var mouseleave = function(){
		document.getElementById('CloseDiv').innerHTML='';
	}
	var closediv = function(){
		document.getElementById('Xiugaiziliao').style.display = 'none';
	}