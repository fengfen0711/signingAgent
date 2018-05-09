
$(function () {
	if (localStorage.getItem("brokerBlur") != "null" && localStorage.getItem("brokerBlur") != null) {
		$(".codeInfo").val(localStorage.getItem("request_code"));
		//获取推荐人信息
		var request_codeInfo = {
			"brokerCode": localStorage.getItem("request_code")
		};
		var request_code = JSON.stringify(request_codeInfo);
		RefereeInfo (request_code);
		$(".codeInfo").blur(function(){
			$("#Shade").css("display","block");
			$(".agreeMz").css("display","block");
			//获取推荐人信息
			var brokerCode = {
				"brokerCode": $(".codeInfo").val()
			};
			var refereeCode = JSON.stringify(brokerCode);
			RefereeInfo (refereeCode);
		})	
	}else{
		localStorage.clear();
		$(".codeInfo").val("");
		$(".codeInfo").blur(function(){
			$("#Shade").css("display","block");
			$(".agreeMz").css("display","block");
			//获取推荐人信息
			var brokerCode = {
				"brokerCode": $(".codeInfo").val()
			};
			var refereeCode = JSON.stringify(brokerCode);
			RefereeInfo (refereeCode);
		})	
	}
	//点击合同
	toAgreeM ();
	
	//点击选择明大协议
	selectAgreement ();
	
	//点击跳转代理人信息
	selectToUserInfo ();
	
	//背景图移动
	bgImgMove ();
	
	$(".warnImg").click(function(){
		mui.alert("你身边一定有上海明大的优秀代理人，请多问问哦~");
	})
	
})
//点击合同
function toAgreeM () {
	$(".selectBtnA").click(function(){
		$(".Shade1").css("display","block");
		$(".agreeMz1").css("display","block");
		$(".agreeMz1").removeClass("agreeMHide");
		$(".agreeMz1").addClass("agreeMShow");
	})
	$(".Shade1").click(function(e){
		$(".agreeMz1").removeClass("agreeMShow");
		$(".agreeMz1").addClass("agreeMHide");
		setTimeout(function(){
			$(".Shade1").css("display","none");
			$(".agreeMz1").css("display","none");
		},800)
	})
}

//背景图移动
function bgImgMove () {
	var baBig = (deviceWidth/7.5*1.5).toFixed(1);
	var leftCss = {left:-baBig+'px'};
	$('.agreement_Bg').animate(leftCss,15000,Change);
	
	function Change () {
		if (leftCss.left === '0px') {
			leftCss.left = -baBig+'px';
		}else if (leftCss.left === -baBig+'px') {
			leftCss.left = '0px';
		}
		$('.agreement_Bg').animate(leftCss,15000,Change);
	}
}

//点击选择明大协议
function selectAgreement () {
	$("#selectBtn").click(function(){
		if ($(this).attr('src')=='img/select.png') {
			$(this).attr('src','img/notSelect.png');
			$(".signBtn").addClass("disSignBtn");
			$(".signBtn").attr("disabled","true");
		}else{
			$(this).attr('src','img/select.png');
			if ($(".refereeBox").hasClass("disnone")) {
				$(".signBtn").addClass("disSignBtn");
				$(".signBtn").attr("disabled","true");
			}else{
				$(".signBtn").removeClass("disSignBtn");
				$(".signBtn").removeAttr("disabled");
			}
		}
	})
}

//推荐人信息
function RefereeInfo (data) {
	$.ajax({
		type : 'post',
		url : URL1 + 'core/broker/findByBrokerCode',
		data : data,
		dataType : 'json',
		contentType: 'application/json',
		cache : false,
		success : function(data) {
			console.log(data);
			$("#Shade").css("display","none");
			$(".agreeMz").css("display","none");
			var dataCode = data.code;
			if (dataCode == 'SYS_S_000') {
				window.localStorage.setItem("brokerCode",$(".codeInfo").val());
				window.localStorage.setItem("agrName",data.output.brokerName);
				window.localStorage.setItem("agrIDCode",data.output.certiCode);
				window.localStorage.setItem("agrMobile",data.output.mobile);
				window.localStorage.setItem("agrSex",data.output.genderEnum);
				window.localStorage.setItem("agrfkMarkserviceId",data.output.fkMarkserviceId);
				window.localStorage.setItem("agrRemark",data.output.remark);
				
				$("#RefereeName").html(data.output.brokerName);
				var brokerMobile = data.output.mobile.replace(/^(\d{3})\d{4}(\d+)/,"$1****$2");
				$("#RefereeTel").html(brokerMobile);
				$(".refereeBox").removeClass("disnone");
				if ($("#selectBtn").attr('src')=='img/select.png') {
					$(".signBtn").removeClass("disSignBtn");
					$(".signBtn").removeAttr("disabled");
				}else{
					$(".signBtn").addClass("disSignBtn");
					$(".signBtn").attr("disabled","true");
				}
			}
			else if (dataCode == '000001') {
				$(".refereeBox").addClass("disnone");
				$(".signBtn").addClass("disSignBtn");
				$(".signBtn").attr("disabled","true");
			}
			else if (dataCode == 'CORE_E_206') {
				$(".refereeBox").addClass("disnone");
				$(".signBtn").addClass("disSignBtn");
				$(".signBtn").attr("disabled","true");
				mui.alert(data.desc);
			}
			else{
				$(".refereeBox").addClass("disnone");
				$(".signBtn").addClass("disSignBtn");
				$(".signBtn").attr("disabled","true");
			}
		},
		error:function(data){
			console.log(data)
			$("#Shade").css("display","none");
			$(".agreeMz").css("display","none");
		}
	});
	
}

//点击跳转代理人信息
function selectToUserInfo () {
	$(".signBtn").click(function(){
		window.open("telCode.html","_self");
		localStorage.removeItem("brokerBlur");
	})
}





