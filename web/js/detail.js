
var hrefItems = (window.location.href).split("/")
var itemId = hrefItems[hrefItems.length - 1];
var categoryId = hrefItems[hrefItems.length - 2];
var itemData = loadXMLDoc(getRootURL() + '/rest/items/item/' + categoryId + '/' + itemId);
itemData = eval('(' + itemData + ')');
function Detail(itemdata, container) {
    this.item = itemdata;
    function createImagesThumbnail(data, node) {
//        data= data.images;
        jQuery(node).find('*').remove();
        if (data !== null && data.length > 0) {
            var image;
            var imageContent;
            for (var i = 0; i < data.length && data[i]; i++) {
                if (data[i].urls
                        && data[i].urls.src
                        && data[i].urls.src.trim().length > 0) {
                    image = document.createElement('img');
                    image.setAttribute('imageId', data[i].id);
                    image.setAttribute('src', data[i].urls.srcThumbnail);
                    image.setAttribute('colorId', data[i].colorId);
                    image.setAttribute('srcDisplay', data[i].urls.src);
                    image.setAttribute('srcZoom', data[i].urls.srcZoom);
                    image.setAttribute('data-zoom-image', data[i].urls.srcZoom);
                    image.setAttribute('class', 'image_thumbnail');
                    image.setAttribute('draggable', 'true');

                    imageContent = document.createElement('div');
                    imageContent.setAttribute('class', 'image_thumbnail_content');
                    imageContent.appendChild(image);
                    jQuery(node).append(imageContent);

                }
            }


        }
        if (isAdmin) {
            image = document.createElement('img');
            image.setAttribute('src', '/images/add_new_icon.png');
            if (data[0] && data[0].colorId) {
                image.setAttribute('colorId', data[0].colorId);
            }
            image.setAttribute('class', 'add_new_image_thumbnail');
            imageContent = document.createElement('div');
            imageContent.setAttribute('class', 'add_new_image_thumbnail_content');
            imageContent.appendChild(image);
            jQuery(node).append(imageContent);
        }
    }
    /*
     * src: "/images/items/item1_image1_L1.jpg"
     srcThumbnail: "/images/items/item1_image1_t1.jpg"
     srcZoom: "/images/items/item1_image1_L1.j
     */
    this.displayImages = function (data) {
        if (data.images && data.images.length > 0) {
            jQuery(container).find('#image_display').attr('src', data.images[0].urls.srcThumbnail);
            jQuery(container).find('#image_display').attr('data-zoom-image', data.images[0].urls.srcZoom);
            jQuery(container).find('#image_display_content').css('background-image', 'url(\'' + data.images[0].urls.srcThumbnail + '\')');
            jQuery('.zoomWindowContainer > div').css('background-image', ' url(\'' + data.images[0].urls.srcZoom + '\')');
            createImagesThumbnail(data.images, jQuery(container).find('#images_thumbnail_content'));

            jQuery(container).find('#image_display').attr('src', data.images[0].urls.src);
        } else {
            createImagesThumbnail([data], jQuery(container).find('#images_thumbnail_content'));
        }

    };
    this.init = function () {
        jQuery(container).find('#item_id').html(this.item.displayId);
        jQuery(container).find('#item_title').html(this.item.title);
        jQuery(container).find('#item_price').html(this.item.price);

        jQuery(container).find('#item_description ').html(this.item.description);
        var colorImagesThumbnail = [];
        if (this.item.colors !== null && this.item.colors.length > 0 && this.item.colors[0].colorId) {
            this.displayImages(this.item.colors[0]);
            for (var i = 0; i < this.item.colors.length; i++) {
                var img = this.item.colors[i].images.length > 0 ? this.item.colors[i].images[0] : {
                    urls: {
                        src: '/images/updating.jpg',
                        srcThumbnail: '/images/updating.jpg',
                        srcZoom: '/images/updating.jpg'

                    },
                    colorId: this.item.colors[i].colorId
                };
                colorImagesThumbnail.push(img);
            }
        }
        createImagesThumbnail(colorImagesThumbnail, jQuery(container).find('#colors_thumbnail_container'));
        jQuery(container).find('#colors_thumbnail_container .add_new_image_thumbnail_content>img').removeAttr('colorId');
        if (this.item.inNew) {
            jQuery(container).find('#image_display_container').append('<div class="new" draggable="true"></div>');
        }
        if (this.item.inPromotion && this.item.inPromotion.trim().length > 0) {
            jQuery(container).find('#image_display_container').append('<div class="sale_off" name="inPromotion" onedit="updateItem" draggable="true">' + this.item.inPromotion + '</div>');
        }
    };

    this.addNewImage = function (colorId, src, srcDisplay, srcZoom) {
        var url = getRootURL() + '/rest/image/add';
        var urls = encodeURIComponent(JSON.stringify({
            srcThumbnail: src,
            src: srcDisplay,
            srcZoom: srcZoom
        }));
        var params = 'colorId=' + colorId + '&urls=' + urls;
        var id = eval('(' + postValue(url, params) + ')').id;

        var image = document.createElement('img');
        image.setAttribute('imageId', id);
        image.setAttribute('src', src);
        image.setAttribute('colorId', colorId);
        image.setAttribute('srcDisplay', srcDisplay);
        image.setAttribute('srcZoom', srcZoom);
        image.setAttribute('data-zoom-image', srcZoom);
        image.setAttribute('class', 'image_thumbnail');
        image.setAttribute('draggable', 'true');
        image.setAttribute('onDelete', 'deleteImage(' + id + ')');
        var imageContent = document.createElement('div');
        imageContent.setAttribute('class', 'image_thumbnail_content');
        imageContent.appendChild(image);
        jQuery(imageContent).insertBefore(jQuery('#images_thumbnail_container .add_new_image_thumbnail_content'));
        var colorThumbnail = jQuery('#colors_thumbnail_container img[colorid=' + colorId + ']');
        jQuery(colorThumbnail).each(function () {
            if (jQuery(this).attr('src').contains('updating.jpg')) {
                jQuery(this).attr('src', src);
            }
        });
        var color = this.findColor(colorId);
        if (color.images === undefined) {
            color.images = [];
        }
        color.images.push({colorId: colorId, id: id, urls: {srcThumbnail: src, src: srcDisplay, srcZoom: srcZoom}});
//        for (var i =0; i< this.item.colors.length;i++){
//            if(this.item.colors[i].colorId+''===colorId+''){
//                this.item.colors[i].images.push({colorId:colorId,id:id,urls:{srcThumbnail:src,src:srcDisplay,srcZoom:srcZoom}});
//            }
//        }
        jQuery(image).click();
    };
    this.addNewColor = function (itemId) {
        var url = getRootURL() + '/rest/color/add';
        var params = 'itemId=' + itemId;
        var id = eval('(' + postValue(url, params) + ')').id;

        var image = document.createElement('img');
        image.setAttribute('src', '/images/updating.jpg');
        image.setAttribute('colorId', id);
        image.setAttribute('draggable', 'true');
        image.setAttribute('onDelete', 'deleteColor(' + id + ')');
        var imageContent = document.createElement('div');
        imageContent.setAttribute('class', 'image_thumbnail_content');
        imageContent.appendChild(image);
        jQuery(imageContent).insertBefore(jQuery('#colors_thumbnail_container .add_new_image_thumbnail_content'));
        this.item.colors.push({colorId: id});
        jQuery(imageContent).click();
        setTimeout(function () {
            jQuery('#image_display').attr('src', '/images/updating.jpg');
            alert('Mỗi màu của sản phẩm phải có ít nhất một ảnh. \nThêm ảnh cho màu sắc này.');
            jQuery("#images_thumbnail_container .add_new_image_thumbnail").click();
        }, 250);


    };
    this.deleteImage = function (imageId) {
        //Check have last color + add button
        var imgs = jQuery('#images_thumbnail_container img');
        if (imgs.length <= 2) {
            alert('Mỗi màu của sản phẩm phải có ít nhất một ảnh. \nKhông được delete ảnh cuối cùng.');
            return;
        }
        var colorId = jQuery('#images_thumbnail_container img[imageId=' + imageId + ']').attr('colorId');
        var parent = jQuery('#images_thumbnail_container img[imageId=' + imageId + ']').parent();
        jQuery(parent).css('transition', 'height 1s,opacity 1s,margin 1s,border-width 1s');
        jQuery(parent).css('height', '-1');
        jQuery(parent).css('opacity', '0');
        jQuery(parent).css('margin', '0');
        jQuery(parent).css('border-width', '0');
        setTimeout(function () {
            jQuery(parent).remove();
            jQuery('#images_thumbnail_container img:first').click();
            /*
             var imgs=jQuery('#images_thumbnail_container img');
             //Check have last image + add button
             if(imgs.length>=2){
             jQuery('#images_thumbnail_container img:first').click();
             }else{
             jQuery('#image_display').attr('src','/images/updating.jpg');
             jQuery('.zoomWindowContainer > div').css('background-image','url(/images/updating.jpg)');
             }*/
        }, 1000);

        var url = '/rest/image/delete';
        postValue(url, 'imageId=' + imageId);
        var color = this.findColor(colorId);
        if (color && color.images && color.images.length > 0) {
            for (var i = 0; i < color.images.length; i++) {
                if (color.images[i].id + '' === imageId + '') {
                    color.images.remove(i);
                    break;
                }
            }
        }
    };

    this.deleteColor = function (colorId) {
        var imgs = jQuery('#colors_thumbnail_container img');
        if (imgs.length <= 2) {
            alert('Mỗi sản phẩm phải có ít nhất một màu.\nKhông được delete màu cuối cùng.');
            return;
        }
        var parent = jQuery('#colors_thumbnail_container img[colorId=' + colorId + ']').parent();
        jQuery(parent).css('transition', 'width 1s,opacity 1s,margin 1s,border-width 1s');
        jQuery(parent).css('width', '-1');
        jQuery(parent).css('opacity', '0');
        jQuery(parent).css('margin', '0');
        jQuery(parent).css('border-width', '0');
        setTimeout(function () {
            jQuery(parent).remove();
            jQuery('#colors_thumbnail_container img:first').click();
            /*
             var imgs=jQuery('#colors_thumbnail_container img');             
             //Check have last color + add button
             if(imgs.length>=2){
             jQuery('#colors_thumbnail_container img:first').click();
             }else{
             jQuery('#images_thumbnail_container .image_thumbnail_content').remove();
             jQuery('#image_display').attr('src','/images/updating.jpg');
             jQuery('.zoomWindowContainer > div').css('background-image','url(/images/updating.jpg)');
             }*/
        }, 1000);
        var url = '/rest/color/delete';
        postValue(url, 'colorId=' + colorId);
        for (var i = 0; i < this.item.colors.length; i++) {
            if (this.item.colors[i].colorId + '' === colorId + '') {
                this.item.colors.remove(i);
                break;
            }
        }
    };


    this.findColor = function (colorId) {
        for (var i = 0; i < this.item.colors.length; i++) {
            if (this.item.colors[i].colorId + '' === colorId + '') {
                return this.item.colors[i];
            }
        }
        return null;
    };


}
;

