$(function() {
	if (window.location.href.indexOf("turbotext.ru") !== -1) {
    var toolbar = $('#menu > ul.second')
    var li = $('<li style="cursor:pointer;"><a >Импорт</a></li>');
    li.click(function(){
    	var textarea = $('<div style="text-align:center;background:#fff"><div><textarea cols="60" rows="20"></textarea></div><div><button>Импорт</button></div></div>');
    	textarea.hide();
    	$('body').append(textarea);
    	textarea.css({position:'absolute',left:'calc(50% - 200px)', 'top':'calc(50%)','boxShadow': '0 0 10px 10px'});
    	textarea.fadeIn();
    	textarea.find('button').eq(0).click(function(){
    		var val = textarea.find('textarea').eq(0).val();
    		var obj = $.parseJSON(val);
    
    		$('#label_1').val(obj['title']).css('border', '1px solid #f00');
    		$('#label_2').val(obj['tz']).css('border', '1px solid #f00');
    		$('#commentForm > div.submit > div:nth-child(5) > div > input[type="text"]:nth-child(2)').val(obj['sizeMin']).css('border', '1px solid #f00');
    		$('#commentForm > div.submit > div:nth-child(5) > div > input[type="text"]:nth-child(4)').val(obj['sizeMax']).css('border', '1px solid #f00');
    		textarea.fadeOut()
    	})
    	
    });
    toolbar.append(li);
	}
});
