// 숫자에 , 를 출력
function setComma(v){
	if(typeof v === 'number'){
		return (v.toString()).replace(/,/gi,"").toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
	}else if(typeof v === 'undefined'){
		return '0';
	}else{				
		return v.replace(/,/gi,"").toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
	}
}

/**
 * 입력값이 사용자가 정의한 포맷 형식인지 체크
 * 자세한 format 형식은 자바스크립트의 'regular expression'을 참조
 * 
 * @param str 문자열
 * @param format 포멧
 */
function isValidFormat(str, format) {
    if (str.search(format) != -1) {
        return true; //올바른 포맷 형식
    }
    return false;
}

/**
 * 숫자로만 이루진 문자열인지 검사
 * @param num 문자열
 */
function isOnlyNumber(num){
	var format = /[0-9*]$/;
	return isValidFormat(num, format);
}
/**
 * 입력값이 이메일 형식인지 체크
 * @param input 문자열
 */
function isValidEmail(input) {
    var format = "(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|\"(?:[\\x01-\\x08\\x0b\\x0c\\x0e-\\x1f\\x21\\x23-\\x5b\\x5d-\\x7f]|\\\\[\\x01-\\x09\\x0b\\x0c\\x0e-\\x7f])*\")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\\x01-\\x08\\x0b\\x0c\\x0e-\\x1f\\x21-\\x5a\\x53-\\x7f]|\\\\[\\x01-\\x09\\x0b\\x0c\\x0e-\\x7f])+)\\])";
    return isValidFormat(input, format);
}


/**
 * 입력 시점에 숫자만 입력되도록 한다.
 * @param e 이벤트
 */
function onKeyPressOnlyNumber(e){
	if(!e) var e = window.event;
	
    if ( e.keyCode < 48 || e.keyCode > 57 )
    {
         if (e.keyCode) e.keyCode = 0;
         else e.which = 0;
    }
}

function onlyNumber(event) {
	event = event || window.event;
	var keyID = (event.which)? event.which: event.keyCode;

	//if((keyID >= 48 && keyID <= 57) || ( keyID >=96 && keyID <= 105 ) ) {
	if((keyID >= 48 && keyID <= 57) || (keyID >= 96 && keyID <= 105) || keyID == 8 ||  keyID == 9 || keyID == 46 || keyID == 37 || keyID == 39) {
		return;
	} else {
		return false;
	}
}
function removeChar(event) {
	event = event || window.event;
	var keyID = (event.which) ? event.which : event.keyCode;
	if(keyID == 8 || keyID == 46 || keyID == 37 || keyID == 39 ) 
		return;
	else
		event.target.value = event.target.value.replace(/[^0-9]/g, "");
}

/**
 * 패스워드 유효성 검사
 * @param uid
 * @param upw
 * @returns {Boolean}
 */
function CheckPassword(uid, upw)
{
    if(!/^[a-zA-Z0-9!@#$%^&*()?_~]{8,12}$/.test(upw))
    { 
        alert(messages.do_pw_setting_v2); 
        return false;
    }
  
    var chk = 0;
    if(upw.search(/[0-9]/g) != -1 ) chk ++;
    if(upw.search(/[a-z]/ig)  != -1 ) chk ++;
    if(upw.search(/[!@#$%^&*()?_~]/g)  != -1  ) chk ++;
    if(chk < 3)
    {
        alert(messages.do_pw_setting2_v2); 
        return false;
    }
    
    if(/(\w)\1\1\1/.test(upw))
    {
        alert(messages.do_pw_setting3); 
        return false;
    }

    for(var i=0;i<uid.length-3;i++)
    {
    	var idPart=uid.substring(i,i+4);
    	if(upw.indexOf(idPart)>-1){
    		alert(messages.do_pw_setting4_v2);
    		return false;
    	}
    }

    return true;
}

/**
 * 패스워드 유효성 검사 - 입력값이 8자 이하 확인
 * @param upw
 * @returns {Boolean}
 */
function checkShortPwd(upw){
	if( upw == null || upw == ""){
		return false;		
	}
	
	if( upw.length < 8 ){
		return false;		
	}
	return true;
}

/**
 * 패스워드 유효성 검사 - 숫자, 영문, 특수문자 확인
 * @param upw
 * @returns {Boolean}
 */
function checkMixPwd(upw){
    if(!/^[a-zA-Z0-9!@#$%^&*()?_~]{8,12}$/.test(upw)){ 
        return false;
    }
  
    var chk = 0;
    if(upw.search(/[0-9]/g) != -1 ) chk ++;
    if(upw.search(/[a-z]/ig)  != -1 ) chk ++;
    if(upw.search(/[!@#$%^&*()?_~]/g)  != -1  ) chk ++;
    if(chk < 3){
        return false;
    }
    return true;
}

/**
 * 패스워드 유효성 검사 - 연속적인 숫자 확인
 * @param upw
 * @returns {Boolean}
 */
function checkContinualNumPwd(upw){
	if(/(\w)\1\1\1/.test(upw)){
       return false;
	}
	
	return true;
}
    
/**
 * 패스워드 유효성 검사 - 아이디, 패스워드 유사 여부 확인
 * @param uid
 * @param upw
 * @returns {Boolean}
 */
function checkIdSimilarPwd(uid, upw){
	for(var i=0;i<uid.length-3;i++)
    {
    	var idPart=uid.substring(i,i+4);
    	if(upw.indexOf(idPart)>-1){
    		return false;
    	}
    }

    return true;
}



function clearFirstClick(input, defaultValue) {
	if( input.value == defaultValue) input.value = '';
}

function resizeFrame(frm) {
	frm.style.height = "auto";
	contentHeight = frm.contentWindow.document.documentElement.scrollHeight;
	frm.style.height = contentHeight + 30 + "px";
}

function getCookie(cName) {
    cName = cName + '=';
    var cookieData = document.cookie;
    var start = cookieData.indexOf(cName);
    var cValue = '';
    if(start != -1){
         start += cName.length;
         var end = cookieData.indexOf(';', start);
         if(end == -1)end = cookieData.length;
         cValue = cookieData.substring(start, end);
    }
    return unescape(cValue);
}

// IE 확인
function isInternetExplorer(){
	var isIE = "N";
	if(getIEVersion() < 11) var isIE = "Y";
	return isIE;
}

// IE 버전 확인
function getIEVersion() { 
	var word; 
	var version = "N/A"; 

	var agent = navigator.userAgent.toLowerCase(); 
	var name = navigator.appName; 

	// IE old version ( IE 10 or Lower ) 
	if ( name == "Microsoft Internet Explorer" ) word = "msie "; 
	else { 
		// IE 11 
		if ( agent.search("trident") > -1 ) word = "trident/.*rv:"; 
		// Microsoft Edge  
		else if ( agent.search("edge/") > -1 ) word = "edge/"; 
	} 

	var reg = new RegExp( word + "([0-9]{1,})(\\.{0,}[0-9]{0,1})" ); 
	if (  reg.exec( agent ) != null  ) version = RegExp.$1 + RegExp.$2;
  
	var verNumber = parseInt (version , 10 ); 
	return verNumber; 
}