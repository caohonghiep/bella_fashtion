/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


/*
 * independent method
 */

String.prototype.isLastString = function (s) {
    return this.lastIndexOf(s) === (this.length - s.length);
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
    style.rel='stylesheet';
    style.href = url;
    if (callback) {
        style.onload = callback;
    }
    head.appendChild(style);
};
//End Support.loadStyle
//source:http://stackoverflow.com/questions/442404/retrieve-the-position-x-y-of-an-html-element
//http://stackoverflow.com/questions/3714628/jquery-get-the-location-of-an-element-relative-to-window
Support.getOffset=function( el ) {
    var _x = 0;
    var _y = 0;
    while( el && !isNaN( el.offsetLeft ) && !isNaN( el.offsetTop ) ) {
        _x += el.offsetLeft - el.scrollLeft;
        _y += el.offsetTop - el.scrollTop;
        el = el.offsetParent;
    }
    return { top: _y, left: _x };
};
// function Support()

Support.loadStyle('lib/on.edit.event/css/on.edit.css');
function Client() {
}
Client.createEditButton = function (node) {
//    var top = node.offsetTop;
//    var left = node.offsetLeft;
    var top = Support.getOffset(node).top;
    var left = Support.getOffset(node).left;
    var height = node.clientHeight;
    var width = node.clientWidth;

    var editButton = jQuery('<div class="edit_button" title="edit"></div>');
    editButton.attr('style', 'top:'
            + (top + 2) + 'px; left: ' + (left + width - 18) + 'px;');
    jQuery(node).addClass('box_shadow_orange');
    jQuery(editButton).click(function (e) {
        Client.removeEditBotton(node);
        if (node.tagName === 'IMG') {
            Client.enableEditImage(node);
        } else {
            Client.enableEdit(node);
        }
    });

    jQuery('body').append(editButton);
};
//end Client.createEditButton

Client.removeEditBotton = function (node) {
    jQuery('body').find(".edit_button").remove();
    jQuery(node).removeClass('box_shadow_orange');
};
//end Client.removeEditBotton

Client.enableEdit = function (node) {
    var lightOverlay = node.cloneNode(true);

    var paddingTop = Support.getStyle(node, 'padding-top');
    var paddingBottom = Support.getStyle(node, 'padding-bottom');
    var paddingLeft = Support.getStyle(node, 'padding-left');
    var paddingRight = Support.getStyle(node, 'padding-right');

    var paddingTopBottom = parseInt(paddingTop.substr(0, paddingTop.length - 2))
            + parseInt(paddingBottom.substr(0, paddingBottom.length - 2));
    var paddingLeftRight = parseInt(paddingLeft.substr(0,
            paddingLeft.length - 2))
            + parseInt(paddingRight.substr(0, paddingRight.length - 2));

    var top = Support.getOffset(node).top;
    var left = Support.getOffset(node).left;
    // var height = node.clientHeight;
    // var width = node.clientWidth;
    var height = node.clientHeight - paddingTopBottom;
    var width = node.clientWidth - paddingLeftRight;

    var fadeOverlay = document.createElement('div');
    fadeOverlay.setAttribute('id', 'fullhappy_light_box_fade');
    fadeOverlay.setAttribute('class', 'fullhappy_light_box_fade');
    var body = document.getElementsByTagName('body')[0];
    /*
     * lightOverlay.addEventListener('DOMCharacterDataModified', function() {
     * var s = lightOverlay.innerHTML; var br = s.indexOf(s, s.length - '<br>'.length) ==
     * 1 || s.indexOf(s, s.length - '<br/>'.length) == 1; if (br) {
     * jQuery(node).find("br:last").remove(); } }, false);
     */
    (lightOverlay.firstChild).addEventListener('DOMCharacterDataModified',
            function (evt) {
                // evt.prevValue
                // evt.newValue
                // evt.target.nodeValue='&nbsp;'
                var s = evt.prevValue;
                if (lightOverlay.lastChild.tagName === 'BR') {
                    lightOverlay.removeChild(lightOverlay.lastChild);
                }
            }, false);

    lightOverlay.setAttribute('id', 'fullhappy_light_box_light');
    lightOverlay.setAttribute('contenteditable', 'true');
    lightOverlay.setAttribute('style',
            'position: fixed; box-shadow:0 0 6px #000000; z-index: 1002;background-color: white;'
            // + 'top: '+top+'px; left: '+left+'px;');
            + 'top: ' + top + 'px; left: ' + left + 'px; height: ' + height + 'px;width: ' + width + 'px;'
            + 'padding-top:' + paddingTop + ';' + 'padding-bottom:' + paddingBottom + ';'
            + 'padding-right:' + paddingRight + ';' + 'padding-left:' + paddingLeft + ';');
    node.parentNode.appendChild(lightOverlay);
    body.appendChild(fadeOverlay);
    lightOverlay.focus();
    Client.createSaveButton(lightOverlay, node);
    Client.createDontSaveButton(lightOverlay);
};
//end Client.enableEdit

