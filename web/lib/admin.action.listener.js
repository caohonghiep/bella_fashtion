function ClientAction() {
}

$(document).ready(function() {
	var documentReady = oldSetInterval(function(){
		if(window.intervals.length==0){
			ClientAction.addEditActionListener();
			ClientAction.addInputNumberActionListener();
			oldClearInterval(documentReady);
		}
	},1000);
});

ClientAction.addInputNumberActionListener = function() {
	
//	$('.inputNumber').keydown(function(e){
//		Support.validateNumber(e);
//	});
	$('.inputNumber').attr('onkeydown', 'Support.validateNumber(event);');
	
}

ClientAction.addEditActionListener = function() {
	/*
	$('.editable').hover(function(event) {
		ClientAction.createEditButton(this);
	}, function(event) {
		var ed = document.getElementsByClassName('edit_button')[0];
		if (!Support.pointerInComponent(event, ed)) {
			ClientAction.removeEditBotton(this);
		}
	});
	
	$('.editable').dblclick(function(e){
		if (this.tagName != 'IMG') {
			ClientAction.enableEdit(this);
		}
		
	});
	*/
	$('*[editAction]').hover(function(event) {
		ClientAction.createEditButton(this);
	}, function(event) {
		var ed = document.getElementsByClassName('edit_button')[0];
		
		if (!Support.pointerNearComponent(event, ed, 100)) {
			ClientAction.removeEditBotton(this);
		}
		
	});
	
	$('*[editAction]').dblclick(function(e){
		if (this.tagName != 'IMG') {
			ClientAction.enableEdit(this);
		}
		
	});
}

ClientAction.enableEditImage = function(node) {
	var _img = node;
	var newSRC = prompt('input image link ');
	if (newSRC != null) {
		_img.src = newSRC;
		_img.title = "";
		var editAction = $(node).attr('editAction');
		if(editAction!==null && editAction.length!=0){
			eval(editAction + '(_img)');
		}
	}
};

/*
 * light and editable component will be edited.... fade and disable other
 * component
 */
ClientAction.enableEdit = function(node) {
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

	var top = node.offsetTop;
	var left = node.offsetLeft;
	// var height = node.clientHeight;
	// var width = node.clientWidth;
	var height = node.clientHeight - paddingTopBottom;
	var width = node.clientWidth - paddingLeftRight

	var fadeOverlay = document.createElement('div');
	fadeOverlay.setAttribute('id', 'fullhappy_light_box_fade');
	fadeOverlay.setAttribute('class', 'fullhappy_light_box_fade');
	var body = document.getElementsByTagName('body')[0];
	/*
	 * lightOverlay.addEventListener('DOMCharacterDataModified', function() {
	 * var s = lightOverlay.innerHTML; var br = s.indexOf(s, s.length - '<br>'.length) ==
	 * 1 || s.indexOf(s, s.length - '<br/>'.length) == 1; if (br) {
	 * $(node).find("br:last").remove(); } }, false);
	 */
	(lightOverlay.firstChild).addEventListener('DOMCharacterDataModified',
			function(evt) {
				// evt.prevValue
				// evt.newValue
				// evt.target.nodeValue='&nbsp;'
				var s = evt.prevValue;
				if (lightOverlay.lastChild.tagName == 'BR') {
					lightOverlay.removeChild(lightOverlay.lastChild);
				}
			}, false);

	lightOverlay.setAttribute('id', 'fullhappy_light_box_light');
	lightOverlay.setAttribute('contenteditable', 'true');
	lightOverlay.setAttribute('style',
					'position: absolute; box-shadow:0 0 6px #000000; z-index: 1002;background-color: white;'
							// + 'top: '+top+'px; left: '+left+'px;');
							+ 'top: '
							+ top
							+ 'px; left: '
							+ left
							+ 'px; height: '
							+ height
							+ 'px;width: '
							+ width
							+ 'px;');
	node.parentNode.appendChild(lightOverlay);
	body.appendChild(fadeOverlay);
	lightOverlay.focus();
	ClientAction.createSaveButton(lightOverlay, node);
	ClientAction.createDontSaveButton(lightOverlay);
};

ClientAction.removeEditBotton = function(node) {
	// $(node).find("edit_button:last").remove();
	// $(node).find(".edit_button").remove();
	$('body').find(".edit_button").remove();
	$(node).removeClass('box_shadow_orange');
};

ClientAction.createEditButton = function(node) {
	var top = node.offsetTop;
	var left = node.offsetLeft;
	var height = node.clientHeight;
	var width = node.clientWidth;

	var editButton = $('<div class="edit_button" title="edit"></div>');
	editButton.attr('style', 'position: absolute; z-index: 1002; top:'
			+ (top + 2) + 'px; left: ' + (left + width - 18) + 'px;');
	$(node).addClass('box_shadow_orange');
	$(editButton).click(function(e) {
		ClientAction.removeEditBotton(node);
		if (node.tagName == 'IMG') {
			ClientAction.enableEditImage(node);
		} else {
			ClientAction.enableEdit(node);
		}
	});

	$('body').append(editButton);
};

