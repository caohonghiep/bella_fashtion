
Support.loadStyle('/lib/on.edit.event/css/on.edit.css');

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
            + (top + 2 + window.scrollY) + 'px; left: ' + (left + width - 18) + 'px;');
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
    Support.disableScroll();
    var lightOverlay = node.cloneNode(true);
    lightOverlay.setAttribute('class', lightOverlay.getAttribute('class').replace('editable', ''));
//jQuery(lightOverlay).unbind( "mouseover" );
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
    lightOverlay.setAttribute('class', lightOverlay.getAttribute('class') + ' fullhappy_light_box_light');
    lightOverlay.setAttribute('contenteditable', 'true');
    lightOverlay.setAttribute('style',
            'box-shadow:0 0 6px #000000; z-index: 1002;background-color: white;'
            // + 'top: '+top+'px; left: '+left+'px;');
            + 'top: ' + (top + window.scrollY) + 'px; left: ' + left + 'px; height: ' + height + 'px;width: ' + width + 'px;'
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


    try {
//        bootbox.prompt({
//            title: "Thay đổi Link bên dưới",
//            value: _img.src,
//            callback: function (result) {
//                callbackAction(result);
//            }
//        });

        bootbox.dialog({
            title: "Thay đổi các địa chỉ ảnh bên dưới",
            message: '<div class="row">  ' +
                    '<div class="col-md-12"> ' +
                    '<form class="form-horizontal"> ' +
                    '<div class="form-group"> ' +
                    '<label class="col-md-2 control-label" for="bootbox_src">Ảnh Nhỏ</label> ' +
                    '<div class="col-md-10"> ' +
                    '<input id="bootbox_src" value="' + jQuery(node).attr('src') + '" name="name" type="text" placeholder="" class="form-control input-md"> ' +
                    '</div> ' +
                    '<label class="col-md-2 control-label" for="bootbox_srcDisplay">Ảnh Vừa</label> ' +
                    '<div class="col-md-10"> ' +
                    '<input id="bootbox_srcDisplay" value="' + jQuery(node).attr('srcDisplay') + '" name="name" type="text" placeholder="" class="form-control input-md"> ' +
                    '</div> ' +
                    '<label class="col-md-2 control-label" for="bootbox_srcZoom">Ảnh Lớn</label> ' +
                    '<div class="col-md-10"> ' +
                    '<input id="bootbox_srcZoom" value="' + jQuery(node).attr('srcZoom') + '" name="name" type="text" placeholder="" class="form-control input-md"> ' +
                    '</div> ' +
                    '</div>' +
                    '</form>' +
                    '</div>' +
                    '</div>',
            buttons: {
                success: {
                    label: "Save",
                    className: "btn-success",
                    callback: function () {
                        var src = $('#bootbox_src').val();
                        var srcDisplay = $('#bootbox_srcDisplay').val();
                        var srcZoom = $('#bootbox_srcZoom').val();
                        alert(src + ' : ' + srcDisplay + ' : ' + srcZoom);

                    }
                }
            }
        });
    } catch (e) {
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
        Support.enableScroll();
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
        var _return = false;
        if (editAction !== null && editAction !== '') {
            _return = eval(editAction + '(lightOverlay)');
        } else {
            alert('please, check "onEdit" action');
        }
        if (_return) {
            jQuery('body').find(".save_button").remove();
            jQuery('body').find(".dont_save_button").remove();
            Client.LightBox();
        }
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
        Support.enableScroll();
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



    jQuery('body').on('mouseenter', '.editable', function () {
        jQuery(this).addClass('hover');
        Client.createEditButton(this);
    });
    jQuery('body').on('mouseout', '.editable', function (event) {
        var ed = document.getElementsByClassName('edit_button')[0];
        if (!Support.pointerNearComponent(event, ed, 2)) {
            jQuery(this).removeClass('hover');
            Client.removeEditBotton(this);
        }
    });
    jQuery('.editable').dblclick(function (e) {
        if (this.tagName !== 'IMG') {
            Client.enableEdit(this);
        }

    });
})();

(function () {
    jQuery('body').on("onenter", '*[onDelete]', function (event) {
        jQuery(this).attr('draggable', 'true');
    });
    
    jQuery('body').on("dragstart", '*[draggable]', function (event) {
        window.dragItem = event.target;
    });
    
    jQuery('body').on("dragstart", '*[onDelete]', function (event) {
        event.originalEvent.dataTransfer.setData('deleteAction', jQuery(this).attr('onDelete'));
    });
    var trash = document.createElement('div');
    trash.setAttribute('class', 'trash');
    document.body.appendChild(trash);
    trash.addEventListener('dragover', dragOver, false);
    trash.addEventListener('drop', drop, false);
    trash.addEventListener('dragenter', dragEnter, false);
    trash.addEventListener('dragleave', dragLeave, false);

    function dragOver(event) {
        event.preventDefault();
        return false;
    }

    /* Drop target event handlers */
    function dragEnter(event) {
        event.target.style.opacity = "1";
        event.target.style.border = "2px dashed #ff0000";
    }

    function dragLeave(event) {
        event.target.style.opacity = "0.2";
        event.target.style.border = "none";
    }
    function drop(event) {
        event.preventDefault();
        try {
            var deleteAction = event.dataTransfer.getData("deleteAction");
            eval('(' + deleteAction + ')');
        } catch (ex) {
            console.log(ex);
        }
        event.target.style.opacity = "0.2";
        event.target.style.border = "none";
    }

})();