
function Log(logStr) {
	console.log(logStr);
}

var emailCheckStatus = "y";  //n : 사용중 / y : 사용가능/ v : 올바르지 않은 이메일/ b : 입력하지 않음  
var carSizes = ["", "경형", "소형", "중형", "대형"];
var selDate = "";
var objPayPopup=null;
// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
var agreeTerm = {
	termAllChk : function(){
		if(!$('#termAllChk').is(":checked")){ 
			$('.term').prop('checked', false).val("");
			$('.term').next('label').removeClass("selected");
		}else{
			$('.term').prop('checked', true).val("Y");
			$('.term').next('label').addClass("selected");
		}
		//noticeValue = $("#noticeChk").val();
		//alert (noticeValue);
	},
	termChk : function(id){
		if(!$('#'+id).is(":checked")){
			$('#'+id).val("");
			$('#'+id).next("label").removeClass("selected");
			
			$('#termAllChk').prop('checked', false).val("");
			$('#termAllChk').next('label').removeClass("selected");
		}else{
			$('#'+id).val("Y");
			$('#'+id).next("label").addClass("selected");
		}
		//noticeValue = $("#noticeChk").val();
		//alert (noticeValue);
	},
	testInfoChk : function(){
		if(!$('#myonoffswitch').is(":checked")){ 
			if($('#h_ttype').val() !='') {
				if(confirm("검사기초 정보가 있습니다.\n\n동의를 해제할 경우 기존 정보가 초기화 됩니다.\n\n진행 하시겠습니까?")) {
					$('.mk').prop('checked', false).val("");
					$('.mk').next('label').removeClass("selected");
					//기존 검사정보 초기화
					carInfo.initTestInfo();
				}
			//} else {
			//	$('.mk').prop('checked', false).val("");
			//	$('.mk').next('label').removeClass("selected");
			}
		//}else{
		//	$('.mk').prop('checked', true).val("Y");
		//	$('.mk').next('label').addClass("selected");
		}
	},
	openUserInfo : function(){
		window.scrollTo(0,0);
		$('#userInfoLayer').show();
	},
	closeUserInfo : function(){
		$('#userInfoLayer').hide();
		//약관확인 후 약관 위치로 이동
		var offset = $("#testagreement").offset();
		$('html, body').animate({scrollTop : offset.top-70}, 1200);
	},
	openPrivacyInfo : function(){
		window.scrollTo(0,0);
		$('#privacyInfoLayer').show();
	},
	closePrivacyInfo : function(){
		$('#privacyInfoLayer').hide();
		//약관확인 후 약관 위치로 이동
		var offset = $("#testagreement").offset();
		$('html, body').animate({scrollTop : offset.top-70}, 1200);
	},
	openNoticeInfo : function(){
		window.scrollTo(0,0);
		$('#noticeInfoLayer').show();
	},
	closeNoticeInfo : function(){
		$('#noticeInfoLayer').hide();
		//약관확인 후 약관 위치로 이동
		var offset = $("#testagreement").offset();
		$('html, body').animate({scrollTop : offset.top-70}, 1200);
	}
},

// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
carInfo = {
	checkCno : function(cno) {
		var len			= 0;
		var sido			= "";
		var cnoJong	= "";
		var cnoUse		= "";
		var num 		= "";
		
		try{
			if (cno != null) {
				len	= cno.length;
				if (len == 7) {	// ex) 05주2312
					cnoJong	= cno.substring(0,2);
					cnoUse	= cno.substring(2,3);
					num		= cno.substring(3,7);
					
					if(!isNaN(cnoJong) && isNaN(cnoUse) && !isNaN(num)){
						return 1;
					}else{
						return 0;
					}
				}else if (len == 8) {	// ex) 서울2사1234
					sido	= cno.substring(0,2);
					cnoJong	= cno.substring(2,3);
					cnoUse	= cno.substring(3,4);
					num		= cno.substring(4,8);
					
					if(isNaN(sido) && !isNaN(cnoJong) && isNaN(cnoUse) && !isNaN(num)){
						return 1;
					}else{
						return 0;
					}
				}else if(len == 9) {	// ex) 서울52자1234
					sido	= cno.substring(0,2);
					cnoJong	= cno.substring(2,4);
					cnoUse	= cno.substring(4,5);
					num		= cno.substring(5,9);
					
					if(isNaN(sido) && !isNaN(cnoJong) && isNaN(cnoUse) && !isNaN(num)){
						if ("기,니,디,리,미,비,시,이,지,치".indexOf(cnoUse) != -1) {
							return 2;
						} else {
							return 1;
						}
					}else{
						return 0;
					}
				}else{
					return 0;
				}			
			} else {
				return 0;
			}
		}catch(e){
			alert(e);
			return 0;
		}
		
		return 0;
	},
	initTestInfo : function() {
		$('#h_ttype').val('');
		$('#h_cost1').val('');
		$('#h_bymd').val('');
		$('#h_carno').val('');

		$('#carname').val('');
		$('#ttype_title').val('');
		$('#startdate').val('');
		$('#enddate').val('');
		$('#expdate').val('');
		$('#totcost').val('');

		$('.display_carname').text();
		$('.display_ttype_title').text();
		$('.display_expdate').text();
		$('.display_totcost').text();


		$('#schdate').val('');
		$('#schtime').val('');
		$('#schtime_t').val('');
		$('#h_cuno').val('');
		$('#cuname').val('');

		$('#h_cpn').val('');
		$('#cpn').val('');
		$('#h_cpnp').val('');
		$('#cpnp').val('0');
		$('#h_payment').val('');
		$('#payment').val('');
		
		//20180219 박흥배 startdate fvdt 검사시작일
		//20180219 박흥배 middate 중간만료일
		$('#startdate').val('');
		$('#middate').val('');

		$('#testbasicinfo1').hide();
		$('#testuserinfo').hide();
		$('#testcarinfo').hide();
		$('#couponinfo').hide();
		$('#testpayment').hide();
		$('#testagreement').hide();
		$('#testorderdone').hide();
	},
	loadTestInfo : function() {

		//검사			: 주소조회 후 자동차검사정보 가져오기

		if($('#h_cost2').val() == ""){
			alert("자동차 픽업 위치를 선택해 주세요.");

			var offset = $("#locationInfo").offset();
			$('html, body').animate({scrollTop : offset.top-70}, 1200);

			$("#sido").focus();
			return;
		}

		var sido			=	$('#sido').val();
		var gugun		=	$('#gugun').val();	
		var dong		=	$('#dong').val();	
		var addretc		=	"";	
		var bymd		=	$("#bymd").val().split("/").join("");
		var carNo		=	$("#carno").val();
		var cost2		=	$("#h_cost2").val();

		if(carNo == ""){
			alert("자동차 등록번호를 입력하세요.");

			var offset = $("#testInfo").offset();
			$('html, body').animate({scrollTop : offset.top-70}, 1200);

			$("#carno").focus();
			return;
		}
		
		if(bymd.length != 6){
			alert("주민번호(생년월일) 앞 6자리를 입력하세요.\n\n※자동차가 법인소유이면 법인번호·사업자번호 앞6자리를 입력하세요.");

			var offset = $("#testInfo").offset();
			$('html, body').animate({scrollTop : offset.top-70}, 1200);

			$("#bymd").focus();
			return;
		 }		
		

		
		$("#carno").val(carNo.split(" ").join(""));
		carNo = $("#carno").val();

		//자동차번호 형식 체크
		var checkNum = carInfo.checkCno(carNo);
		if(checkNum != 1){
			alert("자동차번호 형식이 올바르지 않습니다.");
			return;
		}
		
		//자동차검사에 한해 아래의 정보를 처리함

		if(!$("#myonoffswitch").is(":checked")){
			alert("자동차검사 정보조회를 위한 주의 사항을 읽으시고 동의가 필요합니다. \n\n동의를 하지 않는 경우에는 자동차검사 정보 조회가 되지 않습니다.");
			return;
		}

		$('body').loading({
			stoppable: true,
			message: '검사정보 요청중입니다.<br/>잠시만 기다려주세요.',
			theme: 'dark'
		});
        $('#status').fadeOut();
        $('#preloader').delay(350).fadeOut('slow');
        $('body').delay(350).css({
            'overflow': 'visible'
        });

		$.ajax({
			type : "post",
			url : '/data.html?act=testinfo',
			contentType : "application/x-www-form-urlencoded; charset=UTF-8",
			data : {"no1" : carNo, "no2" : bymd, "no3" : sido, "no4" : gugun, "no5" : dong, "no6" : addretc, "no7" : cost2},
			dataType : "json",
			success : function(data) {
				$('body').loading('stop');

				if(data.code == 0){
					$('#h_ttype').val(data.result.ttype);
					$('#carname').val(data.result.car_nm);
					$('#ttype_title').val(data.result.ttype_title);
					$('#startdate').val(data.result.fvdt);
					$('#enddate').val(data.result.tvdt);
					$('#expdate').val(data.result.middate);
					$('#h_cost1').val(data.result.cost1);

					$('#h_bymd').val(bymd);
					$('#h_carno').val(carNo);
					$("#h_carsize").val(data.result.class);
					$('#h_makeymd').val(data.result.make_ymd);
					var total = data.result.cost1 + parseInt($('#h_cost2').val());
					$('#totcost').val(total);
					$('#h_payment').val(total);
					$('#payment').val(setComma(total));
					//alert('검사정보가 처리되었습니다.');

					$('.display_carname').text(data.result.car_nm);
					$('.display_ttype_title').text(data.result.ttype_title);
					$('.display_expdate').text(data.result.middate);
					$('.display_totcost').text(total);

					
					$('#testbasicinfo1').show();
					$('#testbasicinfo2').show();
					$('#testuserinfo').show();
					$('#testcarinfo').show();
					$('#couponinfo').show();
					$('#testpayment').show();
					$('#testagreement').show();
					$('#testorderdone').show();

					//자동차검사정보 조회 후 조회된 결과로 화면을 이동
					var offset = $("#testbasicinfo1").offset();
					$('html, body').animate({scrollTop : offset.top-10}, 1200);
				} else if(data.code == 2) {
					$('#addretc').val('검사알림서비스는 주차위치를 수집하지 않습니다');
					$('#h_bymd').val(bymd);
					$('#h_carno').val(carNo);

					$('#carname_alert').val(data.result.car_nm);
					$('#startdate').val(data.result.fvdt);
					$('#enddate').val(data.result.tvdt);
					$('#expdate_alert').val(data.result.middate);
					$('#alertdate').val(data.result.fvdt);

					$('#register_alert').show();
					$('#alertdone').show();

					//자동차검사정보 조회 후 조회된 결과로 화면을 이동
					var offset = $("#register_alert").offset();
					$('html, body').animate({scrollTop : offset.top-70}, 1200);
				} else {
					setTimeout('alert("'+data.message+'")', 300);
				}
			},
			error : function() {
				$('body').loading('stop');
				alert(messages.do_alert_guide);
			}
		});

	},
	openCarLocationInfo : function(){
		$('#carLocationInfoLayer').show();
	},
	closeCarLocationInfo : function(){
		$.magnificPopup.close();return false;
	},
	openCarModelInfo : function(){
		$('#carModelInfoLayer').show();
	},
	closeCarModelInfo : function(){
		$('#carModelInfoLayer').hide();
		$('#btnCloseCarModel').trigger('click');
	},
	loadModel : function(depthno) {	//정비예약 자동차모델 선택
		//딜리버리에서 자동차이름 = "제조사명 모델명" 으로 가져오기 위함 시작
		var target = document.getElementById("carcp");
		var carcp = target.options[target.selectedIndex].text;	
		//딜리버리에서 자동차이름 = "제조사명 모델명" 으로 가져오기 위함	종료

		var htmlFmt = "";
		 $.ajax({
			type : "post",
			url : '/data.html?act=model',
			contentType : "application/x-www-form-urlencoded; charset=UTF-8",
			data : {"mode" : "GET", "depthno" : depthno, "catcode" : $('#carcp').val(), "d_cost2" : $('#d_cost2').val() , "p_cost2" : $('#p_cost2').val() },
			dataType : "json",
			success : function(data) {
				if(data.code == 0){
					$.each(data.list,function(i,v){
						if(depthno == 2) {
							htmlFmt += '<option value="'+v.code+'">'+v.name+'</option>';
						} else {

							//차량명, 경소중대, 국산1/수입2 구분
							htmlFmt += '<tr onClick="carInfo.setCarName(\''+carcp+' '+v.name+'\', \''+v.csize+'\', \''+v.code.substring(0,1)+'\')">';
							htmlFmt += '<td>'+v.code+'</td>';
							htmlFmt += '<td>'+v.name+'</td>';
							//htmlFmt += '<td>'+carSizes[v.csize]+'</td>';
							htmlFmt += '</tr>';
						}
					});
					if(depthno == 2) {
						//$('#carcp').children().remove().end().append('<option value="">제조사</option>' + htmlFmt);
						$('#carcp').children().remove().end().append(htmlFmt);
						$('#tblCarModel > tbody').html("");

						//$('#carcp option:eq(0)').prop("selected", true);
						carInfo.loadModel(3);

					} else {
						$('#tblCarModel > tbody').html(htmlFmt);

						$("#tblCarModel td").hover (
							function () {
								$(this).addClass("model_list_over");
								$(this).siblings("td").addClass("model_list_over");
							},
							function () {
								$(this).removeClass("model_list_over");
								$(this).siblings("td").removeClass("model_list_over");
							}
						);

					}

				}else{
					alert(data.message);
				}
			},
			error : function() {
				alert("제조사 차량 정보 조회가 실패하였습니다.");
			}
		});
	},
	setCarName : function(nm, cs, car_maker_type) {
		//자동차모델선택 > 대행자 선택 > 자동차모델을 다시 선택 > 대행자 정보를 초기화 함. 
		//Why? 국산차-> 수입차, 수입차->국산차로 변경하면 대행자가 변경되어야 하므로..
		$('#schdate').val('');//예약일
		$('#schtime_t').val('');//예약시간
		$('#schtime').val('');//h_예약시간
		$('#cuname').val('');//담당대행원
		$('#h_cuno').val('');//담당대행원코드

		$("#carname").val(nm);
		$("#h_carsize").val(cs);
		$("#h_car_maker_type").val(car_maker_type);	//국산수입코드 0검사 or 모름,1국산, 2수입
		
		$("#h_profit_center").val('00');	//자동차모델 Layer에서 국산차선택 또는 검사 매출처는 00: KMDS
		$("#p_method option[value='1']").show();//딜리버리에서 수입차선택 > 결제방법을 첫번째항목인 온라인결제만 남김
		$("#p_method option[value='0']").show();

		carInfo.loadTestInfo();

		carInfo.closeCarModelInfo();
	},
	loadAgentArea : function(depthno) {

		var htmlFmt = "";


		var locSido="";
		var locGugun="";
		var area_service_type_value="";
		var h_stype = $('#h_stype').val();
		var h_car_maker_type = $('#h_car_maker_type').val();
		locSido = $('#locSido').val();

		if(locSido == "") {
			$('#locGugun').children().remove().end().append('<option value="">구/군</option>');
			//$('#locDong').html('');
			alert("시/도를 선택해주세요");
			return false;
		}
		
		if(depthno == 2) {

		} else if (depthno == 3) {
			depthno = 3;
			locGugun = $('#locGugun').val();
			if(locGugun == '') {
				//$('#locDong').html('');
				$('#locTable').html('');
				return false;
			}
		} else if (depthno == 4) {
			depthno = 4;
			locGugun = $('#locGugun').val();
			if(locGugun == '') {
				$('#locDong').html('');
				return false;
			}
			//carInfo.setCarLocation('410','경기','성남시 분당구','구미동','22000','0','0');
		}

		$.ajax({
			type : "post",
			url : '/data.html?act=area',
			contentType : "application/x-www-form-urlencoded; charset=UTF-8",
			data : {"depthno" : depthno, "sido" : locSido, "gu" : locGugun, "stype" : h_stype, "car_maker_type" : h_car_maker_type },
			dataType : "json",
			success : function(data) {
				var dongcount = 1;
				if(data.code == 0){
					$.each(data.list,function(i,v){
						if(depthno == 2) {
							htmlFmt += '<option value="'+v.gugun+'">'+v.gugun+'</option>';
						} else {
							if(v.acnt > 0) {
								if (h_stype == 1) {

									//htmlFmt +='<option value="'+v.acode+'" cost="'+v.cost+'" atype="'+v.area_test_type+'">'+v.dong+'</option>';

									//area_service_type_value='<font color=blue>가능</font>';
									htmlFmt += '<div class="col-lg-4 col-md-4 col-6 mt-3">';
									htmlFmt += '	<div class="p-3 text-center rounded shadow bg-white">';

									htmlFmt += '			<h5 class="mb-1">'+v.dong+'</h5>';
									htmlFmt += '			<p class=" mb-0">대행료 '+numberWithCommas(v.cost_total)+' ~ '+numberWithCommas(v.cost)+'</p>';

									htmlFmt += '	</div>';
									htmlFmt += '</div><!--end col-->';
									//htmlFmt += '<tr onClick="carInfo.setCarLocation(\''+v.acode+'\',\''+v.sido+'\',\''+v.gugun+'\',\''+v.dong+'\',\''+v.cost+'\',\''+v.cost_delivery+'\',\''+v.cost_premium+'\')"><td>'+v.sido+'</td><td>'+v.gugun+'</td><td>'+v.dong+'</td><td>'+area_service_type_value+'</td></tr>';
								}
								dongcount +=1;
							} else {
								htmlFmt += '<div class="col-lg-4 col-md-3 col-4 mt-3">';
								htmlFmt += '	<div class="p-3 rounded shadow bg-white">';

								htmlFmt += '			<h5 class=" mb-0">'+v.dong+' 준비중</h5>';

								htmlFmt += '	</div>';
								htmlFmt += '</div><!--end col-->';

							}
						}
					});
									htmlFmt += '<div class="col-lg-4 col-md-4 col-6 mt-3">';
									htmlFmt += '	<div class=" p-3 rounded shadow bg-warning">';

									htmlFmt += '			<h5 class=" mb-0">회원이면</h5>';
									htmlFmt += '			<p class="text-white mb-0">기본할인'+' - <span class="text-danger">'+numberWithCommas(1000)+'</span> </p>';
									htmlFmt += '		</div>';
									htmlFmt += '	</div>';
									htmlFmt += '</div><!--end col-->';
									htmlFmt += '<div class="col-lg-4 col-md-4 col-6 mt-3">';
									htmlFmt += '	<div class="p-3 rounded shadow bg-warning">';

									htmlFmt += '			<h5 class="mb-0">온라인예약결제</h5>';
									htmlFmt += '			<p class="text-white mb-0"> 중복할인'+' - <span class="text-danger">'+numberWithCommas(1000)+'</span> </p>';

									htmlFmt += '	</div>';
									htmlFmt += '</div><!--end col-->';
									htmlFmt += '<div class="col-lg-4 col-md-4 col-6 mt-3">';
									htmlFmt += '	<div class="p-3 rounded shadow bg-warning">';

									htmlFmt += '			<h5 class=" mb-0">구매이력이 있는</h5>';
									htmlFmt += '			<p class="text-white mb-0">회원 중복할인'+' - <span class="text-danger">'+numberWithCommas(1000)+'</span></p>';

									htmlFmt += '	</div>';
									htmlFmt += '</div><!--end col-->';

									htmlFmt += '<div class="col-lg-12 col-md-12 col-12 mt-3">';
									htmlFmt += '	<div class="card" style="border-left-color: #5bc0de;border-left-width: .25rem;">';
 									htmlFmt += '		<div class="card-body">';
									htmlFmt += '			<strong>찾으시는 지역이 없거나, 대행이 불가능합니까!</strong>';							
									htmlFmt += '			<p>전화 <a href="tel:1577-0266">1577-0266</a> 또는 화면 하단의 <a href="javascript:void(0);" class="mb-2 ml-2 OpenChat">온라인 채팅</a>으로 문의해주세요.</p>';
									htmlFmt += '		</div>';
									htmlFmt += '	</div>';
									htmlFmt += '</div><!--end col-->';



					if(depthno == 2) {
						$('#locGugun').children().remove().end().append('<option value="">선택하세요</option>' + htmlFmt);
						$('#locTable').html("");
						//carInfo.loadAgentArea(3);
					} else {
						//alert(htmlFmt);
						//$('#locDong').children().remove().end().append('<option value="">선택하세요</option>' + htmlFmt);
						//$('#dong').html(htmlFmt);
						$('#locTable').html(htmlFmt);

						if (dongcount > 4) {
							//var counttext= "<img src='../images/scroll_down.gif' width='100px' style='margin:0 auto  5px auto'>";
							//var counttext= "▶"+dongcount+"개의 행정동을 찾았습니다. 아래로 스크롤하면 더 많은 지역을 볼 수 있습니다.";
							//var counttext= "▼ 아래로 스크롤하면 모두 "+dongcount+"개의 지역을 볼 수 있습니다.";
							 //var counttext= '<a href="javascript:void(0)" class="btn btn-primary">▼ 아래로 스크롤하면 모두 '+dongcount+'개의 지역을 볼 수 있습니다. <i class="mdi mdi-arrow-right"></i></a>';
						} else {
							//var counttext= "";
						}
						//$('#locationbox').html(counttext);
						/*
						$("#locTable").hover (
							function () {
								$(this).addClass("model_list_over");
								$(this).siblings("td").addClass("model_list_over");
							},
							function () {
								$(this).removeClass("model_list_over");
								$(this).siblings("td").removeClass("model_list_over");
							}
						);
						*/

					}

				}else{
					if(depthno == 2) {
						htmlFmt += '<div class="col-lg-12 col-md-12 col-12 mt-3">';
						htmlFmt += '<div class="d-flex p-3 rounded shadow bg-white">';
						htmlFmt += '<div class="content">';
						htmlFmt += '<h6 class="title small mb-0">';
						htmlFmt += '	과도한 조회시도로 서비스가 차단되었습니다.';
						//htmlFmt += '	<i class="mdi mdi-chat d-inline-block mr-2 position-relative"></i> <a href="javascript:void(0);" class="video-play-icon watch mb-2 ml-2 OpenChat">온라인 상담</a>으로 해결을 요청합니다';
						htmlFmt += '	<a href="tel:1577-0266" class="mb-2 OpenChat"><i class="mdi mdi-phone d-inline-block position-relative"></i> 고객센터 1577-0266</a> 또는 화면 아래의 온라인상담으로 문의해주시면 도와드리겠습니다';
						htmlFmt += '</h6>';
						htmlFmt += '</div>';
						htmlFmt += '</div>';
						htmlFmt += '</div><!--end col-->';
						//htmlFmt += '<tr></td><td>'+v.sido+'</td><td>'+v.gugun+'</td><td>'+v.dong+'</td><td><font color="red">준비중</font></tr>';
						$('#locTable').html(htmlFmt);
					} else {
						htmlFmt += '<div class="col-lg-12 col-md-12 col-12 mt-3">';
						htmlFmt += '<div class="d-flex p-3 rounded shadow bg-white">';
						htmlFmt += '<div class="content">';
						htmlFmt += '<h6 class="title small mb-0">';
						htmlFmt += '	대행이 가능한 지역이 없습니다';
						//htmlFmt += '	<i class="mdi mdi-chat d-inline-block mr-2 position-relative"></i> <a href="javascript:void(0);" class="video-play-icon watch mb-2 ml-2 OpenChat">온라인 상담</a>으로 해결을 요청합니다';
						htmlFmt += '	<a href="tel:1577-0266" class="mb-2 OpenChat"><i class="mdi mdi-phone d-inline-block position-relative"></i> 고객센터 1577-0266</a> 또는 화면 아래의 온라인상담으로 문의해주시면 도와드리겠습니다';
						htmlFmt += '</h6>';
						htmlFmt += '</div>';
						htmlFmt += '</div>';
						htmlFmt += '</div><!--end col-->';
						//htmlFmt += '<tr></td><td>'+v.sido+'</td><td>'+v.gugun+'</td><td>'+v.dong+'</td><td><font color="red">준비중</font></tr>';
						$('#locTable').html(htmlFmt);
					}

					//alert(data.message); //데이터가 없다는 Alert창 뜨는 부분
				}
			},
			error : function() {
				alert("정보 조회가 실패하였습니다.");
			}
		});
	},
	setCarLocation : function(a, s, g, d, c, cd, p) { //지역코드, 시도, 시군구, 동, B2C대행료, Delivery대행료, Premium대행료
		$("#addretc").val('');

		if($("#h_stype").val() == 1) {		//자동차검사는 주소입력이 가장 첫단계이므로, 기존에 입력된 값들을 초기화 한다
			carInfo.initTestInfo();
		}
		$("#h_acode").val(a);
		$("#sido").val(s);
		$("#gugun").val(g);
		$("#dong").val(d);
		$("#h_cost2").val(c);
		$("#pickup_address").val(s+' '+g+' '+d);

		carInfo.closeCarLocationInfo();
	},

	/*********************************
	* 구주소를 도로명으로 변환
	*********************************/
	AddrLinkRequestUse : function() {
		if($('#h_cost2').val() == ""){
			alert("자동차 픽업 위치를 선택해 주세요.");

			var offset = $("#locationInfo").offset();
			$('html, body').animate({scrollTop : offset.top-70}, 1200);

			$("#sido").focus();
			return;
		}

		if($('#pickup_address_lnbrMnnm_lnbrSlno').val() == ""){
			alert("건물명 호수 등을 제외한 번지를 입력하세요.");

			var offset = $("#locationInfo").offset();
			$('html, body').animate({scrollTop : offset.top-70}, 1200);

			//$("#addretc").focus();

			return;
		}

		$('body').loading({
			stoppable: true,
			message: '입력하신 주소의 정확도를 확인 중입니다.<br/>잠시만 기다려주세요.',
			theme: 'dark'
		});

		// 이동경로 계산을 위해
		// 1. 구주소를 신주소로 변환
		// 2. 신주소로 좌표 알아내기
		// 3. 좌표로 이동경로 계산하기

		// 1. 구주소로 신주소 알아내기
		// 요청변수 설정  

		var currentPage = 1;   
		var countPerPage = 1;   
		var resultType = 'json';   
		var confmKey = 'U01TX0FVVEgyMDE5MDMxMzEwNTgwOTEwODU3MzM=';   
		var keyword = $('#pickup_address').val() + " " + $('#pickup_address_lnbrMnnm_lnbrSlno').val();
		
		var return_admCd		='';
		var return_rnMgtSn		='';
		var return_udrtYn			='';
		var return_buldMnnm	='';
		var return_buldSlno		='';

		$.ajax({
			url :"http://www.juso.go.kr/addrlink/addrLinkApi.do"  //인터넷망
			,type:"post"
			,contentType : "application/x-www-form-urlencoded; charset=UTF-8"
			,data : {"currentPage" : currentPage, "countPerPage" : countPerPage, "keyword" : keyword, "confmKey" : confmKey, "resultType" : resultType }
			,dataType : "json"
			,crossDomain:true
			,success:function(jsonStr){
				$('body').loading('stop');
				var errCode	= jsonStr.results.common.errorCode;
				var errDesc	= jsonStr.results.common.errorMessage;
				var totalCount =  jsonStr.results.common.totalCount; //검색결과수
				if(errCode != "0"){
					alert(errCode+"="+errDesc);
				}else{
					if(jsonStr != null && totalCount > 0) {

						return_roadAddr = (jsonStr.results.juso[0].roadAddr);		//전체도로명주소
						return_admCd = (jsonStr.results.juso[0].admCd);		//행정구역코드
						return_rnMgtSn = (jsonStr.results.juso[0].rnMgtSn);	//도로명코드
						return_udrtYn = (jsonStr.results.juso[0].udrtYn);			//지하여부
						return_buldMnnm = (jsonStr.results.juso[0].buldMnnm);	//건물본번
						return_buldSlno = (jsonStr.results.juso[0].buldSlno);		//건물부번
						//alert (return_admCd + " "+return_rnMgtSn + " "+return_udrtYn + " "+return_buldMnnm + " "+return_buldSlno);
						$('#roadAddr').val(return_roadAddr);		//도로명주소
						$('#btnConfirmAddress').text('이 주소는 유효합니다. 건물명·주차위치 등 자세한위치를 입력하세요.');

						$('#admCd').val(return_admCd);			//도로명주소
						$('#rnMgtSn').val(return_rnMgtSn);		//도로명주소
						$('#udrtYn').val(return_udrtYn);			//도로명주소
						$('#buldMnnm').val(return_buldMnnm);		//도로명주소
						$('#buldSlno').val(return_buldSlno);		//도로명주소
					} else {
						setTimeout('alert("입력된 번지를 사용해 행정안전부제공 도로명주소로 확인되는 주소가 없습니다. 건물명 등을 제외한 번지를 확인해주세요.")', 300);
					}
				}
			}
			,error: function(xhr,status, error){
				$('body').loading('stop');
				alert("에러발생");
			}
		});
	}

},
// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
schedule = {
	openSchAgent: function(){
		var vSido = $('#sido').val().split(" ").join("");
		var vGugun = $('#gugun').val().split(" ").join("");
		var vDong = $('#dong').val().split(" ").join("");
		var vAcode = $('#h_acode').val().split(" ").join("");
		var vCarmaker_type = $('#h_car_maker_type').val();	//국산수입구분
		var vConditionLayer	=	1;											//필수값 체크 후 검사희망일레이어 띄우기 여부 
		if (vAcode == '' || vSido==''){
			vConditionLayer	=	0;
			$("#btnCarLoc").focus();
			return;
		}
		if($('#h_ttype').val() =='') {
			vConditionLayer	=	0;
			alert("기초 정보가 없습니다.\n\n조회를 하신 후 이용해주시기 바랍니다.");
			return;
		}
		if($('#h_car_maker_type').val() =='') {
			vConditionLayer	=	0;
			alert("자동차모델을 선택해야 합니다.\n\n조회를 하신 후 이용해주시기 바랍니다.");
			return;
		}

		$('#txtSch_sido').val(vSido);
		$('#txtSch_gugun').val(vGugun);
		$('#txtSch_dong').val(vDong);
		selDate = $('#h_today').val();		
		$('#hopeSchDate').val(selDate);
		schedule.callSchData('/data.html?act=schagent&ac=' + vAcode, selDate, vAcode, 0, vCarmaker_type);

		$('.input-datepicker').datepicker();
		$('.input-datepicker').on('changeDate', function(selected) {

		});
		$('.input-datepicker').on('changeDate', function(selected) {
			//picker_event는 "이벤트명" 이런 식으로 적는다.
			//이벤트의 종류
			//show : datePicker가 보이는 순간 호출
			//hide : datePicker가 숨겨지는 순간 호출
			//clearDate: clear 버튼 누르면 호출
			//changeDate : 사용자가 클릭해서 날짜가 변경되면 호출 (개인적으로 가장 많이 사용함)
			//changeMonth : 월이 변경되면 호출
			//changeYear : 년이 변경되는 호출
			//changeCentury : 한 세기가 변경되면 호출 ex) 20세기에서 21세기가 되는 순간

			//하고 싶은 행동
			var selDate = $('#hopeSchDate').val();
			console.log(selDate);

			//시작 접수일 기준으로 각 상황에 따라 메세지를 보여주기 위해 추가 2018-04-19 박흥배
			var today = new Date();
			var dd = today.getDate();
			var mm = today.getMonth()+1; //January is 0!
			var yyyy = today.getFullYear();

			if(dd<10) {
				dd='0'+dd;
			} 
			if(mm<10) {
				mm='0'+mm;
			} 
			today = yyyy+'-'+mm+'-'+dd;
			if ($('#enddate').val() < today) {
			} else {
				if(selDate > $('#enddate').val() ) {
					if($('#ttype_title').val() == '정기검사' ) {
						alert('선택한 예약일은 최종만료일을 경과하여 검사종류가 변경될 수 있습니다.\n다른 날짜를 선택하시거나 선택하신 날짜로 예약을 원하시면 고객센터 1577-0266 에서 접수를 진행해주세요.');
						$('#btnCloseScheduleAgent').trigger('click');
						return false;
					} //else {
						//alert('선택한 예약일은 최종만료일을 경과합니다.\n계속 진행을 원하시면 확인버튼을 클릭해서 진행하세요.');
					//}
				}	//else if(selDate == $('#enddate').val() ) {
					//	alert('선택한 예약일은 최종만료일입니다.\n계속 진행을 원하시면 고객센터 1577-0266으로 문의 후 표시된 메세지로 상담을 해주십시오.');
					//	return false;
				//}
				//alert ('희망예약일Layer Open > 달력 희망일 선택, CarCode '+vCarCode);
			}
			// 종료 접수일 기준으로 각 상황에 따라 메세지를 보여주기 위해 추가 2018-04-19 박흥배

			vAcode = $('#h_acode').val().split(" ").join("");
			schedule.callSchData('/data.html?act=schagent&ac=' + vAcode, selDate, vAcode, 0, vCarmaker_type);
		});

		if (vConditionLayer == 1){
			$('#scheduleAgentLayer').show();
		} else {
			$('#scheduleAgentLayer').hide();
		}
	},

	openSchAgentChange: function(){
		var vSido = $('#sido').val().split(" ").join("");
		var vGugun = $('#gugun').val().split(" ").join("");
		var vDong = $('#dong').val().split(" ").join("");
		var vAcode = $('#h_acode').val().split(" ").join("");
		var vCuno = $('#h_cuno').val().split(" ").join("");
		var vSchdate = $('#schdate').val().split(" ").join("");
		var vCarmaker_type = $('#h_car_maker_type').val();	//국산수입구분

		if (vAcode == '' || vSido==''){
			alert("자동차 위치 정보가 확인되지 않습니다.");
			$("#btnCarLoc").focus();
			return;
		}
		$('#txtSch_sido').val(vSido);
		$('#txtSch_gugun').val(vGugun);
		$('#txtSch_dong').val(vDong);
		$('#txtSch_address').val(vSido+' '+vGugun+' '+vDong);
		$('#hopeSchDate').val(vSchdate);

		//selDate = vSchdate;
		selDate = $('#h_today').val();	
		schedule.callSchData('/data.html?act=schagentchange&ac=' + vAcode, vSchdate, vAcode, vCuno, vCarmaker_type);

		$('.input-datepicker-agentChange').on('changeDate', function(selected) {

			//picker_event는 "이벤트명" 이런 식으로 적는다.
			//이벤트의 종류
			//show : datePicker가 보이는 순간 호출
			//hide : datePicker가 숨겨지는 순간 호출
			//clearDate: clear 버튼 누르면 호출
			//changeDate : 사용자가 클릭해서 날짜가 변경되면 호출 (개인적으로 가장 많이 사용함)
			//changeMonth : 월이 변경되면 호출
			//changeYear : 년이 변경되는 호출
			//changeCentury : 한 세기가 변경되면 호출 ex) 20세기에서 21세기가 되는 순간

			//하고 싶은 행동
			var selDate = $('#hopeSchDate').val();
			console.log(selDate);

			var dateText = $('#hopeSchDate').val();

				//시작 접수일 기준으로 각 상황에 따라 메세지를 보여주기 위해 추가 2018-04-19 박흥배
				var today = new Date();
				var dd = today.getDate();
				var mm = today.getMonth()+1; //January is 0!
				var yyyy = today.getFullYear();

				if(dd<10) {
					dd='0'+dd;
				} 
				if(mm<10) {
					mm='0'+mm;
				} 
				today = yyyy+'-'+mm+'-'+dd;
				//alert($('#enddate').val());
				if ($('#enddate').val() < today) {
				} else {
					if(selDate > $('#enddate').val() ) {
						if($('#stype').val() == '정기검사' ) {
							alert('선택한 예약일은 최종만료일을 경과하여 검사종류가 변경될 수 있습니다.\n다른 날짜를 선택하시거나 선택하신 날짜로 예약을 원하시면 고객센터 1577-0266 에서 접수를 진행해주세요.');
							$('#btnCloseScheduleAgent').trigger('click');
							return false;
						} //else {
							//alert('선택한 예약일은 최종만료일을 경과합니다.\n계속 진행을 원하시면 확인버튼을 클릭해서 진행하세요.');
						//}
					}	//else if(selDate == $('#enddate').val() ) {
						//	alert('선택한 예약일은 최종만료일입니다.\n계속 진행을 원하시면 고객센터 1577-0266으로 문의 후 표시된 메세지로 상담을 해주십시오.');
						//	return false;
					//}
				}
				// 종료 접수일 기준으로 각 상황에 따라 메세지를 보여주기 위해 추가 2018-04-19 박흥배
				vAcode = $('#h_acode').val().split(" ").join("");
				schedule.callSchData('/data.html?act=schagentchange&ac=' + vAcode, dateText, vAcode, vCuno, vCarmaker_type);
			//}
		});

		//window.scrollTo(0,0);
		$('#scheduleAgentLayer').show();		
		
	},
	callSchData: function(v_url, v_date, v_code, v_cuno, vCarmaker_type){
		var vCarmaker_type = $('#h_car_maker_type').val();	//국산수입구분, 차모델선택 후 담당대행원을 다시 선택할때 국산수입에 따라, 변경된 국산수입담당자를 적용하기 위해 국산수입구분을 가져옴
		//alert (vCarCode);
		$.ajax({
			type : "post",
			url : v_url,
			contentType : "application/x-www-form-urlencoded; charset=UTF-8",
			data : {"mode" : "GET", "sdate" : v_date, "acode" : v_code, "cuno" : v_cuno, "v_car_maker_type" : vCarmaker_type },
			success : function(data) {
				$('#sch_data').html(data);
			},
			error : function() {
				alert("예약 정보 조회가 실패하였습니다.");
			}
		});
	},
	disableAllTheseDays : function(date) { 
		// 특정일/일요일만 선택 막기 
		//console.log(date.getDay());
		if(date.getDay() == 0) {
			// 일요일 선택막기
			return [false]; 
		} else {
			// 특정일 선택막기
			var m = date.getMonth(), d = date.getDate(), y = date.getFullYear();

			for (i = 0; i < disabledDays.length; i++) {
				if($.inArray(y + '-' +(m+1) + '-' + d,disabledDays) != -1) {
					return [false];
				}
			}
			return [true];
		}
	},
	setData: function(in_date, in_cuno, in_cuname, in_time) {
		$("#schdate").val(in_date);
		$("#schtime").val(in_time);
		$("#schtime_t").val(in_time.substring(0, 2) + ":" + in_time.substring(2, 4));
		$("#h_cuno").val(in_cuno);
		$("#cuname").val(in_cuname);

		schedule.closeSchAgent();

		//일정예약 레이어가 닫히고, 일정예약결과를 보여주고 신청인 이름으로 포커스 이동
		var offset = $("#btnschdate").offset();
		$('html, body').animate({scrollTop : offset.top-70}, 1200);
		//$("#name").focus();
	},
	closeSchAgent: function(){
		$.magnificPopup.close();return false;
		//$('#scheduleAgentLayer').hide();
		//$("#schdate").focus();
		//$('#btnCloseScheduleAgent').trigger('click');
	},
	getModel : function(depthno) {

		var htmlFmt = "";
		
		//Log($('#carcp').val());

		 $.ajax({
			type : "post",
			url : '/data.html?act=model',
			contentType : "application/x-www-form-urlencoded; charset=UTF-8",
			data : {"mode" : "GET", "depthno" : depthno, "catcode" : $('#carcp').val() },
			dataType : "json",
			success : function(data) {
				if(data.code == 0){
					$.each(data.list,function(i,v){
						if(depthno == 2) {
							htmlFmt += '<option value="'+v.code+'">'+v.name+'</option>';
						} else {
							htmlFmt += '<tr onClick="setCarName(\''+v.name+'\')" style="cursor:pointer;">';
							htmlFmt += '	<td>'+v.code+'</td>';
							htmlFmt += '	<td>'+v.name+'</td>';
							htmlFmt += '</tr>';
						}
					});
					if(depthno == 2) {
						$('#carcp').children().remove().end().append('<option value="">제조사</option>' + htmlFmt);
						$('#tblCarModel > tbody').html("");
					} else {
						$('#tblCarModel > tbody').html(htmlFmt);
					}

				}else{
					alert(data.message);
				}
			},
			error : function() {
				alert("제조사 차량 정보 조회가 실패하였습니다.");
			}
		});
	}
},
// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
common = {
	ieCheckAgree : function(id){
		if($('#'+id).is(":checked")){
			$('#'+id).prop('checked', false).val("");
			$('#'+id).next("label").removeClass("selected");
		}else{
			$('#'+id).prop('checked', true).val("Y");
			$('#'+id).next("label").addClass("selected");
		}
	},
	propTrueCheck : function(selector){
		$(selector).prop('checked', true).val("Y");
		$(selector).next("label").addClass("selected");
	},
	propFalseCheck : function(selector){
		$(selector).prop('checked', false).val("");
		$(selector).next("label").removeClass("selected");
	}

},
// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
AlertInfo = {
	validation : function(){

		if($('#sido').val() == '' || $('#gugun').val() == '' || $('#dong').val() == '') {
			alert(messages.do_alert_location);
			$('#sido').focus();
			return;
		}

		if($('#addretc').val() == '') {
			alert(messages.do_alert_addretc);
			$('#addretc').focus();
			return;
		}

		if($('#h_stype').val() == '1') {
			if($('#carname_alert').val() == '' || $('#expdate_alert').val() == '' || $('#alertdate').val() == '') {
				alert(messages.do_alert_test_info);
				$('#bymd').focus();
				return;
			}

			if($('#h_bymd').val() != $('#bymd').val()
				|| $('#h_carno').val() != $('#carno').val() ) {
				alert("[검사기초정보]\n조회한 정보가 다릅니다.");
				$('#bymd').focus();
				return;
			}
		}
		var carNo = $('#carno').val();
		 $("#carno").val(carNo.split(" ").join(""));

		if($('#carno').val() == '' ) {
			alert("차량번호를 입력해 주세요.");
			$('#carno').focus();
			return;
		}

		//자동차번호 형식 체크
		var checkNum = carInfo.checkCno($('#carno').val());
		if(checkNum != 1){
			alert("자동차번호 형식이 올바르지 않습니다.");
			$('#carno').focus();
			return;
		 }

		var name_alert = $("#name_alert").val();

		if( name_alert.length < 1 || name_alert.length > 20 ) {
			alert(messages.do_input_name);

			var offset = $("#register_alert").offset();
			$('html, body').animate({scrollTop : offset.top-70}, 1200);

			$('#name_alert').focus();
			return;
		}
		 $("#name_alert").val(name_alert.split(" ").join(""));
		name_alert = $("#name_alert").val();

		if(!checkEmoji(name_alert)) {
			alert(messages.do_name_guide);
			$('#name_alert').focus();
			return;
		 }

		if(!checkTel($("#tel1_alert").val(),'' ,'')) {
			alert(messages.do_alert_mobile_wrong + "\n" + messages.do_alert_mobile_wrong1);

			var offset = $("#register_alert").offset();
			$('html, body').animate({scrollTop : offset.top-70}, 1200);

			$('#tel1_alert').focus();
			return;
		}

	    if(emailCheckStatus != "y") {
			alert(messages.do_invalid_email);
			$('#email').focus();
			return;
		}

		if(!$('#alertChk').is(":checked")){
			alert(messages.do_agree_requirement_03);
			return ;
		}

		//$('#submitReqForm').submit();
		AlertInfo.alertSave();

	},
	alertSave : function() {

		$('#act').val('alert');

		$('#submitReqForm').ajaxForm({
			beforeSubmit: function (data,form,option) {
				return true;
			},
			url:"/data.html",
			success: function(data,status){
				if(data.result == "0000"){
					//대행 신청 완료
					var f = document.submitReqForm;
					f.target = '_self';
					f.method = 'post';
					f.enctype = "application/x-www-form-urlencoded";
					if($('#h_stype').val() == '1') {
						f.action = './p_test_alert_ok.html';
					}
					f.submit();
				}else{
					alert(data.message);
				}
			},
			error: function(){
				alert("오류발생 : 잠시후에 이용해 주시기 바랍니다.");
			}                               
		}).submit();
	},
	checkEmail : function() {
		emailCheckStatus = "y";
		/*
		var email = $("#email").val();

		if( email == "" ) {
			emailCheckStatus = "b";
			$("#email").val("");
			return;
		}

		var isValid = isValidEmail(email);
		if(isValid){
			emailCheckStatus = "y";
		}else{
			emailCheckStatus = "v";
		}
		*/
	}
},
// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
personalAgentInfo = {
	validation : function(){

		if($('#sido').val() == '' || $('#gugun').val() == '' || $('#dong').val() == '') {
			alert(messages.do_alert_location);
			$('#sido').focus();
			return;
		}

		if($('#addretc').val() == '') {
			alert(messages.do_alert_addretc);
			$('#addretc').focus();
			return;
		}

		if($('#h_stype').val() == '1') {
			if($('#h_ttype').val() == '') {
				alert(messages.do_alert_test_info);
				$('#bymd').focus();
				return;
			}

			if($('#h_bymd').val() != $('#bymd').val()
				|| $('#h_carno').val() != $('#carno').val() ) {
				alert("[검사기초정보]\n조회한 정보가 다릅니다.");
				$('#bymd').focus();
				return;
			}
		}
		var carNo = $('#carno').val();
		 $("#carno").val(carNo.split(" ").join(""));

		if($('#carno').val() == '' ) {
			alert("차량번호를 입력해 주세요.");
			$('#carno').focus();
			return;
		}

		 //자동차번호 형식 체크
		 var checkNum = carInfo.checkCno($('#carno').val());
		 if(checkNum != 1){
			alert("자동차번호 형식이 올바르지 않습니다.");
			$('#carno').focus();
			return;
		 }

		if($('#schdate').val() == '' || $('#schtime').val() == '' || $('#h_cuno').val() == '' || $('#cuname').val() == '') {
			//검사희망일로 이동시키기 위해 한단계 위 엘리먼트 서비스이용료를 기준으로 잡음
			var offset = $("#totcost").offset();
		    $('html, body').animate({scrollTop : offset.top}, 400);

			alert('검사 희망일을 선택해주세요.');
			$('#schdate').focus();
			return;
		}
		var name = $("#name").val();

		if( name.length < 1 || name.length > 20 ) {
			alert(messages.do_input_name);

			var offset = $("#testuserinfo").offset();
			$('html, body').animate({scrollTop : offset.top-70}, 1200);

			$('#name').focus();
			return;
		}
		 $("#name").val(name.split(" ").join(""));
		 name = $("#name").val();

		 if(!checkEmoji(name)) {
			alert(messages.do_name_guide);
			$('#name').focus();
			return;
		 }

		if(!checkTel($("#tel1").val(),'' ,'')) {
			alert(messages.do_alert_mobile_wrong + "\n" + messages.do_alert_mobile_wrong1);

			var offset = $("#testuserinfo").offset();
			$('html, body').animate({scrollTop : offset.top-70}, 1200);

			$('#tel1').focus();
			return;
		}

	    if(emailCheckStatus != "y") {
			alert(messages.do_invalid_email);
			$('#email').focus();
			return;
		}

		if(!$('#userChk').is(":checked")){
			alert(messages.do_agree_requirement_01);
			return ;
		}else if(!$('#personalChk').is(":checked")){
			alert(messages.do_agree_requirement_02);
			return ;
		}

		if($('#p_method').val() == "1") {
			if(objPayPopup && !objPayPopup.closed) {
				//창이 있으면 닫는다.
				objPayPopup.self.close();
			} 
			objPayPopup = window.open('about:blank', 'payWindow', 'width=700, height=700');
		}

		//$('#submitReqForm').submit();
		personalAgentInfo.reservationSave();

	},
	reservationSave : function() {

		var p_method = $('#p_method').val();
		if(p_method == "0") {
			$('#act').val('req');
		} else {
			$('#act').val('check');
		}

		$('#submitReqForm').ajaxForm({
			beforeSubmit: function (data,form,option) {
				return true;
			},
			url:"/data.html",
			success: function(data,status){
				if(data.result == "0000"){
					//대행 신청 완료
					if(p_method == "1") {
						$('#h_ulist').val(data.ulist);
						var pf = document.frm;
						pf.GoodsName.value = data.gname;
						pf.Amt.value = data.amt;
						pf.Moid.value = data.moid;
						pf.MID.value = data.mid;
						pf.ReturnURL.value = data.rurl;
						pf.ResultYN.value = data.resultyn;
						pf.FORWARD.value = data.forward;
						pf.BuyerName.value = name;
						pf.BuyerTel.value = data.btel;
						pf.BuyerEmail.value = $('#email').val();
						pf.MerchantKey.value = data.mkey;
						pf.ediDate.value = data.edate;

						//$("#payButton").trigger("click");
						objPayPopup.location.href="pay.html";
						objPayPopup.focus();
					} else {
						var f = document.submitReqForm;
						f.target = '_self';
						f.method = 'post';
						f.enctype = "application/x-www-form-urlencoded";
						if($('#h_stype').val() == '1') {
							f.action = './p_test_req_ok.html';
						} else {
							f.action = './p_move_req_ok.html';
						}
						f.submit();
					}
				}else{
					alert(data.message);
				}
			},
			error: function(){
				alert("오류발생 : 잠시후에 이용해 주시기 바랍니다.");
			}                               
		}).submit();
	},
	checkEmail : function() {
		emailCheckStatus = "y";
		/*
		var email = $("#email").val();

		if( email == "" ) {
			emailCheckStatus = "b";
			$("#email").val("");
			return;
		}

		var isValid = isValidEmail(email);
		if(isValid){
			emailCheckStatus = "y";
		}else{
			emailCheckStatus = "v";
		}
		*/
	}
};

// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
//$().ready(function() {
jQuery(document).ready( function(){
	//생년월일 등 숫자입력 폼에서 의도치 않은 스크롤로 인해 값이 변경되는 것을 막기 위해 스크롤 차단
	$(document).on("wheel", "input[type=number]", function (e) {
		$(this).blur();
	});





	$("#sido").on("click", function() {
		$('#btnCarLoc').trigger('click');
	});
	$("#locSido").on("change", function() {
		carInfo.loadAgentArea(2);
	});
	$("#locGugun").on("change", function() {
		carInfo.loadAgentArea(3);
	});
	$("#locDong").on("change", function() {
		carInfo.loadAgentArea(4);
	});

	$('.OpenChat').click(function(){
		$('.textLauncherIcon').trigger('click');
	});

	/*
	$("#input-12").fileinput({
		showPreview: false,
		allowedFileExtensions: ["jpg", "png", "jpeg", "gif"],
		elErrorContainer: "#errorBlock",
		mainClass: "input-group-lg",
		showUpload: true,
		maxFileCount: 5,
		previewFileType: "image",
		browseClass: "btn btn-success",
		browseLabel: "이미지 최대 5개",
		browseIcon: "<i class=\"icon-picture\"></i> ",
		removeClass: "btn btn-danger",
		removeLabel: "지우기",
		removeIcon: "<i class=\"icon-trash\"></i> ",
		uploadClass: "btn btn-info",
		uploadLabel: "업로드",
		uploadIcon: "<i class=\"icon-upload\"></i> "
	});
	*/
	// IE 인 경우 placeholder 미적용
	$('input:text').on("keyup", function() {
		if(isInternetExplorer() == "Y" ){
			common.checkIEForm($(this).attr("id"));
		}
	});

	$('#btnCpnApply').on("click", function() {
		if($('#totcost').val() =='') {
			alert('대행정보를 먼저 입력해주세요.');
			return false;
		}
		if($('#cpn').val() =='') {
			alert('쿠폰번호를 입력해주세요.');
			$('#cpn').focus();
			return false;
		}
		$('body').loading({
			stoppable: true,
			message: '쿠폰 확인중...',
			theme: 'dark'
		});
		//쿠폰처리를 위해 값을 넘길 때, 쿠폰적용지역 구분을 위해 시(도)정도도 함께 넘김
		$.ajax({
			type : "post",
			url : '/data.html?act=coupon',
			contentType : "application/x-www-form-urlencoded; charset=UTF-8",
			data : {"cpn" : $('#cpn').val(), "sido":$("#sido").val() },
			dataType : "json",
			success : function(data) {
				$('body').loading('stop');
				if(data.code == 0){
					$('#h_cpn').val($('#cpn').val());
					$('#h_cpnp').val(data.cpnp);
					$('#cpnp').val(setComma(data.cpnp));

					var tot = 0;
					if($('#totcost').val() != "") {
						tot = $('#totcost').val();
					}
					tot = parseInt(tot) - parseInt(data.cpnp);

					$('#h_payment').val(tot);
					$('#payment').val(setComma(tot));

					//totcost
				}
				alert(data.message);
			},
			error : function() {
				$('body').loading('stop');
				alert("쿠폰 확인에 문제가 있습니다. 잠시후에 다시 이용하시기 바랍니다.");
			}
		});
	
	});


	// IE 이슈로 인한 스크립트
	/*
	if(getIEVersion() < 9){
		$('#allChkLb').on("click", function() {
			common.ieCheckAgree("termAllChk");
			
			if($("#termAllChk").is(":checked")){
				common.propTrueCheck("#userChk");
				common.propTrueCheck("#personalChk");
				common.propTrueCheck("#noticeChk");

			}else{
				common.propFalseCheck("#userChk");
				common.propFalseCheck("#personalChk");
				common.propFalseCheck("#noticeChk");
			}
		});
	
		$('#userChkLb').on("click", function() {
			common.ieCheckAgree("userChk");
		});
		
		$('#personalChkLb').on("click", function() {
			common.ieCheckAgree("personalChk");
		});


		$('noticeChkLb').on("click", function() {
			common.ieCheckAgree("noticeChk");
		});

		$('returnChkLb').on("click", function() {
			common.ieCheckAgree("returnChk");
		});

		$('#tsChkLb').on("click", function() {
			common.ieCheckAgree("tsChk");
			
			if($("#tsChk").is(":checked")){
			}else{
				//기존 검사정보 초기화
				alert('ie<9 init');
				//carInfo.initTestInfo();
			}
		});
	}
	*/
});

//이모지 문자 체크
function checkEmoji(value){
	var ranges = [
				  '\ud83c[\udf00-\udfff]', // U+1F300 to U+1F3FF
				  '\ud83d[\udc00-\ude4f]', // U+1F400 to U+1F64F
				  '\ud83d[\ude80-\udeff]'  // U+1F680 to U+1F6FF
				];
	if(value.match(new RegExp(ranges.join('|'), 'g')) == null) {
		return true;
	} else {
		return false;
	}
}

function checkTel(tel1, tel2, tel3){
	var tel = tel1 + tel2 + tel3;
	if(tel == "") return false;
	var regExpTel = /^0?1([0|1|6|7|8|9]?)-?([0-9]{3,4})-?([0-9]{4})$/;
	return regExpTel.test(tel);
}

function goOkpage(){
	var f = document.submitReqForm;
	f.target = '_self';
	f.method = 'post';
	f.enctype = "application/x-www-form-urlencoded";
	if($('#h_stype').val() == '1') {
		f.action = './p_test_req_ok.html';
	} else {
		f.action = './p_move_req_ok.html';
	}
	f.submit();
}

//숫자에 화폐단위 콤마찍기
function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}