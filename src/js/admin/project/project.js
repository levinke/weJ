WeChatApp.controller('ProjectViewController', function($scope) {
	// a2@.参与人员数组
	$scope.columns = [];
	// a3@.pa文件数组
	$scope.files = [];
	// a3@.pea文件数组
	$scope.filesEdit = [];

	// u
	$scope.initData = function() {
		// u2~.用户名
		$scope.login_name = rootScope.person_name;
		if ($scope.login_name == "") {
			$scope.login_name = "游客";
		}
		// u3~.用户id
		if (rootScope.person_id == undefined) {
			goto_view("admin/LoginView");
		}
		// ~~需要记录l~。id、name、数目
		$("#msgCount").text(un_handle_count);
		$(".menu li").removeClass("active");
		$("#" + menu_id).addClass("active");
		// <a刷新
		apiconn.send_obj({
			"obj": "project",
			"act": "getAll",
			"person_id": rootScope.person_id
		});

	};

	// u1@.修改用户资料
	$scope.showProfile = function() {
		document.getElementById('Xiugaiziliao').style.display = 'block';
	};

	// <a1#.新建项目
	$scope.addProject = function() {
		document.getElementById("projectwhite").style.display = "block";
		document.getElementById('projectId').value = "";
		document.getElementById('projectName').value = "";
		document.getElementById('projectSynopsis').value = "";

		document.getElementById("projectHome").style.display = "block";
		document.getElementById("projectEditHome").style.display = "none";
		document.getElementById("submitButton").style.display = "block";
		document.getElementById("submitButton1").style.display = "none";
		$scope.columns = []; // dirtyz
		$scope.files = []; // dirtyz
	};

	// <a2@.该项目详情
	$scope.getTaskID = function(project) {
		// ~.所选定项目id
		rootScope.projectID = project.project_id;
		apiconn.send_obj({
			"obj": "task",
			"act": "list",
			"person_id": rootScope.person_id, //项目创建用户的id
			"project_id": project.project_id //选中的项目id
		});
	};
	
	// <a2#.编辑
	$scope.editProject = function(project) {
		rootScope.projectEditID = project.project_id;
		document.getElementById("projectwhite").style.display = "block";

		document.getElementById("projectHome").style.display = "none";
		document.getElementById("projectEditHome").style.display = "block";
		document.getElementById("submitButton").style.display = "none";
		document.getElementById("submitButton1").style.display = "block";
		document.getElementById('projectId1').value = project.project_code;
		document.getElementById('projectName1').value = project.project_name;
		document.getElementById('projectSynopsis1').value = project.project_info;
		
		$scope.columns = []; // dirtyz
		$scope.files = []; // dirtyz

		// <a编辑刷新参加人员、文件
		apiconn.send_obj({
			"obj": "project",
			"act": "getDetail",
			"project_id": rootScope.projectEditID
		});

	};

	// a2@.联系人列表
	$scope.addProjectMember = function() {
		apiconn.send_obj({
			"obj": "person",
			"act": "getAll"
		});
		document.getElementById("projectMember").style.display = "block";
	};
	// a2@.隐藏联系人列表，加入参与人员数组
	$scope.addPerson = function(contactProject) {
		document.getElementById("projectMember").style.display = "none";
		$scope.columns.push(contactProject);
	};
	// a2#.撤出参与人员数组
	$scope.deleteProjectMember = function(contactProject) {
		$scope.columns.pop(contactProject);
	};

	// a3@.pa隐藏着上传按钮
	$scope.updatafile = function() {
		$("#taskfile").click();
	};
	// a3@.pae隐藏着上传按钮
	$scope.updatafile1 = function() {
		$("#taskfile1").click();
	};

	// a3@.pa上传文件
	$scope.fileNameChanged = function() {
		if ($("#taskfile").val() == "") {
			return
		}
		imgu.uploadFile();
		$scope.fileNameged();
	};
	// a3@.pae上传文件
	$scope.fileNameChanged1 = function() {
		if ($("#taskfile1").val() == "") {
			return
		}
		imgus.uploadFile();
		$scope.fileNameged1();
	};

	// a3@.pa文件信息
	$scope.fileNameged = function() {
		var tmpFileObj = {};
		var upDate = new Date;
		document.getElementById("updatafile").style.display = "block";

		setTimeout(function() {
			ImageMember(1);
			tmpFileObj.fid = imgs[1];
			$scope.files.push(tmpFileObj);
		}, 5000);

		tmpFileObj.type = $("#taskfile").val().substring($("#taskfile").val().length - 4, $("#taskfile").val().length);
		tmpFileObj.name = $("#taskfile").val().substring(0, $("#taskfile").val().length - 4);

		if (tmpFileObj.name.length > 30) {
			tmpFileObj.name = tmpFileObj.name.substring(0, 17) + "..." + tmpFileObj.name.substring(tmpFileObj.name.length - 8, tmpFileObj.name.length) + tmpFileObj.type;
		} else {
			tmpFileObj.name = tmpFileObj.name + tmpFileObj.type;
		}
		tmpFileObj.time = upDate.getFullYear() + '.' + (upDate.getMonth() + 1) + '.' + upDate.getDate() + ' ' + upDate.getHours() + ':' + upDate.getMinutes();
	};
	// a3@.pae文件信息
	$scope.fileNameged1 = function() {
		var tmpFileObj = {};
		var upDate = new Date;
		document.getElementById("updatafile1").style.display = "block";

		setTimeout(function() {
			ImageMember(1);
			tmpFileObj.fid = imgs[1];
			$scope.filesEdit.push(tmpFileObj);
		}, 5000);

		tmpFileObj.type = $("#taskfile1").val().substring($("#taskfile1").val().length - 4, $("#taskfile1").val().length);
		tmpFileObj.name = $("#taskfile1").val().substring(0, $("#taskfile1").val().length - 4);

		if (tmpFileObj.name.length > 30) {
			tmpFileObj.name = tmpFileObj.name.substring(0, 17) + "..." + tmpFileObj.name.substring(tmpFileObj.name.length - 8, tmpFileObj.name.length) + tmpFileObj.type;
		} else {
			tmpFileObj.name = tmpFileObj.name + tmpFileObj.type;
		}
		tmpFileObj.time = upDate.getFullYear() + '.' + (upDate.getMonth() + 1) + '.' + upDate.getDate() + ' ' + upDate.getHours() + ':' + upDate.getMinutes();
	};
	
	// a3@.pa文件删除
	$scope.del_img = function(fileList) {
		$scope.files.pop(fileList);
	};
	// a3@.pae文件删除
	$scope.del_imgEdit = function(fileList) {
		$scope.filesEdit.pop(fileList);
	};

	// a4@.添加项目[发送项目信息(a1)、参与人员(a2)、文件(a3)] 
	$scope.send = function() {
		//$scope.files = [];
		imgs = [];

		apiconn.send_obj({
			"obj": "project",
			"act": "add",
			"person_id": rootScope.person_id,
			"create_data": {
				"project_code": $("#projectId").val(), //项目的代号
				"project_name": $("#projectName").val(), //项目的名字
				"project_info": $("#projectSynopsis").val() //项目的简介
			}
		});
		/*
输入:
{
  ”obj“:"project",
  "act":"add",
  "person_id":"0154..."            //创建者id
  ”create_data“:{
    ”project_code“:"01"            //项目的代号
    ”project_name“:"we"            //项目的名字
    ”project_info“:"管理项目"       //项目的简介
  }

  "person_data":{                  //添加删除人员 (可选)
    "person_ids": [ 
    "o14473820733308250904"        //被添加者id 
    "o14477397324317851066"        //被添加者id
     ]  
   }

  "file_data":[                           //文件列表 (可选)
       { 
        "file_fid":"f464456456"           //文件的fid
        "file_type":"pdf",                //文件的类型
        "file_name":"序列案",              //文件的名字   
        "file_size":"80MB",                //文件的大小
        "file_upload_time":"14147464654554"      //上传时间
        },
      { 
        "file_fid":"f666666666"           //文件的fid
        "file_type":"pdf",                //文件的类型
        "file_name":"文档",               //文件的名字   
        "file_size":"90MB"                //文件的大小
        "file_upload_time":"14147464654554"      //上传时间
      }
    ]

}
		 */

		setTimeout(function() {
			for (var item in $scope.files) {
				apiconn.send_obj({
					"obj": "project",
					"act": "fileUpload",
					"project_id": rootScope.projectAddID,
					"file_data": [ //文件数组
						{
							"file_fid": $scope.files[item].fid, //文件的fid
							"file_type": $scope.files[item].type, //文件的类型
							"file_name": $scope.files[item].name, //文件的名字   
							"file_size": "1024kb", //文件的大小
							"file_upload_time": $scope.files[item].time //上传时间
						}
					]
				});
			}
		}, 1000);

		/*
输入:
{
  "obj":"project",
  "act":"fileUpload",
  "project_id":"o14477465783050251007",   //项目的id               
  "file_data":[                           //文件列表
       { 
        "file_fid":"f464456456"           //文件的fid
        "file_type":"pdf",                //文件的类型
        "file_name":"序列案",              //文件的名字   
        "file_size":"80MB",                //文件的大小
        "file_upload_time":"14147464654554"      //上传时间
        },
      { 
        "file_fid":"f666666666"           //文件的fid
        "file_type":"pdf",                //文件的类型
        "file_name":"文档",               //文件的名字   
        "file_size":"90MB"                //文件的大小
        "file_upload_time":"14147464654554"      //上传时间
      }
    ]
}
		 */

		setTimeout(function() {
			for (var name in $scope.columns) {
				apiconn.send_obj({
					"obj": "project",
					"act": "addAndDelPerson",
					"action": "add",
					"person_ids": [
						$scope.columns[name]._id
					],
					"_id": rootScope.projectAddID // a4~.项目id
				});
			}
		}, 1000);
		/*
输入:
{
  "obj":"project",
  "act":"addAndDelPerson",
  "action":"add/Del"                //增加或是删除
  "person_ids": [ 
    "o14473820733308250904"         //被添加者id 
    "o14477397324317851066"         //被添加者id
  ]                            
  "_id":"o14477450733242580890"     //项目的id     
}
		 */

	};

	// a4#.修改项目[发送项目信息(a1)、参与人员(a2)、文件(a3)] 
	$scope.sendM = function() {
		imgs = [];
		
		apiconn.send_obj({
			"obj": "project",
			"act": "update",
			"project_id": rootScope.projectEditID,
			"update_data": {
				"project_code": $("#projectId1").val(), //项目的代号
				"project_name": $("#projectName1").val(), //项目的名字
				"project_info": $("#projectSynopsis1").val() //项目的简介
			}
		});

		// ~~如参与人员修改
		setTimeout(function() {
			for (var item in $scope.filesEdit) {
				apiconn.send_obj({
					"obj": "project",
					"act": "fileUpload",
					"project_id": rootScope.projectEditID,
					"file_data": [ //文件数组
						{
							"file_fid": $scope.filesEdit[item].fid, //文件的fid
							"file_type": $scope.filesEdit[item].type, //文件的类型
							"file_name": $scope.filesEdit[item].name, //文件的名字   
							"file_size": "1024kb", //文件的大小
							"file_upload_time": $scope.filesEdit[item].time //上传时间
						}
					]
				});
			}
		}, 1000);

		setTimeout(function() {
			for (var name in $scope.columns) {
				apiconn.send_obj({
					"obj": "project",
					"act": "addAndDelPerson",
					"action": "add",
					"person_ids": [
						$scope.columns[name]._id
					],
					"_id": rootScope.projectEditID // a4~.项目id
				});
			}
		}, 1000);

	};

	$scope.$on("RESPONSE_RECEIVED_HANDLER", function(event, jo) {
		// <a刷新
		if (jo.obj == "project" && jo.act == "getAll") {
			$scope.projects = jo.projectList;
		}
		/*
输出:
{
  obj:"project",
  act:"getAll",
  projectlist:[
    {  project_id:""                        //项目的id
       project_name:"we"                    //项目的名字
       project_code:"04"                    //项目的编号
       project_info:"社交"                   //项目的详情
    }
  ]
}
		 */

		// <a2#.编辑参与人员、文件
		if (jo.obj == "project" && jo.act == "getDetail") {
			$scope.projectsfp = jo.project;
			$scope.columns = []; // dirtyz
			if (jo.project.project_person.length > 0) {
				for (var item in jo.project.project_person) {
					$scope.columns.push(jo.project.project_person[item]);
				}
			}
			$scope.filesEdit = []; // dirtyz
			if (jo.project.project_person.length > 0) {
				for (var item in jo.project.project_files) {
					$scope.filesEdit.push(jo.project.project_files[item]);
				}
				document.getElementById("updatafile1").style.display = "block";
			}
		}
		/*
输出:s
{
    obj: "project", 
    act: "getDetial", 
    project: {
        project_files: [
            {
                file_fid:"f5555555"           //文件的id
                file_name: "界面案",          //文件的名字
                file_type: "pdf",            //文件的类型
                file_time: 236554354         //上传的时间
                file_size:80MB               //文件的大小
            }, 
        ],   
        project_info: "找工作",              //项目的简介  
        project_code:"01"                   //项目的编号
        project_name: "shift",              //项目名字
        project_person: [
            {
                person_id:""
                headFid: "f1000664646",     //头像
                name: "浩哥"                 //名字
            } 
        ]
        pro_person:1,                  //1,项目负责人   0,项目成员
    }
}
		 */

		// a4@.添加项目
		if (jo.obj == "project" && jo.act == "add" && jo.status == "success") {
			// a4~.项目id
			rootScope.projectAddID = jo.project_id;
			// a隐藏
			document.getElementById("projectwhite").style.display = "none";
			// <a刷新
			apiconn.send_obj({
				"obj": "project",
				"act": "getAll",
				"person_id": rootScope.person_id
			});
		}

		// a2@.联系人列表
		if (jo.obj == "person" && jo.act == "getAll") {
			$scope.contactProjectLists = jo.list;
		}
		/*
输出:
{
  obj:"person",
  act:"getAll"
  list:[
    {
       _id:"01447763055380869197"                //用户ID
       headFid:"015612645656498"                 //头像
       name:"黄桃发"                              //姓名
    }
  ]
}
			 */

	});

});