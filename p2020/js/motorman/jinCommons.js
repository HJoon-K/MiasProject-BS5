Number.prototype.to2 = function(){return this<10?'0'+this:this;} 
Date.prototype.getYMD = function(s){ 
	s=s||'-'; 
	return this.getFullYear() + s 
              + (this.getMonth()+1).to2() + s 
              + this.getDate().to2(); 
  } 

var jinLib = function(){
	
	//variables
	var mm={},plain={};
	
	/*to place a comma at every third spot*/
	function setComma(v){
		if(typeof v === 'number'){
			return (v.toString()).replace(/,/gi,"").toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
		}else if(typeof v === 'undefined'){
			return '0';
		}else{				
			return v.replace(/,/gi,"").toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
		}
	}
	
	/*get date as a format of YMD*/
	function getTodayAsYMD(){
		return jinLib.getCurYear()+jinLib.getCurMonth()+jinLib.getCurDay();
	}
	
	/*get date as a format of YM*/
	function getTodayAsYM(){
		return jinLib.getCurYear()+jinLib.getCurMonth();
	}
	
	/*get date as a format of MD*/
	function getTodayAsMD(){
		return jinLib.getCurMonth()+jinLib.getCurDay();
	}
	
	/*get date as a format of RRRR년MM월DD일 */
	function getDateWOKor(rrrrKmmKddK){
		var _rrrrKmmKddK = jinLib.replace(' ',rrrrKmmKddK);
		return ( ( (_rrrrKmmKddK.replace('년','')).replace('월','') ).replace('일','') );
	}

	function getDateWKor(rrrrmmdd){
		switch(rrrrmmdd.length){
		case 2:
			return rrrr+'일';
			break;
		case 4:
			if(rrrrmmdd.substring(0,1)=='2'){
				return (rrrrmmdd.substring(0,4)+'년');
			}else{
				return (rrrrmmdd.substring(0,2)+'월')+' '+(rrrrmmdd.substring(2,4)+'일');
			}
			break;
		case 6:
			return (rrrrmmdd.substring(0,4)+'년')+' '+(rrrrmmdd.substring(4,6)+'월');
			break;
		case 8:
			return (rrrrmmdd.substring(0,4)+'년')+' '+(rrrrmmdd.substring(4,6)+'월')+' '+(rrrrmmdd.substring(6,8)+'일');
			break;
		}
	}
	
	/*Current year*/
	function getCurYear(){
		return ( new Date().getFullYear() ).toString();
	}
	/*Current month*/
	function getCurMonth(){
		return ( '00' + (new Date().getMonth()+1) ).slice(-2);
	}
	/*Current day*/
	function getCurDay(){
		return ( '00' + (new Date().getDate()) ).slice(-2);
	}

	/*Current time*/
	function getTimeAs12HHMM(v){
		return v.substring(0,2)+':'+v.substring(2,4);
	}
	
	function getYearAsNum(rrrrmmdd){
		var indata = jinLib.replace(' ',rrrrmmdd);
		return parseInt(indata.substring(0, indata.indexOf('년')));
	}
	function getMonthAsNum(rrrrmmdd){
		var indata = jinLib.replace(' ',rrrrmmdd);
		return parseInt(indata.substring(5, indata.indexOf('월')));
	}
	function getDayAsNum(rrrrmmdd){
		var indata = jinLib.replace(' ',rrrrmmdd);
		return parseInt(indata.substring(8, indata.indexOf('일')));
	}
	function getYearAsString(r){
		return parseInt(r);
	}
	function getMonthAsString(m){
		return ( '00' + m ).slice(-2);
	}
	function getDayAsString(d){
		return ( '00' + d ).slice(-2);
	}
	
	function isLeapYear(year){
		var y = year;
		if(typeof y==='undefined'){
			alert('[개발용_메세지]:[jinLib.isLeapYear()]'+'\n'+
				  ' ERR ::: the parameter of y is undefined');
			return false;
		}
		
		y = typeof y === 'string' ? parseInt(y) : y;
		
		if( (year%4==0 && year%100 !=0) || year%400 ==0){
			return true;
		}
		return false;
	}
	
	/*to check if month has over 30days or not*/
	function isOverThirty(month){
		
		var m=month;
		if(typeof m === 'string'){
			
			switch(m){
			case '1':case '3':case '5':case '7':case '8':
				m = '0'+m;
				break;
			case '10':case '12':
				break;
			case '01':case '03':case '05':case '07':case '08':
				m = m.slice(-1);
				break;
			}
		}
		
		m = typeof m === 'string' ? parseInt(m): m;
		switch(m){
		case 1:case 3:case 5:case 7:
		case 8:case 10:case 12: return true;
			break;
		default: return false;
		}
	}
	
	/*add one day to the value and return as YMD*/
	function addDay(value){
		
		var i_date = jinLib.replace(' ',value);
		var yearInt = jinLib.getYearAsNum( i_date );
		var monthInt = jinLib.getMonthAsNum( i_date );
		var is31	= jinLib.isOverThirty(monthInt);
		var isLeapYear = jinLib.isLeapYear(yearInt);
		var o_day = jinLib.getDayAsNum( i_date ) + 1;
		var o_month = monthInt;
		var o_year = yearInt;
		
		if(!is31){
			if(monthInt!=2){
				if(o_day>30){
					o_day=1;
					o_month += 1;
				}
			}else if(monthInt==2){
				if(isLeapYear){
					if(o_day>29){
						o_day=1;
						o_month += 1;
					}
				}else{
					if(o_day>28){
						o_day=1;
						o_month += 1;
					}
				}
			}
		}else{
			if(o_day>31){
				o_day=1;
				o_month += 1;
			}
		}
		if(o_month>12){
			o_year += 1;
			o_month = 1;
		}
		
		var f_day = jinLib.getDayAsString(o_day);
		var f_month = jinLib.getMonthAsString(o_month);
		var f_year = jinLib.getYearAsString(o_year);

		return f_year+'년 '+f_month+'월 '+f_day+'일';
	}
	
	/*add one day to the value and return as YMD*/
	function subDay(value){
		
		var i_date = jinLib.replace(' ',value);
		var yearInt = jinLib.getYearAsNum( i_date );
		var monthInt = jinLib.getMonthAsNum( i_date );
		var pre_monthInt = jinLib.getMonthAsNum( (monthInt - 1).toString() );
		pre_monthInt = pre_monthInt < 1 ? 12 : pre_monthInt;
		var pre_is31 = jinLib.isOverThirty( pre_monthInt );
		var isLeapYear = jinLib.isLeapYear(yearInt);
		
		var o_day = Math.abs( (jinLib.getDayAsNum( i_date ) - 1) );
		var o_month = monthInt;
		var o_year = yearInt;

		if(!pre_is31){
			if(pre_monthInt != 2){
				if(o_day<1){
					o_day = 30;
					o_month -= 1;
				}
			}else if(pre_monthInt == 2){
				if(isLeapYear){
					if(o_day<1){
						o_day = 29;
						o_month -= 1;
					}
				}else{
					if(o_day<1){
						o_day = 28;
						o_month -= 1;
					}
				}
			}
		}else{
			if(o_day<1){
				o_day = 31;
				o_month -= 1;
			}
		}
		if(o_month<1){
			o_year -= 1;
			o_month = 12;
		}
		
		var f_day = jinLib.getDayAsString(o_day.toString());
		var f_month = jinLib.getMonthAsString(o_month.toString());
		var f_year = jinLib.getYearAsString(o_year.toString());
		
		return f_year+'년 '+f_month+'월 '+f_day+'일';
	}
	
	function addMonth(value){
		
		var i_date = jinLib.replace(' ',value);
		var yearInt = jinLib.getYearAsNum( i_date );
		var monthInt = jinLib.getMonthAsNum( i_date );
		var o_month = monthInt + 1;
		var o_year = yearInt;
		
		if(o_month==13){
			o_month = 1;
			o_year += 1;
		}
		
		var f_month = jinLib.getMonthAsString(o_month);
		var f_year = jinLib.getYearAsString(o_year);
		return f_year+'년 '+f_month+'월 ';;
	}
	
	function subMonth(value){
		
		var i_date = jinLib.replace(' ',value);
		var yearInt = jinLib.getYearAsNum( i_date );
		var monthInt = jinLib.getMonthAsNum( i_date );
		var o_month = monthInt -1;
		var o_year = yearInt;
		
		if(o_month<1){
			o_month = 12;
			o_year -= 1;
		}
		
		var f_month = jinLib.getMonthAsString(o_month);
		var f_year = jinLib.getYearAsString(o_year);
		return f_year+'년 '+f_month+'월 ';
	}
	
	function addYear(value){
		var yearInt = jinLib.getYearAsNum( value );
		return (yearInt + 1)+'년';
	}
	
	function subYear(value){
		var yearInt = jinLib.getYearAsNum( value );
		return (yearInt - 1)+'년';
	}
	
	function replace(t,v){
		switch(t){
		case ',': return v.replace(/,/gi,""); break;
		case '-': return v.replace(/-/gi,""); break;
		case ' ': return v.replace(/ /gi,""); break;
		}
	}
	
	function setFmtForAXISCal(val,id,obj,nDate,separator){
    	if(id.slice(-3)=='dkr'){
    		val = obj.nDate.print("yyyy" + '년 ' + "mm" + '월 ' + "dd" + '일');
    	}else if(id.slice(-3)=='mkr'){
    		val = obj.nDate.print("yyyy" + '년 ' + "mm" + '월');
    	}else if(id.slice(-3)=='ykr'){	
    		val = obj.nDate.print("yyyy" + '년');
    	}else{
    		val = obj.nDate.print("yyyy" + separator + "mm" + separator + "dd");
    	}
    	return val;
	}
	
//	/*selectBox 동적생성*/
//	function renderSelectBox(div_id,select_id,optGroupLabel,data){
//		
//		   var format='';
//		   $.each(data.storeList,function(i,v){
//			   format += "<option value="+v.STR_CODE+">"+v.STR_NAME+"</option>";
//		   });
//		   $(div_id).append("<select id="+select_id+">"+
//   					 			"<optgroup label="+optGroupLabel+">"+
//   					 				format+
//   					 			"</optgroup>"+
//   					 		"</select>"
//		   );
//		   
//	}//end of renderSelectBox()	
	
	/*selectBox 동적생성*/
	function renderSelectBox(div_id,data,opt){
		
		var o = typeof opt === 'undefined' ? '전체' : '선택' ;
		switch(o){
		case '전체':
			var htmlData='';
			$.each(data.storeList,function(i,v){
				htmlData += "<option value="+v.STR_CODE+">"+v.STR_NAME+"</option>";
			});
			$(div_id).append(htmlData);
			break;
			
		case '선택':
			var htmlData='';
			$.each(data.storeList,function(i,v){
				if(v.STR_NAME == '전체'){
					htmlData += "<option value="+"NYS"+">"+"매장선택"+"</option>";
				}else{
					htmlData += "<option value="+v.STR_CODE+">"+v.STR_NAME+"</option>";
				}
			});
			$(div_id).append(htmlData);			
			break;
		}
	}//end of renderSelectBox()
	
	
	/* Table 동적생성
	 * Parameter 설명
	 * 1. columnHeader_arry - column 한글명
	 * 2. columnId_arry     - column ID
	 * 3. tableInfo_arry    - array [ 
	 * 								  0 :   append 할 <div id = ?>   
	 * 								  1 : , <table id = ? >
	 * 								  2 : , AJAX return Object 
	 * 								]
	 * [EX]
	 * Ajax callback에 선언하기,
	 * var columnHeader = ["순번","날짜","금액","건수","지불방식"];
	 * var columnId = ["DATES","PAY_AMT","COUNT","PAY_TYPE"];
	 * var tableInfo = ["#AXGridTarget3","Annual_RevenueTable",data];
 	 * jinLib.renderTable(columnHeader,columnId,tableInfo);
	 * 
	 */
	function renderTable(columnHeader_arry, columnId_arry, tableInfo_arry, eventInfo_arry, cb){	
		
		var header='';
		header += "<table id="+tableInfo_arry[1]+" style='width:300px'><tr>";
		
		var chl=columnHeader_arry.length;
		for (var n=0; n<chl; n++) {
			//header +="<th>"+columnHeader_arry[n]+"</th>";
			header +="<th columnEngNm="+columnId_arry[n]+">"+columnHeader_arry[n]+"</th>";
		}
		header += "</tr></table>";
		
		$(tableInfo_arry[0]).append(header);

		$.each(tableInfo_arry[2].dataList,function(i,v){
			
			//if(i<2){
			
				var columnListLength=columnId_arry.length;
			    var body='';
			    	body +="<td>"+(i+1)+"</td>";
					
			    for (var j=0; j<columnListLength; j++){
			    	//body +="<td>"+v[columnId_arry[j]]+"</td>";
			    	body +="<td id="+tableInfo_arry[1]+'_'+columnId_arry[j]+i+">"+v[columnId_arry[j]]+"</td>";
			    }
			    
					
			    $("#"+tableInfo_arry[1]).append("<tr>"+body+"</tr>");

			//}
				
		});
		
		var tableInfo_arry_length = tableInfo_arry.length;
		if(tableInfo_arry_length>0){
			$.each(tableInfo_arry[2].dataList,function(i,v){
				
			    for (var j=0; j<columnId_arry.length; j++){
			    	
			    	for (var k=0; k<eventInfo_arry.length; k++){
			    	
			    		$('#'+tableInfo_arry[1]+'_'+columnId_arry[j]+i).on(eventInfo_arry[k],cb);
			    	
			    	}
			    }
			});
		}
	}//end of renderTable()

	
	//to access to the database
	function xhr(url,data,type,async,formData){
		if(formData==undefined){
			return $.ajax({
				type  : (typeof type  === 'undefined' ? 'POST':(type.length < 1 ? 'POST':type)),
				url   : (typeof url   === 'undefined' ? console.log(mm.xhr.err.msg01):getHost()+url),
				data  : (typeof data  === 'undefined' ? {}:(data.lenght < 1 ? {}:data)), 
				async : (typeof async === 'undefined' ? true:(async.length < 1 ? true:async)),
				error : function(){mm.xhr.err.msg00;}
			});
		}else{
			return $.ajax({
				type  : (typeof type  === 'undefined' ? 'POST':(type.length < 1 ? 'POST':type)),
				url   : (typeof url   === 'undefined' ? console.log(mm.xhr.err.msg01):getHost()+url),
				data  : (typeof data  === 'undefined' ? {}:(data.lenght < 1 ? {}:data)), 
				async : (typeof async === 'undefined' ? true:(async.length < 1 ? true:async)),
				processData: false,
				contentType: false,
				error : function(){mm.xhr.err.msg00;}
			});
			
		}
	}
	
	
	function getSum(dataList,columnIds){
			var sum=0;
			$.each(dataList,function(i,v){
				sum+=v[columnIds];
			});
			return sum;
	}
	
	function setBackEvent(target){
		$(target).on('click',function(){
			history.back();
		});
	}
	
	function makeMonthParam(v){
		if(v.length !=6){console.log('Param :: RRRRMM (string)');return false;};
		var sDate=''; var eDate='';
		if(jinLib.isOverThirty( v.substring(4,6) )){
			sDate += v+'01'; eDate += v+'31'; 
		}else{
			if(v.substring(4,6)=='02'){
				if( jinLib.isLeapYear( v.substring(0,4) ) ){
					sDate += v+'01'; eDate += v+'29';
				}else{
					sDate += v+'01'; eDate += v+'28'; 
				}
			}else{
				sDate += v+'01'; eDate += v+'30';
			}
		}
		return {sDate:sDate,eDate:eDate};
	}
	
	function progressOn(){
		if($('img#loading').length > 0 ){ $('img#loading').remove(); }
		var htmlData = "<img id='loading' alt='loading' src='/images/loading.gif'/>";
		$('body').append(htmlData).end().find('img#loading').css({'z-index':'5000','position':'fixed','left':'50%','top':'50%','margin-top':'-12.5px','margin-left':'-50px','display':'none'}).css('display','inline');
		$('#total').html('조회 중...');
	}
	
	function progressOff(){
		$('#loading').css('display','none');
	}
	
	function getHost(){
		return '/p2020/';
	}
	
	function setMenu(type){
		switch(type){
		case "menu" :
			$(".fm01").addClass("selectedmenu_1");
			break;
		case "sales" :
			$(".fm02").addClass("selectedmenu_2");
			break;
		case "userInfo" :
			$(".fm03").addClass("selectedmenu_3");
			break;
		}
	}
	
	function slideSearchBox(targetIds,type){
		var targetIdsSize= targetIds.length;
		
		switch(type){
		
		case undefined:
			
				var position = $(window).scrollTop();
				if(position!=0){
					slideSearchBox(targetIds,'down');
				}else{
					
					if(typeof targetIds === 'object'){
						
						for(var i=0;i<targetIdsSize;i++){
							$(targetIds[i]).toggle();
						};
						
					}else if(typeof targetIds === 'string'){
							$(targetIds).toggle();
					}
				}
				break;
			
		case "up" :
			
				if(typeof targetIds === 'object'){
					
					for(var i=0;i<targetIdsSize;i++){
						$(targetIds[i]).hide();
					};
					
				}else if(typeof targetIds === 'string'){
						$(targetIds).hide();
				}
					
				break;
			
		case "down" :
			
				if(typeof targetIds === 'object'){
					
					for(var i=0;i<targetIdsSize;i++){
						$(targetIds[i]).show();
					};
					
				}else if(typeof targetIds === 'string'){
						$(targetIds).show();
				}
				
			break;
		
		}
	}
	
	function setScrollEvent(targetIds){
		
		 $(document).scroll(function(){
			var position = $(window).scrollTop();
//				var maxHeight = window.document.body.offsetHeight;
			if(position==0){
				slideSearchBox(targetIds,"down");
			}else{
				slideSearchBox(targetIds,"up");
			} 
		 });
		 
	}
	
	function activateModal(cb){
		
		$('body').addClass('body');
		$('#mainWrapper').addClass('modal_contents');
		$('html').addClass('modal_active');
		
		$('html').bind('keyup',function(e){
			if(e.which===27){ deactivateModal(cb); }
		});
		$('#modal_cover').bind('click',function(e){
			deactivateModal(cb);
		});
		$('#closePop').on('click',function(e){
			deactivateModal(cb);
		});
	}
	
	function deactivateModal(cb){
	
		$('html').removeClass('modal_active');
		$('html').unbind('keyup');
		$('#modal_cover').unbind('click');
		$('#closePop').unbind('click');	
		cb();
	}
	
	/*to attach AXIS Calendar to DOM*/
	function attachAXISCalendar(target,cb){
		
		$(target).bindDate({
			align:"center", 
			valign:"middle", 
			separator:"/",
			selectType:( target.slice(-3) ).substring(0,1),
			onchange:cb
		});	
	}
	
	function hasKor(str){
		var condition = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/;
		if(condition.test(str)){
			return true;
		}
		return false;
	}
	
	function hasTarget(target){
		if($.find(target).length > 0){
			return true;
		}
		return false;
	}
	
	function modalCoverFormat(){
		if($j.hasTarget('#modal_cover')){ $('#modal_cover').remove();}
		return "<div id='modal_cover' class='modal_cover'></div>";
	}
	
	function popUpFormat(txt){
		if($j.hasTarget('.modal_popUp')){ $('.modal_popUp').remove();}
		return " <div class='modal_popUp'>\
			<div class=modal_popUpTopLine></div>\
			<p>"+txt+"</p>\
			<button id='closePop' class='closePop'>닫음</button>\
		</div>";
	}
	
	
	function popUpFormatConfirm(txt){
		if($j.hasTarget('.modal_popUp')){ $('.modal_popUp').remove();}
		return '<div class = "modal_popUp">'+
					'<div class=modal_popUpTopLine></div>'+
					 '<p>'+txt+'</p>'+
			    	'<div class="btnPosition">'+
			    	'<button class="confirmOk">확인</button>'+
			    	'<button class="closePop" >취소</button>'+	
			    	'</div>'+
			   '</div>';
	}
	
	function getIntervalBwDatesByParam(f,t){
		if(typeof f !== 'string' || typeof t !== 'string'){
			console.log(mm.xhr.err.msg02);
			return false;
		}
		var _f = new Date(f.substring(0,4),f.substring(4,6),f.substring(6,8));
		var _t = new Date(t.substring(0,4),t.substring(4,6),t.substring(6,8));
		return Math.floor(_t-_f) / (1000*60*60*24);
	}
	
	plain={
		dev01:'[개발자MSG]',
		usr01:'[사용자MSG]'
	};

	mm = { 
			xhr : {
					err:{
							msg00:(plain.dev01)+' xhr error',
							msg01:(plain.dev01)+' a parameter of url is undefined',
							msg02:(plain.dev01)+' dataType err'
						}
				  },
			pop : {
					msg01:'이번 날짜 이후로는 검색할 수 없습니다.',
					msg02:'이번 달 이후로는 검색할 수 없습니다.',
					msg03:'이번 연도 이후로는 검색할 수 없습니다.'
			}
	};
	
	function getMsg(div){
		switch(div){
		case 'msg01': return '검색시작일이 종료일을 넘을 수 없습니다.';
		case 'msg02': return '검색시작일이 오늘 날짜를'+'<br>'+' 넘을 수 없습니다.';
		case 'msg03': return '31일 이상은 검색하실 수 없습니다.';
		case 'msg04': return '이번 날짜 이후로는 검색할 수 없습니다.';
		case 'msg05': return '이번 달 이후로는 검색할 수 없습니다.';
		case 'msg06': return '이번 연도 이후로는 검색할 수 없습니다.';
		
		}
	}
	
	function blockBackspace(){
		/* 8 : back key */
		$(document).keydown(function(e){
    		if(e.which==8 && e.target.localName != 'input' && e.target.localName != 'textarea'){
        		e.preventDefault();
        		return;
        	}
    	});
	}
	
	var userId='',
	userAuth='';
	function buildUserVO(d){
		//userId = userId;
		userAuth = d.msgMap.auth;
	}
	function getUserVO(){
		return{
			  userId : userId
			, userAuth : userAuth
		};
	}
	
//	jinLib.userVO = function(){
//			
//			var userId = '',
//				authNo = '';
//			function setUserId(userId){
//				this.userId = userId;
//			}
//			function getUserId(){
//				return this.userId;
//			}
//			function setAuthNo(authNo){
//				this.authNo = authNo;
//			}
//			function getAuthNo(){
//				return this.authNo;
//			}
//			function buildUserVO(data){
//				this.setUserId(data.auth);
//				this.setAuthNo(data.auth);
//			}
//		};

	function subOneMonth(pv){
		
		var v = pv.val || false ? replaceAll(pv.val,' ',''): false,
			f = pv.fmt || false ? pv.fmt: false,
			y,m = undefined; 
		switch (f) {
		case 'kor':
			break;
		case '/':
			y = getYearAsInt(v,f);
			m = getMonthAsInt(v,f) - 1; 
			if(m<1){m = 12; y -= 1;}
			v = getYearAsString(y)+'/'+getMonthAsString(m);
			break;
		case '-':
			y = getYearAsInt(v,f);
			m = getMonthAsInt(v,f) - 1; 
			if(m<1){m = 12; y -= 1;}
			v = getYearAsString(y)+'-'+getMonthAsString(m);
			break;
		default:
			break;
		}
		return v;
	}

	function addOneMonth(pv){
		
		var v = pv.val || false ? replaceAll(pv.val,' ',''): false,
			f = pv.fmt || false ? pv.fmt: false,
			y,m = undefined;
		switch (f) {
		case 'kor':
			break;
		case '/':
			y = getYearAsInt(v,f);
			m = getMonthAsInt(v,f) + 1; 
			if(m===13){m = 1; y += 1;}
			v = getYearAsString(y)+'/'+getMonthAsString(m);
			break;
		case '-':
			y = getYearAsInt(v,f);
			m = getMonthAsInt(v,f) + 1; 
			if(m===13){m = 1; y += 1;}
			v = getYearAsString(y)+'-'+getMonthAsString(m);
			break;
		default:
			break;
		}
		return v;		
	}
	
	function getYearAsInt(YMD,fmt){
		return parseInt(YMD.split(fmt)[0]);
	}
	function getMonthAsInt(YMD,fmt){
		return parseInt(YMD.split(fmt)[1]);
	}
	function getDayAsInt(YMD,fmt){
		return parseInt(YMD.split(fmt)[2]);
	}
	function getYearAsString(yyyy){
		return yyyy.toString();
	}
	function getMonthAsString(mm){
		return ( '00' + mm ).slice(-2);
	}
	function getDayAsString(dd){
		return ( '00' + dd ).slice(-2);
	}
	function replaceAll(v,d,a){
		switch(d){
		case '/': return v.replace(/['/']/gi,a); break;
		case ',': return v.replace(/[',']/gi,a); break;
		case '-': return v.replace(/['-']/gi,a); break;
		case ' ': return v.replace(/[ ]/gi,a); break;
		}
	}	
	function getCurYearAsString(){
		return ( new Date().getFullYear() ).toString();
	}
	function getCurMonthAsString(){
		return ( '00' + (new Date().getMonth()+1) ).slice(-2);
	}
	function getCurDayAsString(){
		return ( '00' + (new Date().getDate()) ).slice(-2);
	}
	function getCurDate(oFmt,deli){
		switch (oFmt) {
		case 'YMD':
			return getCurYearAsString()+deli+getCurMonthAsString()+deli+getCurDayAsString();
			break;
		case 'YM' :
			return getCurYearAsString()+deli+getCurMonthAsString();
			break;
		case 'MD' :
			return getCurMonthAsString()+deli+getCurDayAsString();
			break;
		}
	}
	//패스워드 정규식 검사 
	function passwdReg($obj,minLength){
		
			var passwdRegexp = /[a-zA-Z]+/;
				
			var inputNoSize=$obj[0].value.length;
			
			if(minLength==null){
				minLength=6;
			}
			
			if(inputNoSize>minLength-1){
				if( !passwdRegexp.test($obj.val()) ) {
					alert('영문과 숫자 조합으로 입력해 주세요.');
					$obj.focus();
					return false;
				}
				return true;
			}else{
				alert(minLength+'자 이상으로 입력해 주세요.');
				$obj.focus();
				return false;
			}
			
	}		//end of passwdReg
	
	function goToTop(){
		window.scrollTo(0,0);
	}
	
	//특수문자가 있는 정규식
	function passwdScReg($obj,minLength, maxLength){
	
		//var regMust1 = /[a-zA-Z0-9_]/;
		//var regMust2 = /[^a-zA-Z0-9_]/;

		var regExEng=/[a-zA-Z]/;
		var regExNum=/[0-9]/;
		var regSpecChar=/[!@#$%^&*()-+=_]/;

		var inputNoSize=$obj[0].value.length;
		
		if(minLength==null){ minLength=8; }
		if(maxLength==null){ maxLength=16; }
		
		if(inputNoSize>minLength-1){
			 if (!regExEng.test($obj.val()) || !regExNum.test($obj.val()) || !regSpecChar.test($obj.val())) {
				alert('영문, 숫자, 특수문자 조합으로 입력해 주세요.');
				$obj.focus();
				return false;
			 }
			/*
			if(!regMust1.test($obj.val()) || !regMust2.test($obj.val()) ) {
				alert('영문, 숫자, 특수문자 조합으로 입력해 주세요.');
				$obj.focus();
				return false;
			}
			*/
			return true;
		}else{
			alert(minLength+' ~ ' + maxLength + '자로 입력해 주세요.');
			$obj.focus();
			return false;
		}
		
	}		//end of passwdScReg
	
	
	function dayAdj(date,adj){
		var arr= date.split("-");
		var ymd = arr[0] + arr[1] + arr[2];
		var n_ymd = getDay(ymd, adj);
		return n_ymd.substring(0, 4)+"-"+n_ymd.substring(4, 6)+"-"+n_ymd.substring(6, 8);
	}

	function dayAdj2(date,adj){
		var adjDate = new Date(date); 
		console.log(adjDate.getDate());
		adjDate.setDate(adjDate.getDate() + adj);
		return adjDate.print('yyyy-mm-dd');
	}

	/* 날짜 구하기(당일로부터 n만큼) */
	function getDay(date,num) {
		//Date객체는 달은 -1만큼 줄임
		if(date.substring(6,7) == "0") {
			var myDate = new Date(date.substring(0,4), parseInt(date.substring(4,6),10)-1, parseInt(date.substring(7,8),10)+parseInt(num,10));
		}
		else {
			var myDate = new Date(date.substring(0,4), parseInt(date.substring(4,6),10)-1, parseInt(date.substring(6,8),10)+parseInt(num,10));
		}
		//myDate.setDate(myDate.getDate() + Number(1));
		var result = formatDate(myDate);
		
		return result;
	}        	

	/* 날짜 Format */
	function formatDate(date) {
		var mymonth = date.getMonth()+1;//변환시 반드시 1 넣기!!
		var myweekday = date.getDate();

		return (date.getFullYear() + ((mymonth < 10) ? "0" : "") + mymonth + ((myweekday < 10) ? "0" : "") + myweekday);			
	}

	return{
			setComma 					:	setComma
		,	xhr							:	xhr
		,	getTodayAsYMD				:	getTodayAsYMD
		,	getTodayAsYM				:	getTodayAsYM
		,	getTodayAsMD				:	getTodayAsMD
		,	getDateWOKor				:	getDateWOKor
		,	getDateWKor					:	getDateWKor
		,	getCurYear					:	getCurYear
		,	getCurMonth					:	getCurMonth
		,	getCurDay					:	getCurDay
		,	getTimeAs12HHMM				:	getTimeAs12HHMM
		,	renderSelectBox				:	renderSelectBox
		,	renderTable					:	renderTable
		,	isLeapYear					:	isLeapYear
		,	getYearAsNum				:	getYearAsNum
		,	getMonthAsNum				:	getMonthAsNum
		,	getDayAsNum					:	getDayAsNum
		,	getYearAsString				:	getYearAsString
		,	getMonthAsString			:	getMonthAsString
		,	getDayAsString				:	getDayAsString
		,	isOverThirty				:	isOverThirty
		,	addYear						:	addYear
		,	addMonth					:	addMonth
		,	addDay						:	addDay
		,	subYear						:	subYear
		,	subMonth					: 	subMonth
		,	subDay						:	subDay
		,	setFmtForAXISCal			:	setFmtForAXISCal
		,	replace						:	replace
		,	getSum						:	getSum
		,	setBackEvent				:	setBackEvent
		,	makeMonthParam				:	makeMonthParam
		,	progressOn					:	progressOn
		,	progressOff					:	progressOff
		,	getHost						:	getHost
		,	setMenu						:	setMenu
		,	slideSearchBox				:	slideSearchBox
		,	setScrollEvent				:	setScrollEvent
		,	activateModal				:	activateModal
		,	deactivateModal				:	deactivateModal
		,	attachAXISCalendar			:	attachAXISCalendar
		,	hasKor						:	hasKor
		,	hasTarget					:	hasTarget
		,	getIntervalBwDatesByParam	:	getIntervalBwDatesByParam
		,	modalCoverFormat			:	modalCoverFormat
		,	popUpFormat					:	popUpFormat
		,	popUpFormatConfirm			:	popUpFormatConfirm
		,	getMsg						:	getMsg
		,   blockBackspace				:   blockBackspace
		,   buildUserVO					:   buildUserVO
		,   getUserVO					:   getUserVO
		,	subOneMonth					:	subOneMonth
		,	addOneMonth					:	addOneMonth
		,	getCurDate					:	getCurDate
		,	passwdReg					:	passwdReg
		,	passwdScReg					:	passwdScReg
		,	goToTop						:	goToTop
		,	dayAdj						:	dayAdj
		,   getDay : getDay
		,   formatDate : formatDate

	};
	
}();
window.jinLib = window.$j = jinLib;