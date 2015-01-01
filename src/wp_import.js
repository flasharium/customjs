$ = jQuery;

$(function () {
    if (window.location.href.indexOf("wp-admin/post-new.php") !== -1) {

        var textarea = $('<div style="text-align:center;background:#fff;z-index: 1000;"><div><textarea cols="60" rows="20"></textarea></div><div><button>label</button></div></div>');
        textarea.hide();
        $('body').append(textarea);
        textarea.css({
            position: 'absolute',
            left: 'calc(50% - 200px)',
            'top': 'calc(50%)',
            'boxShadow': '0 0 10px 10px'
        });

        var link = $('<a class="su-generator-button button">Импорт</a>');
        link.click(function(){
            textarea.fadeIn();
            textarea.find('button').text('Импорт');
            textarea.find('button').eq(0).click(function () {
                var val = textarea.find('textarea').eq(0).val();
                var obj = $.parseJSON(val);

                $('#title').val(obj.title);

                $('#tinymce').html(obj.content);
                $('#content-html').click();
                $('#content').val(obj.content);
                $('#content-tmce').click();
                $('#content-textarea-clone').html(obj.content);

                $('#aiosp_title_wrapper > div > span.aioseop_option_input > div.aioseop_option_div > input[type="text"]:nth-child(1)').val(obj.title);
                $('#aiosp_description_wrapper > div > span.aioseop_option_input > div.aioseop_option_div > textarea').val(obj.description);

                $('#title').triggerHandler('focus');
                $('#aiosp_title_wrapper > div > span.aioseop_option_input > div.aioseop_option_div > input[type="text"]:nth-child(1)').triggerHandler('focus');
                $('#aiosp_description_wrapper > div > span.aioseop_option_input > div.aioseop_option_div > textarea').triggerHandler('focus');


                textarea.fadeOut();
                window.obj = obj;
            })

        });
        $('#wp-content-media-buttons').append(link);

    }
});

