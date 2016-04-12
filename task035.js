

var runBtn=document.getElementById("runBtn");
var runIpt=document.getElementById("runIpt");
var tbody=document.getElementsByTagName("tbody")[0];
var direction=["top","right","bottom","left"]
var nowPosition={
	X:5,
	Y:5,
	nowDirection:0,
	tbodyPosition:getTbodyPosition(5,5),
	pastPosition:null
}

// 渲染表格
function renderTable(){
	setDiv(nowPosition.tbodyPosition)
    clearDiv(nowPosition.pastPosition);
}

// 根据坐标获得单元格在DOM流中的位置
function getTbodyPosition(x,y){
	console.log(tbody.childNodes.item(y*2+1).childNodes.item(x*2+1));
	return tbody.childNodes.item(y*2+1).childNodes.item(x*2+1);
}

// 设置一个空的DIV
function setDiv(position){
	var div=document.createElement("div");
    position.appendChild(div);
	setDerection(div);
}

// 清除上一个位置的样式
function clearDiv(position){
	if(position){
    position.innerHTML="";
    position.setAttribute("class","");
    }
}

// 设置当前位置父类元素的方向，实现就是给父类加class属性，从而调用CSS样式
function setDerection(div){
	div.parentNode.setAttribute("class",direction[nowPosition.nowDirection]);
}

// 根据方向前进一格函数
function GO(){
    switch(nowPosition.nowDirection){
    	case 0:
	    	if(nowPosition.Y>1){
	    		if(nowPosition.pastPosition!=nowPosition.tbodyPosition)
	    	    nowPosition.pastPosition=nowPosition.tbodyPosition;
	    	    nowPosition.Y--;
	    	    nowPosition.tbodyPosition=getTbodyPosition(nowPosition.X,nowPosition.Y);
	    	    renderTable();
    	    }
	    break;
    	case 1:
    	    if(nowPosition.X<10){
	    	    nowPosition.pastPosition=nowPosition.tbodyPosition;
	    	    nowPosition.X++;
	    	    nowPosition.tbodyPosition=getTbodyPosition(nowPosition.X,nowPosition.Y);
	    	    renderTable();
    	    }
    	break;
    	case 2:
	    	if(nowPosition.Y<10){
	    	    nowPosition.pastPosition=nowPosition.tbodyPosition;
	    	    nowPosition.Y++;
	    	    console.log(nowPosition.Y);
	    	    console.log(nowPosition.X);
	    	    nowPosition.tbodyPosition=getTbodyPosition(nowPosition.X,nowPosition.Y);
	    	    renderTable();
	    	}
    	break;
	    case 3:
	        if(nowPosition.X>1){
	    	    nowPosition.pastPosition=nowPosition.tbodyPosition;
	    	    nowPosition.X--;
	    	    nowPosition.tbodyPosition=getTbodyPosition(nowPosition.X,nowPosition.Y);
	    	    renderTable();
	    	}
	    break;
    }
}

// 设置方向函数
function Redirection(direct){
	switch(direct){
		case "TUN RIG":
		console.log(nowPosition.nowDirection);
		nowPosition.nowDirection=(nowPosition.nowDirection+1)%4;
		renderTable();
		break;
		case "TUN LEF":
		nowPosition.nowDirection=(nowPosition.nowDirection+3)%4;
		renderTable();
		break;
		case "TUN BAC":
		nowPosition.nowDirection=(nowPosition.nowDirection+2)%4;
		renderTable();
		break;
	}
}

// 按钮的执行函数
function btnListener(){
	switch(runIpt.value.trim()){
		case "GO":
		    GO();
		    break;
		case "TUN LEF":
		    Redirection(runIpt.value.trim());
		    break;
		case "TUN RIG":
			Redirection(runIpt.value.trim());
			break;
		case "TUN BAC":
		    Redirection(runIpt.value.trim());
		    break;
	}
}

// input回车执行函数
function inputKeyDown(event){
	event=event||window.event;
	if(event.keyCode==13)
		btnListener();
}

// 解决浏览器兼容
function addEventHandler(obj,event,handler){
	if(obj.addEventListener){
		obj.addEventListener(event,handler,false);
	}else if(obj.attachEvent){
        obj.attachEvent("on"+event,handler);
	}else
        obj["on"+event]=handler;
}



function init(){
    addEventHandler(runBtn,"click",btnListener);
    addEventHandler(runIpt,"keydown",inputKeyDown);
    renderTable();
}

init();