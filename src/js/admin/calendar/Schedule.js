WeChatApp.controller('DateViewController', function($scope) {
	$scope.initData = function() {
		// 用户名
		$scope.login_name = rootScope.person_name;

		// 登入界面
		if ($scope.login_name == null) {
			goto_view('/admin/LoginView');
		}

		$("#msgCount").text(un_handle_count); // 0
		$(".menu li").removeClass("active");
		//"project_menu";默认
		$("#" + menu_id).addClass("active");
		
		
	var jjrmodelidlist;  //用于存放从数据库取出的所有节假日的id
	var jjrmodeltimelist; //用于存放从数据库取出的所有节假日的time
	var jjrmodelztlist; //用于存放从数据库取出的所有节假日的状态
		
	$scope.createSelectYear();  //创建年份下拉,并给对应事件
	$scope.createMonthSelect();  //创建月份下拉，并给对应事件
	$scope.getjjrszModelByYear($scope.withID("aboluo-yearSelect").value); //从数据库取出已经设置了的节假日的数据，例：休息，上班等
	//根据年，月，用table绘制日历。 年月变动则 重新绘制
	$scope.createTabledate(parseInt($scope.withID("aboluo-yearSelect").value),parseInt($scope.withID("aboluo-selectmonth").value));
	//设置右边显示栏显示内容，显示栏还可以设置节假日的状态等
	$scope.setRigth(new Date().getFullYear(),new Date().getMonth()+1,new Date().getDate());
	

	};
	$scope.showProfile = function(){
		document.getElementById('Xiugaiziliao').style.display = 'block';
	}
	$scope.stopBubble = function(e){
		if(e && e.stopPropagation){// 别的浏览器
		e.stopPropagation();
	}else{ //IE
		window.event.cancelBubble=true;
	}
	}

	$scope.createSelectYear = function(){
	document.getElementById("aboluo-calendar-select-year").innerHTML='<select name="aboluo-yearSelect" id="aboluo-yearSelect"></select>';
	var yearSelect= document.getElementById("aboluo-yearSelect");
	var Nowtime=new Date();
	var currYear=Nowtime.getFullYear();
	for(var i=0;i<=15;i++){
		yearSelect.options.add(new Option((i+2015)+"年",i+2030));
		if(currYear==i+2015){
		yearSelect.options[i].selected=true;
		}
	}
		yearSelect.onchange=function(e){
		var aclick=document.getElementById("aboluo-aclick");
		//重新赋值给变全局变量,所有的带状态的日期;然后下一步将创建table,完成动态样式,
		//这里要重读数据就5个位置,选择年时,上一个月,下一个月,设置节假日button,返回今天button
		getjjrszModelByYear(document.getElementById("aboluo-yearSelect").value);
		createTabledate(document.getElementById("aboluo-yearSelect").value,document.getElementById("aboluo-selectmonth").value);
		if(aclick==""){
			//说明没选,或选的当天,算出选的这个月有多少天,与原来的那个月的天数一对比,如果原来的天数大于现在的天数,那么对换
			//这里先算当前月当前天,然后算出选择的那个月总天数,然后对比,如果当前天大于选择的那个月那天,对换
		 var pervdays1=getCurrMonthLashDay(document.getElementById("aboluo-yearSelect").value,document.getElementById("aboluo-selectmonth").value);
		    	if(new Date().getDate()>pervdays1){
					setRigth(document.getElementById("aboluo-yearSelect").value,document.getElementById("aboluo-selectmonth").value,pervdays1);	
				}else{
					setRigth(document.getElementById("aboluo-yearSelect").value,document.getElementById("aboluo-selectmonth").value,new Date().getDate());
				}
		}else{
			var adate=aclick.getAttribute("date");
			var aarr=adate.split("-");
			aarr[0]=parseInt(aarr[0]);
			aarr[1]=parseInt(aarr[1]);
			aarr[2]=parseInt(aarr[2]);
			var pervdays=getCurrMonthLashDay(document.getElementById("aboluo-yearSelect").value,document.getElementById("aboluo-selectmonth").value);
			if(aarr[2]>pervdays){
				aarr[2]=pervdays;
			}
				setRigth(document.getElementById("aboluo-yearSelect").value,document.getElementById("aboluo-selectmonth").value,aarr[2]);	
		}
		
	};
	}
	
	
	
	$scope.createMonthSelect = function(){
		
		document.getElementById("aboluo-calendar-month").innerHTML='<select name="aboluo-selectmonth" id="aboluo-selectmonth"></select>';
			var selectmonth= document.getElementById("aboluo-selectmonth");
	
		
			selectmonth.onchange=function(e){
		var aclick=document.getElementById("aboluo-aclick");
		createTabledate(document.getElementById("aboluo-yearSelect").value,selectmonth.options[selectmonth.selectedIndex].value);
		
		
		
		if(aclick==""){
			//说明没选,或选的当天,算出选的这个月有多少天,与原来的那个月的天数一对比,如果原来的天数大于现在的天数,那么对换
			//这里先算当前月当前天,然后算出选择的那个月总天数,然后对比,如果当前天大于选择的那个月那天,对换
		 var pervdays1=getCurrMonthLashDay(document.getElementById("aboluo-yearSelect").value,selectmonth.options[selectmonth.selectedIndex].value);
		    	if(new Date().getDate()>pervdays1){
					setRigth(document.getElementById("aboluo-yearSelect").value,selectmonth.options[selectmonth.selectedIndex].value,pervdays1);	
				}else{
					setRigth(document.getElementById("aboluo-yearSelect").value,selectmonth.options[selectmonth.selectedIndex].value,new Date().getDate());
				}
		}else{
			var adate=aclick.getAttribute("date");
			var aarr=adate.split("-");
			aarr[0]=parseInt(aarr[0]);
			aarr[1]=parseInt(aarr[1]);
			aarr[2]=parseInt(aarr[2]);
			var pervdays=getCurrMonthLashDay(document.getElementById("aboluo-yearSelect").value,selectmonth.options[selectmonth.selectedIndex].value);
			if(aarr[2]>pervdays){
				aarr[2]=pervdays;
			}
				setRigth(document.getElementById("aboluo-yearSelect").value,selectmonth.options[selectmonth.selectedIndex].value,aarr[2]);	
		}
	
	
	
	};
	var Nowtime=new Date();
	var currMonth=Nowtime.getMonth();
    for(var i=0;i<12;i++){
		selectmonth.options.add(new Option((i+1)+"月",i+1));
		if(currMonth==i){
			selectmonth.options[i].selected=true;
		}
	}
    
	}
	
	
	$scope.createTabledate = function(){
		var rilitabledele=$scope.withClass("aboluo-rilitbody");
	if(rilitabledele!="" && rilitabledele!=null && rilitabledele!='undefined'){
	rilitabledele.parentNode.removeChild(rilitabledele);
	}
	var rilitable=newElement('tbody');
	rilitable.setAttribute("class","aboluo-rilitbody");
	var rili=$scope.withClass("aboluo-rilitable");
	rili.appendChild(rilitable);
	//先得到当前月第一天是星期几,然后根据这个星期算前面几天的上个月最后几天.
	var date=setdateinfo(year,yue,1);
	var weekday=date.getDay();
	var pervLastDay;
	if(weekday!=0){
		pervLastDay=weekday-1;
	}else{
		pervLastDay=weekday+6;
	}
	//得到上个月最后一天;
	var pervMonthlastDay=getPervMonthLastDay(year,yue);
	//上月最后几天循环
	var lastdays=pervMonthlastDay-pervLastDay+1;
	var tr=newElement('tr');
	tr.style.borderBottom="1px solid #e3e4e6";
	for(var i=lastdays;i<=pervMonthlastDay;i++){
		var td=newElement("td");
		var a=getA(parseInt(yue)-1==0?parseInt(year)-1:year,parseInt(yue)-1==0?12:parseInt(yue)-1,i);
		a.style.color="#BFBFC5";
//		a.href ='javascript:pervA('+parseInt(yue)-1==0?parseInt(year)-1:year+','+parseInt(yue)-1==0?12:parseInt(yue)-1+','+i+');';
		td.appendChild(a);
		td.setAttribute("class","aboluo-pervMonthDays");
		tr.appendChild(td);
	}
	//这个月开始的循环
	var startDays=8-weekday==8?1:8-weekday;
	for(var i=1;i<=startDays;i++){
		var td=newElement("td");
		var b=getA(year,yue,i);
		td.appendChild(b);
		tr.appendChild(td);
	}
	rilitable.appendChild(tr);
	//指定年月最后一天
	var currMonthLashDay=getCurrMonthLashDay(year,yue);
	//当月除开第一行的起点
	var currmonthStartDay=currMonthLashDay-(currMonthLashDay-startDays)+1;
	//当月还剩余的天数
	var syts=currMonthLashDay-startDays;
	//循环次数
	var xhcs=0;
	if(check(syts/7)){
	//是小数
	xhcs=Math.ceil(syts/7);//向上取整
	}else{
	xhcs=syts/7;	
	}
	
	//这是下个月开始的变量;
	var jilvn=1;
	for(var i=0;i<xhcs;i++){
		var tr1=newElement('tr');
		if(i!=xhcs-1){
			tr1.style.borderBottom="1px solid #e3e4e6";
		}
		for(var n=1;n<=7;n++){
			var td=newElement('td');
			if(startDays==0){
				var c=getA(parseInt(yue)+1==parseInt(13)?parseInt(year)+1:year,parseInt(yue)+1==parseInt(13)?1:parseInt(yue)+1,jilvn);
				c.style.color="#BFBFC5";
				td.appendChild(c);
				td.setAttribute("class","aboluo-nextMonthDays");
				jilvn++;
				tr1.appendChild(td);
				continue;
			}else{
			startDays++;
			var d=getA(year,yue,startDays);
			td.appendChild(d);
				if(startDays==currMonthLashDay){
					startDays=0;
				}
			tr1.appendChild(td);	
			}
		
		}
		rilitable.appendChild(tr1);
	}
	$scope.setHolidayred();//设置星期六星期天的样式
	$scope.setTrHeight();//设置table日期的行高
	$scope.setA(); //设置td中a的事件
	}
	
	$scope.pervA = function(year,yue,day){
	$scope.createTabledate(year,yue);  //创建对应的table(日期)
	$scope.setRigth(year,yue,day);    //设置右边明细栏内容
	$scope.updateSelect(year,yue);  
	}
	$scope.nextA = function(year,yue,day){
	$scope.createTabledate(year,yue);
	$scope.setRigth(year,yue,day);
	$scope.updateSelect(year,yue);
	}
	$scope.updateSelect = function(year,yue){
		var selectmonth=$scope.withID("aboluo-selectmonth");
	var selectyear=$scope.withID("aboluo-yearSelect");
	selectmonth.value=yue;
	selectyear.value=year;
	}
	
	
	
	$scope.setRigth = function(year,yue,day){
		//先清空
	$scope.withClass("aboluo-xssj").innerHTML="";
	$scope.withClass("aboluo-ssjjr").innerHTML="";
	year=year.toString();
	yue=yue.toString();
	day=day.toString();
	//设置rigthdiv的marginleft;
	var rigthdiv=$scope.withClass("aboluo-rightdiv");
	var w=$scope.withClass("aboluo-w-700");
	//rigthdiv.style.marginLeft=(w.offsetWidth*0.7+4)+"px";  //设置margin-left
	//给p中添加span显示值
	var span=newElement('span');
	var date=setdateinfo(year,yue,day);
	span.innerHTML=$scope.formatByYearyueday(year,yue,day);
	var span1=newElement('span');
	var week=getWeek(date.getDay());
	span1.innerHTML=week;
	var aboluoxssj=$scope.withClass("aboluo-xssj");
	aboluoxssj.appendChild(span);
	aboluoxssj.appendChild(span1);
	var currday=$scope.withClass("aboluo-currday");
	currday.innerHTML=day;
	currday.style.lineHeight=currday.offsetHeight+"px";    //实际在得到长宽时不能用style.height，得用.offsetHeight,但是设置的时候要用style.height=...
	var szrq=$scope.withClass("aboluo-ssjjr");
	szrq.style.marginTop="20px";
	var span2=newElement('span');
	span2.innerHTML="设置日志状态:";
	szrq.appendChild(span2);
	var szrqselect=newElement("select");
	szrqselect.style.width=($scope.withClass("aboluo-rightdiv").offsetWidth*0.9)+"px";
	szrqselect.options.add(new Option("无","0")); //0代表还原
	//这里要判断一下如果是星期67就只能设置上班,如果是星期1-5就只能设置休息
	var bool=isweekend(year,yue,day);
	if(bool){
	szrqselect.options.add(new Option("上班","1"));
	}else{
	szrqselect.options.add(new Option("休息","2"));
	}
	szrq.appendChild(szrqselect);
	var szrqbutton=newElement('input');
	szrqbutton.type="button";
	szrqbutton.className="btn";  //设置class
	szrqbutton.value="确认";
	szrqbutton.setAttribute("onclick","javascript:$scope.aboluoSetrq();");
	szrq.appendChild(szrqbutton);
	setaclass(year,yue,day);
	}
	
	$scope.formatByYearyueday = function(year,yue,day){
		year=year.toString();
	yue=yue.toString();
	day=day.toString();
	return year+"-"+(yue.length<2?'0'+yue:yue)+"-"+(day.length<2?'0'+day:day);
	}
	
	
	$scope.formatByDate = function(date){
		date=date.substring(0,10);
	var daxx=date.toString().split("-");
	return daxx[0]+"-"+(daxx[1].length<2?'0'+daxx[1]:daxx[1])+"-"+(daxx[2].length<2?'0'+daxx[2]:daxx[2]);

	}
	
	$scope.setA = function(){
		var tbody=$scope.withClass("aboluo-rilitbody");
	var arr=tbody.getElementsByTagName("a");
	for(var i=0;i<arr.length;i++){
		var date=arr[i].getAttribute("date");
		var datearr=date.split("-");
			if(arr[i].parentNode.className=="aboluo-pervMonthDays"){
			arr[i].setAttribute("onclick","javascript:$scope.pervA("+datearr[0]+","+datearr[1]+","+datearr[2]+",this);javascript:$scope.stopBubble(this);")
			}else if(arr[i].parentNode.className=="aboluo-nextMonthDays"){
				arr[i].setAttribute("onclick","javascript:$scope.nextA("+datearr[0]+","+datearr[1]+","+datearr[2]+",this);javascript:$scope.stopBubble(this);")	
			}else{
			arr[i].setAttribute("onclick","javascript:$scope.setRigth("+datearr[0]+","+datearr[1]+","+datearr[2]+");javascript:$scope.stopBubble(this);");
			}
		for(var n=0;n<jjrmodelidlist.length;n++){
			if($scope.formatByDate(jjrmodeltimelist[n])==$scope.formatByDate(date)){
				if(jjrmodelztlist[n]==1){ //1上班
					var span=newElement('span');
					span.setAttribute("class","aboluo-td-a-ban");
					arr[i].style.background="#f5f5f5";
					arr[i].setAttribute("ztid",jjrmodelidlist[n]);
					arr[i].setAttribute("jjrzt",jjrmodelztlist[n]);
					span.innerHTML="班";
					arr[i].appendChild(span);
				}else if(jjrmodelztlist[n]==2){ //2休息
					var span=newElement('span');
					span.setAttribute("class","aboluo-td-a-xiu");
					arr[i].setAttribute("ztid",jjrmodelidlist[n]);
					arr[i].setAttribute("jjrzt",jjrmodelztlist[n]);
					arr[i].style.background="#fff0f0";
					span.innerHTML="休";
					arr[i].appendChild(span);
				}else if(jjrmodelztlist[n]==0){ // 这里为了保证操作过的节假日的唯一性,不给样式只设置a的ztid
					arr[i].setAttribute("ztid",jjrmodelidlist[n]);
					arr[i].setAttribute("jjrzt",jjrmodelztlist[n]);
				}
			}
		}	
	}
	}
	
	$scope.setaclass = function(year,yue,day){
		var a=$scope.withClass("aboluo-aclick");
		a.className="";
		var date=new Date();
		var year1=date.getFullYear();
		var month1=date.getMonth();
		var day1=date.getDate();
		if(year1==year && yue==month1+1 && day1==day){
		}else{
			var tbody=$scope.withClass("aboluo-rilitbody");
			var arr=tbody.getElementsByTagName("a");
			for(var i=0;i<arr.length;i++){
				var date=arr[i].getAttribute("date");
				var datearr=date.split("-");
				if(datearr[0]==year && datearr[1]==yue && datearr[2]==day){
					arr[i].setAttribute("class","aboluo-aclick");
				}
			}
		}
	}
	
	$scope.getAclickDomDate = function(){
		var aclick=$scope.withClass("aboluo-aclick");
	if(aclick==""){
		//说明没选,那么就给当天,按12月算
		var date=new Date();
		return date.getFullYear()+"-"+(date.getMonth()+1)+"-"+date.getDate();
	}else{
		return aclick.getAttribute("date");
	}
	}
	$scope.getAclickDom = function(){
		var aclick=$scope.withClass("aboluo-aclick");
	if(aclick==""){
		//说明没选,那么就给当天,按12月算
		return $scope.withClass("aboluo-currToday");
	}else{
		return aclick;
	}
	}
	
	$scope.newElement = function(){
		return document.createElement(val);
	}
	
	$scope.setdateinfo = function(year,yue,day){
		var date=new Date();
	date.setFullYear(parseInt(year));
	date.setMonth(parseInt(yue)-1);
	date.setDate(parseInt(day));
	return date;
	}
	$scope.isweekend = function(year,yue,day){
		var date=new Date();
	date.setFullYear(year);
	date.setMonth(yue-1);
	date.setDate(day);
	var week=date.getDay();
	if(week==0 || week==6){
		return true;
	}
	return false;
	}
	
	$scope.getWeek = function(){
		var weekxq=new Array();
	weekxq[0]="星期日";
	weekxq[1]="星期一";
	weekxq[2]="星期二";
	weekxq[3]="星期三";
	weekxq[4]="星期四";
	weekxq[5]="星期五";
	weekxq[6]="星期六";
	return weekxq[val];
	}
	
	$scope.getPervMonthLastDay = function(year,yue){
		return parseInt(new Date(year,yue-1,0).getDate());
	}
	$scope.getCurrMonthLashDay = function(year,yue){
		if(yue>=12){
		year=year+1;
		yue=yue-12;
	}
	return parseInt(new Date(year,yue,0).getDate());
	}
	
	$scope.getA = function(){
		var a=$scope.newElement("a");
	a.href="javascript:;";
	a.innerHTML=day;
	a.style.textDecoration="none";
	a.setAttribute("date",year+"-"+yue+"-"+day);
	return a;
	}
	
	$scope.setTrHeight = function(){
		var table=$scope.withClass("aboluo-rilidiv");
	var thead=$scope.withClass("aboluo-rilithead");
	var tbody=$scope.withClass("aboluo-rilitbody");
	var tbodyheight=table.offsetHeight-thead.offsetHeight;
	var rows=tbody.getElementsByTagName('tr');
	for(var i=0;i<rows.length;i++){
		rows[i].style.height=(tbodyheight/rows.length-2)+"px";
		var tds=rows[i].getElementsByTagName("td");
		for(var j=0;j<tds.length;j++){
			var a=tds[j].childNodes[0];
			a.style.width=(tds[j].offsetWidth-10)+"px";
			a.style.height=(tds[j].offsetHeight-7)+"px";
			a.style.lineHeight=(tds[j].offsetHeight-7)+"px";
		}
	}
	}
	$scope.withID = function(id){
		return document.getElementById(id);
	}
	$scope.withClass = function(id){
		var targets= targets ||  document.getElementsByTagName("*");
	var list=[];
	for(var k in targets){
		var target=targets[k];
		if(target.className==id){
			return target;
		}
	}
	return "";
	}
	
	$scope.aboluoSetrq = function(){
		var curra=$scope.getAclickDom();
	var date=curra.getAttribute("date");  //得到日期
	var ztid=curra.getAttribute("ztid"); //得到ztid，如果空，就是新增,不为空是修改
	var jjrzt=curra.getAttribute("jjrzt");  //节假日当前状态
	var szjjr=$scope.withClass("aboluo-ssjjr");    //要设置的当前日期状态
	var a=szjjr.childNodes[1];
	$.ajax({
		   type:"POST",
	   	   url: '',
		   data:{"date":date,"zt":szjjr.childNodes[1].value,"ztid":ztid,"jjrzt":jjrzt}, //这里用ajax可以改变状态
		   async:false,
		   success:function(json){
			   if(json.code>0){
				   var date=$scope.getAclickDomDate();
				   var datearr=date.split("-");
				    getjjrszModelByYear(datearr[0]);
					createTabledate(datearr[0],datearr[1]);  //创建对应的table(日期)
					$scope.setRigth(datearr[0],datearr[1],datearr[2]);    //设置右边明细栏内容
			   }else{
				  alert("设置失败");
			   }
		   },
		   error:function(json){
			   alert("设置失败");
		   }
	});
	}
	
	
	
	
	
	
	});
