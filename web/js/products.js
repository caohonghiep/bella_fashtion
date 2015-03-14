

function loadLeftSide() {
    function createChildLI(categoryId, title, parentId) {
        return jQuery('<li><div categoryId ="' + categoryId + '" parentId="' + parentId + '" class="left_side_item" >' + title + '</div></li>');
    }

    var categorys = FullHappyCookie.getCookie('categorys');
    if (categorys === null || categorys.trim().length === 0) {
        categorys = loadXMLDoc('/rest/category/list');
        FullHappyCookie.setCookie('categorys', categorys);
    }
    categorys = JSON.parse(categorys);
    var ul = jQuery('<ul></ul>');
    if (categorys && categorys.length > 0) {
        for (var i = 0; i < categorys.length; i++) {
            var li = jQuery('<li></li>');
            var div = jQuery('<div categoryId="' + categorys[i].categoryId + '"  class="left_side_head">' + categorys[i].title + '</div>');
            jQuery(li).append(div);

            var subUL = jQuery('<ul></ul>');
            if (categorys[i].childs && categorys[i].childs.length > 0) {
                var childs = categorys[i].childs;
                for (var j = 0; j < childs.length; j++) {
                    jQuery(subUL).append(createChildLI(childs[j].categoryId, childs[j].title, childs[j].parentId));
                }
            }
            jQuery(li).append(subUL);
            jQuery(ul).append(li);
        }
    }
    jQuery('#left_side').append(ul);
    jQuery('body').on('click', '.left_side_item', function (event) {
        window.location.href = getRootURL() + '/products/' + jQuery(this).attr('categoryId');
    });

    jQuery('.left_side_head').click(function (event) {        
        var next = jQuery(this).next();
        if (next.hasClass('height_auto')) {
            next.removeClass('height_auto');
        } else {
            jQuery('.left_side_head').next().removeClass('height_auto');
            next.addClass('height_auto');
        }
    });
    
    if(window.currentPage==='category'){
        var categoryId=window.location.href.split('/');
        categoryId = categoryId[categoryId.length-1];
        jQuery('.left_side_item[categoryid='+categoryId+']').addClass('active');
        jQuery('.left_side_item[categoryid='+categoryId+']').parent().parent().addClass('height_auto');
        
    }
}
setTimeout(loadLeftSide, 0);

/*
 var listItemData =
 [
 {
 title: 'Đầm Cúp Lưng',
 price: '449,000 VND',
 images: ['/images/items/rbb-245779-tue-i2.jpg', '/images/items/rbb-245786-egr-i1.jpg']
 
 },
 {
 title: 'Đầm Cúp Lưng',
 price: '449,000 VND',
 images: ['/images/items/dorothy-perkins-4385-248573-1.jpg', '/images/items/rbb-245779-tue-i1.jpg']
 
 },
 {
 title: 'Đầm Cúp Lưng',
 price: '449,000 VND',
 images: ['/images/items/rbb-245786-egr-i1.jpg', '/images/items/rbb-243012-blk-i1.jpg']
 
 },
 {
 title: 'Đầm Cúp Lưng',
 price: '449,000 VND',
 images: ['/images/items/rbb-245779-tue-i2.jpg', '/images/items/rbb-245786-egr-i1.jpg']
 
 },
 {
 title: 'Đầm Cúp Lưng',
 price: '449,000 VND',
 images: ['/images/items/dorothy-perkins-4385-248573-1.jpg', '/images/items/rbb-245779-tue-i1.jpg']
 
 },
 {
 title: 'Đầm Cúp Lưng',
 price: '449,000 VND',
 images: ['/images/items/rbb-245786-egr-i1.jpg', '/images/items/rbb-243012-blk-i1.jpg']
 
 },
 {
 title: 'Đầm Cúp Lưng',
 price: '449,000 VND',
 images: ['/images/items/rbb-245779-tue-i2.jpg', '/images/items/rbb-245786-egr-i1.jpg']
 
 },
 {
 title: 'Đầm Cúp Lưng',
 price: '449,000 VND',
 images: ['/images/items/dorothy-perkins-4385-248573-1.jpg', '/images/items/rbb-245779-tue-i1.jpg']
 
 },
 {
 title: 'Đầm Cúp Lưng',
 price: '449,000 VND',
 images: ['/images/items/rbb-245786-egr-i1.jpg', '/images/items/rbb-243012-blk-i1.jpg']
 
 },
 {
 title: 'Đầm Cúp Lưng',
 price: '449,000 VND',
 images: ['/images/items/rbb-245779-tue-i2.jpg', '/images/items/rbb-245786-egr-i1.jpg']
 
 },
 {
 title: 'Đầm Cúp Lưng',
 price: '449,000 VND',
 images: ['/images/items/dorothy-perkins-4385-248573-1.jpg', '/images/items/rbb-245779-tue-i1.jpg']
 
 },
 {
 title: 'Đầm Cúp Lưng',
 price: '449,000 VND',
 images: ['/images/items/rbb-245786-egr-i1.jpg', '/images/items/rbb-243012-blk-i1.jpg']
 
 }
 
 ];
 */
