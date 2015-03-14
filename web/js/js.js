


if (typeof String.prototype.replaceAll !== 'function') {
    String.prototype.replaceAll = function (find, replace) {
        var str = this;
        return str.replace(new RegExp(find, 'g'), replace);
    };
}

if (typeof String.prototype.startsWith !== 'function') {
// see below for better implementation!
    String.prototype.startsWith = function (str) {
        return this.indexOf(str) === 0;
    };
}
if (typeof String.prototype.contains !== 'function') {
    String.prototype.contains = function (it) {
        return this.indexOf(it) !== -1;
    };
}

Array.prototype.removeValue = function (name, value) {
    var array = $.map(this, function (v, i) {
        return v[name] === value ? null : v;
    });
    this.length = 0; //clear original array
    this.push.apply(this, array); //push all elements except the one we want to delete
};

Array.prototype.remove = function (index) {
    var t = [];
    for (var i = 0; i < this.length; i++) {
        if (i !== index) {
            t.push(this[i]);
        }
    }
    this.length = 0; //clear original array
    this.push.apply(this, t); //push all elements except the one we want to delete
};

//http://www.javascriptkit.com/javatutors/domstorage.shtml
//http://www.w3schools.com/html/html5_webstorage.asp
function FullHappyCookie() {
}
;
FullHappyCookie.getCookie = function (key) {
    var value = sessionStorage.getItem(key);
    if (value) {
        value = unescape(value);
    }
    return value;
};
FullHappyCookie.setCookie = function (key, value) {
    if (value) {
        value = escape(value);
    }
    sessionStorage.setItem(key, value);
};
FullHappyCookie.deleteCookie = function (key) {
    sessionStorage.removeItem(key);
};
FullHappyCookie.deleteAllCookie = function () {
    sessionStorage.clear();
};

var isAdmin = eval('(' + FullHappyCookie.getCookie('isSignIn') + ')');

function getRootURL() {
    return window.location.protocol + "//" + window.location.hostname + (window.location.port.length <= 0 ? "" : ":" + window.location.port);
}
jQuery(document).ready(function () {
    loadMenu();
    loadFooter();
});

function getCurrentPage() {
    var pathname = window.location.pathname;
    if (pathname === '/') {
        return 'home';
    } else if (pathname === '/contact') {
        return 'contact';
    } else if (pathname === '/products') {
        var search = window.location.search;
        if (search === '?in_new')
            return 'in_new';
        else if (search === '?sale_off')
            return 'sale_off';
        else if (search === '?item')
            return 'item';
        else
            return 'products';

    } else if (pathname.startsWith('/products')) {
        var paths = pathname.substr(1).split('/');
        switch (paths.length) {
            case 2:
                return 'category';
            case 3:
                return 'detail';
        }
    }
}
;

window.currentPage = getCurrentPage();

if (currentPage === 'item') {
    alert('Coming Soon. \n We Go To Home Page?');
    window.location.href = '/';
}
function focusMenuItem() {

    var currentPageMapMenu = {
        home: '#menu_home',
        contact: '#menu_contact',
        products: '#menu_products',
        in_new: '#menu_in_new',
        item: '#menu_item',
        sale_off: '#menu_sale_off',
        category: '#menu_products',
        detail: '#menu_products'

    };
//    var pathname = window.location.pathname.substr(1);
//
//    if (pathname === '') {
//        pathname = 'home';
//    }
    jQuery(currentPageMapMenu[window.currentPage]).addClass('active');
}

function loadMenu() {
    setTimeout(function () {
        jQuery.get(getRootURL() + "/masthead.html", function (data) {
            jQuery(".masthead").html(data);
            jQuery("#masthead").css('opacity', '1');
            focusMenuItem();
        });
    }, 0);
}
function loadFooter() {
    setTimeout(function () {
        jQuery.get(getRootURL() + "/footer.html", function (data) {
            jQuery(".footer").html(data);
        });
    }, 0);
}

window.loadSiteInfo = FullHappyCookie.getCookie('loadSiteInfo');
if (window.loadSiteInfo === null || window.loadSiteInfo.trim().length <= 0) {
    setTimeout(function () {
        window.loadSiteInfo = loadXMLDoc(getRootURL() + '/rest/siteInfo/get/true');
        FullHappyCookie.setCookie('loadSiteInfo', window.loadSiteInfo);
        window.loadSiteInfo = eval('('+window.loadSiteInfo+')');
    }, 0);
}

function loadXMLDoc(url)
{
    var xmlhttp;
    if (window.XMLHttpRequest)
    {// code for IE7+, Firefox, Chrome, Opera, Safari
        xmlhttp = new XMLHttpRequest();
    }
    else
    {// code for IE6, IE5
        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }
    xmlhttp.onreadystatechange = function ()
    {
        if (xmlhttp.readyState === 4 && xmlhttp.status === 200)
        {
            xmlhttp.responseText;
        }
    };
    xmlhttp.open("GET", url, false);
    xmlhttp.send();
    return xmlhttp.responseText;
}

function postValue(url, params) {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function ()
    {
        if (xmlhttp.readyState === 4)
        {
            if (xmlhttp.status === 200) {
                xmlhttp.responseText;
            } else {

            }
        }
    };
    xmlhttp.open("POST", url, false);
    xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xmlhttp.send(params);
    return xmlhttp.responseText;
}




////////////////////////////////////////////////////////////////////

