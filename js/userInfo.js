$(function() {
	//身份证图像上传
	IDcardSubmit();

	//学历上传
	eduSubmit();
	
	//民族数据
	var nationInfo = {
		"": ""
	}
	var nation = JSON.stringify(nationInfo);
	console.log(nation)
	findNationAjax(nation);

	//户籍地址与现居地址是否一样
	document.getElementById("openCloseBtn").addEventListener("toggle", function(event) {
		if(event.detail.isActive) {
			$(".openCloseBox").removeClass("borderNo");
			$(".adrNowBox").stop(true).toggle(500);
			isActive = true;
		} else {
			$(".openCloseBox").addClass("borderNo");
			$(".adrNowBox").stop(true).toggle(500);
			$("#adrNow").val("");
		}
	})
	//性别选择
	sexChose();

	//代理人信息跳转学历信息
	selectToEduInfo();
	//学历信息跳转代理人信息
	upToUserInfo();

	//学历信息跳转担保人信息
	selectToguaInfo();
	//担保人信息跳转学历信息
	upToeduInfo();

	//推荐人与担保人是否一样
	var isActive = document.getElementById("guaOpenCloseBtn").classList.contains("mui-active");
	if(isActive) {

	} else {
		//担保人性别选择
		$(".sexChildGua").bind('click', sexChoseGua);
	}

	document.getElementById("guaOpenCloseBtn").addEventListener("toggle", function(event) {
		if(event.detail.isActive) {
			$("#guaName1").html(localStorage.getItem("agrName"));
			$(".guaInfoNo").removeClass("line12");
			$(".guaInfoYes").removeClass("line22");
			$(".guaInfoNo").addClass("line1");
			$(".guaInfoYes").addClass("line2");
		} else {
			$(".guaInfoNo").removeClass("line1");
			$(".guaInfoYes").removeClass("line2");
			$(".guaInfoNo").addClass("line12");
			$(".guaInfoYes").addClass("line22");
			//担保人性别选择
			$(".sexChildGua").bind('click', sexChoseGua);
		}
	})

	//担保人信息跳转银行卡信息
	selectTobankCardInfo();
	//银行卡信息跳转担保人信息
	upToguaInfo();

	//银行卡信息跳转职级信息
	selectTorankInfo();
	//职级信息跳银行卡信息
	upTobankCardInfo();

	//提交申请
	submitInfo();

	//进度条
	range();

	//input
	inputTxt();

})
//input
function inputTxt() {
	$("#houseAdr").on({
		input: function() {
			if($("#houseAdr").val() != "") {
				$("#delX").css("display", "block");
			}
		},
		focus: function() {
			if($("#houseAdr").val() != "") {
				$("#delX").css("display", "block");
			}
		},
		blur: function() {
			setTimeout(function() {
				$("#delX").css("display", "none");
			}, 100)
		}
	})
	$("#delX").click(function(e) {
		$("#houseAdr").val("");
		$("#houseAdr").attr("rows", "1");
	})
	$("#houseAdr").on("keypress change input", function() {
		if($("#houseAdr").val().length <= 11) {
			$("#houseAdr").attr("rows", "1");
		} else if(11 < $("#houseAdr").val().length < 22) {
			$("#houseAdr").attr("rows", "2");
		}
	})

	$("#adrNow").on("keypress change input", function() {
		if($("#adrNow").val().length <= 11) {
			$("#adrNow").attr("rows", "1");
		} else if(11 < $("#adrNow").val().length < 22) {
			$("#adrNow").attr("rows", "2");
		}
	})
	$("#adrNow").on({
		input: function() {
			if($("#adrNow").val() != "") {
				$("#delX1").css("display", "block");
			}
		},
		focus: function() {
			if($("#adrNow").val() != "") {
				$("#delX1").css("display", "block");
			}
		},
		blur: function() {
			setTimeout(function() {
				$("#delX1").css("display", "none");
			}, 100)
		}
	})
	$("#delX1").click(function(e) {
		$("#adrNow").val("");
		$("#adrNow").attr("rows", "1");
	})

	$("#guaAdr").on("keypress change input", function() {
		if($("#guaAdr").val().length <= 11) {
			$("#guaAdr").attr("rows", "1");
		} else if(11 < $("#guaAdr").val().length < 22) {
			$("#guaAdr").attr("rows", "2");
		}
	})
	$("#guaAdr").on({
		input: function() {
			if($("#guaAdr").val() != "") {
				$("#delX2").css("display", "block");
			}
		},
		focus: function() {
			if($("#guaAdr").val() != "") {
				$("#delX2").css("display", "block");
			}
		},
		blur: function() {
			setTimeout(function() {
				$("#delX2").css("display", "none");
			}, 100)
		}
	})
	$("#delX2").click(function(e) {
		$("#guaAdr").val("");
		$("#guaAdr").attr("rows", "1");
	})
}

