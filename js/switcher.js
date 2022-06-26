// Swicher
function toggleSwitcher() {
    var i = document.getElementById('style-switcher');
    if (i.style.left === "-189px") {
        i.style.left = "0px";
    } else {
        i.style.left = "-189px";
	}
};

function setColor(theme) {
    document.getElementById('color-opt').href = './css/colors/' + theme + '.css';
	setCookie('color_value', theme);
    
	toggleSwitcher(false);
};

function setTheme(theme) {
    document.getElementById('theme-opt').href = './css/' + theme + '.css';
	setCookie('theme-value', theme);

    toggleSwitcher(false);
};