$(function(){
	if (window.location.href == "http://advego.ru/text/seo/") {

		$('head').append($('<style>' +
			'.selecteded {background-color: #9999ff !important;}' +
		'</style>'));

		$('body').append($('<textarea id="sdlhfuifhieswfbhuwf7234rh8327hr4" style="position: fixed;top:23px;left:20px;width: 315px;height: 465px;"></textarea>'))

		$('#text_check_results > div:nth-child(4) > table > tbody > tr > td:nth-child(1)').each(function(){
			$(this).click(function(){
				$(this).toggleClass('selecteded');
				var str = [];
				$('#text_check_results > div:nth-child(4) > table > tbody > tr > td:nth-child(1).selecteded').each(function(){
					str.push($(this).text())
				})
				$('#sdlhfuifhieswfbhuwf7234rh8327hr4').val(str.join(' '));
			})
		})
	}
});