//进度条
function range() {
	$(".disblock").attr("dataa");
	var ran = parseInt($(".disblock").attr("data-a")) * 20;
	$(".range").css("width", ran + '%');
}

//民族数据
function findNationAjax(data) {
	$.ajax({
		type: 'post',
		url: URL1 + 'dic/findNation',
		data: data,
		dataType: 'json',
		cache: false,
		error: function(data) {
			console.log(data);
		},
		success: function(data) {
			console.log(data);
			var dataCode = data.code;
			if(dataCode == 'SYS_S_000') {
				var nationLength = data.output.length;
				for(var i = 0; i < nationLength; i++) {
					var $option_na = $('<option data-nanum="' + data.output[i].pkNationId + '">' + data.output[i].nationName + '</option>');
					$("#nationList").append($option_na);
				}				
			} else {
				mui.alert(data.desc);
			}
		}
	})
}

//身份证图像上传Ajax
function brokerIDcardAjax(data) {
	$.ajax({
		type: 'post',
		url: URL2 + 'fastdfs/fileH5?uploadType=2001',
		data: data,
		cache: false,
		processData: false,
		contentType: false,
		success: function(data) {
			console.log(data)
			var dataCode = data.code;
			if(dataCode == 'SYS_S_000') {
				window.localStorage.setItem("IDcardCode", data.output.fileSerialNo);
				var IDcardURLInfo = {
					"ocrUrl": data.output.fileSerialNo
				}
				var IDcardURL = JSON.stringify(IDcardURLInfo);
				console.log(IDcardURL)
				OCRIDcardAjax(IDcardURL);
			} else {
				mui.alert(data.desc);
			}
		},
		error: function(data) {
			console.log(data)
		}
	})
}

//身份证图像上传
function IDcardSubmit() {
	var formData1 = new FormData();
	$("#file_IDcard").change(function() {
		var fil = this.files;
		data = this.files[0];
		formData1.append("file", data)
		for(var i = 0; i < fil.length; i++) {
			reads(fil[i]);
		}
		$("#Shade").css("display", "block");
		$(".agreeMz").css("display", "block");
	})
	
	function reads(fil) {
		var reader = new FileReader();
		reader.readAsDataURL(fil);
		reader.onload = function(e) {
			$(".upLoadImg").attr("src", e.target.result);
			brokerIDcardAjax(formData1);
		}
	}
}

//OCR获取身份证信息
function OCRIDcardAjax(IDcarURL) {
	$.ajax({
		type: 'post',
		url: URL1 + 'ocr/ocrIdCard',
		data: IDcarURL,
		dataType: 'json',
		contentType: 'application/json',
		cache: false,
		error: function(data) {
			console.log(data);
			$("#Shade").css("display", "none");
			$(".agreeMz").css("display", "none");
		},
		success: function(data) {
			console.log(data);
			$("#Shade").css("display", "none");
			$(".agreeMz").css("display", "none");
			var dataCode = data.code;
			if(dataCode == 'SYS_S_000') {
				$("#userName").val(data.output.data.name);
				$("#userId").val(data.output.data.id);
				$("#houseAdr").val(data.output.data.address);
				if($("#houseAdr").val().length <= 11) {
					$("#houseAdr").attr("rows", "1");
				} else if(11 < $("#houseAdr").val().length < 22) {

					$("#houseAdr").attr("rows", "2");
				}

				if(data.output.data.sex == "女") {
					$(".sexChildF").addClass("sexClick");
					$(".sexChildF").siblings().removeClass("sexClick");
					$(".sexChildF").find("img").attr("src", "img/sex_select.png");
					$(".sexChildF").siblings().find("img").attr("src", "img/sex_notSelect.png");
				} else {
					$(".sexChildM").addClass("sexClick");
					$(".sexChildM").siblings().removeClass("sexClick");
					$(".sexChildM").find("img").attr("src", "img/sex_select.png");
					$(".sexChildM").siblings().find("img").attr("src", "img/sex_notSelect.png");
				}
				for (var i=0; i<$("#nationList option").length;i++) {
					if ($("#nationList option").eq(i).val() == data.output.data.nation) {
						$("#nationList option").eq(i).attr("selected","selected")
						window.localStorage.setItem("nationType", $("#nationList option").eq(i).attr("data-nanum"));
						return
					}
				}
			} else {
				mui.alert(data.desc);
			}
		}
	});
}