function addZoom() {
    setTimeout(function () {
        if ($('#image_display').attr('data-zoom-image')) {
            $('#image_display').elevateZoom({
//              zoomType: "inner",
                cursor: "crosshair",
                zoomWindowFadeIn: 500,
                zoomWindowFadeOut: 750,
                zoomWindowOffetx: 10,
                zoomWindowOffety: -1,
                borderSize: 1,
                zoomWindowHeight: 497,
                zoomWindowWidth: 497
            });
        }
    }, 500);
}

var detail = new Detail(itemData, jQuery('#detail_container'));
setTimeout(function () {
    detail.init();
    addZoom();
}, 0);

jQuery("body").on("click", "#images_thumbnail_container .image_thumbnail", function (event) {
    var srcDisplay = jQuery(this).attr('srcDisplay');
    var srcZoom = jQuery(this).attr('srcZoom');
    var src = jQuery(this).attr('src');

    jQuery('#image_display').attr('src', src);
    jQuery('#image_display').attr('src', srcDisplay);
    jQuery('#image_display').attr('srcZoom', srcZoom);
    jQuery('#image_display').attr('data-zoom-image', srcZoom);
    jQuery('#image_display_content').css('background-image', ' url(\'' + jQuery(this).attr('src') + '\')');
    if (jQuery('.zoomWindowContainer > div').length > 0) {
        jQuery('.zoomWindowContainer > div').css('background-image', ' url(\'' + srcZoom + '\')');
    } else {
        addZoom();
    }

});

