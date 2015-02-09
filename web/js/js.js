


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
function getRootURL() {
    return window.location.protocol + "//" + window.location.hostname + (window.location.port.length <= 0 ? "" : ":" + window.location.port);
}
jQuery(document).ready(function () {
    loadMenu();
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
                return 'gallery';
            case 3:
                return 'category';
            case 4:
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
        gallery: '#menu_products',
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