//代理人信息跳转学历信息
function selectToEduInfo() {
	$("#nationList").on("change", function() {
		var nationType = $(this).find("option:selected").attr("data-nanum");
		window.localStorage.setItem("nationType", nationType);
	})
	$(".userNextBtn").click(function() {
		var IDcarInfo = {
			"brokerCertiCode": $("#userId").val()
		}
		var IDcar = JSON.stringify(IDcarInfo);
		var isActive = document.getElementById("openCloseBtn").classList.contains("mui-active");
		if(isActive) {
			if($("#userName").val() && $("#userId").val() && $("#nationList").val() != "请选择" && $("#houseAdr").val()) {
				if($("#adrNow").val()) {
					window.localStorage.setItem("userName", $("#userName").val());
					window.localStorage.setItem("userId", $("#userId").val());
					window.localStorage.setItem("sexNum", $(".sexClick").attr("data-userId"));
					window.localStorage.setItem("houseAdr", $("#houseAdr").val());
					window.localStorage.setItem("adrNow", $("#adrNow").val());
					IDcardAjax(IDcar);
				} else {
					mui.alert("请填写现居地址！");
					$("#adrNow").focus();
				}
			} else {
				mui.alert("请点击拍照获取身份证信息或者手动输入身份证信息！");
			}
		} else {
			if($("#userName").val() && $("#userId").val() && $("#nationList").val() != "请选择" && $("#houseAdr").val()) {
				window.localStorage.setItem("userName", $("#userName").val());
				window.localStorage.setItem("userId", $("#userId").val());
				window.localStorage.setItem("sexNum", $(".sexClick").attr("data-userId"));
				window.localStorage.setItem("houseAdr", $("#houseAdr").val());
				IDcardAjax(IDcar);
			} else {
				mui.alert("请点击拍照获取身份证信息或者手动输入身份证信息！");
			}
		}
	})
}

//学历信息跳转代理人信息
function upToUserInfo() {
	$(".eduUpBtn").click(function() {
		$("#eduInfo").removeClass("disblock");
		$(".userInfo").addClass("disblock");
		range();
	})
}

//学历信息跳转担保人信息
function selectToguaInfo() {
	$("#polList").on("change", function() {
		var polNum = $(this).find("option:selected").attr("data-polNum");
		window.localStorage.setItem("polNum", polNum);
	})
	$("#eduInfoList").on("change", function() {
		var edunum = $(this).find("option:selected").attr("data-edunum");
		window.localStorage.setItem("edunum", edunum);
	})
	$(".eduNextBtn").click(function() {
		if(($("#polList").val() != "请选择")) {
			if(($("#eduInfoList").val() != "请选择")) {
				if(localStorage.getItem("eduCode")) {
					$("#eduInfo").removeClass("disblock");
					$("#guaranteeInfo").addClass("disblock");
					range();
				} else {
					mui.alert("请上传学历照片！")
				}
			} else {
				mui.alert("请选择学历信息！")
			}
		} else {
			mui.alert("请选择政治面貌！")
		}
	})
}
//担保人信息跳转学历信息
function upToeduInfo() {
	$(".guaUpBtn").click(function() {
		$("#guaranteeInfo").removeClass("disblock");
		$("#eduInfo").addClass("disblock");
		range();
	})
}

