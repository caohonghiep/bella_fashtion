
var itemData = loadXMLDoc(getRootURL()+'/rest/items/item/6/1');
itemData = itemData.replaceAll('"{', '{');
itemData = itemData.replaceAll('}"', '}');
itemData = eval('(' + itemData + ')');
/*       
 {
 displayId: 'Inner Circle',
 title: 'Đầm Cut-out Lưng',
 price: '449,000 VND',
 description: 'Đầm dáng suông màu kem phối chỉ kim tuyến vàng của thương hiệu Inner Circle với thiết kế nơ và cut-out sau lưng tạo điểm nhấn ấn tượng giúp bạn trở nên thật nổi bật và thu hút<br id="mf532"><br id="mf533">- Chất liệu polyester<br id="mf534">- Cổ V<br id="mf535">- Tay ngắn<br id="mf536">- Không có lớp lót trong<br id="mf537">- Không có thun co giãn',
 colors: [
 [
 {
 src: 'http://dynstatic02-ec.zalora.com/4xCUesXKE_IyLI8bniOVLxr0qhU=/fit-in/39x56/filters:quality(90):fill(ffffff)/http://static-origin.zalora.vn/p/inner-circle-2442-792573-1.jpg',
 srcDisplay: 'http://static-origin.zalora.vn/p/inner-circle-2442-792573-1.jpg',
 srcZoom: 'http://static-origin.zalora.vn/p/inner-circle-2442-792573-1.jpg'
 },
 {
 src: 'http://dynstatic01-ec.zalora.com/HjkZ2nwFdinZKQPtKaYDtyszD5M=/fit-in/39x56/filters:quality(90):fill(ffffff)/http://static-origin.zalora.vn/p/inner-circle-2448-792573-3.jpg',
 srcDisplay: 'http://static-origin.zalora.vn/p/inner-circle-2448-792573-3.jpg',
 srcZoom: 'http://static-origin.zalora.vn/p/inner-circle-2448-792573-3.jpg'
 },
 {
 src: 'http://dynstatic02-ec.zalora.com/4xCUesXKE_IyLI8bniOVLxr0qhU=/fit-in/39x56/filters:quality(90):fill(ffffff)/http://static-origin.zalora.vn/p/inner-circle-2442-792573-1.jpg',
 srcDisplay: 'http://static-origin.zalora.vn/p/inner-circle-2442-792573-1.jpg',
 srcZoom: 'http://static-origin.zalora.vn/p/inner-circle-2442-792573-1.jpg'
 },
 {
 src: 'http://dynstatic01-ec.zalora.com/HjkZ2nwFdinZKQPtKaYDtyszD5M=/fit-in/39x56/filters:quality(90):fill(ffffff)/http://static-origin.zalora.vn/p/inner-circle-2448-792573-3.jpg',
 srcDisplay: 'http://static-origin.zalora.vn/p/inner-circle-2448-792573-3.jpg',
 srcZoom: 'http://static-origin.zalora.vn/p/inner-circle-2448-792573-3.jpg'
 },
 {
 src: 'http://dynstatic02-ec.zalora.com/4xCUesXKE_IyLI8bniOVLxr0qhU=/fit-in/39x56/filters:quality(90):fill(ffffff)/http://static-origin.zalora.vn/p/inner-circle-2442-792573-1.jpg',
 srcDisplay: 'http://static-origin.zalora.vn/p/inner-circle-2442-792573-1.jpg',
 srcZoom: 'http://static-origin.zalora.vn/p/inner-circle-2442-792573-1.jpg'
 },
 {
 src: 'http://dynstatic01-ec.zalora.com/HjkZ2nwFdinZKQPtKaYDtyszD5M=/fit-in/39x56/filters:quality(90):fill(ffffff)/http://static-origin.zalora.vn/p/inner-circle-2448-792573-3.jpg',
 srcDisplay: 'http://static-origin.zalora.vn/p/inner-circle-2448-792573-3.jpg',
 srcZoom: 'http://static-origin.zalora.vn/p/inner-circle-2448-792573-3.jpg'
 },
 {
 src: 'http://dynstatic02-ec.zalora.com/4xCUesXKE_IyLI8bniOVLxr0qhU=/fit-in/39x56/filters:quality(90):fill(ffffff)/http://static-origin.zalora.vn/p/inner-circle-2442-792573-1.jpg',
 srcDisplay: 'http://static-origin.zalora.vn/p/inner-circle-2442-792573-1.jpg',
 srcZoom: 'http://static-origin.zalora.vn/p/inner-circle-2442-792573-1.jpg'
 }
 ],
 [
 {
 src: 'http://dynstatic02-ec.zalora.com/Niw8EQaXThLhjSwGceQuWPpRLy0=/fit-in/39x56/filters:quality(90):fill(ffffff)/http://static-origin.zalora.vn/p/inner-circle-2409-892573-1.jpg',
 srcDisplay: 'http://static-origin.zalora.vn/p/inner-circle-2409-892573-1.jpg',
 srcZoom: 'http://static-origin.zalora.vn/p/inner-circle-2409-892573-1.jpg'
 },
 {
 src: 'http://dynstatic02-ec.zalora.com/Y3oZQT_qHwA2vD5LebitIhQ68Yc=/fit-in/346x500/filters:quality(90):fill(ffffff)/http://static-origin.zalora.vn/p/inner-circle-2433-892573-7.jpg',
 srcDisplay: 'http://static-origin.zalora.vn/p/inner-circle-2433-892573-7.jpg',
 srcZoom: 'http://static-origin.zalora.vn/p/inner-circle-2433-892573-7.jpg'
 },
 {
 src: 'http://dynstatic02-ec.zalora.com/Niw8EQaXThLhjSwGceQuWPpRLy0=/fit-in/39x56/filters:quality(90):fill(ffffff)/http://static-origin.zalora.vn/p/inner-circle-2409-892573-1.jpg',
 srcDisplay: 'http://static-origin.zalora.vn/p/inner-circle-2409-892573-1.jpg',
 srcZoom: 'http://static-origin.zalora.vn/p/inner-circle-2409-892573-1.jpg'
 },
 {
 src: 'http://dynstatic02-ec.zalora.com/Y3oZQT_qHwA2vD5LebitIhQ68Yc=/fit-in/346x500/filters:quality(90):fill(ffffff)/http://static-origin.zalora.vn/p/inner-circle-2433-892573-7.jpg',
 srcDisplay: 'http://static-origin.zalora.vn/p/inner-circle-2433-892573-7.jpg',
 srcZoom: 'http://static-origin.zalora.vn/p/inner-circle-2433-892573-7.jpg'
 },
 {
 src: 'http://dynstatic02-ec.zalora.com/Niw8EQaXThLhjSwGceQuWPpRLy0=/fit-in/39x56/filters:quality(90):fill(ffffff)/http://static-origin.zalora.vn/p/inner-circle-2409-892573-1.jpg',
 srcDisplay: 'http://static-origin.zalora.vn/p/inner-circle-2409-892573-1.jpg',
 srcZoom: 'http://static-origin.zalora.vn/p/inner-circle-2409-892573-1.jpg'
 },
 {
 src: 'http://dynstatic02-ec.zalora.com/Y3oZQT_qHwA2vD5LebitIhQ68Yc=/fit-in/346x500/filters:quality(90):fill(ffffff)/http://static-origin.zalora.vn/p/inner-circle-2433-892573-7.jpg',
 srcDisplay: 'http://static-origin.zalora.vn/p/inner-circle-2433-892573-7.jpg',
 srcZoom: 'http://static-origin.zalora.vn/p/inner-circle-2433-892573-7.jpg'
 },
 {
 src: 'http://dynstatic02-ec.zalora.com/Niw8EQaXThLhjSwGceQuWPpRLy0=/fit-in/39x56/filters:quality(90):fill(ffffff)/http://static-origin.zalora.vn/p/inner-circle-2409-892573-1.jpg',
 srcDisplay: 'http://static-origin.zalora.vn/p/inner-circle-2409-892573-1.jpg',
 srcZoom: 'http://static-origin.zalora.vn/p/inner-circle-2409-892573-1.jpg'
 }
 ]
 
 ]
 };
 */
