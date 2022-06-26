
function Log(logStr) {
	console.log(logStr);
}

var emailCheckStatus = "y";  //n : 사용중 / y : 사용가능/ v : 올바르지 않은 이메일/ b : 입력하지 않음  
var carSizes = ["", "경형", "소형", "중형", "대형"];
var selDate = "";
var objPayPopup=null;
// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
var agreeTerm = {
	//자동차검사정보 조회 동의
	testInfoChk : function(){
		if(!$('#testInfoSwitch').is(":checked")){ 
			if($('#h_ttype').val() !='') {
				if(confirm("검사기초 정보가 있습니다.\n\n동의를 해제할 경우 기존 정보가 초기화 됩니다.\n\n진행 하시겠습니까?")) {
					$('.mk').prop('checked', false).val("");
					$('.mk').next('label').removeClass("selected");
					//기존 검사정보 초기화
					carInfo.initTestInfo();
				}
			} else {
				$('.mk').prop('checked', false).val("");
				$('.mk').next('label').removeClass("selected");
			}
		}else{
			$('.mk').prop('checked', true).val("Y");
			$('.mk').next('label').addClass("selected");
		}
	},
	
	alertChk : function(){			//자동차검사안내 Layer 동의
		if(!$('#alertChk').is(":checked")){ 
			$('.alert').prop('checked', false).val("");
			$('.alert').next('label').removeClass("selected");
		}else{
			$('.alert').prop('checked', true).val("Y");
			$('.alert').next('label').addClass("selected");
		}
	},
	
	termAllChk : function(){		//모두 동의
		if(!$('#termAllChk').is(":checked")){ 
			$('.term').prop('checked', false).val("");
			$('.term').next('label').removeClass("selected");
		}else{
			$('.term').prop('checked', true).val("Y");
			$('.term').next('label').addClass("selected");
		}
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
	},
	openUserInfo : function(){
		window.scrollTo(0,0);
		$('#userInfoLayer').show();
	},
	closeUserInfo : function(){
		$('#userInfoLayer').hide();
		//약관확인 후 약관 위치로 이동
		var offset = $("#testagreement").offset();
		$('html, body').animate({scrollTop : offset.top-110}, 1200);
	},
	openPrivacyInfo : function(){
		window.scrollTo(0,0);
		$('#privacyInfoLayer').show();
	},
	closePrivacyInfo : function(){
		$('#privacyInfoLayer').hide();
		//약관확인 후 약관 위치로 이동
		var offset = $("#testagreement").offset();
		$('html, body').animate({scrollTop : offset.top-110}, 1200);
	},
	openNoticeInfo : function(){
		window.scrollTo(0,0);
		$('#noticeInfoLayer').show();
	},
	closeNoticeInfo : function(){
		$('#noticeInfoLayer').hide();
		//약관확인 후 약관 위치로 이동
		var offset = $("#testagreement").offset();
		$('html, body').animate({scrollTop : offset.top-110}, 1200);
	}
},

// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
carInfo = {
	checkCno : function(cno) {
		var len			= 0;
		var sido			= "";
		var cnoJong	= "";
		var cnoUse	= "";
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
				}else if (len == 8) {	// ex) 1차점검 서울2사1234 --> 2차점검 999하9999
					sido	= cno.substring(0,2);
					cnoJong	= cno.substring(2,3);
					cnoUse	= cno.substring(3,4);
					num		= cno.substring(4,8);
					
					if(isNaN(sido) && !isNaN(cnoJong) && isNaN(cnoUse) && !isNaN(num)){
						return 1;
					}else{
						//ex) 999하9999
						cnoJong	= cno.substring(0,3);
						cnoUse	= cno.substring(3,4);
						num		= cno.substring(4,8);
						if(!isNaN(cnoJong) && isNaN(cnoUse) && !isNaN(num)){
							return 1;
						}else{
							return 0;
						}
						//return 0;
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
		$("#h_acode").val('');
		$("#sido").val('');
		$("#gugun").val('');
		$("#dong").val('');
		$("#h_cost2").val('');
		$("#h_cost2_total").val('');
		$("#roadaddr").val('');
		$("#detailaddress").val('');

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

		$('#tsresult_car_name').text('');
		$('#tsresult_test_type').text('');
		$('#tsresult_exp_date').text('');
		$('#tsresult_payment').text('');
		$('#result_ts').hide();

		$('#schdate').val('');
		$('#schtime').val('');
		$('#schtime_t').val('');
		$('#h_cuno').val('');
		$('#cuname').val('');

		$('#h_cpn').val('');
		$('#cpn').val('');
		$('#h_cpnp').val('0');
		$('#cpnp').val('0');
		$('#prepaid_cost').val('1000');
		//$('#member_cost').val('0');
		//$('#reorder_cost').val('0');
		$('#h_payment').val('');
		$('#payment').val('');

		$('.cpnp_text').text('0');
		$('.prepaid_cost_text').text('1000');
		//$('.member_cost_text').text('0');		회원할인은	검사초기화와 별개임
		//$('.reorder_cost_text').text('0');		재구매할인은 검사초기화와 별개임
		$('.payment_text').text('0');
		//20180219 박흥배 startdate fvdt 검사시작일
		//20180219 박흥배 middate 중간만료일
		$('#startdate').val('');
		$('#middate').val('');

	},
	loadTestInfo : function() {
		console.log("req.js 검사정보조회");
		//검사			: 주소조회 후 자동차검사정보 가져오기
		if($('#h_cost2').val() == ""){			//대행료가 없으면
			Notify.alert({
				title : '알림',
				html : '자동차를 픽업할 <b>차량위치</b>를 먼저 선택해주세요.',
				ok : function(){
					//Notify.suc('OK');
					//alert("검사소를 조회할 자동차 운행지역을 선택해 주세요.");

					var offset = $("#locationInfo").offset();
					$('html, body').animate({scrollTop : offset.top-110}, 1200);
				}
			});

			return;

		}

		if($('#detailaddress').val() == ""){
			Notify.alert({
				title : '알림',
				html : '고객님, 담당대행원이 자동차를 픽업하기 위한 <b>자동차의 주차구역 등 위치</b>를 입력해주세요.',
				ok : function(){

					var offset = $("#locationInfo").offset();
					$('html, body').animate({scrollTop : offset.top-110}, 1200);
				}
			});

			return;
		}


		var sido					=	$('#sido').val();
		var gugun				=	$('#gugun').val();	
		var dong				=	$('#dong').val();	
		var detailaddress	=	$('#detailaddress').val();	
		var bymd				=	$("#bymd").val().split("/").join("");
		var carNo				=	$("#carno").val();
		var cost2				=	$("#h_cost2").val();
		var cost2_total		=	$("#h_cost2_toal").val();


		if(carNo == ""){
			Notify.alert({
				title : '알림',
				html : '자동차 등록번호를 입력하세요.',
				ok : function(){
					$("#carno").focus();
				}
			});
			return;
		}

		if(bymd.length != 6){
			Notify.alert({
				title : '알림',
				html : '자동차등록증상 <u>소유자의 주민번호 앞 6자리(생년월일)</u>를 입력하세요.<br />※자동차가 법인소유이면 <u>법인번호</u> 앞 6자리를 입력하세요.',
				ok : function(){
					var offset = $("#testInfo").offset();
					$('html, body').animate({scrollTop : offset.top-110}, 1200);
					$("#bymd").focus();
				}
			});
			return;
		 }		
		
		$("#carno").val(carNo.split(" ").join(""));
		carNo = $("#carno").val();

		//자동차번호 형식 체크
		var checkNum = carInfo.checkCno(carNo);
		if(checkNum != 1){
			Notify.alert({
				title : '알림',
				html : '자동차등록번호의 형식이 올바르지 않습니다.',
				ok : function(){
					$("#carno").focus();
				}
			});
			return;
		}
		
		//자동차검사에 한해 아래의 정보를 처리함

		if(!$("#testInfoSwitch").is(":checked")){
			Notify.alert({
				title : '알림',
				html : '자동차검사 정보조회를 위한 주의 사항을 읽으시고 동의가 필요합니다. <br>동의를 하지 않는 경우에는 자동차검사 정보를 조회하실 수 없습니다.',
				ok : function(){
					//Notify.suc('OK');
					//alert("검사소를 조회할 자동차 운행지역을 선택해 주세요.");

					var offset = $("#testInfo").offset();
					$('html, body').animate({scrollTop : offset.top-110}, 1200);
				}
			});

			return;
		}

		$('body').loading({
			stoppable: false,
			message: '검사정보 요청중입니다.<br/>잠시만 기다려주세요.',
			theme: 'dark'
		});

		$.ajax({
			type : "post",
			url : '/p2020/data.html?act=testinfo',
			contentType : "application/x-www-form-urlencoded; charset=UTF-8",
			data : {"no1" : carNo, "no2" : bymd, "no3" : sido, "no4" : gugun, "no5" : dong, "no6" : detailaddress, "no7" : cost2},
			dataType : "json",
			success : function(data) {
				$('body').loading('stop');

				if(data.code == 0){
					$('#h_ttype').val(data.result.ttype);
					$('#h_nox_yn').val(data.result.nox_yn);
					$('#h_gsTypeCode').val(data.result.gsTypeCode);
					$('#h_gsTypeName').val(data.result.gsTypeName);

					$('#carname').val(data.result.car_nm);
					$('#ttype_title').val(data.result.ttype_title);
					$('#startdate').val(data.result.fvdt);
					$('#enddate').val(data.result.tvdt);
					$('#expdate').val(data.result.middate);
					$('#h_cost1').val(data.result.cost1);

					$('#h_bymd').val(bymd);
					$('#h_carno').val(carNo);
					$("#h_carsize").val(data.result.class);

					$('#h_owner_pnm').val(data.result.owner_pnm);
					$('#h_vin').val(data.result.vin);

					$('#h_car_maker_type').val(data.result.car_maker_type);

					$('#h_makeymd').val(data.result.make_ymd);

					if ($('#h_ttype').val() == "1") {	//정기검사이면
						var total = parseInt(data.result.cost1) + parseInt($('#h_cost2').val());	//서비스 이용료, 검사료 + 대행료					
					} else {	//정기검사가 아니면
						var total = parseInt(data.result.cost1) + parseInt($('#h_cost2_total').val());	//서비스 이용료, 검사료 + 대행료	
					}
					//console.log('수수료+대행료:'+total);

					var prepaid_cost	= $('#prepaid_cost').val();						//재구매 할인
					var member_cost = $('#member_cost').val();						//회원 할인
					var reorder_cost	= $('#reorder_cost').val();						//재구매 할인
					$('#totcost').val(parseInt(total));		
					$('#h_payment').val(total-prepaid_cost-member_cost-reorder_cost);
					$('#payment').val(setComma(total-prepaid_cost-member_cost-reorder_cost));
					$('.payment_text').text(setComma(total-prepaid_cost-member_cost-reorder_cost));
					//alert('검사정보가 처리되었습니다.');

					$('#tsresult_car_name').text(data.result.car_nm);
					$('#tsresult_test_type').text(data.result.ttype_title);
					$('#tsresult_exp_date').text(data.result.middate);
					$('#tsresult_cost_1').text('￦'+data.result.cost1.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","));
					if ($('#h_ttype').val() == "1") {	//정기검사이면
						$('#tsresult_cost_2').text('￦'+$('#h_cost2').val().toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","));
					} else {									//정기검사가 아니면
						$('#tsresult_cost_2').text('￦'+$('#h_cost2_total').val().toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","));
					}
					$('#tsresult_payment').text('￦'+total.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","));
					
					$('#result_ts').show();
					/*	
					$('#testbasicinfo1').show();
					$('#testbasicinfo2').show();
					$('#testuserinfo').show();
					$('#testcarinfo').show();
					$('#couponinfo').show();
					$('#testpayment').show();
					$('#testagreement').show();
					$('#testorderdone').show();
					*/

					//자동차검사정보 조회 후 조회된 결과로 화면을 이동
					var offset = $("#result_ts").offset();
					$('html, body').animate({scrollTop : offset.top-110}, 1200);

					//carInfo.recall_data();		//리콜조회 by p2020/recall_data/ excel file
					//carInfo.recall_cargokr();	//리콜조회 by cargokr

				} else if(data.code == 2) {		//검사기간이 아닌 경우
					$('#register_alert').modal('toggle');

					$('#detailaddress').val('검사알림서비스는 주차위치를 수집하지 않습니다');
					$('#h_bymd').val(bymd);
					$('#h_carno').val(carNo);

					$('#carname_alert_display').text(data.result.car_nm);
					//$('#expdate_alert_display').text(data.result.middate);
					$('#expdate_alert_display').text(data.result.fvdt+ ' ~ '+data.result.tvdt);
					$('#alertdate_display').text(data.result.fvdt);

					$('#expdate_alert').val(data.result.middate);
					$('#alertdate').val(data.result.fvdt);
					$('#startdate').val(data.result.fvdt);
					$('#enddate').val(data.result.tvdt);



					$('#carname_alert').val(data.result.car_nm);
					$('#startdate').val(data.result.fvdt);
					$('#enddate').val(data.result.tvdt);
					$('#expdate_alert').val(data.result.middate);
					$('#alertdate_alert').val(data.result.fvdt);

					$('#register_alert').show();
					$('#alertdone').show();

					//자동차검사정보 조회 후 조회된 결과로 화면을 이동
					//var offset = $("#register_alert").offset();
					//$('html, body').animate({scrollTop : offset.top-110}, 1200);

					//검사기간이 아닌 경우 기존 검사결과가 표시된 것이 있으면 초기화
					$('#tsresult_car_name').text('');
					$('#tsresult_test_type').text('');
					$('#tsresult_exp_date').text('');
					$('#tsresult_cost_1').text('');
					$('#tsresult_cost_2').text('');
					$('#tsresult_payment').text('');
					$('#result_ts').hide();

					//	검사기간이 아닌 경우 알림서비스를 신청하지 않고
					//	modal창을 닫고 나오는 경우 예약이 되지 않도록 차량번호와 생년월일을 지움 --> 다시 모달창이 뜨게 됨
					$('#carno').val('');
					$('#bymd').val('');

				} else {
					//검사정보 조회후 다시 시도시 실패한 경우 기존 검사결과를 초기화
					$('#tsresult_car_name').text('');
					$('#tsresult_test_type').text('');
					$('#tsresult_exp_date').text('');
					$('#tsresult_cost_1').text('');
					$('#tsresult_cost_2').text('');
					$('#tsresult_payment').text('');
					$('#result_ts').hide();

					//setTimeout('alert("'+data.message+'")', 300);
					$("#alert-message-modal .alert-img").attr('src', 'images/alert/'+data.img);
					if (data.title == "정상적인 접근이 아닙니다.") {
						var alertMainTitle	=	data.maintitle;
						data.title					=	"<h6 class='text-danger'> 한국교통안전공단의 자동차검사 정보 조회가 <u>본인인증 후 이용될 수 있도록 정책이 변경</u>되었습니다.</h6>";
					} else {
						var alertMainTitle	=	"OH! NO";
						data.title					=	data.title;
					}
					$('#alert-message-modal .alert-maintitle').html(alertMainTitle);
					$('#alert-message-modal .alert-title').html(data.title);
					$('#alert-message-modal .para-desc').html(data.message);
					if (data.title == "<h6 class='text-danger'> 한국교통안전공단의 자동차검사 정보 조회가 <u>본인인증 후 이용될 수 있도록 정책이 변경</u>되었습니다.</h6>") {
						var para_form	=	'<div class="row">'
											+	'	<div class="col-lg-12">'
											+	'		<div class="alert alert-light" style="padding: 8px 15px !important;border-radius: 6px;font-size: 14px;" role="alert">'
											+	'			<p>픽업장소 : '+ $("#roadaddr").val()+'", '+$("#carno").val()+' 자동차에 대한 상담을 이어가시겠습니까?</p>연락받으실 정보를 남겨주시면 담당자가 연락을 드리겠습니다.'
											+	'	    </div>'
											+	'	</div><!--end col-->'
											+	'	<div class="col-md-12">'
											+	'		<div class="form-group">       '                                        
											+	'			<div class="position-relative">'
											+	'				<input type="text" class="form-control " placeholder="신청인 이름" name="reserveName" required="">'
											+	'			</div>'
											+	'		</div>'
											+	'	</div>'
											+	'	<div class="col-md-12">'
											+	'		<div class="form-group">'
											+	'			<div class="position-relative">'
											+	'				<input type="text" class="form-control " placeholder="연락받으실 전화번호" name="reserveTel" required="">'
											+	'			</div>'
											+	'		</div>'
											+	'	</div>'
											+	'	<div class="col-lg-12 reserveResultDiv">'
											+	'		<div class="alert alert-light" style="padding: 8px 15px !important;border-radius: 6px;font-size: 14px;" role="alert">'
											+	'			<p class="text-muted reserveResult	mx-auto"></p>'
											+	'	    </div>'
											+	'	</div><!--end col-->'
											+	'	<div class="col-md-12">'
											+	'		<a href="javascript:void(0);" id="reserveBtn" class="btn btn-block btn-primary reserveBtn">상담예약 남기기</a>'
											+	'	</div><!--end col-->'
											+	'</div>';
											//+	'<div class="row">'
											//+	'	<div class="col-md-12 text-center">'
											//+	'		<a href="javascript:void(0);" class="btn btn-outline-primary mt-4 OpenChat">상담요청</a>'
											//+	'		<a href="javascript:void(0);" class="btn btn-primary mt-4 " data-dismiss="modal" aria-label="Close">창 닫기</a>'
											//+	'		<!--<a href="index.html" class="btn btn-outline-primary mt-4 OpenChat">상담요청</a>'
											//+	'		<a href="index.html" class="btn btn-primary mt-4 ml-2">Go To Home</a>'
											//+	'		-->'
											//+	'	</div><!--end col-->'
											//+	'</div><!--end row-->'
						$('#alert-message-modal .para-form').html(para_form);

					}
					$('.reserveResultDiv' ).hide(); //알림창에서 추가액션이 일어나는 경우, 결과를 표시하는 것을 기본으로 숨김
					$('#alert-message-modal').modal('toggle');
				}
			},
			error : function() {
				$('body').loading('stop');
					//$('#alert-message-modal .alert-img').html(data.img);
					$("#alert-message-modal .alert-img").attr('src', 'images/alert/'+data.img);
					$('#alert-message-modal .alert-title').html(data.title);
					$('#alert-message-modal .para-desc').html(data.message);
					$('#alert-message-modal').modal('toggle');
				//alert(messages.do_alert_guide);
			}
		});


	},
	recall_data : function() {	//리콜정보 가져오기

		var car_name	=	$('#carname').val();
		var mnfct_dd	=	$('#h_makeymd').val();

		var htmlFmt = "";
		$.ajax({
			type : "post",
			url : '/p2020/data.html?act=recall_data',
			contentType : "application/x-www-form-urlencoded; charset=UTF-8",
			data : {"car_name" : car_name, "mnfct_dd" : mnfct_dd },
			dataType : "json",
			success : function(data) {
				if(data.code == 0){
					$.each(data.result,function(i,v){
							//차량명, 경소중대, 국산1/수입2 구분
							//htmlFmt += '<tr onClick="carInfo.setCarName(\''+carcp+' '+v.name+'\', \''+v.csize+'\', \''+v.code.substring(0,1)+'\')">';
							htmlFmt += '<tr>';
							htmlFmt += '	<td>'+v.b_value+'</td>';
							htmlFmt += '	<td class="text-center">'+v.c_value+' ~ '+v.d_value+'</td>';
							htmlFmt += '	<td class="text-center">'+v.e_value+'</td>';
							htmlFmt += '</tr>';
					});

					$("#result_recall").show();
					$('#tblRecallData > tbody').html(htmlFmt);

					$("#tblRecallData td").hover (
						function () {
							$(this).addClass("model_list_over");
							$(this).siblings("td").addClass("model_list_over");
						},
						function () {
							$(this).removeClass("model_list_over");
							$(this).siblings("td").removeClass("model_list_over");
						}
					);

			
				}else{
					htmlFmt += '<tr>';
					htmlFmt += '<td class="text-center" colspan="3">공공데이터에 일치하는 리콜정보가 없습니다. 자동차 리콜센터에서 리콜상태등 자세한 정보를 확인할 수 있습니다.</td>';
					htmlFmt += '</tr>';

					$("#result_recall").show();
					$('#tblRecallData > tbody').html(htmlFmt);
				}
			},
			error : function() {
				alert(data.message);
			}
		});
	},
	recall_cargokr : function() {	//리콜정보 가져오기

		var carno	=	$('#h_carno').val();

		var htmlFmt = "";
		$.ajax({
			type : "post",
			url : '/p2020/data.html?act=recall_cargokr',
			contentType : "application/x-www-form-urlencoded; charset=UTF-8",
			data : {"carno" : carno },
			dataType : "json",
			success : function(data) {
				if(data.code == 0){
				
							//차량명, 경소중대, 국산1/수입2 구분
							//htmlFmt += '<tr onClick="carInfo.setCarName(\''+carcp+' '+v.name+'\', \''+v.csize+'\', \''+v.code.substring(0,1)+'\')">';
							htmlFmt += '<tr>';
							htmlFmt += '	<td class="text-danger">차량에 조치가 필요한 리콜정보가 있습니다. 필요하신 경우 딜리버리서비스를 이용하실수 있습니다.</td>';
							htmlFmt += '</tr>';


					$("#result_recall").show();
					$('#tblRecallData > tbody').html(htmlFmt);

					$("#tblRecallData td").hover (
						function () {
							$(this).addClass("model_list_over");
							$(this).siblings("td").addClass("model_list_over");
						},
						function () {
							$(this).removeClass("model_list_over");
							$(this).siblings("td").removeClass("model_list_over");
						}
					);

			
				}else{
					htmlFmt += '<tr>';
					htmlFmt += '<td>차량에 해당하는 리콜정보가 없습니다</td>';
					htmlFmt += '</tr>';

					$("#result_recall").show();
					$('#tblRecallData > tbody').html(htmlFmt);
				}
			},
			error : function() {
				alert(data.message);
			}
		});
	},
	openCarLocationInfo : function(){
		$('#carLocationInfoLayer').show();
	},
	closeCarLocationInfo : function(){
		//$('#carLocationInfoLayer').removeClass("show");
		$('#carLocationInfoLayer').modal('toggle');
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
			url : '/p2020/data.html?act=model',
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
			$('#locTable > tbody').html('');
			alert("시/도를 선택해주세요");
			return false;
		}
		
		if(depthno == 2) {

		} else if (depthno == 3) {
			depthno = 3;
			locGugun = $('#locGugun').val();
			if(locGugun == '') {
				$('#locDong').html('');
				//$('#locTable > tbody').html('');
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
			url : '/p2020/data.html?act=area',
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
							/*
							if(v.acnt > 0) {
								if (h_stype == 1) {
									area_service_type_value="<font color=blue>가능</font>";
									htmlFmt += '<tr onClick="carInfo.setCarLocation(\''+v.acode+'\',\''+v.sido+'\',\''+v.gugun+'\',\''+v.dong+'\',\''+v.cost+'\',\''+v.cost_delivery+'\',\''+v.cost_premium+'\')"><td>'+v.sido+'</td><td>'+v.gugun+'</td><td>'+v.dong+'</td><td>'+area_service_type_value+'</td></tr>';
								}
								dongcount +=1;
							} else {
								htmlFmt += '<tr></td><td>'+v.sido+'</td><td>'+v.gugun+'</td><td>'+v.dong+'</td><td><font color="red">준비중</font></tr>';
							}
							*/
							if(v.acnt > 0) {
								if (h_stype == 1) {

									//htmlFmt +='<option value="'+v.acode+'" cost="'+v.cost+'" atype="'+v.area_test_type+'">'+v.dong+'</option>';

									//area_service_type_value='<font color=blue>가능</font>';
									htmlFmt += '<div class="col-lg-3 col-md-4 col-6 mt-3" style="cursor:pointer" onClick="carInfo.setCarLocation(\''+v.acode+'\',\''+v.sido+'\',\''+v.gugun+'\',\''+v.dong+'\',\''+v.cost+'\',\''+v.cost_total+'\',\''+v.cost_delivery+'\',\''+v.cost_premium+'\')">';
									htmlFmt += '<div class="d-flex p-3 rounded shadow bg-white">';
									htmlFmt += '<div class="content">';
									htmlFmt += '<h6 class="title small mb-0">'+v.dong+'</h6>';
									htmlFmt += '</div>';
									htmlFmt += '</div>';
									htmlFmt += '</div><!--end col-->';
									//htmlFmt += '<tr onClick="carInfo.setCarLocation(\''+v.acode+'\',\''+v.sido+'\',\''+v.gugun+'\',\''+v.dong+'\',\''+v.cost+'\',\''+v.cost_delivery+'\',\''+v.cost_premium+'\')"><td>'+v.sido+'</td><td>'+v.gugun+'</td><td>'+v.dong+'</td><td>'+area_service_type_value+'</td></tr>';
								}
								dongcount +=1;
							} else {
								htmlFmt += '<div class="col-lg-4 col-md-3 col-4 mt-3">';
								htmlFmt += '<div class="d-flex p-3 rounded shadow bg-white">';
								htmlFmt += '<div class="content">';
								htmlFmt += '<h6 class="title small mb-0">'+v.dong+' 준비중</h6>';
								htmlFmt += '</div>';
								htmlFmt += '</div>';
								htmlFmt += '</div><!--end col-->';
								//htmlFmt += '<tr></td><td>'+v.sido+'</td><td>'+v.gugun+'</td><td>'+v.dong+'</td><td><font color="red">준비중</font></tr>';
							}
						}
					});

					if(depthno == 2) {
						$('#locGugun').children().remove().end().append('<option value="">선택하세요</option>' + htmlFmt);
						//$('#locTable > tbody').html("");
						$('#locTable').html("");
						//carInfo.loadAgentArea(3);
					} else {
						//$('#locTable > tbody').html(htmlFmt);
						var locTableNoti = "<div class='col-md-12 mt-2'>";
							locTableNoti += "	<div class='d-flex p-3 bg-white'>";
							locTableNoti += "		<p class='text-muted mb-0'>";
							locTableNoti += "			<span class='badge badge-pill badge-warning'>주의</span>";
							locTableNoti += "			대행을 의뢰하실 지역이 표시되지 않는 경우에는 고객센터 1577-0266으로 문의하시면 최대한 도와드릴 수 있도록 하겠습니다.";
							locTableNoti += "		</p>";
							locTableNoti += "</div>";
							locTableNoti += "</div>";

						$('#locTable').html(htmlFmt+locTableNoti);
						if (dongcount > 4) {
							//var counttext= "<img src='../images/scroll_down.gif' width='100px' style='margin:0 auto  5px auto'>";
							//var counttext= "▶"+dongcount+"개의 행정동을 찾았습니다. 아래로 스크롤하면 더 많은 지역을 볼 수 있습니다.";
							var counttext= "▼ 아래로 스크롤하면 모두 "+dongcount+"개의 지역을 볼 수 있습니다.";
						} else {
							var counttext= "";
						}
						$('#locationbox').html(counttext);
						$("#locTable td").hover (
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
				alert("정보 조회가 실패하였습니다.");
			}
		});
	},
	setCarLocation : function(a, s, g, d, c, ct, cd, p) { //지역코드, 시도, 시군구, 동, B2C대행료정기, B2C대행료정기외, Delivery대행료, Premium대행료
		$("#detailaddress").val('');

		if($("#h_stype").val() == 1) {		//자동차검사는 주소입력이 가장 첫단계이므로, 기존에 입력된 값들을 초기화 한다
			carInfo.initTestInfo();
		}
		$("#h_acode").val(a);
		$("#sido").val(s);
		$("#gugun").val(g);
		$("#dong").val(d);
		$("#h_cost2").val(c);
		$("#h_cost2_total").val(ct);
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
			$('html, body').animate({scrollTop : offset.top-110}, 1200);

			$("#sido").focus();
			return;
		}

		if($('#pickup_address_lnbrMnnm_lnbrSlno').val() == ""){
			alert("건물명 호수 등을 제외한 번지를 입력하세요.");

			var offset = $("#locationInfo").offset();
			$('html, body').animate({scrollTop : offset.top-110}, 1200);

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
		//alert ('일정을 선택하세요');
		var vSido					= $('#sido').val().split(" ").join("");
		var vGugun				= $('#gugun').val().split(" ").join("");
		var vDong					= $('#dong').val().split(" ").join("");
		var vAcode					= $('#h_acode').val().split(" ").join("");
		var vStartDate				= $('#startdate').val();						//검사시작일
		var vEndDate				= $('#enddate').val();						//검사종료일

		var vCarmaker_type		= $('#h_car_maker_type').val();		//국산수입구분
		var vConditionLayer		= 1;											//필수값 체크 후 검사희망일레이어 띄우기 여부 

		if (vAcode == '' || vSido==''){
			Notify.alert({
				title : '알림',
				html : '자동차를 픽업할 <b>차량위치</b>를 먼저 선택해주세요.',
				ok : function(){
					//Notify.suc('OK');
					//alert("검사소를 조회할 자동차 운행지역을 선택해 주세요.");

					var offset = $("#locationInfo").offset();
					$('html, body').animate({scrollTop : offset.top-110}, 1200);
				}
			});
			return;
		}

		if($('#h_ttype').val() =='') {
			Notify.alert({
				title : '알림',
				html : '검사정보가 없습니다.<br />조회를 하신 후 이용해주시기 바랍니다..',
				ok : function(){
					//Notify.suc('OK');
					//alert("검사소를 조회할 자동차 운행지역을 선택해 주세요.");

					var offset = $("#testInfo").offset();
					$('html, body').animate({scrollTop : offset.top-110}, 1200);
				}
			});
			return;
		}

		if($('#h_car_maker_type').val() =='') {
			alert("자동차모델을 선택해야 합니다.\n\n조회를 하신 후 이용해주시기 바랍니다.");
			return;
		}

		$('#txtSch_sido').val(vSido);
		$('#txtSch_gugun').val(vGugun);
		$('#txtSch_dong').val(vDong);
		$('#txtSch_address').val(vSido+' '+vGugun+' '+vDong);
		selDate = $('#h_today').val();	//검사예약이 가능한 날짜 (today+환경설정:1일)

		if (selDate <= vStartDate) {
			selDate	=	vStartDate;
		}

		$('#hopeSchDate').val(selDate);

		//검사예약일 선택 레이어가 활성화될 때 이전, 다음버튼의 선택가능유무 결정
		//이전, 다음 클릭이벤트에도 계속해서 이전, 다음버튼이 활성화될지 결정해주어야 함
		console.log('검사종류:'+ $('#ttype_title').val()+','+'선택된날:'+ $('#hopeSchDate').val()+','+'검사시작일:'+ $('#startdate').val()+','+'검사종료일:'+ $('#enddate').val()+','+'픽업예약모달의 시작일자'+ $('#h_today').val());
		if ($('#hopeSchDate').val() <= $('#startdate').val() || $('#hopeSchDate').val() <= $('#h_today').val()) {
			$('#btnPrev').attr('disabled', true);
		} else {
			$('#btnPrev').attr('disabled', false);
		}
		


		if($('#hopeSchDate').val() >= $('#enddate').val() ) {
			if($('#ttype_title').val() == '정기검사' ) {
				alert('예약가능한 날짜가 검사기간을 경과하여 검사종류가 변경될 수 있습니다.\n계속해서 접수를 원하시면 고객센터 1577-0266 을 통해서 접수를 진행해주세요.');
				$('#btnCloseScheduleAgent').trigger('click');
				return false;
			}
		}
		
		$('#scheduleAgentLayer').modal('toggle');

		schedule.callSchData('/p2020/data.html?act=schagent&ac=' + vAcode, selDate, vAcode, 0, vCarmaker_type);
		//https://mingmi-programming.tistory.com/86 참고

		//시작 접수일 기준으로 각 상황에 따라 메세지를 보여주기 위해 추가 2018-04-19 박흥배
		var today		= new Date();
		var yyyy			= today.getFullYear();
		var mm			= today.getMonth()+1; //January is 0!
		var dd			= today.getDate();
		if(dd<10) {
			dd='0'+dd;
		} 
		if(mm<10) {
			mm='0'+mm;
		} 
		var startDate	= moment().add($('#h_rv_scnt').val(), 'days').toDate();
		//var startDate	= today.setDate(today.getDate()+$('#h_rv_scnt').val());
		//console.log('오늘+1일'+startDate);


		if (startDate <= moment(vStartDate).toDate()) { 		// 예약가능일 (오늘+1일) 이 검사시작일이거나 빠르면(아직 검사일이 아니면)
			startDate = moment(vStartDate).toDate();			// 예약가능일을 검사시작일로 설정한다.
		}

		var endDate	= moment(startDate).add($('#h_rv_ecnt').val(), 'days').toDate();
		if (endDate < moment(vEndDate).toDate()) {						// 예약가능최종일(시작일+30일)이 검사만료일보자 작으면(종료일 이후까지 검사일이 남아 있으면)
			endDate = moment(vEndDate).toDate();				// 예약가능최종일을 검사만료일로 설정한다.
		}
		//console.log('예약가능일'+startDate+','+'검사시작일'+(startDate)+','+'검사종료일'+(endDate));
		today = yyyy+'-'+mm+'-'+dd;

		$('#hopeSchDate').datepickerInFullscreen({
        
			// Options
			touchSwipe				:   true,
			effect							:   '13', // 1 or 2 or 3 or 5 or 6 up to 16
			blockScroll					:   true,
			closeOnChange			:   true,
			format						:   'YYYY-MM-DD', // YYYY-MM-DD
			additionalTarget			:   '',
			additionalTargetFormat		:   'YYYY-MM-DD',
			fakeInput					:   true,
			fakeInputFormat			:   'YYYY-MM-DD',
			todayWord					:   '오늘',
			clearWord					:   '삭제',
			closeWord					:   '닫기',
			template                    :   '<div class="datepicker-in-fullscreen-modal"> ' +
                                            '	<div class="datepicker-in-fullscreen-content"> ' +
                                            '		<div class="datepicker-in-fullscreen"></div> ' +
                                            '		<div class="datepicker-in-fullscreen-controls"> ' +
                                            //'			<a class="dpifs-today" style="width:49.5%;">{{today}}</a>'+
                                            //'			<a class="dpifs-clear">{{clear}}</a>'+
                                            //'			<a class="dpifs-close" style="width:49.5%;">{{close}}</a> ' +
                                            '			<a class="dpifs-close" style="width:99.5%;">{{close}}</a> ' +
                                            '		</div> ' +
                                            '	</div> ' +   
											'</div> '+
											'<div class="datepicker-in-fullscreen-background"></div> ',			// Datepicker options
			datepicker						:   {
												calendarWeeks			:   false,
												datesDisabled			:   disabledDays, //[],
												daysOfWeekDisabled		:   [0],
												daysOfWeekHighlighted	:   [],
												startDate				:   startDate,
												endDate					:   endDate,
												maxViewMode				:   2, // centuries
												minViewMode				:   0, // days
												startView				:   0, // days
												language                :   'ko',
												templates               :   {
																			leftArrow: '«',
																			rightArrow: '»'
																			},
												title                       :  '예약일',
												todayHighlight              :  false,
												weekStart                   :  0, // sunday
											},
	 
			// Events
	 
			beforeOpen                  : function(modal, settings){},
			beforeClose                 : function(modal, settings){},
			onChange                    : function(modal, settings){
				selDate =  $('#hopeSchDate').val();

				if ($('#enddate').val() < today) {
				} else {
					if(selDate > $('#enddate').val() ) {
						if($('#ttype_title').val() == '정기검사' ) {
							alert('달력에서 선택한 예약일' + selDate +' 은 최종만료일' +$('#enddate').val()+' 을 경과하여 검사종류가 변경될 수 있습니다.\n다른 날짜를 선택하시거나 선택하신 날짜로 예약을 원하시면 고객센터 1577-0266 에서 접수를 진행해주세요.');
							$('#scheduleAgentLayer').modal('toggle');		
							return false;
						} 
					}
				}
				// 종료 접수일 기준으로 각 상황에 따라 메세지를 보여주기 위해 추가 2018-04-19 박흥배

				vAcode = $('#h_acode').val().split(" ").join("");
				schedule.callSchData('/p2020/data.html?act=schagent&ac=' + vAcode, selDate, vAcode, 0, vCarmaker_type);

				//검사예약일 선택 레이어가 활성화될 때 이전, 다음버튼의 선택가능유무 결정
				//이전, 다음 클릭이벤트에도 계속해서 이전, 다음버튼이 활성화될지 결정해주어야 함
				console.log('선택된날'+ $('#hopeSchDate').val()+','+'검사시작일'+ $('#startdate').val()+','+'오늘'+ $('#h_today').val());
				if ($('#hopeSchDate').val() <= $('#startdate').val() || $('#hopeSchDate').val() <= $('#h_today').val()) {
					$('#btnPrev').attr('disabled', true);
				} else {
					$('#btnPrev').attr('disabled', false);
				}

			},  
	 
		}); 

	},


	openSchAgent_test: function(){
		//alert ('일정을 선택하세요');
		var vSido					= $('#sido').val().split(" ").join("");
		var vGugun				= $('#gugun').val().split(" ").join("");
		var vDong					= $('#dong').val().split(" ").join("");
		var vAcode					= $('#h_acode').val().split(" ").join("");
		var vStartDate				= $('#startdate').val();						//검사시작일
		var vEndDate				= $('#enddate').val();						//검사종료일

		var vCarmaker_type		= $('#h_car_maker_type').val();		//국산수입구분
		var vConditionLayer		= 1;											//필수값 체크 후 검사희망일레이어 띄우기 여부 

		if (vAcode == '' || vSido==''){
			Notify.alert({
				title : '알림',
				html : '자동차를 픽업할 <b>차량위치</b>를 먼저 선택해주세요.',
				ok : function(){
					//Notify.suc('OK');
					//alert("검사소를 조회할 자동차 운행지역을 선택해 주세요.");

					var offset = $("#locationInfo").offset();
					$('html, body').animate({scrollTop : offset.top-110}, 1200);
				}
			});
			return;
		}

		if($('#h_ttype').val() =='') {
			Notify.alert({
				title : '알림',
				html : '검사정보가 없습니다.<br />조회를 하신 후 이용해주시기 바랍니다..',
				ok : function(){
					//Notify.suc('OK');
					//alert("검사소를 조회할 자동차 운행지역을 선택해 주세요.");

					var offset = $("#testInfo").offset();
					$('html, body').animate({scrollTop : offset.top-110}, 1200);
				}
			});
			return;
		}

		if($('#h_car_maker_type').val() =='') {
			alert("자동차모델을 선택해야 합니다.\n\n조회를 하신 후 이용해주시기 바랍니다.");
			return;
		}

		$('#txtSch_sido').val(vSido);
		$('#txtSch_gugun').val(vGugun);
		$('#txtSch_dong').val(vDong);
		$('#txtSch_address').val(vSido+' '+vGugun+' '+vDong);
		selDate = $('#h_today').val();	//검사예약이 가능한 날짜 (today+환경설정:1일)

		if (selDate <= vStartDate) {
			selDate	=	vStartDate;
		}

		$('#hopeSchDate').val(selDate);

		//검사예약일 선택 레이어가 활성화될 때 이전, 다음버튼의 선택가능유무 결정
		//이전, 다음 클릭이벤트에도 계속해서 이전, 다음버튼이 활성화될지 결정해주어야 함
		console.log('검사종류:'+ $('#ttype_title').val()+','+'선택된날:'+ $('#hopeSchDate').val()+','+'검사시작일:'+ $('#startdate').val()+','+'검사종료일:'+ $('#enddate').val()+','+'오늘'+ $('#h_today').val());

		if ($('#hopeSchDate').val() <= $('#startdate').val() || $('#hopeSchDate').val() <= $('#h_today').val()) {
			$('#btnPrev').attr('disabled', true);
		} else {
			$('#btnPrev').attr('disabled', false);
		}
		


		if($('#hopeSchDate').val() >= $('#enddate').val() ) {
			if($('#ttype_title').val() == '정기검사' ) {
				alert('예약가능한 날짜가 검사기간을 경과하여 검사종류가 변경될 수 있습니다.\n계속해서 접수를 원하시면 고객센터 1577-0266 을 통해서 접수를 진행해주세요.');
				$('#btnCloseScheduleAgent').trigger('click');
				return false;
			}
		}
		
		$('#scheduleAgentLayer').modal('toggle');

		schedule.callSchData('/p2020/data.html?act=schagent&ac=' + vAcode, selDate, vAcode, 0, vCarmaker_type);
		//https://mingmi-programming.tistory.com/86 참고

		//시작 접수일 기준으로 각 상황에 따라 메세지를 보여주기 위해 추가 2018-04-19 박흥배
		var today		= new Date();
		var yyyy			= today.getFullYear();
		var mm			= today.getMonth()+1; //January is 0!
		var dd			= today.getDate();
		if(dd<10) {
			dd='0'+dd;
		} 
		if(mm<10) {
			mm='0'+mm;
		} 
		var startDate	= moment().add($('#h_rv_scnt').val(), 'days').toDate();
		//var startDate	= today.setDate(today.getDate()+$('#h_rv_scnt').val());
		//console.log('오늘+1일'+startDate);


		if (startDate <= moment(vStartDate).toDate()) { 		// 예약가능일 (오늘+1일) 이 검사시작일이거나 빠르면(아직 검사일이 아니면)
			startDate = moment(vStartDate).toDate();			// 예약가능일을 검사시작일로 설정한다.
		}

		var endDate	= moment(startDate).add($('#h_rv_ecnt').val(), 'days').toDate();
		if (endDate < moment(vEndDate).toDate()) {						// 예약가능최종일(시작일+30일)이 검사만료일보자 작으면(종료일 이후까지 검사일이 남아 있으면)
			endDate = moment(vEndDate).toDate();				// 예약가능최종일을 검사만료일로 설정한다.
		}
		//console.log('예약가능일'+startDate+','+'검사시작일'+(startDate)+','+'검사종료일'+(endDate));
		today = yyyy+'-'+mm+'-'+dd;

		$('#hopeSchDate').datepickerInFullscreen({
        
			// Options
			touchSwipe				:   true,
			effect							:   '13', // 1 or 2 or 3 or 5 or 6 up to 16
			blockScroll					:   true,
			closeOnChange			:   true,
			format						:   'YYYY-MM-DD', // YYYY-MM-DD
			additionalTarget			:   '',
			additionalTargetFormat		:   'YYYY-MM-DD',
			fakeInput					:   true,
			fakeInputFormat			:   'YYYY-MM-DD',
			todayWord					:   '오늘',
			clearWord					:   '삭제',
			closeWord					:   '닫기',
			template                    :   '<div class="datepicker-in-fullscreen-modal"> ' +
                                            '	<div class="datepicker-in-fullscreen-content"> ' +
                                            '		<div class="datepicker-in-fullscreen"></div> ' +
                                            '		<div class="datepicker-in-fullscreen-controls"> ' +
                                            //'			<a class="dpifs-today" style="width:49.5%;">{{today}}</a>'+
                                            //'			<a class="dpifs-clear">{{clear}}</a>'+
                                            //'			<a class="dpifs-close" style="width:49.5%;">{{close}}</a> ' +
                                            '			<a class="dpifs-close" style="width:99.5%;">{{close}}</a> ' +
                                            '		</div> ' +
                                            '	</div> ' +   
											'</div> '+
											'<div class="datepicker-in-fullscreen-background"></div> ',			// Datepicker options
			datepicker						:   {
												calendarWeeks			:   false,
												datesDisabled			:   disabledDays, //[],
												daysOfWeekDisabled		:   [0],
												daysOfWeekHighlighted	:   [],
												startDate				:   startDate,
												endDate					:   endDate,
												maxViewMode				:   2, // centuries
												minViewMode				:   0, // days
												startView				:   0, // days
												language                :   'ko',
												templates               :   {
																			leftArrow: '«',
																			rightArrow: '»'
																			},
												title                       :  '예약일',
												todayHighlight              :  false,
												weekStart                   :  0, // sunday
											},
	 
			// Events
	 
			beforeOpen                  : function(modal, settings){},
			beforeClose                 : function(modal, settings){},
			onChange                    : function(modal, settings){
				selDate =  $('#hopeSchDate').val();

				if ($('#enddate').val() < today) {
				} else {
					if(selDate > $('#enddate').val() ) {
						if($('#ttype_title').val() == '정기검사' ) {
							alert('달력에서 선택한 예약일' + selDate +' 은 최종만료일' +$('#enddate').val()+' 을 경과하여 검사종류가 변경될 수 있습니다.\n다른 날짜를 선택하시거나 선택하신 날짜로 예약을 원하시면 고객센터 1577-0266 에서 접수를 진행해주세요.');
							$('#scheduleAgentLayer').modal('toggle');		
							return false;
						} 
					}
				}
				// 종료 접수일 기준으로 각 상황에 따라 메세지를 보여주기 위해 추가 2018-04-19 박흥배

				vAcode = $('#h_acode').val().split(" ").join("");
				schedule.callSchData('/p2020/data.html?act=schagent&ac=' + vAcode, selDate, vAcode, 0, vCarmaker_type);

				//검사예약일 선택 레이어가 활성화될 때 이전, 다음버튼의 선택가능유무 결정
				//이전, 다음 클릭이벤트에도 계속해서 이전, 다음버튼이 활성화될지 결정해주어야 함
				console.log('선택된날'+ $('#hopeSchDate').val()+','+'검사시작일'+ $('#startdate').val()+','+'오늘'+ $('#h_today').val());
				if ($('#hopeSchDate').val() <= $('#startdate').val() || $('#hopeSchDate').val() <= $('#h_today').val()) {
					$('#btnPrev').attr('disabled', true);
				} else {
					$('#btnPrev').attr('disabled', false);
				}

			},  
	 
		}); 

	},

	//예약일정변경
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
			
			var offset = $("#locationInfo").offset();
			$('html, body').animate({scrollTop : offset.top-110}, 1200);

			//$("#btnCarLoc").focus();

			return;
		}
		$('#txtSch_sido').val(vSido);
		$('#txtSch_gugun').val(vGugun);
		$('#txtSch_dong').val(vDong);
		$('#txtSch_address').val(vSido+' '+vGugun+' '+vDong);

		//alert(vSchdate + '예약일을 변경합니다');
		$('#hopeSchDate').val(vSchdate);

		var enddate =	$('#enddate').val();
		//alert (enddate);
		
		selDate = vSchdate;
		//selDate = $('#h_today').val();	
		schedule.callSchData('/p2020/data.html?act=schagentchange&ac=' + vAcode, vSchdate, vAcode, vCuno, vCarmaker_type);

		//Flatpickr
		
		var today = new Date();
		var tomorrow = new Date();
		tomorrow.setDate(today.getDate() + 1);

		$("#hopeSchDate").flatpickr({
			defaultDate	:selDate,
			minDate		: new Date().fp_incr($('#h_rv_scnt').val()), // 14 days from now
			maxDate		: new Date().fp_incr($('#h_rv_ecnt').val()), // 한달일 경우 +1m 
			disable: disabledDays,
			/*
			disable: [
				//disabledDays,
				"2020-01-01","2020-01-24","2020-01-25","2020-01-26","2020-01-27","2020-04-15","2020-04-30","2020-05-01","2020-05-05","2020-06-06","2020-08-15","2020-09-30","2020-10-01","2020-10-02","2020-10-03","2020-10-09","2020-12-25","2020-00-00",
				function(date) {
					// return true to disable
					//return (date.getDay() === 0 || date.getDay() === 6);
					return (date.getDay() === 0);
				}				
			],
			*/
			locale: "ko",
			//altInput: true,
			//altFormat: "Y-m-d",
			dateFormat: "Y-m-d",
			onChange: function(selectedDates, dateText, instance) {
				selDate = dateText;
				//alert(selDate);
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

				if (enddate < today) {
				} else {
					if(selDate > enddate ) {
						if($('#stype').val() == '정기검사' ) {
							alert('선택한 '+selDate+ '은 최종만료일'+enddate+' 을 경과하여 검사종류와 검사료가 변경될 수 있습니다.\n다른 날짜를 선택하시거나 선택하신 날짜로 예약을 원하시면 고객센터 1577-0266 에서 접수를 진행해주세요.');
							$('#scheduleAgentLayer').modal('toggle');
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
				schedule.callSchData('/p2020/data.html?act=schagentchange&ac=' + vAcode, dateText, vAcode, vCuno, vCarmaker_type);
			}
		});
		

		/*
		$('.date-pick2').datepicker({
			dateFormat: "yy-mm-dd",
			dayNamesMin: ["일", "월", "화", "수", "목", "금", "토"],
			monthNames : ["1월", "2월", "3월", "4월", "5월", "6월", "7월", "8월", "9월", "10월", "11월", "12월"],
			monthNamesShort : ["1월", "2월", "3월", "4월", "5월", "6월", "7월", "8월", "9월", "10월", "11월", "12월"],
			showOn: "both",
			buttonImage: '',
			buttonImageOnly: false,
			minDate: ('+' + $('#h_rv_scnt').val()),
			maxDate: ('+' + $('#h_rv_ecnt').val()),	// 한달일 경우 +1m 
			beforeShowDay: schedule.disableAllTheseDays,
			onSelect: function(dateText, inst) {
				selDate = dateText;
				//alert(selDate);
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

				if (enddate < today) {
				} else {
					if(selDate > enddate ) {
						if($('#stype').val() == '정기검사' ) {
							alert('선택한 '+selDate+ '은 최종만료일'+enddate+' 을 경과하여 검사종류와 검사료가 변경될 수 있습니다.\n다른 날짜를 선택하시거나 선택하신 날짜로 예약을 원하시면 고객센터 1577-0266 에서 접수를 진행해주세요.');
							$('#scheduleAgentLayer').modal('toggle');
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
				schedule.callSchData('/p2020/data.html?act=schagentchange&ac=' + vAcode, dateText, vAcode, vCuno, vCarmaker_type);
			}
		});
		*/
	},
	callSchData: function(v_url, v_date, v_code, v_cuno, vCarmaker_type){
		var vCarmaker_type = $('#h_car_maker_type').val();	//국산수입구분, 차모델선택 후 담당대행원을 다시 선택할때 국산수입에 따라, 변경된 국산수입담당자를 적용하기 위해 국산수입구분을 가져옴
		//alert (vCarCode);
		$.ajax({
			type : "post",
			url : v_url,
			contentType : "application/x-www-form-urlencoded; charset=UTF-8",
			data : {
				"mode" : "GET"
				, "sdate" : v_date
				, "acode" : v_code
				, "cuno" : v_cuno
				, "v_car_maker_type" : vCarmaker_type
			},
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
		$('html, body').animate({scrollTop : offset.top-110}, 1200);
		//$("#name").focus();
	},
	closeSchAgent: function(){
		$('#scheduleAgentLayer').modal('toggle');

		//$.magnificPopup.close();return false;
		$("#schdate").focus();
		//$('#scheduleAgentLayer').hide();
		//$('#btnCloseScheduleAgent').trigger('click');
	},
	getModel : function(depthno) {

		var htmlFmt = "";
		
		//Log($('#carcp').val());

		 $.ajax({
			type : "post",
			url : '/p2020/data.html?act=model',
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
//	자동차검사 알림서비스 
AlertInfo = {
	validation : function(){
		
		//픽업지역 정보	
		if($('#sido').val() == '' || $('#gugun').val() == '' || $('#dong').val() == '') {
			alert(messages.do_alert_location);
			$('#sido').focus();
			return;
		}

		if($('#detailaddress').val() == '') {
			alert(messages.do_alert_detailaddress);
			$('#detailaddress').focus();
			return;
		}

		//검사대행이면
		if($('#h_stype').val() == '1') {
			//검사알림 정보가 없으면 : 취소
			if($('#carname_alert').val() == '' || $('#expdate_alert').val() == '' || $('#alertdate_alert').val() == '') {
				alert(messages.do_alert_test_info);
				$('#bymd').focus();
				return;
			}

			//입력폼의 자동차번호/소유자생년월일 vs 조회된 자동차번호/소유자생년월일이 다를 경우 : 취소
			/*
			if($('#h_carno').val() != $('#carno').val() || $('#h_bymd').val() != $('#bymd').val()) {
				alert("[검사기초정보]\n조회한 정보가 다릅니다.");
				$('#bymd').focus();
				return;
			}
			*/
		}

		var carNo = $('#h_carno').val();
		 $("#h_carno").val(carNo.split(" ").join(""));

		if($('#h_carno').val() == '' ) {
			alert("차량번호를 입력해 주세요.");
			$('#carno').focus();
			return;
		}

		//자동차번호 형식 체크
		var checkNum = carInfo.checkCno($('#h_carno').val());
		if(checkNum != 1){
			alert("자동차번호 형식이 올바르지 않습니다.");
			$('#h_carno').focus();
			return;
		 }

		//알림서비스 신청자 이름
		var name_alert = $("#name_alert").val();

		if( name_alert.length < 1 || name_alert.length > 20 ) {
			alert(messages.do_input_name);

			var offset = $("#register_alert").offset();
			$('html, body').animate({scrollTop : offset.top-110}, 1200);

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

		//알림받을 휴대전화번호 체크
		if(!checkTel($("#tel1_alert").val(),'' ,'')) {
			alert(messages.do_alert_mobile_wrong + "\n" + messages.do_alert_mobile_wrong1);
			$('#tel1_alert').focus();
			return;
		}

		//이메일체크 (req.js : 6 에서 기본값 y처리됨, 향후를 위해서 살려둠
	    if(emailCheckStatus != "y") {
			alert(messages.do_invalid_email);
			$('#email').focus();
			return;
		}

		if(!$('#alertChk').is(":checked")){
			alert(messages.do_agree_requirement_03);
			return ;
		}

		AlertInfo.alertSave();

	},
	alertSave : function() {

		$.ajax({
			type : "post",
			url : '/p2020/data.html?act=alert',
			contentType : "application/x-www-form-urlencoded; charset=UTF-8",
			data : {
				"h_stype"			: $('#h_stype').val(), 
				"h_bymd"			: $('#h_bymd').val(), 
				"h_carno"			: $('#h_carno').val(), 
				"h_acode"			: $('#h_acode').val(), 
				"sido"				: $('#sido').val(), 
				"gugun"				: $('#gugun').val(), 
				"dong"				: $('#dong').val(), 
				"carno"				: $('#carno').val(), 
				"bymd"				: $('#bymd').val(), 
				"tsChk"				: $('#testInfoSwitch').val(), 

				"carname_alert"	: $('#carname_alert').val(), 
				"expdate_alert"	: $('#expdate_alert').val(), 
				"startdate"			: $('#startdate').val(), 
				"enddate"			: $('#enddate').val(), 
				"alertdate_alert"	: $('#alertdate_alert').val(), 
				"name_alert"		: $('#name_alert').val(), 
				"tel1_alert"			: $('#tel1_alert').val(), 
				"alertChk"			: $('#alertChk').val()
			},
			dataType : "json",
			success : function(data, status) {

				if(data.result == "0000"){

					var f = document.alertResultForm;
					f.elements["name_result"].value		= $('#name_alert').val();
					f.elements["tel1_result"].value			= $('#tel1_alert').val();
					f.elements["carname_result"].value	= $('#carname_alert').val();
					f.elements["expdate_result"].value	= $('#expdate_alert').val();
					f.elements["alertdate_result"].value	= $('#alertdate_alert').val();
					f.target = '_self';
					f.method = 'post';
					f.enctype = "application/x-www-form-urlencoded";
					f.action = './p_test_alert_ok.html';
					f.submit();

				}else{
					alert(data.message);
				}
			},
			error: function(){
				alert("오류발생 : 잠시후에 이용해 주시기 바랍니다.");
			}    
		});
		

		//Actiojn은 검사알림 서비스
		/* 기존 Form submit 소스
		$('#act').val('alert');

		$('#submitAlertForm').ajaxForm({
			beforeSubmit: function (data,form,option) {
				return true;
			},
			url:"/p2020/data.html",
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
		*/
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
			Notify.alert({
				title : '알림',
				html : messages.do_alert_location,
				ok : function(){
					//Notify.suc('OK');
					//alert("검사소를 조회할 자동차 운행지역을 선택해 주세요.");

					var offset = $("#locationInfo").offset();
					$('html, body').animate({scrollTop : offset.top-110}, 1200);
					$('#btnexecDaumPostcode').focus();
				}
			});
			return;
			//alert(messages.do_alert_location);
			//$('#sido').focus();
			//return;
		}

		if($('#detailaddress').val() == '') {
			Notify.alert({
				title : '알림',
				html : messages.do_alert_detailaddress,
				ok : function(){
					//Notify.suc('OK');
					//alert("검사소를 조회할 자동차 운행지역을 선택해 주세요.");

					var offset = $("#locationInfo").offset();
					$('html, body').animate({scrollTop : offset.top-110}, 1200);
					$('#detailaddress').focus();
				}
			});
			return;
		}

		if($('#h_stype').val() == '1') {
			if($('#h_ttype').val() == '') {
				Notify.alert({
					title : '알림',
					html : messages.do_alert_test_info,
					ok : function(){
						//Notify.suc('OK');
						//alert("검사소를 조회할 자동차 운행지역을 선택해 주세요.");

						var offset = $("#testInfo").offset();
						$('html, body').animate({scrollTop : offset.top-110}, 1200);
					}
				});
				return;

				//alert(messages.do_alert_test_info);
				//$('#bymd').focus();
				//return;
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
			Notify.alert({
				title : '알림',
				html : '차량번호를 입력해 주세요.',
				ok : function(){
					//Notify.suc('OK');
					//alert("검사소를 조회할 자동차 운행지역을 선택해 주세요.");

					var offset = $("#testInfo").offset();
					$('html, body').animate({scrollTop : offset.top-110}, 1200);
					$('#carno').focus();
				}
			});
			return;

			//alert("차량번호를 입력해 주세요.");
			//$('#carno').focus();
			//return;
		}

		 //자동차번호 형식 체크
		 var checkNum = carInfo.checkCno($('#carno').val());
		 if(checkNum != 1){
			Notify.alert({
				title : '알림',
				html : '자동차번호 형식이 올바르지 않습니다.',
				ok : function(){
					//Notify.suc('OK');
					//alert("검사소를 조회할 자동차 운행지역을 선택해 주세요.");

					var offset = $("#testInfo").offset();
					$('html, body').animate({scrollTop : offset.top-110}, 1200);
					$('#carno').focus();
				}
			});
			return;
			//alert("자동차번호 형식이 올바르지 않습니다.");
			//$('#carno').focus();
			//return;
		 }

		if($('#schdate').val() == '' || $('#schtime').val() == '' || $('#h_cuno').val() == '' || $('#cuname').val() == '') {
			Notify.alert({
				title : '알림',
				html : '픽업 예약일을 선택해주세요.',
				ok : function(){
					//Notify.suc('OK');
					//alert("검사소를 조회할 자동차 운행지역을 선택해 주세요.");

					var offset = $("#tsinfo_schedule").offset();
					$('html, body').animate({scrollTop : offset.top-110}, 1200);
					$('#schdate').focus();
				}
			});
			return;
			//alert('검사 희망일을 선택해주세요.');
			//var offset = $("#tsinfo_schedule").offset();
		    //$('html, body').animate({scrollTop : offset.top}, 400);
			//$('#schdate').focus();

		}
		var name = $("#name").val();

		if( name.length < 1 || name.length > 20 ) {
			Notify.alert({
				title : '알림',
				html : messages.do_input_name,
				ok : function(){
					//Notify.suc('OK');
					//alert("검사소를 조회할 자동차 운행지역을 선택해 주세요.");

					var offset = $("#userInfo").offset();
					$('html, body').animate({scrollTop : offset.top-110}, 1200);
					$('#name').focus();
				}
			});
			return;

			//alert(messages.do_input_name);
			//var offset = $("#testuserinfo").offset();
			//$('html, body').animate({scrollTop : offset.top-110}, 1200);
			//$('#name').focus();
			//return;
		}

		$("#name").val(name.split(" ").join(""));
		name = $("#name").val();

		if(!checkEmoji(name)) {
			alert(messages.do_name_guide);
			$('#name').focus();
			return;
		}

		if(!checkTel($("#tel1").val(),'' ,'')) {
			Notify.alert({
				title : '알림',
				html : messages.do_alert_mobile_wrong + '<br>' + messages.do_alert_mobile_wrong1,
				ok : function(){
					//Notify.suc('OK');
					//alert("검사소를 조회할 자동차 운행지역을 선택해 주세요.");

					var offset = $("#userInfo").offset();
					$('html, body').animate({scrollTop : offset.top-110}, 1200);
					$('#tel1').focus();
				}
			});
			return;

			//alert(messages.do_alert_mobile_wrong + "\n" + messages.do_alert_mobile_wrong1);
			//var offset = $("#testuserinfo").offset();
			//$('html, body').animate({scrollTop : offset.top-110}, 1200);
			//$('#tel1').focus();
			//return;
		}

		if($("#h_check_tel1").val() != "Y") {
			Notify.alert({
				title : '알림',
				html : '신청인 휴대전화 인증이 되지 않았습니다.<br />휴대전화로 인증번호를 받고 입력해주세요.',
				ok : function(){
					//Notify.suc('OK');
					//alert("검사소를 조회할 자동차 운행지역을 선택해 주세요.");

					var offset = $("#userInfo").offset();
					$('html, body').animate({scrollTop : offset.top-110}, 1200);
					$('#tel1').focus();
				}
			});
			return;

			//alert(messages.do_alert_mobile_wrong + "\n" + messages.do_alert_mobile_wrong1);
			//var offset = $("#testuserinfo").offset();
			//$('html, body').animate({scrollTop : offset.top-110}, 1200);
			//$('#tel1').focus();
			//return;
		}



	    if(emailCheckStatus != "y") {
			alert(messages.do_invalid_email);
			$('#email').focus();
			return;
		}

		//픽업시 연락받을 번호가 없으면, 신청인 연락처로 세팅함
		if($('#tel2').val() == '') {
			$('#tel2').val($('#tel1').val());
		}

		if(!$('#userChk').is(":checked")){
			Notify.alert({
				title : '알림',
				html : messages.do_agree_requirement_01,
				ok : function(){
					//Notify.suc('OK');
					//alert("검사소를 조회할 자동차 운행지역을 선택해 주세요.");

					var offset = $("#agreementInfo").offset();
					$('html, body').animate({scrollTop : offset.top-110}, 1200);
				}
			});
			return;
			//alert(messages.do_agree_requirement_01);
			//return ;
		}else if(!$('#personalChk').is(":checked")){
			Notify.alert({
				title : '알림',
				html : messages.do_agree_requirement_02,
				ok : function(){
					//Notify.suc('OK');
					//alert("검사소를 조회할 자동차 운행지역을 선택해 주세요.");

					var offset = $("#agreementInfo").offset();
					$('html, body').animate({scrollTop : offset.top-110}, 1200);
				}
			});
			return;
			//alert(messages.do_agree_requirement_02);
			//return ;
		}

		/*
		if($('input:radio[name="p_method"]:checked').val() == "1") {		//radio 선불신용카드 결제 이면
		//if($('#p_method').val() == "1") {												//select 선불신용카드 결제 이면
			if(objPayPopup && !objPayPopup.closed) {
				//창이 있으면 닫는다.
				objPayPopup.self.close();
			} 
			objPayPopup = window.open('about:blank', 'payWindow', 'width=700, height=700');
		}
		*/
		//$('#submitReqForm').submit();
		personalAgentInfo.reservationSave();

	},
	reservationSave : function() {

		var paymethod = "CARD";
		var p_method		= $('input:radio[name="p_method"]:checked').val();
		if(p_method == "0") {				//후불신용카드결제
			//$('#act').val('req');
		} else if (p_method == "1") {		//선불신용카드결제
			//$('#act').val('check');
			paymethod="CARD";
		} else if (p_method == "2") {		//무통장입금
			//$('#act').val('req');
		} else if (p_method == "3") {		//간편결제
			//$('#act').val('check_visit');
			paymethod="EPAY";
		} else if (p_method == "4") {		//결제
			//$('#act').val('check_visit');
			paymethod="BANK";
		}

		$('#submitReqForm').ajaxForm({
			beforeSubmit: function (data,form,option) {
				return true;
			},
			url:"/p2020/orderTestReq.html",
			success: function(data,status){
				if(data.result == "0000"){	//대행 신청 완료

					innopay.goPay({
						PayMethod		: paymethod,
						MID				: data.mid,
						MerchantKey	: data.mkey,
						GoodsName	: data.gname,
						Amt				: data.amt,
						BuyerName		: data.name,
						BuyerTel		: data.btel,
						BuyerEmail		: $('#email').val(),
						ResultYN		: data.resultyn,
						Moid				: data.moid,
						ReturnURL		: data.rurl,
						Currency		:''
					  }
					);
				}else{
					alert(data.message);
				}
			},
			error: function(){
				alert("오류발생 : 잠시후에 이용해 주시기 바랍니다.");
			}                               
		}).submit();

		/*
		$('#submitReqForm').ajaxForm({
			beforeSubmit: function (data,form,option) {
				return true;
			},
			url:"/p2020/data.html",
			success: function(data,status){
				if(data.result == "0000"){
					//대행 신청 완료
					if(p_method == "1") {	//신용카드 결제
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
		*/
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


function innopay_result(data){

	var resultcode = data.ResultCode;
	var resultmsg = data.ResultMsg;

	//-----------------------
	// 신용카드, 간편결제	성공 3001
	// 계좌이체				성공 4400
	if(resultcode == 3001 || resultcode == 4000) {
	//-----------------------
		$('body').loading({
			stoppable: true,
			message: '결제 처리중...',
			theme: 'dark'
		});

		$.ajax({
			type : "post",
			url : '/p2020/orderTestReq.html?act=presult2',
			contentType : "application/x-www-form-urlencoded; charset=UTF-8",
			data : data,
			dataType : "json",
			success : function(json) {
				$('body').loading('stop');

				if(json.code == "0000"){
					var f			= document.submitReqForm;
					f.target		= '_self';
					f.method		= 'post';
					f.enctype	= "application/x-www-form-urlencoded";
					f.act.value	= json.act;
					f.u.value	= json.u;
					f.o.value	= json.o;
					f.action		= './orderTestReq.html';
					f.submit();

				} else {
					alert(data.message);
				}
			},
			error : function() {
				$('body').loading('stop');
				Notify.alert({
					title : '알림',
					html : '결제처리 서버에 문제가 있습니다. 관리자에게 문의해 주세요.',
					ok : function(){
					}
				});
				return;
			}
		});

	//-----------------------
	} else {
	//-----------------------
		Notify.alert({
			title : '결제실패',
			html : resultmsg,
			ok : function(){
			}
		});

	//-----------------------
	}
	//-----------------------
}


// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
//$().ready(function() {
jQuery(document).ready( function(){
	//생년월일 등 숫자입력 폼에서 의도치 않은 스크롤로 인해 값이 변경되는 것을 막기 위해 스크롤 차단
	$(document).on("wheel", "input[type=number]", function (e) {
		$(this).blur();
	});


	// IE 인 경우 placeholder 미적용
	$('input:text').on("keyup", function() {
		if(isInternetExplorer() == "Y" ){
			common.checkIEForm($(this).attr("id"));
		}
	});

	$('#equalSwitch').click(function(){
		var tel1	=		$('#tel1').val();
		var tel2	=		$('#tel2').val();

		if($('#equalSwitch').is(":checked")){ 
			if($('#tel1').val() =='') {
				alert("예약확인 휴대전화가 입력되어 있지 않습니다.");
				$("#equalSwitch").prop("checked", false);
				return
			} else {
				$('#tel2').val(tel1);
			}
		} else {
				$('#tel2').val("");
		}
	});

	$(document).on("click", "#scheduleAgentLayer #btnPrev", function(){

		var input         = $('#hopeSchDate');
		var date         = moment(input.val(), 'YYYY-MM-DD');
		var new_date     = date.clone().add(-1, 'days');

		input.val(new_date.format('YYYY-MM-DD'));
		$('#hopeSchDate').datepickerInFullscreen('updateFakeInput');

		console.log('검사종류'+ $('#ttype_title').val()+'선택된날'+ $('#hopeSchDate').val()+','+'검사시작일'+ $('#startdate').val()+','+'검사종료일'+ $('#enddate').val()+','+'오늘'+ $('#h_today').val());

		if($('#ttype_title').val() == '정기검사' ) {
			if($('#hopeSchDate').val() > $('#enddate').val() ) {
				alert('선택한 '+$('#hopeSchDate').val()+ '은 최종만료일'+$('#enddate').val()+' 을 경과하여 검사종류와 검사료가 변경될 수 있습니다.\n다른 날짜를 선택하시거나 선택하신 날짜로 예약을 원하시면 고객센터 1577-0266 에서 접수를 진행해주세요.');
				$('#scheduleAgentLayer').modal('toggle');
				return false;
			}
		} 


		var vAcode				= $('#h_acode').val().split(" ").join("");
		var vCarmaker_type		= $('#h_car_maker_type').val();		//국산수입구분
		schedule.callSchData('/p2020/data.html?act=schagent&ac=' + vAcode, $('#hopeSchDate').val(), vAcode, 0, vCarmaker_type);

		// code 를 버튼클릭 맨 아래에 두어야 변경된 날짜를 기준으로 이전/다음버튼의 활성화 비활성화를 결정할 수 있음
		// 검사예약일 선택 레이어가 활성화될 때 이전, 다음버튼의 선택가능유무 결정
		// 이전, 다음 클릭이벤트에도 계속해서 이전, 다음버튼이 활성화될지 결정해주어야 함
		console.log('선택된날'+ $('#hopeSchDate').val()+','+'검사시작일'+ $('#startdate').val()+','+'오늘'+ $('#h_today').val());
		if (
			$('#hopeSchDate').val() <= $('#startdate').val() || 
			$('#hopeSchDate').val() <= $('#h_today').val()) {
			$('#btnPrev').attr('disabled', true);
		} else {
			$('#btnPrev').attr('disabled', false);
		}

	});
	$(document).on("click", "#scheduleAgentLayer #btnNext", function(){

		//alert('다음클릭');
		var input         = $('#hopeSchDate');
		var date         = moment(input.val(), 'YYYY-MM-DD');
		var new_date     = date.clone().add(1, 'days');

		input.val(new_date.format('YYYY-MM-DD'));
		$('#hopeSchDate').datepickerInFullscreen('updateFakeInput');


		console.log('검사종류'+ $('#ttype_title').val()+'선택된날'+ $('#hopeSchDate').val()+','+'검사시작일'+ $('#startdate').val()+','+'검사종료일'+ $('#enddate').val()+','+'오늘'+ $('#h_today').val());

		if($('#ttype_title').val() == '정기검사' ) {
			if($('#hopeSchDate').val() > $('#enddate').val() ) {
				alert('선택한 '+$('#hopeSchDate').val()+ '은 최종만료일'+$('#enddate').val()+' 을 경과하여 검사종류와 검사료가 변경될 수 있습니다.\n다른 날짜를 선택하시거나 선택하신 날짜로 예약을 원하시면 고객센터 1577-0266 에서 접수를 진행해주세요.');
				$('#scheduleAgentLayer').modal('toggle');
				return false;
			}
		} 

		var vAcode				= $('#h_acode').val().split(" ").join("");
		var vCarmaker_type		= $('#h_car_maker_type').val();		//국산수입구분
		schedule.callSchData('/p2020/data.html?act=schagent&ac=' + vAcode, $('#hopeSchDate').val(), vAcode, 0, vCarmaker_type);

		// code 를 버튼클릭 맨 아래에 두어야 변경된 날짜를 기준으로 이전/다음버튼의 활성화 비활성화를 결정할 수 있음
		// 검사예약일 선택 레이어가 활성화될 때 이전, 다음버튼의 선택가능유무 결정
		// 이전, 다음 클릭이벤트에도 계속해서 이전, 다음버튼이 활성화될지 결정해주어야 함
		
		if (	
			$('#hopeSchDate').val() <= $('#startdate').val() || 
			$('#hopeSchDate').val() <= $('#h_today').val()) {
			$('#btnPrev').attr('disabled', true);
		} else {
			$('#btnPrev').attr('disabled', false);
		}
	});

	$('#btnCpnApply').on("click", function() {
		if($('#totcost').val() =='') {
			Notify.alert({
				title : '알림',
				html : '쿠폰을 사용하기 전에 <b>차량픽업 위치</b>와 <b>픽업예약일</b>을 먼저 선택해주세요.',
				ok : function(){
					//Notify.suc('OK');
					//alert("검사소를 조회할 자동차 운행지역을 선택해 주세요.");

					//var offset = $("#locationInfo").offset();
					//$('html, body').animate({scrollTop : offset.top-110}, 1200);
				}
			});

			return;
			/*
			alert('대행정보를 먼저 입력해주세요.');
			return false;
			*/
		}
		if($('#cpn').val() =='') {
			Notify.alert({
				title : '알림',
				html : '쿠폰을 사용하시려면 발행받으신 쿠폰번호를 입력해주세요.',
				ok : function(){
					//Notify.suc('OK');
					//alert("검사소를 조회할 자동차 운행지역을 선택해 주세요.");

					//var offset = $("#locationInfo").offset();
					//$('html, body').animate({scrollTop : offset.top-110}, 1200);
					$('#cpn').focus();
				}
			});

			return;



		}
		$('body').loading({
			stoppable: true,
			message: '쿠폰 확인중...',
			theme: 'dark'
		});
		//쿠폰처리를 위해 값을 넘길 때, 쿠폰적용지역 구분을 위해 시(도)정도도 함께 넘김
		$.ajax({
			type : "post",
			url : '/p2020/data.html?act=coupon',
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

	$(document).on("click", ".reserveBtn", function(){
	//$('#reserveBtn').on("click", function() {

		if($('[name=reserveName]').val() =='') {
			alert('연락받으실 분의 이름을 입력하세요.');
			return false;
		}

		if($('[name=reserveTel]').val() =='') {
			alert('연락받으실 전화번호를 입력해주세요.');
			$('#reserveTel').focus();
			return false;
		}
	
		/*
		$('body').loading({
			stoppable: true,
			message: '메세지를 전달하는 중입니다...',
			theme: 'dark'
		});
		*/

		var message	=	''
					+	'대행픽업 : '+$('#roadaddr').val()+' '+$('#detailaddress').val()
					+	'<br />'
					+	'carNo : '+$('#carno').val()
					+	'&nbsp; '
					+	'bymd : '+$('#bymd').val();
		
		var callbackdata={
				"name"					: $('[name=reserveName]').val(),
				"email"					: 'support@kmds.co.kr',
				"phone"					: $('[name=reserveTel]').val(),
				"need"					: '개인고객 서비스 문의',
				"user_agree"			: 'on',
				"message"				: message
		};

		$.ajax({
			url:'/data.html?act=callBack',
			type:'POST',
			data: callbackdata,
			success:function(data){
				if(data.code === "0000") {

					Notify.alert({
						title : '알림',
						html : '남겨주신 정보가 잘 저장되었습니다.',
						ok : function(){

							$('[name=reserveName]').val('');
							$('[name=reserveTel]').val('');

							$('.reserveResultDiv' ).show();
							var resultHtml = '<div class="alert alert-success" role="alert">'
							+ $('#carno').val()+' 에 대한 상담예약이 잘 접수되었습니다.<br />업무시간에 담당자가 연락을 드려 도와드리겠습니다.'
							+ '</div>';
							$('.reserveResultDiv' ).html(resultHtml);

							//Notify.suc('OK');
							//alert("검사소를 조회할 자동차 운행지역을 선택해 주세요.");

							//var offset = $("#locationInfo").offset();
							//$('html, body').animate({scrollTop : offset.top-110}, 1200);
						}
					});

					return;

				} else {
					alert(data.message);
				}
			},
			error:function(jqXHR, textStatus, errorThrown){
				//comm.showLoading(false)
				alert("에러 발생~~ \n" + textStatus + " : " + errorThrown);
			}
		});


	});


	// IE 이슈로 인한 스크립트

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


		$('#noticeChkLb').on("click", function() {
			common.ieCheckAgree("noticeChk");
		});

		$('#returnChkLb').on("click", function() {
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

	//결제방법을 클릭했을 때
    $('input:radio[name="p_method"]').click(function () {

		var p_method		= $('input:radio[name="p_method"]:checked').val();

		/* 신용카드 선결제를 선택할 경우 팝업창을 체크해야 합니다. */
		/*
		if (p_method == "1") {
			var pop = window.open("about:blank", "new_window_123", "height=150,width=150");

			//setTimeout(function() {
				if(!pop || pop.closed || pop.closed == "undefined" || pop == "undefined" || parseInt(pop.innerWidth) == 0 || pop.document.documentElement.clientWidth != 150 || pop.document.documentElement.clientHeight != 150){
					pop && pop.close();
					Notify.alert({
						title : '알림',
						html : '브라우저의 팝업이 차단되어 있습니다.<br />신용카드 선결제를 위해서는 브라우저의 팝업을 해제해주세요.',
						ok : function(){
						}
					});
					return false;
				}else{
					//alert("Popups is enabled.");
					pop && pop.close();
				}
			//}, 100);
		}
		*/


		if($('#totcost').val() =='') {
			$("input:radio[name='p_method']:radio[value='1']").prop('checked', true); // 기본값을 후불신용카드로 지정
			
			Notify.alert({
				title : '알림',
				html : '결제방법을 선택 전에 <b>차량픽업 위치</b>와 <b>픽업예약일</b>을 먼저 선택해주세요.',
				ok : function(){
					//Notify.suc('OK');
					//alert("검사소를 조회할 자동차 운행지역을 선택해 주세요.");

					//var offset = $("#locationInfo").offset();
					//$('html, body').animate({scrollTop : offset.top-110}, 1200);
				}
			});

			return;
			/*
			alert('검사대행정보를 먼저 입력해주세요.');
			return false;
			*/
		}

		var h_cpnp	=	$('#h_cpnp').val();
		var cpnp	=	$('#cpnp').val();
		if(h_cpnp != cpnp) {
			$("input:radio[name='p_method']:radio[value='0']").prop('checked', true); // 기본값을 후불신용카드로 지정
			alert('쿠폰정보에 오류가 있습니다. 관리자에게 문의하세요');
			return false;
		}

		var tot		= 0;
		if($('#totcost').val() != "") {
			tot = $('#totcost').val();
		}
		tot				= parseInt(tot) - parseInt(cpnp);

		if (p_method == "1") {				//선불신용카드
			$('#prepaid_cost').val(1000);
			$('#h_prepaid_cost').val(1000);
			$('.prepaid_cost_text').text(setComma(1000));

		} else if(p_method == "0") {		//후불신용카드
			$('#prepaid_cost').val(0);
			$('#h_prepaid_cost').val(0);
			$('.prepaid_cost_text').text(setComma(0));
	
		} else if(p_method == "2") {		//후불무통장입금
			$('#prepaid_cost').val(0);
			$('#h_prepaid_cost').val(0);
			$('.prepaid_cost_text').text(setComma(0));

		} else if (p_method == "3") {				//간편결제
			$('#prepaid_cost').val(1000);
			$('.prepaid_cost_text').text(setComma(1000));

			$('input[name=PayMethod]').val("EPAY");

		} else if (p_method == "4") {				//간편결제
			$('#prepaid_cost').val(1000);
			$('.prepaid_cost_text').text(setComma(1000));

			$('input[name=PayMethod]').val("BANK");
		}


		var prepad_cost	=	parseInt($('#prepaid_cost').val());
		var member_cost	=	parseInt($('#member_cost').val());
		var reorder_cost	=	parseInt($('#reorder_cost').val());
		$('#h_payment').val(tot - prepad_cost-member_cost-reorder_cost);
		$('#payment').val(setComma(tot - prepad_cost-member_cost-reorder_cost));
		$('.payment_text').text(setComma(tot - prepad_cost-member_cost-reorder_cost));


		//요금제를 선택할 때 요금제항목의 스타일 조정
		$("div[id^=layer_p_method]").removeClass("bg-selected");
		$("div[id^=layer_p_method]").removeClass("text-white");
		$("div[id^=layer_p_method]").addClass("text-muted");

		$('#layer_p_method'+p_method).removeClass("text-muted");
		$('#layer_p_method'+p_method).addClass("bg-selected");
		$('#layer_p_method'+p_method).addClass("text-white");
    });



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

/*  input number 글자수 제한하기, 예)생년월일 앞 6자리. maxlength 와 함께 사용 */
function numberMaxLength(e){
    if(e.value.length > e.maxLength){
        e.value = e.value.slice(0, e.maxLength);
    }
}


/*		주소검색 시작 */
//$("#btnexecDaumPostcode").on("click", function() {
$(document).on('click', '#btnexecDaumPostcode', function() {
	$('#roadaddr').val('');
	$('#detailaddress').val('');
	$('#zipcode').val('');
	$('#jibunaddr').val('');
	$('#car_location').val('');
	$('#pickup_address').val('');		//시도+구군+읍면동
	$('#start_x').val('');
	$('#start_y').val('');
	execDaumPostcode();		
});

// 우편번호 찾기 찾기 화면을 넣을 element 끼워넣기 방식
var element_wrap = document.getElementById('wrap');
function foldDaumPostcode() {
    // iframe을 넣은 element를 안보이게 한다.
    element_wrap.style.display = 'none';
}

// 우편번호 찾기 찾기 화면을 넣을 element Layer 방식
var element_layer = document.getElementById('layer');
function closeDaumPostcode() {
    // iframe을 넣은 element를 안보이게 한다.
    element_layer.style.display = 'none';
}

//다음카카오 도로명 주소 표기 방식에 대한 법령에 따라, 내려오는 데이터를 조합하여 올바른 주소를 구성하는 방법을 설명합니다.
function execDaumPostcode() {

	var themeObj = {
	   pageBgColor: "#FFFFFF", //페이지 배경색
	   outlineColor: "#FFFFFF" //테두리
	};
    // 현재 scroll 위치를 저장해놓는다.
    var currentScroll = Math.max(document.body.scrollTop, document.documentElement.scrollTop);

	var mapContainer = document.getElementById('map'), // 지도를 표시할 div
		mapOption = {
			//center: new daum.maps.LatLng(37.3996441086743, 126.970274096871), // 지도의 중심좌표
			center: new kakao.maps.LatLng(37.3996441086743, 126.970274096871), // 지도의 중심좌표
			level: 5 // 지도의 확대 레벨
		};

	//주소-좌표 변환 객체를 생성
	var geocoder = new daum.maps.services.Geocoder();
	//마커를 미리 생성
	//var marker = new daum.maps.Marker({
	//	position: new daum.maps.LatLng(37.3996441086743, 126.970274096871),
	//	map: map
	//});

    new daum.Postcode({
		theme: themeObj,
		animation: true,
        oncomplete: function(data) {

			//자동차검사는 주소입력이 가장 첫단계이므로, 기존에 입력된 값들을 초기화 한다
			$("#detailaddress").val('');
			carInfo.initTestInfo();

			//console.log("--------------------------------------");
			//console.log(data);

			// 팝업에서 검색결과 항목을 클릭했을때 실행할 코드를 작성하는 부분.
			
			// 내려오는 변수가 값이 없는 경우엔 공백('')값을 가지므로, 이를 참고하여 분기 한다.
			var zipcode				=	"";		//우편번호
			var roadaddr				=	"";		//도로명주소
			var jibunaddr				=	"";		//지번주소1
			var autoJibunAddress	=	"";		//지번주소2
			var detailaddress		=	"";		//기타주소
			var building_name		=	"";		//건물명
			var sido						=	"";		
			var gugun					=	"";
			var dong					=	"";

			zip_code				=	data.zonecode;
			roadaddr				=	data.roadAddress;			// 도로명 주소 변수
			jibunaddr				=	data.jibunAddress;			// 지번 주소 변수
			autoJibunAddress	=	data.autoJibunAddress;	// 지번 주소 변수
			sido						=	data.sido;
			sido						=	sido.replace("제주특별자치도", "제주");	
			sido						=	sido.replace("세종특별자치시", "세종");

			if (sido == "세종") {
                gugun				=	"세종시";
			} else {
				if (data.sigungu !== ''){
					gugun				=	data.sigungu;
				} else {
					gugun				=	data.bname1;
				}
			}
			
			// 법정동명이 있을 경우 추가한다. (법정리는 제외) 법정동의 경우 마지막 문자가 "동/로/가"로 끝난다.
            if(data.bname !== '' && /[동|로|가]$/g.test(data.bname)){
				dong					=	data.bname;
				detailaddress		+=	data.bname;
            } else {
				dong					=	data.bname1;
				detailaddress		+=	data.bname2;
			}

            // 건물명이 있고, 공동주택일 경우 추가한다.
            if(data.buildingName !== '') {// && data.apartment === 'Y'){
				detailaddress				+= (detailaddress !== '' ? ', ' + data.buildingName : data.buildingName);
            }
            // 표시할 참고항목이 있을 경우, 괄호까지 추가한 최종 문자열을 만든다.
            if(detailaddress !== ''){
                detailaddress = '(' + detailaddress + ')';
            }

			// 우편번호와 주소 정보를 해당 필드에 넣는다.
			$(" input[name=zipcode]").val(zip_code);
			$(" input[name=roadaddr]").val(roadaddr + ' '+ detailaddress);

			if (jibunaddr != '') {		//지번주소가 공백이 아니면
				$(" input[name=jibunaddr]").val(jibunaddr);			
			} else {
				if (autoJibunAddress != '') {		//지번주소가 공백이 아니면
					jibunaddr				=	autoJibunAddress;			// 지번 주소 변수
					$(" input[name=jibunaddr]").val(jibunaddr);	
				} else {
					$(" input[name=jibunaddr]").val(roadaddr);		
				}
			}

			if (data.jibunAddressEnglish != '') {		//지번주소가 공백이 아니면
				var afterStr				= (data.jibunAddressEnglish).split(',');	//지번주소의 첫번째 값 번지 사용
			} else {
				var afterStr				= (data.autoJibunAddressEnglish).split(',');	//지번주소
			}
			$("input[name=car_location]").val(afterStr[0]);

			// 참고항목 문자열이 있을 경우 해당 필드에 넣는다. 
	
			$(" input[name=sido]").val(sido);
			$(" input[name=gugun]").val(gugun);
			$(" input[name=dong]").val(dong);
			$(" input[name=pickup_address]").val(sido + ' '+gugun + ' '+dong);

			var stype				= 	$(" input[name=h_stype]").val();
			var car_maker_type	= 	$(" input[name=h_car_maker_type]").val();

			$.ajax({
				type : "post",
				url : '/p2020/data.html?act=get_acode',
				contentType : "application/x-www-form-urlencoded; charset=UTF-8",
				data : {
						"sido" : sido, 
						"gugun" : gugun, 
						"dong" : dong, 
						"stype" : stype, 
						"car_maker_type" : car_maker_type,
						"roadaddr" : roadaddr,
						"jibunaddr" : jibunaddr,
						"req_page"	: "test_req"
				},
				dataType : "json",
				success : function(data) {
					if(data.code == 0){
						$(" input[name=h_acode]").val(data.list.acode);
						$(" input[name=h_cost2]").val(data.list.cost);
						$(" input[name=h_cost2_total]").val(data.list.cost_total);
					}else{
						alert(data.message);
					}
				},
				error : function() {
					alert("정보 조회가 실패하였습니다.\n고객센터 1577-0266 또는 온라인상담에 서비스가 가능한 지역인지 확인을 요청해주세요");
				}
			});
			// 주소코드 가져오기 끝
			//$('#btnexecDaumPostcode > span').html('클릭해서 자동차 픽업주소를 입력하세요');


			// 카카오지도API 주소-좌표 변환 객체를 생성합니다
			var geocoder = new daum.maps.services.Geocoder();

			// 주소로 좌표를 검색합니다
			geocoder.addressSearch(roadaddr, function(result, status) {

				// 정상적으로 검색이 완료됐으면 
				if (status === daum.maps.services.Status.OK) {
					var coords = new daum.maps.LatLng(result[0].y, result[0].x);
					//console.log("--------------------------------------");
					//console.log(coords);
					//alert('ib='+coords.ib + 'jb='+coords.jb);

					//위경도 좌표입니다.
					$(" input[name=start_x]").val(result[0].y);
					$(" input[name=start_y]").val(result[0].x);
					


				} 
			}); 

            // iframe을 넣은 element를 안보이게 한다.
            // (autoClose:false 기능을 이용한다면, 아래 코드를 제거해야 화면에서 사라지지 않는다.)
           // element_wrap.style.display = 'none';

            // iframe을 넣은 element를 안보이게 한다.
            // (autoClose:false 기능을 이용한다면, 아래 코드를 제거해야 화면에서 사라지지 않는다.)
            element_layer.style.display = 'none';

            // 우편번호 찾기 화면이 보이기 이전으로 scroll 위치를 되돌린다.
            document.body.scrollTop = currentScroll;
        },
        
		// 우편번호 찾기 화면 크기가 조정되었을때 실행할 코드를 작성하는 부분. iframe을 넣은 element의 높이값을 조정한다.
        onresize : function(size) {
            element_wrap.style.height = size.height+'px';
        },
        width : '100%',
        height : '100%',	//기본 100%인데, 로고가 가려지면 90%로 조정
        maxSuggestItems : 5
    //}).embed(element_wrap);
	}).embed(element_layer);

        // iframe을 넣은 element를 보이게 한다.
        //element_wrap.style.display = 'block';

// iframe을 넣은 element를 보이게 한다.
		element_layer.style.display = 'block';


        // iframe을 넣은 element의 위치를 화면의 가운데로 이동시킨다.
        initLayerPosition();
    // 브라우저의 크기 변경에 따라 레이어를 가운데로 이동시키고자 하실때에는
    // resize이벤트나, orientationchange이벤트를 이용하여 값이 변경될때마다 아래 함수를 실행 시켜 주시거나,
    // 직접 element_layer의 top,left값을 수정해 주시면 됩니다.
    function initLayerPosition(){
        var width = 300; //우편번호서비스가 들어갈 element의 width
        var height = 400; //우편번호서비스가 들어갈 element의 height
        var borderWidth = 1; //샘플에서 사용하는 border의 두께

        // 위에서 선언한 값들을 실제 element에 넣는다.
        element_layer.style.width = width + 'px';
        element_layer.style.height = height + 'px';
        element_layer.style.border = borderWidth + 'px solid';
        // 실행되는 순간의 화면 너비와 높이 값을 가져와서 중앙에 뜰 수 있도록 위치를 계산한다.
        element_layer.style.left = (((window.innerWidth || document.documentElement.clientWidth) - width)/2 - borderWidth) + 'px';
        element_layer.style.top = (((window.innerHeight || document.documentElement.clientHeight) - height)/2 - borderWidth) + 'px';
    }

}
/*		주소검색 종료 */


/* 휴대전화 인증	*/
$(document).on('click', '#btnCheckphone', function() {
	if ($("#tel1").val() == "") {
		Notify.alert({
			title : '알림',
			html : '예약확인 메세지 수신과 픽업담당자가 연락드릴 휴대전화번호를 입력하세요.',
			ok : function(){
				//Notify.suc('OK');
				//alert("검사소를 조회할 자동차 운행지역을 선택해 주세요.");

				//var offset = $("#locationInfo").offset();
				//$('html, body').animate({scrollTop : offset.top-110}, 1200);
				$("#tel1").focus();
			}
		});

		return;
	}

	var pmdata={
		'act':'login',
		'DIV':'LOGINCHECK',
		'tokn':$("#tokn").val(),
		'tel1':$("#tel1").val()
	};
	
	$.ajax({
		url:'apidata/_login.php',
		type:'POST',
		data: pmdata,
		success:function(data){
			if(data.code === 0) {
				$('#dpAuth').show();
				$('#dt').val(data.dt);
				$("#txtauthno").focus();
				checkOTPTime(180);
			} else {
				alert(data.message);
			}
		},
		error:function(jqXHR, textStatus, errorThrown){
			//comm.showLoading(false)
			alert("에러 발생~~ \n" + textStatus + " : " + errorThrown);
		}
	});
});

$(document).on('click', '#btnAuthConfirm', function() {
	if ($('#txtauthno').val() == ""){
		Notify.alert({
			title : '알림',
			html : '휴대전화 카카오톡 또는 문자로 수신하신 인증번호를 입력해 주세요.<br />인증번호가 수신되지 않으시면 휴대전화번호가 올바른지 확인해주세요.',
			ok : function(){
				//Notify.suc('OK');
				//alert("검사소를 조회할 자동차 운행지역을 선택해 주세요.");

				//var offset = $("#locationInfo").offset();
				//$('html, body').animate({scrollTop : offset.top-110}, 1200);
				$('#txtauthno').focus();
			}
		});

		return;
	}

	var pmdata={
		'act':'login',
		'DIV':'AUTHNCHECK',
		'tokn':$("#tokn").val(),
		'authno':$('#txtauthno').val(),
		'dt':$('#dt').val()
	};

	$.ajax({
		url:'apidata/_login.php',
		type:'POST',
		data: pmdata,
		success:function(data){
			if(data.code === 0) {
				Notify.alert({
					title : '알림',
					html : '인증되었습니다.',
					ok : function(){
						//Notify.suc('OK');
						//alert("검사소를 조회할 자동차 운행지역을 선택해 주세요.");

						//var offset = $("#locationInfo").offset();
						//$('html, body').animate({scrollTop : offset.top-110}, 1200);
						timerClear();
						$("#h_check_tel1").val("Y");
						$("#tel1").attr("readonly",true);
						$('#btnCheckphone').addClass('disabled');
						$("#txtauthno").attr("readonly",true);
						$('#btnAuthConfirm').addClass('disabled'); //인증번호확인 버튼 비활성화
						$('#btn-reservation').removeClass('disabled');
					}
				});

				return;

			} else {
				alert(data.message);
			}
		},
		error:function(jqXHR, textStatus, errorThrown){
			//comm.showLoading(false)
			alert("에러 발생~~ \n" + textStatus + " : " + errorThrown);
		}
	});
});

var timer;
function checkOTPTime( otptime ){
	if(otptime <= 0){
		$("#txtotptime").html("0분 0초");
		$("#h_check_tel1").val("N");
		Notify.alert({
			title : '알림',
			html : '인증 유효시간이 만료되었습니다.',
			ok : function(){
				//Notify.suc('OK');
				//alert("검사소를 조회할 자동차 운행지역을 선택해 주세요.");

				location.href='/p2020/p_test_req.html';			
			}
		});

		return;
	}
	var min = Math.floor(otptime / 60);
	var sec = Math.floor(otptime % 60);
			
	$("#txtotptime" ).html(min+"분 "+sec+"초");

	var time = otptime - 1;
			
	timer = setTimeout(function(){ checkOTPTime(time) },1000);
}

function timerClear(){
	clearTimeout(timer);
}


$(document).on('click', '.selectAddress', function() {
	var ano					= $(this).attr("ano");
	var zipcode			= $(this).attr("zipcode");
	var jibunaddr			= $(this).attr("jibunaddr");
	var roadaddr			= $(this).attr("roadaddr");
	var detailaddress	= $(this).attr("detailaddress");
	var sido					= $(this).attr("sido");
	var gugun				= $(this).attr("gugun");
	var dong				= $(this).attr("dong");
	var start_x				= $(this).attr("start_x");
	var start_y				= $(this).attr("start_y");

	$(" input[name=roadaddr]").val(roadaddr);
	$(" input[name=detailaddress]").val(detailaddress);
	$(" input[name=zipcode]").val(zipcode);
	$(" input[name=jibunaddr]").val(jibunaddr);
	$(" input[name=pickup_address]").val(sido + ' '+gugun + ' '+dong);
	$(" input[name=car_location]").val('');
	$(" input[name=sido]").val(sido);
	$(" input[name=gugun]").val(gugun);
	$(" input[name=dong]").val(dong);
	$(" input[name=start_x]").val(start_x);
	$(" input[name=start_y]").val(start_y);

	
	var stype				= 	$(" input[name=h_stype]").val();
	var car_maker_type	= 	$(" input[name=h_car_maker_type]").val();

	$.ajax({
		type : "post",
		url : '/p2020/data.html?act=get_acode',
		contentType : "application/x-www-form-urlencoded; charset=UTF-8",
		data : {"sido" : sido, "gugun" : gugun, "dong" : dong, "stype" : stype, "car_maker_type" : car_maker_type },
		dataType : "json",
		success : function(data) {
			if(data.code == 0){
				var v = data.list;
				//$.each(data.list,function(i,v){
					$(" input[name=h_acode]").val(v.acode);
					$(" input[name=h_cost2]").val(v.cost);
					$(" input[name=h_cost2_total]").val(v.cost_total);
				//});
			}else{
				alert(data.message);
			}
		},
		error : function() {
			alert("주소를 가져오는데 실패하였습니다.");
		}
	});
});


$(document).on('click', '.selectCarno', function() {
	var cno				= $(this).attr("cno");
	var car_no			= $(this).attr("car_no");
	
	if (cno == "" && car_no =="") {
		$(" input[name=carno]").val('');
		$(" input[name=bymd]").val('');
	} else {
		$(" input[name=carno]").val(car_no);
	}
});


// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
// 공통 모달 호출 MODAL - 웹페이지의 하단에 modal 모달이 있어야 함
// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■

$(document).on("click", ".btn-modal-open", function(){

	//alert('modal click');
	//클릭시 가져오는 속성
	var modal_id		= $(this).attr("modal_id");
	var act				= $(this).attr("act");
	var modal_size	= $(this).attr("modal_size");	

	//form 값 가져오기
	var ac				= $('#h_acode').val();		//예약일 선택을 위한 지역코드

	var acttitle	=	'';
    switch (act){
        case 'schagent' :
			acttitle = '검사예약일 선택 ';
            break;
        case 'schagent_test' :
			acttitle = '검사예약일 선택 테스트 ';
            break;
        case 'register_alert' :
			acttitle = '자동차검사 조회결과 ';
            break;
        case 'other' :
            acttitle = '기타';
            break;
        default :

    }

	$('#modal').attr("id",modal_id);
	$('#'+modal_id+ ' .modal-title').text(acttitle);		//modal 제목설정
	$('#'+modal_id+ ' .modal-dialog').removeClass('modal-lg modal-md modal-sm');	//modal 크기적용전 기존의 값 초기화
	$('#'+modal_id+ ' .modal-dialog').addClass(modal_size);	//modal 크기설정

	var target_url	= "";
	target_url		= "modal-content.php";
			
	$.ajax({
		type : "post",
		url : target_url,
		contentType : "application/x-www-form-urlencoded; charset=UTF-8",
		dataType: 'html',
		data : {
			"act"	:	act,
			"ac"	:	ac
		},
		beforeSend : function(){
			/*
			$('body').loading({
				stoppable: true,
				message: '잠시만 기다려주세요...',
				theme: 'dark'
			});
			*/
		},
		success : function(data) {
			//console.log(data);
			//$('body').loading('stop');
			$('#'+modal_id+ ' .modal-body').html('');
			$('#'+modal_id+ ' .modal-body').html(data);

			$('#schdate').val('');			//선택된 희망일
			$('#schtime_t').val('');			//선택된 희망시간 (화면표시용도)
			$('#schtime').val('');			//선택된 희망시간 (저장용도)
			$('#h_cuno').val('');			//선택된 대행원번호 (저장용도)
			$('#cuname').val('');			//선택된 대행원이름 (화면표시용도)
			$('#hopeSchDate').val('');	//예약일 Layer의 희망일
			$('#sch_data').html('');		//예약일 Layer의 시간표
			if (act == "schagent_test") {
				schedule.openSchAgent_test();
			} else {
				schedule.openSchAgent();
			}
		},
		error : function() {
			$('body').loading('stop');
			data	=	"잠시후에 이용해 주시기 바랍니다.";
			$('#'+modal_id+ ' .modal-body').html('');
			$('#'+modal_id+ ' .modal-body').html(data);
		}
	});

    //$('#'+modal_id).modal();


});