//校验身份证代理人
function IDcardAjax(IDcar) {
	$.ajax({
		type: 'post',
		url: URL1 + 'core/broker/findBrokerByCertiCode',
		data: IDcar,
		dataType: 'json',
		contentType: 'application/json',
		cache: false,
		error: function(data) {
			console.log(data);
		},
		success: function(data) {
			console.log(data);
			var eduInfo = {
				"": ""
			}
			var edu = JSON.stringify(eduInfo);
			var dataCode = data.code;
			if(dataCode == 'CORE_E_003') {
				$(".userInfo").removeClass("disblock");
				$("#eduInfo").addClass("disblock");
				range();
				findEduAjax(edu);
			} else if(dataCode == 'CORE_E_001') {
				$(".userInfo").removeClass("disblock");
				$("#eduInfo").addClass("disblock");
				range();
				findEduAjax(edu);
			} else if(dataCode == 'CORE_E_204') {
				window.open("resultAlready.html", "_self");
			} else if(dataCode == 'CORE_E_207') {
				window.open("resultAlready.html", "_self");
			} else {
				mui.alert(data.desc);
			}
		}
	});
}

//学历数据
function findEduAjax(data) {
	$.ajax({
		type: 'post',
		url: URL1 + 'dic/findEdu',
		data: data,
		dataType: 'json',
		cache: false,
		error: function(data) {
			console.log(data);
		},
		success: function(data) {
			console.log(data);
			var dataCode = data.code;
			if(dataCode == 'SYS_S_000') {
				var eduLength = data.output.length;
				for(var i = 0; i < eduLength; i++) {
					var $option_edu = $('<option data-edunum="' + data.output[i].pkEducationId + '">' + data.output[i].educationName + '</option>');
					$("#eduInfoList").append($option_edu);
				}
			} else {
				mui.alert(data.desc);
			}
		}
	})
}

//学历图像上传Ajax
function eduSubmitAjax(data) {
	$.ajax({
		type: 'post',
		url: URL2 + 'fastdfs/fileH5?uploadType=2001',
		data: data,
		cache: false,
		processData: false,
		contentType: false,
		success: function(data) {
			console.log(data)
			var dataCode = data.code;
			if(dataCode == 'SYS_S_000') {
				window.localStorage.setItem("eduCode", data.output.fileSerialNo);
			} else {
				mui.alert(data.desc);
			}
			$("#Shade").css("display", "none");
			$(".agreeMz").css("display", "none");
		},
		error: function(data) {
			console.log(data)
			$("#Shade").css("display", "none");
			$(".agreeMz").css("display", "none");
		}
	})
}

//学历图像上传
function eduSubmit() {
	var formData = new FormData();
	$("#file_edu").change(function() {
		var fil = this.files;
		data = this.files[0];
		formData.append("file", data)
		for(var i = 0; i < fil.length; i++) {
			reads(fil[i]);
		}
		$("#Shade").css("display", "block");
		$(".agreeMz").css("display", "block");
	})
	
	function reads(fil) {
		var reader = new FileReader();
		reader.readAsDataURL(fil);
		reader.onload = function(e) {
			$(".eduCamera").attr("src", e.target.result);
			eduSubmitAjax(formData);
		}
	}
}

//校验担保人身份证号
function guaIDcardAjax(IDcar) {
	$.ajax({
		type: 'post',
		url: URL1 + 'core/broker/checkIdCard',
		contentType: 'application/json',
		data: IDcar,
		dataType: 'json',
		cache: false,
		error: function(data) {
			console.log(data);
			$("#guaIDcard").attr("code", "1");
		},
		success: function(data) {
			console.log(data);
			var dataCode = data.code;
			if(dataCode == 'SYS_S_000') {
				$("#guaIDcard").attr("code", "0");
				if(data.output == "M") {
					$(".sexChildGuaM").addClass("sexClick");
					$(".sexChildGuaM").siblings().removeClass("sexClick");
					$(".sexChildGuaM").find("img").attr("src", "img/sex_select.png");
					$(".sexChildGuaM").siblings().find("img").attr("src", "img/sex_notSelect.png");
				} else {
					$(".sexChildGuaF").addClass("sexClick");
					$(".sexChildGuaF").siblings().removeClass("sexClick");
					$(".sexChildGuaF").find("img").attr("src", "img/sex_select.png");
					$(".sexChildGuaF").siblings().find("img").attr("src", "img/sex_notSelect.png");
				}
				$(".sexChildGua").unbind('click', sexChoseGua);
			} else {
				mui.alert(data.desc);
				$("#guaIDcard").attr("code", "1");
				$(".sexChildGua").bind('click', sexChoseGua);
			}
		}
	})
}