jQuery("body").on("mouseenter", "#images_thumbnail_container .image_thumbnail", function (event) {
    jQuery(this).attr('onDelete', 'deleteImage(' + jQuery(this).attr('imageId') + ')');
});



jQuery("body").on("click", "#colors_thumbnail_container .image_thumbnail_content", function (event) {
    var i = jQuery(this).parent().find('.image_thumbnail_content').index(this);
    detail.displayImages(detail.item.colors[i]);

});

jQuery("body").on("mouseenter", "#colors_thumbnail_container .image_thumbnail_content .image_thumbnail", function (event) {
    jQuery(this).attr('onDelete', 'deleteColor(' + jQuery(this).attr('colorId') + ')');
});


jQuery("body").on("click", "#colors_thumbnail_container .add_new_image_thumbnail", function (event) {
    var hrefItems = (window.location.href).split("/");
    var itemId = hrefItems[hrefItems.length - 1];
    detail.addNewColor(itemId);
});

jQuery("body").on("click", "#images_thumbnail_container .add_new_image_thumbnail", function (event) {

    var _new = this;
    var colorId = jQuery(_new).attr('colorId');
    bootbox.dialog({
        title: "Thêm Ảnh",
        message: '<div class="row">  ' +
                '<div class="col-md-12"> ' +
                '<form class="form-horizontal"> ' +
                '<div class="form-group"> ' +
                '<label class="col-md-2 control-label" for="bootbox_src">Ảnh Nhỏ</label> ' +
                '<div class="col-md-10"> ' +
                '<input id="bootbox_src" value="" name="name" type="text" placeholder="" class="form-control input-md"> ' +
                '</div> ' +
                '<label class="col-md-2 control-label" for="bootbox_srcDisplay">Ảnh Vừa</label> ' +
                '<div class="col-md-10"> ' +
                '<input id="bootbox_srcDisplay" value="" name="name" type="text" placeholder="" class="form-control input-md"> ' +
                '</div> ' +
                '<label class="col-md-2 control-label" for="bootbox_srcZoom">Ảnh Lớn</label> ' +
                '<div class="col-md-10"> ' +
                '<input id="bootbox_srcZoom" value="" name="name" type="text" placeholder="" class="form-control input-md"> ' +
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

                    detail.addNewImage(colorId, src, srcDisplay, srcZoom);

                }
            }
        }
    });
});