function Detail(item, container) {
    function createImagesThumbnail(data, node) {
//        data= data.images;
        if (data !== null && data.length > 0) {
            var image;
            var imageContent;
            jQuery(node).find('*').remove();
            for (var i = 0; i < data.length; i++) {
                if (data[i].urls !== null
                        && data[i].urls.src !== null
                        && data[i].urls.src.trim().length > 0) {
                    image = document.createElement('img');
                    image.setAttribute('src', data[i].urls.srcThumbnail);
                    image.setAttribute('srcDisplay', data[i].urls.src);
                    image.setAttribute('srcZoom', data[i].urls.srcZoom);
                    image.setAttribute('data-zoom-image', data[i].urls.srcZoom);
                    image.setAttribute('class', 'image_thumbnail');
                    image.setAttribute('onEdit', 'updateItem');
                    imageContent = document.createElement('div');
                    imageContent.setAttribute('class', 'image_thumbnail_content');
                    imageContent.appendChild(image);
                    jQuery(node).append(imageContent);

                }
            }
        }
    }
    /*
     * src: "/images/items/item1_image1_L1.jpg"
     srcThumbnail: "/images/items/item1_image1_t1.jpg"
     srcZoom: "/images/items/item1_image1_L1.j
     */
    function displayImages(data) {
        jQuery(container).find('#image_display').attr('src', data.images[0].urls.srcThumbnail);        
        jQuery(container).find('#image_display').attr('onEdit', 'updateItem');
        jQuery(container).find('#image_display_content').css('background-image', 'url(\'' + data.images[0].urls.srcThumbnail + '\')');
        createImagesThumbnail(data.images, jQuery(container).find('#images_thumbnail_content'));
        
        jQuery(container).find('#image_display').attr('src', data.images[0].urls.src);

    }
    this.init = function () {
        jQuery(container).find('#item_id').html(item.displayId);
        jQuery(container).find('#item_title').html(item.title);
        jQuery(container).find('#item_price').html(item.price);
        
        jQuery(container).find('#item_description ').html(item.description);

        if (item.colors !== null && item.colors.length > 0) {
            displayImages(item.colors[0]);
            var colorImagesThumbnail = [];
            for (var i = 0; i < item.colors.length; i++) {
                colorImagesThumbnail.push(item.colors[i].images[0]);
            }
            createImagesThumbnail(colorImagesThumbnail, jQuery(container).find('#colors_thumbnail_container'));
            jQuery(container).find('#colors_thumbnail_container .image_thumbnail_content').click(
                    function (event) {
                        var i = jQuery(this).parent().find('.image_thumbnail_content').index(this);
                        displayImages(item.colors[i]);
                    }
            );
        }

    };
};

function addZoom(){
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
jQuery(document).ready(function () {
    var detail = new Detail(itemData, jQuery('#detail_container'));
    setTimeout(function () {
        detail.init();
        addZoom();
    }, 0);

    jQuery("body").on("click", ".image_thumbnail", function (event) {
        var srcDisplay = jQuery(this).attr('srcDisplay');
        var srcZoom = jQuery(this).attr('srcZoom');
        var src= jQuery(this).attr('src');
        
        jQuery('#image_display').attr('src', src);
        jQuery('#image_display').attr('src', srcDisplay);
        jQuery('#image_display').attr('srcZoom', srcZoom);
        jQuery('#image_display').attr('data-zoom-image', srcZoom);
        jQuery('#image_display_content').css('background-image', ' url(\'' + jQuery(this).attr('src') + '\')');
        jQuery('.zoomWindowContainer > div').css('background-image', ' url(\'' + srcZoom + '\')');
    });

    
});