//担保人身份证校验
function guaIDcardTest() {
	$("#guaIDcard").attr("code", "0");
	$("#guaIDcard").blur(function() {
		if($("#guaIDcard").val()) {
			var guaIDcarInfo = {
				"brokerSuretyCertiCode": $("#guaIDcard").val()
			}
			var guaIDcar = JSON.stringify(guaIDcarInfo);
			console.log(guaIDcar)
			guaIDcardAjax(guaIDcar);
		}else{
			$(".sexChildGua").bind('click', sexChoseGua);
		}
	})
}

//担保人信息跳转银行卡信息
function selectTobankCardInfo() {
	guaIDcardTest();
	$(".guaNextBtn").click(function() {
		//推荐人与担保人是否一样
		var isActive = document.getElementById("guaOpenCloseBtn").classList.contains("mui-active");
		if(isActive) {
			window.localStorage.setItem("flag", "1");
			window.localStorage.setItem("mustName", $("#mustName").val());
			window.localStorage.setItem("mustTel", $("#mustTel").val());
			$("#guaranteeInfo").removeClass("disblock");
			$("#bandCardInfo").addClass("disblock");
			range();
		} else {
			//担保人性别选择
			$(".sexChildGua").bind('click', sexChoseGua);

			//担保人信息跳转银行卡信息
			if($("#guaName").val()) {
				console.log($("#guaIDcard").attr("code") == "0")
				if($("#guaIDcard").val() && $("#guaIDcard").attr("code") == "0") {
					if($("#guaTel").val()) {
						if(testTel($("#guaTel"))) {
							window.localStorage.setItem("flag", "0");
							window.localStorage.setItem("guaName", $("#guaName").val());
							window.localStorage.setItem("guaTel", $("#guaTel").val());
							window.localStorage.setItem("guaIDcard", $("#guaIDcard").val());
							window.localStorage.setItem("guaSex", $(".sexClickGua").attr("data-guaSexId"));
							window.localStorage.setItem("mustName", $("#mustName").val());
							window.localStorage.setItem("mustTel", $("#mustTel").val());
							$("#guaranteeInfo").removeClass("disblock");
							$("#bandCardInfo").addClass("disblock");
							range();
						}
					} else {
						mui.alert("请填写担保人手机号码！");
						$("#guaTel").focus();
					}
				} else {
					mui.alert("请填写正确的担保人身份证号码！");
					$("#guaIDcard").focus();
				}
			} else {
				mui.alert("请填写担保人姓名！");
				$("#guaName").focus();
			}
		}
	})
}

//银行卡信息跳转担保人信息
function upToguaInfo() {
	$(".bankCardUpBtn").click(function() {
		$("#bandCardInfo").removeClass("disblock");
		$("#guaranteeInfo").addClass("disblock");
		range();
	})
}

//根据银行卡号查询所属银行
function findBankByBankNumAjax(data) {
	$.ajax({
		type: 'post',
		url: URL1 + 'dic/findBankByBankNum',
		data: data,
		dataType: 'json',
		cache: false,
		error: function(data) {
			console.log(data);
			$("#Shade").css("display", "none");
			$(".agreeMz").css("display", "none");
		},
		success: function(data) {
			console.log(data);
			$("#Shade").css("display", "none");
			$(".agreeMz").css("display", "none");
			var dataCode = data.code;
			if(dataCode == 'SYS_S_000') {
				window.localStorage.setItem("bankName",'7');
				window.localStorage.setItem("bankNum",$("#bankNum").val());
				$("#rankName").html(localStorage.getItem("userName"));
				$("#rankArea").html(localStorage.getItem("agrRemark"));
				$("#bandCardInfo").removeClass("disblock");
				$("#rankInfo").addClass("disblock");
				range();
			} else {
				mui.alert(data.desc);
			}
		}
	});
}

//银行卡信息跳转职级信息
function selectTorankInfo() {
	$(".bankCardNextBtn").click(function() {
		if($("#bankNum").val()) {
			$("#Shade").css("display", "block");
			$(".agreeMz").css("display", "block");
			var bankNumInfo = {
				'dicReq': $("#bankNum").val()
			}
			var bankNum = JSON.stringify(bankNumInfo);
			console.log(bankNum)
			findBankByBankNumAjax(bankNum)
		} else {
			window.localStorage.setItem("bankName",'7');
			window.localStorage.setItem("bankNum",$("#bankNum").val());
			$("#rankName").html(localStorage.getItem("userName"));
			$("#rankArea").html(localStorage.getItem("agrRemark"));
			$("#bandCardInfo").removeClass("disblock");
			$("#rankInfo").addClass("disblock");
			range();
		}
	})
}
//职级信息跳银行卡信息
function upTobankCardInfo() {
	$(".rankUpBtn").click(function() {
		$("#rankInfo").removeClass("disblock");
		$("#bandCardInfo").addClass("disblock");
		range();
	})
}