function deleteImage(imageId) {
    detail.deleteImage(imageId);
}

function deleteColor(colorId) {
    detail.deleteColor(colorId);
}


//jQuery('body').on("drop", '#image_display_content', function (event) {
////        window.dragItem
//    alert(123);
//});
//
//jQuery('body').on("dragover", '#image_display_content', function (event) {
//   event.preventDefault();
//   //return false;
//});



///////////////////////////////////
if (isAdmin) {
    //drag safe off tool 
    jQuery('#image_display_content').css('z-index', '1');
    setTimeout(function () {
        jQuery.get(getRootURL() + "/sale_off_tool.html", function (data) {
            jQuery(".container").append(data);
            if (detail.item.inNew) {
                jQuery('.sale_off_tool .new').remove();
            }
            if (detail.item.inPromotion) {
                jQuery('.sale_off_tool .sale_off').remove();
            }
            var saleOffTool = document.querySelector('.sale_off_tool');
            saleOffTool.addEventListener('dragover', function (event) {
                event.preventDefault();
            });
            saleOffTool.addEventListener('drop', function (event) {
                var drag = window.dragItem;
                if (jQuery(drag).hasClass('sale_off') || jQuery(drag).hasClass('new')) {
                    var childs = jQuery(this).find('>div');
                    for (var i = 0; i < childs.length; i++) {
                        var t = jQuery(childs[i]).find('>div');
                        if (t.length === 0) {
                            jQuery(childs[i]).append(drag);
                            jQuery(drag).removeAttr('draggable');
                            break;
                        }
                    }
                    if (jQuery(drag).hasClass('sale_off')) {
                        
                        jQuery(drag).removeClass('editable');
                        jQuery(drag).removeClass('box_shadow_orange');
                        jQuery(drag).removeClass('hover');
                        jQuery(drag).removeAttr('onedit');
                        jQuery('.edit_button').remove();
                        setTimeout(function () {
                            var param = "inPromotion";
                            var value = "";
                            updateItem1(param, value);
                        }, 0);
                    }
                    if (jQuery(drag).hasClass('new')) {
                        setTimeout(function () {
                            var param = "inNew";
                            var value = false;
                            updateItem1(param, value);
                        }, 0);
                    }
                }
            });
        });
    }, 0);

//////////////////////////////////////

//jQuery('body').on("dragstart", '.sale_off', function (event) {
//    jQuery(this).attr('style','transform:none;');
//});
//jQuery('body').on("dragend", '.sale_off', function (event) {
//    jQuery(this).attr('style','');
//});
///////////////
    var image_display_container = document.querySelector('#image_display_container');
    image_display_container.addEventListener('dragover', function (event) {
        event.preventDefault();
    });
    image_display_container.addEventListener('drop', function (event) {
        var drag = jQuery(window.dragItem).find('>div');
        if (jQuery(drag).hasClass('sale_off') || jQuery(drag).hasClass('new')) {

            var _new = jQuery(this).find('.new');
            var thisSafeOff = jQuery(this).find('.sale_off');

            if (_new && _new.length > 0) {
                jQuery(jQuery(drag).parent()).append(_new);
                jQuery(_new).removeAttr('draggable');
            }
            if (thisSafeOff && thisSafeOff.length > 0) {
                jQuery(jQuery(drag).parent()).append(thisSafeOff);
                jQuery(thisSafeOff).removeAttr('draggable');
                jQuery(thisSafeOff).removeClass('editable');
                        jQuery(thisSafeOff).removeClass('box_shadow_orange');
                        jQuery(thisSafeOff).removeClass('hover');
                        jQuery(thisSafeOff).removeAttr('onedit');
                        jQuery('.edit_button').remove();
            }

            if (jQuery(drag).hasClass('new')) {
                setTimeout(function () {
                    var param = "inNew";
                    var value = true;
                    updateItem1(param, value);
                }, 0);
            }

            if (jQuery(drag).hasClass('sale_off')) {
                setTimeout(function () {
                    var param = "inPromotion";
                    var value = jQuery(drag).html().trim();
                    updateItem1(param, value);
                }, 0);
                jQuery(drag).addClass('editable');
                jQuery(drag).attr('onedit', 'updateItem');

            }

            jQuery(this).append(drag);
            jQuery(drag).attr('draggable', 'true');
        }
    });


///////////////////////////////////////////

}

function saleOffdbClick() {
    jQuery('.dont_save_button').css('top', '208px');
    jQuery('.dont_save_button').css('left', '220px');
    jQuery('.dont_save_button').css('transform', 'rotate(-45deg)');

    jQuery('.save_button').css('top', '221px');
    jQuery('.save_button').css('left', '208px');
    jQuery('.save_button').css('transform', 'rotate(-45deg)');
    
    var light = jQuery('.fullhappy_light_box_light');
    jQuery(light).css('transform', 'rotate(-45deg)');
    jQuery(light).insertBefore(jQuery('.save_button'));
}
jQuery('body').on('mouseenter', '#image_display_container .sale_off', function () {
    setTimeout(function () {
        jQuery('.edit_button').css('top', '208px');
        jQuery('.edit_button').css('left', '212px');
        jQuery('.edit_button').css('transform', 'rotate(-45deg)');
        jQuery('.edit_button').click(function () {
            setTimeout(function () {
                saleOffdbClick();
            }, 10);
        });
    }, 4);

});

jQuery('body').on('dblclick', '#image_display_container .sale_off', function () {
    setTimeout(function () {
        saleOffdbClick();
    }, 10);

});