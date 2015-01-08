$(function () {
    if (window.location.href.indexOf("turbotext.ru") !== -1) {
        
        var a = parseInt($('#header > div.info > div > strong:nth-child(2) > a').text())
        var n = a - parseInt($('#header > div.info > div > span > a').text())
        var k = Math.round(n/30);
        $('#header > div.info > div > span > a').after($('<span>, доступно: <b>'+n+' руб.</b>, символов: <b>'+k+'k</b></span>'))

        var textarea = $('<div style="text-align:center;background:#fff;z-index: 1000;"><div><textarea cols="60" rows="20"></textarea></div><div><button>label</button></div></div>');

        textarea.hide();
        $('body').append(textarea);

        textarea.css({
            position: 'absolute',
            left: 'calc(50% - 200px)',
            'top': 'calc(50%)',
            'boxShadow': '0 0 10px 10px'
        });


        if (window.location.href.search(/clone|add/) != -1) {

            var toolbar = $('#menu').find('ul.second');
            var li = $('<li style="cursor:pointer;"><a >Импорт</a></li>');
            li.click(function () {

                textarea.fadeIn();
                textarea.find('button').text('Импорт');
                textarea.find('button').eq(0).click(function () {
                    var val = textarea.find('textarea').eq(0).val();
                    var obj = $.parseJSON(val);
                    var commentForm = $('#commentForm');

                    $('#label_1').val(obj['title']).css('border', '1px solid #f00');
                    $('#label_2').val(obj['tz']).css('border', '1px solid #f00');
                    if (!$('#label_10').val()) {
                        $('#label_10').val('95%, Адвего глубокая проверка, шингл 4').css('border', '1px solid #f00');
                    }

                    commentForm.find('div.submit > div:nth-child(5) > div > input[type="text"]:nth-child(2)').val(obj['sizeMin']).css('border', '1px solid #f00');
                    commentForm.find('div.submit > div:nth-child(5) > div > input[type="text"]:nth-child(4)').val(obj['sizeMax']).css('border', '1px solid #f00');

                    textarea.fadeOut()
                })

            });
            toolbar.append(li);

        }

        if (window.location.href.search(/orders\/\d+\/$/) != -1) {

            var obj = {};
            obj.title = $('#zag').text();
            obj.description = $('#anons').text();
            obj.content = $('#content').find('div.content > div > form > p:nth-child(3) > div > div').html();

            var button = $('<div class="button"><input type="submit" value="Экспорт" class="subsub"></div>');

            $('#content > div.content > div > h1').after(button);
            button.click(function(){
                textarea.fadeIn();
                textarea.find('textarea').eq(0).val(JSON.stringify(obj));
                textarea.find('textarea').eq(0).click(function(){
                   $(this).select();
                });
                textarea.find('button').text('Закрыть');
                textarea.find('button').eq(0).click(function () {
                    textarea.fadeOut()
                })
            });
        }

    }
});
