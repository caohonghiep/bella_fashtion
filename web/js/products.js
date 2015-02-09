


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
        jQuery(jQuery(itemContainer).find('.item_container')).attr('categoryId', itemData.categoryId);
        jQuery(itemContainer).find('.item_title').html(itemData.title);
        jQuery(itemContainer).find('.item_price').html(itemData.price);
        
        if(itemData.inNew){
             jQuery(itemContainer).find('.item_image_container').append(jQuery('<div class="new"></div>'));            
        }
        if(itemData.inPromotion){
            jQuery(itemContainer).find('.item_image_container').append(jQuery('<div class="safe_off">-'+itemData.inPromotion+'</div>'));            
        }
        if (itemData.images.trim().length === 0) {
            itemData.images = ['/images/items/rbb-245786-egr-i1.jpg', '/images/items/rbb-243012-blk-i1.jpg'];
        } else {
            itemData.images = eval('(' + itemData.images + ')');
            if (itemData.images.length === 1) {
                var t = itemData.images[0];
                itemData.images.push(t);
            }
        }
        var tmpImg = new Image();
        var tmpbg = new Image();
        tmpImg.onload = function () {
            jQuery(jQuery(itemContainer).find('.item_image_container>img')).attr('src', this.src);
        };
        tmpbg.onload = function () {
            jQuery(jQuery(itemContainer).find('.item_image_container')).css('background-image', 'url(' + this.src + ')');
        };
        tmpImg.src = itemData.images[1];
        tmpbg.src = itemData.images[0];
        return itemContainer;
    }


    function parseListItemToHtml() {
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
                url = getRootURL() + '/rest/products/safeOffShortInfoList?start=' + this.indexItem + '&max=' + this.maxItem;
            } else {//window.currentPage === 'products'
                url = getRootURL() + '/rest/products/shortInfoList/' + categoryId + '?start=' + this.indexItem + '&max=' + this.maxItem;
            }

            this.listItemData = eval('(' + loadXMLDoc(url) + ')');
            if (this.listItemData.length === 0) {
                this.maxItem = -1;
            }
        }
    };
    this.indexItem = 0;
    this.maxItem = 12;
    this.parseItemToHtml = parseListItemToHtml;
}
;
jQuery(document).ready(function () {
    var productControl = new ProductControl(jQuery('#list_item_container'));
    productControl.loadTemlate();
    productControl.loadData();
    productControl.parseItemToHtml();

    jQuery('body').on('click', '.item_container', function (event) {
        var url = getRootURL() + '/products/' + jQuery(this).attr('categoryId') + '/' + jQuery(this).attr('itemId');
        window.location.href = url;
    });
});