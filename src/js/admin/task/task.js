WeChatApp.controller('TaskViewController', function($scope) {

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
		// <t.刷新
		apiconn.send_obj({
			"obj": "task",
			"act": "list",
			"person_id": rootScope.person_id, //用户的id
			"project_id": rootScope.projectID //用户所在项目id
		});

	};
	
	// u1@.修改资料
	$scope.showProfile = function() {
		document.getElementById('Xiugaiziliao').style.display = 'block';
	}

	// <t1@.项目详情
	$scope.getContentProject = function() {
		document.getElementById("projectContentWhite").style.display = "block";
		document.getElementById("taskWhite").style.display = "none";

		apiconn.send_obj({
			"obj": "project",
			"act": "getDetail",
			"project_id": rootScope.projectID
		});

		apiconn.send_obj({
			"obj": "project",
			"act": "getFileList",
			"project_id": rootScope.projectID
		});

	};

	// <t4@.新建任务
	$scope.addTask = function() {
		document.getElementById("taskWhite").style.display = "block";
		document.getElementById("projectContentWhite").style.display = "none";
		document.getElementById("NewTopic").style.display = "none";
	};

	// <t4#.新建话题
	$scope.addSession = function() {
		document.getElementById('NewTopic').style.display = 'block';
	}

	// t8@.新建任务
	$scope.send = function() {
		apiconn.send_obj({
			"obj": "task",
			"act": "add",
			"person_id": rootScope.person_id,
			"data": {
				"project_id": rootScope.projectID, //项目id
				"title": $("#edittask").val(), //标题
				"detail": $("#synopsistask").val(), //详细介绍
				"person_id": rootScope.person_id, //人员id
				"level": { //任务优先级
					"name": "1", //任务状态
					"color": "green" //颜色
				},
				"startTime": "1234646", //开始时间
				"endTime": "1234890" //结束时间
			}
		});
	};
	/*
输入：
{
  "obj":"task",
  "act":"add",
  "data":{
    "project_id":"o14477450733242580890",   //项目id
    "title":"多伦多",                       //标题
    "detail":"界面i102",                    //详细介绍
        "person_id":"o14477397324317851066",    //人员id
        "level":{                               //任务优先级
           name:           //优先级名字  紧急任务 我参与的任务 自定义    已完成的任务 
           color:          //颜色        1:红色   2:蓝色       3:自定义  4:绿色 
        },
    "startTime":"1234646",                      //开始时间
    "endTime":"1234890"                         //结束时间
  }
                                              //增加人员（可选）
  "person_ids": [ 
    "o14473820733308250904"         //被添加者id 
    "o14477397324317851066"         //被添加者id
  ]    
                                           //上传文件(可选)
  "file_data":[                           //文件列表
       { 
        "file_fid":"f464456456"           //文件的fid
        "file_type":"pdf",                //文件的类型
        "file_name":"序列案",             //文件的名字   
        "file_size":"80MB",               //文件的大小
        "file_upload_time":"14147464654554"      //上传时间
        },
      { 
        "file_fid":"f666666666"           //文件的fid
        "file_type":"pdf",                //文件的类型
        "file_name":"文档",               //文件的名字   
        "file_size":"90MB"                //文件的大小
        "file_upload_time":"14147464654554"    //上传时间
      }
    ]
}
		 */

	$scope.$on("RESPONSE_RECEIVED_HANDLER", function(event, jo) {
		// <t.刷新
		if (jo.obj == "task" && jo.act == "list") {
			$scope.tasks = jo.list;
		}
		/*
输出：
{
    obj: "task", 
    act: "list", 
    list: [
        {
            _id: "o14480332747555830478",    //项目id
            endTime: "1234890",              //项目结束时间
            title: "多伦多3"                 //项目名字
            color:1                          //暂时未定   1         2               3
        }, 
        {
            _id: "o14479865178301310539", 
            endTime: "1234890", 
            title: "shift"
            color:2
        }
    ]
}
		 */

		// <t1@.项目详情
		if (jo.obj == "project" && jo.act == "getDetail") {
			$("#projectDetailsTitle").html(jo.project.project_name);
			$scope.projectDetails = jo.project.project_info;
		}
		/*
输出:
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
		// a.项目文件详情
		if (jo.obj == "project" && jo.act == "getFileList") {
			$scope.fileList = jo.fileList;
		}
		/*
输出:
{
    obj: "project", 
    act: "getFileList", 
    fileList: [
        {
            file_fid: "f546456",          //文件的fid
            file_name: "界面案",           //文件的名字
            file_type: "pdf",             //文件的类型
            file_upload_time: "254212"    //文件上传时间
        }, 
        {
            file_fid: "f464464", 
            file_name: "序列案", 
            file_type: "pdf", 
            file_upload_time: "1645646"
        }
    ]
}
		 */

		// <t.新建任务.刷新
		if (jo.obj == "task" && jo.act == "add" && jo.status == "success") {
			apiconn.send_obj({
				"obj": "task",
				"act": "list",
				"person_id": rootScope.person_id, //用户的id
				"project_id": rootScope.projectID //用户所在项目id
			});
		}

	});

});