Client.enableEditImage = function (node) {
    var _img = node;
    function callbackAction(newSRC) {
        if (newSRC !== null && newSRC.trim().length > 0) {
            _img.src = newSRC;
            _img.title = "";
            var editAction = jQuery(node).attr('onEdit');
            if (editAction !== null && editAction.length !== 0) {
                eval(editAction + '(_img)');
            }
        }
    }


    if (window.bootbox) {
        bootbox.prompt({
            title: "Thay đổi Link bên dưới",
            value: _img.src,
            callback: function (result) {
                callbackAction(result);
            }
        });
    } else {
        var newSRC = prompt('Thay đổi Link bên dưới');
        callbackAction(newSRC);
    }
};
//end Client.enableEditImage

Client.createSaveButton = function (lightOverlay, node) {
    var top = lightOverlay.offsetTop;
    var left = lightOverlay.offsetLeft;
    var height = lightOverlay.clientHeight;
    var width = lightOverlay.clientWidth;

    var saveButton = jQuery('<div class="save_button" title="save"></div>');
    saveButton.attr('style', 'top:'
            + (top + 2) + 'px; left: ' + (left + width - 40) + 'px;');
    jQuery(saveButton).click(function (e) {
        var text = lightOverlay.innerHTML;
        text = text.trim();
        if (text.isLastString('<BR>') || text.isLastString('<br>')) {
            text = text.substr(0, text.length - '<br>'.length);
        }
        if (text.isLastString('<BR/>') || text.isLastString('<br/>')) {
            text = text.substr(0, text.length - '<br/>'.length);
        }

        node.innerHTML = text;
        var editAction = jQuery(node).attr('onEdit');
        if (editAction !== null && editAction !== '') {
            eval(editAction + '(lightOverlay)');
        }
        jQuery('body').find(".save_button").remove();
        jQuery('body').find(".dont_save_button").remove();
        Client.LightBox();
    });
    jQuery('body').append(saveButton);
};
//end Client.createSaveButton

Client.createDontSaveButton = function (node) {
    var top = node.offsetTop;
    var left = node.offsetLeft;
    var height = node.clientHeight;
    var width = node.clientWidth;

    var dontSaveButton = jQuery('<div class="dont_save_button" title="don\'t save"></div>');
    dontSaveButton.attr('style', 'top:'
            + (top + 2) + 'px; left: ' + (left + width - 20) + 'px;');
    jQuery(dontSaveButton).click(function (e) {
        var cancelEditAction = jQuery(node).attr('cancelEdit');
        if (cancelEditAction !== undefined && cancelEditAction !== null && cancelEditAction !== '') {
            eval(cancelEditAction + '(node)');
        }

        jQuery('body').find(".save_button").remove();
        jQuery('body').find(".dont_save_button").remove();
        Client.LightBox();
    });
    jQuery('body').append(dontSaveButton);
};
//end Client.createDontSaveButton

Client.LightBox = function () {
    var lightOverlay = document.getElementById('fullhappy_light_box_light');
    var fadeOverlay = document.getElementById('fullhappy_light_box_fade');
    if (lightOverlay !== null && fadeOverlay !== null) {
        lightOverlay.parentNode.removeChild(lightOverlay);
        fadeOverlay.parentNode.removeChild(fadeOverlay);
    }
};
//End function Client(){}




(function () {

    jQuery('*[onEdit]').each(function () {
        jQuery(this).addClass('editable');
    });

    jQuery('*[ondelete]').each(function () {
        jQuery(this).addClass('deletable');
    });

    //////////************/////////////


    /////////////////******************//////////

    jQuery('*[onEdit]').hover(function (event) {
        jQuery(this).addClass('hover');
        Client.createEditButton(this);
    }, function (event) {
        var ed = document.getElementsByClassName('edit_button')[0];

        if (!Support.pointerNearComponent(event, ed, 2)) {
            jQuery(this).removeClass('hover');
            Client.removeEditBotton(this);
        }

    });

    jQuery('*[onEdit]').dblclick(function (e) {
        if (this.tagName !== 'IMG') {
            Client.enableEdit(this);
        }

    });
})();