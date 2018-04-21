
$(function () {
	//获取短信验证码
	authCode ();
	//点击跳转代理人信息
	selectToUserInfo ();
})

//获取短信验证码
function authCode () {
	$("#userTel").val("");
	$("#userCode").val("");
	$("#userTel").blur(function(){
		if ($("#userTel").val()) {
			testTel($("#userTel"));
		}
	})
	
	$(".codeBtn").click(function () {
		if ($("#userTel").val()) {
			if (testTel($("#userTel"))) {
				$("#Shade").css("display","block");
				$(".agreeMz").css("display","block");
				var brokerTelInfo = {
					"brokerMobile":$("#userTel").val()
				}
				var brokerTelN = JSON.stringify(brokerTelInfo);
				brokerTel (brokerTelN);
			}else{
				mui.alert("请填写正确的手机号码！");
				$("#userTel").focus();
			}
		}else{
			mui.alert("请填写手机号码！");
			$("#userTel").focus();
			
		}
	})
	
}

//获取验证码
function getCode (mobile) {
	$.ajax({
		type : 'post',
		url : URL1 + 'send_code_sms_jsons.tml',
		data : mobile,
		dataType : 'json',
		cache : false,
		error : function(data) {
			console.log(data);
			$("#Shade").css("display","none");
			$(".agreeMz").css("display","none");
		},
		success : function(data) {
			console.log(data);
			$("#Shade").css("display","none");
			$(".agreeMz").css("display","none");
		}
	})
}

//手机验证码是否正确
function isAuthCode (telCode) {
	$.ajax({
		type : 'post',
		url : URL1 + 'verify_code_sms_jsons.tml',
		data : telCode,
		dataType : 'json',
		cache : false,
		error : function(data) {
			console.log(data);
		},
		success : function(data) {
			console.log(data);
			var dataCode = data.code;
			if (dataCode == "SYS_S_000") {
				window.localStorage.setItem("brokerMobile",$("#userTel").val());
				window.open("userInfo.html","_self");
			}else{
				mui.alert(data.desc);
			}
		}
	})
}

//手机号是否在经代核心存在
function brokerTel (tel) {
	$.ajax({
		type : 'post',
		url : URL1 + 'query_broker_mobile_jsons.tml',
		data : tel,
		dataType : 'json',
		cache : false,
		error : function(data) {
			console.log(data);
			$("#Shade").css("display","none");
			$(".agreeMz").css("display","none");
		},
		success : function(data) {
			console.log(data);
			var dataCode = data.code;
			if (dataCode == "SYS_S_000") {
				var mobileInfo = {
					"groupCode":"",
					"sceneCode":"registerSms",
					"exSeq":"",
					"exSystem":"",
					"sendWhen":"",
					"mobile":$("#userTel").val(),
					"param":{
					}
				}
				var mobile = JSON.stringify(mobileInfo);
				getCode (mobile);
				//倒计时
				var countdown = 60;
				var codeBtn = document.getElementById("codeBtn");
				function settime(obj) { 
				    if (countdown == 0) { 
				    	$("#Shade").css("display","none");
						$(".agreeMz").css("display","none");
				        $("#codeBtn").removeClass("codeBtn1");
				        obj.removeAttribute("disabled"); 
				        obj.value = "获取验证码"; 
				        countdown = 60; 
				        return;
				    } else { 
						$("#codeBtn").addClass("codeBtn1");
				        obj.setAttribute("disabled", true); 
				        obj.value = "重新发送" + countdown + "s"; 
				        countdown--; 
				    } 
					setTimeout(function() { 
				    	settime(obj) }
				    ,1000) 
				}
				settime(codeBtn);
			}else{
				mui.alert(data.desc);
				$("#Shade").css("display","none");
				$(".agreeMz").css("display","none");
			}
		}
	})
}


function testTel ($tel) {
    var re=/^1[3|4|5|7|8|9][0-9]{9}$/;//电话号码
	if(re.test($tel.val())){
//		$tel.removeClass("red");
		return true;
	}
	else{
//		$tel.addClass("red");
		mui.alert("手机号输入错误！")
		return false;
	}
}

//点击跳转代理人信息
function selectToUserInfo () {
	$(".telCode_nextBtn").click(function(){
		if ($("#userTel").val()) {
			if (testTel( $("#userTel"))) {
				if ($("#userCode").val()) {
					var telCodeInfo = {
						"mobile":$("#userTel").val(),
						"exSystem":"",
						"code":$("#userCode").val()
					}
					var telCode = JSON.stringify(telCodeInfo);
					isAuthCode (telCode);
				}else{
					mui.alert("请输入验证码！");
					$("#userCode").focus();
				}
			}else{
				mui.alert("请输入正确的手机号码！");
				$("#userTel").focus();
			}
		}else{
			mui.alert("请输入手机号码！");
			$("#userTel").focus();
		}
	})
}





