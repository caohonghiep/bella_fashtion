if (typeof String.prototype.startsWith !== 'function') {
    // see below for better implementation!
    String.prototype.startsWith = function (str) {
        return this.indexOf(str) === 0;
    };
}
jQuery(document).ready(function () {
    var contextPath = '/bebe3/';
    var uri = (window.location.pathname).substr(contextPath.length);
    if (uri.startsWith('contact')){
        jQuery('#menu_contact').addClass('active');
    }
});