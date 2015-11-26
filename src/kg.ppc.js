

setTimeout(function(){

	var textarea = $('<textarea id="hfrwfhkawhf724af2lawi79y3" style="position:fixed;right:0px;bottom:0px;height: 100px;width: 300px;"></textarea>')
	$(document.body).append(textarea);


	$(document).on("click", function(){
		var data = jQuery.parseJSON( localStorage["keywords-group"])
		var keys = textarea.val().split('\n')
		var keyData = {}
		for (var i = 0; i < keys.length; i++) {
			var item = keys[i].split('\t')
			keyData[item[0]] = item[1]
		}
		if (keyData.length == 0) {return}

		var elems = $("body > div.b-page__container.ng-scope > div > section:nth-child(2) > div > ul > li")

		var len = elems.length

		for (var i = 0; i < len; i++) {

			var elem = elems.eq(i)
			var group = data.groups[i]
			var sum = 0;

			for	(var j = 0; j <= group.length; j++) {
				sum += parseInt(keyData[group[j]] || 0)
			}

			if (elem.find(".fiiewhfeh").length == 0 ) {
				elem.find(".ui-droppable").eq(0).append($('<div class="fiiewhfeh" style="position: absolute;right: 9px;top: 38px;z-index: 999;border: 1px solid orange;background-color: yellow;padding: 0 10px;">11</div>'))
			}

			var div = elem.find(".fiiewhfeh").eq(0)
			div.text(sum)
			if (sum < 500) {
				div.css("background-color", "red")
			} else if (sum >= 500 && sum < 2000) {
				div.css("background-color", "#52F952")
			} else if (sum >= 2000 && sum < 4000) {
				div.css("background-color", "yellow")
			} else {
				div.css("background-color", "red")
			}

		}
	})

}, 1000)