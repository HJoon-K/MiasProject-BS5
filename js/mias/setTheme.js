function Log(logStr) {
	console.log(logStr);
}


function setCookie(name, value, exp) {
	console.log('setCookie호출');
  var date = new Date();
  date.setTime(date.getTime() + exp*24*60*60*1000);
  document.cookie = name + '=' + value + ';expires=' + date.toUTCString() + ';path=/;SameSite=Lax';
}

function getCookie(key) {
    var result = null;
    var cookie = document.cookie.split(';');
    cookie.some(function (item) {
        // 공백을 제거
        item = item.replace(' ', '');
 
        var dic = item.split('=');
 
        if (key === dic[0]) {
            result = dic[1];
            return true;    // break;
        }
    });
    return result;
}