ClientAction.createSaveButton = function(lightOverlay, node) {
	var top = lightOverlay.offsetTop;
	var left = lightOverlay.offsetLeft;
	var height = lightOverlay.clientHeight;
	var width = lightOverlay.clientWidth;

	var saveButton = $('<div class="save_button" title="save"></div>');
	saveButton.attr('style', 'position: absolute; z-index: 1003; top:'
			+ (top + 2) + 'px; left: ' + (left + width - 40) + 'px;');
	$(saveButton).click(function(e) {
		var text = lightOverlay.innerHTML;
		text = text.trim();
		if(text.isLastString('<BR>')||text.isLastString('<br>')){
			text=text.substr(0,text.length-'<br>'.length);
		}
		if(text.isLastString('<BR/>')||text.isLastString('<br/>')){
			text=text.substr(0,text.length-'<br/>'.length);
		}
		
		node.innerHTML = text;
		var editAction = $(node).attr('editAction');
		if(editAction!= null && editAction!=''){
			eval(editAction + '(lightOverlay)');
		}
		

		$('body').find(".save_button").remove();
		$('body').find(".dont_save_button").remove();
		(new HappyLightBox()).close();
	});
	$('body').append(saveButton);
};

ClientAction.createDontSaveButton = function(node) {
	var top = node.offsetTop;
	var left = node.offsetLeft;
	var height = node.clientHeight;
	var width = node.clientWidth;

	var dontSaveButton = $('<div class="dont_save_button" title="don\'t save"></div>');
	dontSaveButton.attr('style', 'position: absolute; z-index: 1003; top:'
			+ (top + 2) + 'px; left: ' + (left + width - 20) + 'px;');
	$(dontSaveButton).click(function(e) {
		var cancelEditAction = $(node).attr('cancelEditAction');
		if(cancelEditAction!= null && cancelEditAction!=''){
			eval(cancelEditAction + '(node)');
		}
				
		$('body').find(".save_button").remove();
		$('body').find(".dont_save_button").remove();
		(new HappyLightBox()).close();
	});
	$('body').append(dontSaveButton);
};

function AdminActionListener() {
	var data = "{}";

	this.clickDeleteProductListener = function() {

	};

	this.clickEditProductListener = function() {

	};

	this.clickAddGalleryListener = function() {
		$('.add_gallery').click(
				function() {
					(new HappyLightBox()).openContentIframe(
							'/gallery/form_add_gallery.html', 230, 40);
				});
	};

	this.clickAddCategoryListener = function() {
		$('.add_category').click(
				function() {
					var p = $(this).parent().parent().parent();
					var _id = p.attr('_id');
					(new HappyLightBox()).openContentIframe(
							'/gallery/form_add_category.html?' + _id, 230, 40);
				});
	};

	this.isCategory = function(node) {
		var p = $(node).parent().parent().parent().parent();
		if (p.attr('_id') != null && p.attr('_id').length > 0) {
			return true;
		} else {
			return false;
		}

	};

	this.clickButtonEditListener = function() {
		$('.edit').click(
				function() {
					var p = $(this).parent().parent().parent().parent();
					var supMenu = null;
					if (p.attr('_id') != null && p.attr('_id').length > 0) {
						// if(isCategory(this)){
						var categoryId = $(this).parent().parent().attr('_id');
						var title = $(this).parent().parent().attr('_title');
						(new HappyLightBox()).openContentIframe(
								'/gallery/form_edit_category.html?'
										+ categoryId + '&' + title, 230, 40);
						supMenu = $(this).parent().parent().parent().parent()
								.parent().parent();

					} else {
						var galleryId = $(this).parent().parent().attr('_id');
						var title = $(this).parent().parent().attr('_title');
						(new HappyLightBox()).openContentIframe(
								'/gallery/form_edit_gallery.html?' + galleryId
										+ '&' + title, 230, 40);

					}
				});
	};
	this.clickButtonDeleteListener = function() {
		$('.delete').click(
				function() {
					var p = $(this).parent().parent().parent().parent();
					var supMenu = null;
					if (p.attr('_id') != null && p.attr('_id').length > 0) {
						// if(isCategory(this)){
						var categoryId = $(this).parent().parent().attr('_id');
						var title = $(this).parent().parent().attr('_title');
						(new HappyLightBox()).openContentIframe(
								'/gallery/form_delete_category.html?'
										+ categoryId + '&' + title, 230, 40);
					} else {
						var galleryId = $(this).parent().parent().attr('_id');
						var title = $(this).parent().parent().attr('_title');
						(new HappyLightBox()).openContentIframe(
								'/gallery/form_delete_gallery.html?'
										+ galleryId + '&' + title, 230, 40);

					}
				});
	};

	this.clickCategoryListener = function() {
		$('#menu ul.mega-menu .sub li.mega-hdr li a').click(function(event) {
			var target = event.target;
			var cl = $(target).attr('class');
			if (cl == null) {
				var categoryId = $(this).parent().attr('_id');
				Support.goToCategory(categoryId);
			}
		});
	}

}