String.prototype.isLastString = function (s) {
    return this.lastIndexOf(s) > 0 && this.lastIndexOf(s) === (this.length - s.length);
};
//////////

function Support() {
}


var oldSetInterval = window.setInterval;
var oldClearInterval = window.clearInterval;
window.intervals = [];
window.setInterval = function (func, time) {
    var id = oldSetInterval(func, time);
    window.intervals.push(id);
    return id;
};

window.clearInterval = function (id) {
    oldClearInterval(id);
    for (var i = 0; i < window.intervals.length; ++i)
        if (window.intervals[i] == id)
            window.intervals.splice(i, 1);

};
window.isIntervalRegistered = function (id) {
    for (var i = 0; i < window.intervals.length; ++i)
        if (window.intervals[i] == id)
            return true;
    return false;
};

Support.validateNumber = function (evt) {
    var e = evt || window.event;
    var key = e.keyCode || e.which;

    if (!e.shiftKey && !e.altKey && !e.ctrlKey &&
            // numbers
            key >= 48 && key <= 57 ||
            // Numeric keypad
            key >= 96 && key <= 105 ||
            // Backspace and Tab and Enter
            key == 8 || key == 9 || key == 13 ||
            // Home and End
            key == 35 || key == 36 ||
            // left and right arrows
            key == 37 || key == 39 ||
            // Del and Ins
            key == 46 || key == 45) {
        // input is VALID
    } else {
        // input is INVALID
        e.returnValue = false;
        if (e.preventDefault)
            e.preventDefault();
    }
};
/*
 * Date 18/08/2013 copy from
 * http://robertnyman.com/2006/04/24/get-the-rendered-style-of-an-element/
 */
Support.getStyle = function (oElm, strCssRule) {
    var strValue = "";
    if (document.defaultView && document.defaultView.getComputedStyle) {
        strValue = document.defaultView.getComputedStyle(oElm, "")
                .getPropertyValue(strCssRule);
    } else if (oElm.currentStyle) {
        strCssRule = strCssRule.replace(/\-(\w)/g, function (strMatch, p1) {
            return p1.toUpperCase();
        });
        strValue = oElm.currentStyle[strCssRule];
    }
    return strValue;
};

Support.pointerInComponent = function (e, node) {
    var x = 0;
    var y = 0;
    if (e.pageX || e.pageY) {
        x = e.pageX;
        y = e.pageY;
    } else if (e.clientX || e.clientY) {
        x = e.clientX + document.body.scrollLeft
                + document.documentElement.scrollLeft;
        y = e.clientY + document.body.scrollTop
                + document.documentElement.scrollTop;
    }

    var top = node.offsetTop;
    var left = node.offsetLeft;
    var height = node.clientHeight;
    var width = node.clientWidth;

    if (y <= top || y >= top + height || x <= left || x >= left + width) {
        return false;
    } else {
        return true;
    }

};

Support.pointerNearComponent = function (e, node, nearPx) {
    var x = 0;
    var y = 0;
    if (e.pageX || e.pageY) {
        x = e.pageX;
        y = e.pageY;
    } else if (e.clientX || e.clientY) {
        x = e.clientX + document.body.scrollLeft
                + document.documentElement.scrollLeft;
        y = e.clientY + document.body.scrollTop
                + document.documentElement.scrollTop;
    }

    var top = node.offsetTop - nearPx;
    var left = node.offsetLeft - nearPx;
    var height = node.clientHeight + nearPx;
    var width = node.clientWidth + nearPx;

    if (y <= top || y >= top + height || x <= left || x >= left + width) {
        return false;
    } else {
        return true;
    }

};


Support.loadScript = function (url, callback)
{
    var head = document.getElementsByTagName('head')[0];
    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = url;
    if (callback) {
        script.onload = callback;
    }
    head.appendChild(script);
};
//End Support.loadScript
Support.loadStyle = function (url, callback)
{
    var head = document.getElementsByTagName('head')[0];
    var style = document.createElement("link");
    style.type = 'text/css';
    style.rel = 'stylesheet';
    style.href = url;
    if (callback) {
        style.onload = callback;
    }
    head.appendChild(style);
};
//End Support.loadStyle
//source:http://stackoverflow.com/questions/442404/retrieve-the-position-x-y-of-an-html-element
//http://stackoverflow.com/questions/3714628/jquery-get-the-location-of-an-element-relative-to-window
Support.getOffset = function (el) {
    var _x = 0;
    var _y = 0;
    while (el && !isNaN(el.offsetLeft) && !isNaN(el.offsetTop)) {
        _x += el.offsetLeft - el.scrollLeft;
        _y += el.offsetTop - el.scrollTop;
        el = el.offsetParent;
    }
    return {top: _y, left: _x};
};
// function Support()

Support.enableScroll = function () {
    document.documentElement.style.overflow = 'auto';  // firefox, chrome
    document.body.scroll = "yes"; // ie only
};

Support.disableScroll = function () {
    jQuery('html, body').css('overflow', 'hidden');

};
////////////////////////////////////////////////////////////////////////////////////////////

if (isAdmin && (currentPage === 'products' || currentPage === 'sale_off' || currentPage === 'in_new' || currentPage === 'category' || currentPage === 'detail' || currentPage === 'contact')) {
    Support.loadScript('/lib/on.edit.event/js/on.edit.js');
}
////////////////////////////////////////////////////////////////////////////////////////////