function xml2string(node) {
    if (typeof (XMLSerializer) !== 'undefined') {
        var serializer = new XMLSerializer();
        return serializer.serializeToString(node);
    } else if (node.xml) {
        return node.xml;
    }
}
function ProductControl(nodeHtmlContainer) {

    function parseItemToHtml(itemData, itemTextFrame) {
        var itemContainer = jQuery(itemTextFrame);
        jQuery(jQuery(itemContainer).find('.item_container')).attr('itemId', itemData.itemId);
        jQuery(jQuery(itemContainer).find('.item_container')).attr('ondelete', 'deleteItem(' + itemData.itemId + ')');
        jQuery(jQuery(itemContainer).find('.item_container')).attr('categoryId', itemData.categoryId);
        jQuery(itemContainer).find('.item_title').html(itemData.title);
        jQuery(itemContainer).find('.item_price').html(itemData.price);

        if (itemData.inNew) {
            jQuery(itemContainer).find('.item_image_container').append(jQuery('<div class="new"></div>'));
        }
        if (itemData.inPromotion) {
            jQuery(itemContainer).find('.item_image_container').append(jQuery('<div class="sale_off">' + itemData.inPromotion + '</div>'));
        }
        if (itemData.images.length === 0) {
            itemData.images = ['/images/updating.jpg', '/images/updating.jpg'];
        } else if (itemData.images.length === 1) {
            var t = itemData.images[0];
            itemData.images.push(t);
        }
        var tmpImg = new Image();
        var tmpbg = new Image();
        tmpImg.onload = function () {
            jQuery(jQuery(itemContainer).find('.item_image_container>img')).attr('src', this.src);
        };
        tmpImg.onerror = function () {
            console.log('tmpImg: ' + this.src);
            setTimeout(function () {
                //check onload function
                if (jQuery(jQuery(itemContainer).find('.item_image_container>img')).attr('src').contains('load-icon.gif')) {
                    jQuery(jQuery(itemContainer).find('.item_image_container>img')).attr('src', '');
                }
            }, 2000);
        };
        tmpbg.onload = function () {
            jQuery(jQuery(itemContainer).find('.item_image_container')).css('background-image', 'url(' + this.src + ')');
        };
        tmpbg.onerror = function () {
            console.log('tmpbg: ' + this.src);
            setTimeout(function () {
                //check onload function
                if (!(jQuery(jQuery(itemContainer).find('.item_image_container')).css('background-image') === '')) {
                    jQuery(jQuery(itemContainer).find('.item_image_container')).css('background-image', 'url(/images/updating.jpg)');
                }
            }, 2000);

        };
        tmpImg.src = itemData.images[1];
        tmpbg.src = itemData.images[0];
        return itemContainer;
    }


    function parseListItemToHtml() {
        if (isAdmin && currentPage === 'category' && this.indexItem < 12) {
            var categoryId = window.location.href.replaceAll(getRootURL() + '/products', '');
            categoryId = categoryId.replaceAll('/', '');
            var add = jQuery(
                    '<div class="col-lg-3">'
                    + '<div class="item_container" categoryId="' + categoryId + '">'
                    + '<div class="add_new" style="height: 292px; overflow: hidden; ">'
                    + '</div>'

                    + '<div class="item_title">&nbsp;Add New Item Here&nbsp;</div>'
                    + '<div class="item_price">&nbsp;</div>'
                    + ' </div></div>');
            jQuery(nodeHtmlContainer).append(add);
        }
        if (Array.isArray(this.listItemData)) {
            for (var i = 0; i < this.listItemData.length; i++) {
                jQuery(nodeHtmlContainer).append(parseItemToHtml(this.listItemData[i], this.itemTextFrame));
            }
        }
    }

    this.loadTemlate = function () {
        var url = getRootURL() + '/item_on_product_list_page.html';
        this.itemTextFrame = loadXMLDoc(url);
    };

    this.loadData = function () {
        var pathname = window.location.pathname.substr(1);
        var paths = pathname.split('/');
        var categoryId = 0;
        if (paths.length >= 2) {
            categoryId = paths[1];
        }
        if (this.maxItem > 0) {
            var url = '';
            if (window.currentPage === 'in_new') {
                url = getRootURL() + '/rest/products/inNewShortInfoList?start=' + this.indexItem + '&max=' + this.maxItem;
            } else if (window.currentPage === 'sale_off') {
                url = getRootURL() + '/rest/products/saleOffShortInfoList?start=' + this.indexItem + '&max=' + this.maxItem;
            } else {//window.currentPage === 'products'
                url = getRootURL() + '/rest/products/shortInfoList/' + categoryId + '?start=' + this.indexItem + '&max=' + this.maxItem;
            }

            this.listItemData = eval('(' + loadXMLDoc(url) + ')');
            if (this.listItemData.length < this.maxItem) {
                this.maxItem = -1;
            } else {
                this.indexItem += this.maxItem;
                this.maxItem = 12;
            }
        }
    };
    this.indexItem = 0;
    if (isAdmin && currentPage === 'category') {
        this.maxItem = 11;
    } else {
        this.maxItem = 12;
    }
    this.parseItemToHtml = parseListItemToHtml;
}
;
jQuery(document).ready(function () {
    var productControl = new ProductControl(jQuery('#list_item_container'));
    productControl.loadTemlate();
    productControl.loadData();
    productControl.parseItemToHtml();
    jQuery(window).scroll(function () {
        if (jQuery(window).scrollTop() + jQuery(window).height() > jQuery(document).height() - 100 && productControl.maxItem > 0) {
            productControl.loadData();
            productControl.parseItemToHtml();
        }
    });
    jQuery('body').on('click', '.item_container', function (event) {
        var addNew = jQuery(this).find('.add_new');
        if (addNew.length > 0) {
            var url = "/rest/items/create";
            var param = 'categoryId=' + jQuery(this).attr('categoryId');
            var id = postValue(url, param);
            id = eval('(' + id + ')').id;
            if (id !== '0') {
                url = getRootURL() + '/products/' + jQuery(this).attr('categoryId') + '/' + id;
                window.location.href = url;
            }
        } else {
            var url = getRootURL() + '/products/' + jQuery(this).attr('categoryId') + '/' + jQuery(this).attr('itemId');
            window.location.href = url;
        }
    });
    jQuery('.item_image_container').each(function () {
        jQuery(this).height(jQuery(this).width() * 365 / 255);
        jQuery(this).css('overflow', 'hidden');
    });

});

function deleteItem(itemId) {
    var item = jQuery('.item_container[itemId=' + itemId + ']');
    var parent = jQuery(item).parent();
    jQuery(item).width(jQuery(parent).width());
    jQuery(parent).css('overflow-x', 'hidden');
    jQuery(parent).css('transition', 'width 1s,opacity 1s,margin 1s,border-width 1s');
    jQuery(parent).css('width', '-1');
    jQuery(parent).css('opacity', '0');
    jQuery(parent).css('margin', '0');
    jQuery(parent).css('border-width', '0');
    setTimeout(function () {
        jQuery(parent).remove();
    }, 1000);
    var url = '/rest/items/delete';
    postValue(url, 'itemId=' + itemId);

}
