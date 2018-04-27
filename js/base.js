//接口地址
//开发
//var URL1 = "http://192.168.66.30:9000/insd/";
//测试
//var URL1 = "http://58.132.205.171:9000/insd/";
//生产
var URL1 = "http://lb.qtoubao.cn:9000/insd/"
var deviceWidth = document.documentElement.clientWidth;
var deviceHeight = document.documentElement.clientHeight;

$(function () {
	jQuery.support.cors = true;
	//<header-menu>-------------------------->
	var e = "abbr,article,aside,audio,canvas,figure,figcaption,footer,header,hgroup,mark,menu,nav,section,time,vidio".split(",");
	var i = e.length;
	for (i = 0; i < e.length; i++) {
		document.createElement("input");
	}
	//html的fontSize
	$("html").css("font-size",deviceWidth/7.5);
})