//提交申请
function submitInfo() {
	$(".rankNextBtn").attr("code", "0");
	$(".rankNextBtn").click(function() {
		window.localStorage.setItem("levelNum", "1");
		var userAllInfo = {
			"broker": {
				"flag": localStorage.getItem("flag"),
				"addressData": localStorage.getItem("adrNow"),
				"bankAccount": localStorage.getItem("bankNum"),
				"bankType": localStorage.getItem("bankName"),
				"brokerCertiCode": localStorage.getItem("userId"),
				"brokerCode": localStorage.getItem("brokerCode"),
				"brokerGender": localStorage.getItem("sexNum"),
				"brokerLevel": localStorage.getItem("levelNum"),
				"brokerMobile": localStorage.getItem("brokerMobile"),
				"brokerName": localStorage.getItem("userName"),
				"certiCodeUpCode": localStorage.getItem("IDcardCode"),
				"contactsMobile": localStorage.getItem("mustTel"),
				"contactsName": localStorage.getItem("mustName"),
				"education": localStorage.getItem("edunum"),
				"educationCode": localStorage.getItem("eduCode"),
				"markserviceId": localStorage.getItem("agrfkMarkserviceId"),
				"politicalStatus": localStorage.getItem("polNum"),
				"nationType": localStorage.getItem("nationType"),
				"rsdResidence": localStorage.getItem("houseAdr")
			},
			"brokerSurety": {
				"suretyCertiCode": localStorage.getItem("guaIDcard"),
				"suretyGender": localStorage.getItem("guaSex"),
				"suretyMobile": localStorage.getItem("guaTel"),
				"suretyName": localStorage.getItem("guaName")
			}
		}
		var userAll = JSON.stringify(userAllInfo);
		console.log(userAll)
		if($(".rankNextBtn").attr("code") == "0") {
			$(".rankNextBtn").attr("code", "1")
			$("#Shade").css("display", "block");
			$(".agreeMz").css("display", "block");
			submitAjax(userAll);
		}
	})
}

//代理人签约
function submitAjax(data) {
	$.ajax({
		type: 'post',
		url: URL1 + 'core/broker/weChatbrokerRegister',
		data: data,
		dataType: 'json',
		contentType: 'application/json',
		cache: false,
		error: function(data) {
			console.log(data);
			$(".rankNextBtn").attr("code", "0");
			$("#Shade").css("display", "none");
			$(".agreeMz").css("display", "none");
		},
		success: function(data) {
			console.log(data);
			$("#Shade").css("display", "none");
			$(".agreeMz").css("display", "none");
			var dataCode = data.code;
			if(dataCode == 'SYS_S_000') {
				window.localStorage.setItem("loginPwd", data.output.loginPwd);
				window.localStorage.setItem("loginName", data.output.loginName);
				window.localStorage.setItem("loginUrl", data.output.url);
				window.open("result.html", "_self");
			} else if(dataCode == 'CORE_E_005') {
				window.open("resultRe.html", "_self");
			} else {
				$(".rankNextBtn").attr("code", "0")
				mui.alert(data.desc);
			}
		}
	})
}

//代理人性别选择
function sexChose() {
	$(".sexChild").click(function() {
		$(this).addClass("sexClick");
		$(this).siblings().removeClass("sexClick");
		$(this).find("img").attr("src", "img/sex_select.png");
		$(this).siblings().find("img").attr("src", "img/sex_notSelect.png");
	})
}

//担保人性别选择
function sexChoseGua() {
	$(this).addClass("sexClickGua");
	$(this).siblings().removeClass("sexClickGua");
	$(this).find("img").attr("src", "img/sex_select.png");
	$(this).siblings().find("img").attr("src", "img/sex_notSelect.png");
}

function testTel($tel) {
	var re = /^1[3|4|5|7|8|9][0-9]{9}$/; //电话号码
	if(re.test($tel.val())) {
		//		$tel.removeClass("red");
		return true;
	} else {
		//		$tel.addClass("red");
		mui.alert("手机号输入错误！");
		$tel.focus();
		return false;
	}
}