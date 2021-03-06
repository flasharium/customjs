/*

function preg_match_all(regex, haystack) {
   var globalRegex = new RegExp(regex, 'g');
   var globalMatch = haystack.match(globalRegex);
   var matchArray = new Array();
   for (var i in globalMatch) {
      var nonGlobalRegex = new RegExp(regex);
      var nonGlobalMatch = globalMatch[i].match(nonGlobalRegex);
      matchArray.push(nonGlobalMatch[1]);
   }
   return matchArray;
}

if (window.location.href.search(/key=/) != -1) {
   
   var button = $('<button style="margin-left:20px;" class="btn btn-danger">В архив</button>');
   $('#content > form > button').after(button);
   button.click(function(){
      var url1 = $('#content > h4 > a').prop('href');
      var key_id = window.location.href.replace(/^.*?key=/,'');
      $.post(url1, { key_id : key_id } ,function(){
         window.location.href = url1;
      })
   })
  
  var li = $('<li><a>Экспорт</a></li>');
  li.click(function(){

  	var obj = {};
   
   obj['title'] = $('#content > table > tbody > tr:nth-child(1) > td:nth-child(2)').text();
  	obj['size'] = $('#content > table > tbody > tr:nth-child(2) > td:nth-child(2)').text();
  	obj['sizeMin'] = parseInt(obj['size']);
  	obj['sizeMax'] = parseInt(obj['size'].substr(obj['size'].indexOf('- ') + 2));
  	obj['equal'] = $('#content > table > tbody > tr:nth-child(4) > td:nth-child(2)').text()
  	obj['parts'] = obj['equal'].split('Дополнительные слова, употребление которых необходимо:')
  	
  	obj['strong_equals'] = preg_match_all('([^\(]+\\(\\d+\\))', obj['parts'][0])
  	obj['word_equals'] = preg_match_all('([^\(]+\\(минимум - \\d+\\))', obj['parts'][1]);
  	obj['not_equals'] = preg_match_all('([^\(]+\\(\\d+\\))', $('#content > table > tbody > tr:nth-child(4) > td:nth-child(2)').text());
  	obj['stoplist'] = $('#content > table > tbody > tr:nth-child(5) > td:nth-child(2)').html().split('<br>');
  	
  	text = 'Требуется статья информационного содержания - рерайт из нескольких источников. Основное требование - тематическое соответствие ключевым фразам. \n\n\
Ключевые требования к тексту: \n\
1. Грамотность (отсутствие пунктуационных и грамматических ошибок) \n\
2. Структурность (текст должен легко восприниматься независимо от его объёма) \n\
3. Информативность (материал должен нести максимально развёрнутый ответ на те, ключевые слова, под которые он пишется). Для выполнения данного пункта, так же рекомендуем использовать несколько источников для рерайта. \n\n\
Оформление текста: \n\
1. Текст должен быть разбит на абзацы по 4-5 предложений. \n\
2. Каждые 2-5 абзацев должны иметь свой подзаголовок. \n\
3. Заголовки и подзаголовки должны быть написаны на отдельной строке, выделение не использовать. \n\
4. Для нумерованных и маркированных списков нужно использовать соответствующие инструменты оформления.  \n\
5. Не сочинять/рерайтить отзывы \n\
6. Не указывать "Источники:..." \n\
7. Не накручивать количество символов за счет дублирования названия статьи в тексте или завершения статьи фразами “Будьте здоровы!”, “До новых встреч!” и т.п. \n\
8. "Теги" не нужны, не тратьте на них время. "Заголовок" и "Анонс" - обязательны. \n';
  if (obj['strong_equals'].length) {
  	text += '9. Фраза "' +obj['strong_equals'][0].replace(/ \(.*\)/, '')+ '" обязательно должна быть вписана в первый абзац в точном виде \n';
  } else if (obj['not_equals'].length) {
  	text += '9. Фраза "' +obj['not_equals'][0].replace(/ \(.*\)/, '')+ '" обязательно должна быть вписана в первый абзац с изменением окончаний \n';
  }
  
  	var i = 0;
  	if (obj['word_equals'].length) {
  		text += '\n\n'+(++i).toString()+') В тексте необходимо употребить следующие ключевые слова: \n'+ obj['word_equals'].join('\n');
  	}
  	
  	if (obj['strong_equals'].length) {
  		text += '\n\n'+(++i).toString()+') Следующие фразы нужно употребить в точном виде:  \n'+ obj['strong_equals'].join('\n');
  	}	
  	
  	if (obj['not_equals'].length) {
  		text += '\n\n'+(++i).toString()+') Следующие фразы нужно употребить с изменением окончаний:   \n'+ obj['not_equals'].join('\n');
  	}
  	
  	if (obj['stoplist'].length + 1) {
  		text += '\n\n'+(++i).toString()+') Следующие фразы НЕ должны употребляться в тексте в данной форме:   \n'+ obj['stoplist'].join('\n');
  	}	

  	exp = {};
  	exp['tz'] = text;
  	exp['sizeMin'] = Math.min(parseInt(obj['sizeMin']), 8000);
  	exp['sizeMax'] = Math.min(obj['sizeMax'], 10000);
  	exp['title'] = obj['title'];
    $("#content > div.row-fluid.show-grid").append($("<div class='span6'><textarea id='taskExport' rows='20' cols='100'></textarea></div>"))

  	$('#taskExport').val(JSON.stringify(exp));
  })
  $('#main_menu > ul').append(li)
}


if (window.location.href.search(/id=/) != -1) {

    $('#content table td:nth-child(2) > form[action^="#main_"]').remove();

    $.getScript('https://rawgit.com/christianbach/tablesorter/master/jquery.tablesorter.js', function() {
        $('#content > table').tablesorter( {sortList: [[0,1]]});
    });

    $.getScript('http://code.jquery.com/ui/1.11.2/jquery-ui.js', function() {
        var input = $('<input autofocus/>');
        $('#content > table').before(input);
        $('head').append( $('<link rel="stylesheet" type="text/css" />').attr('href', "//code.jquery.com/ui/1.11.2/themes/smoothness/jquery-ui.css") );
        var optionTexts = [];
        $('#content table tr td:nth-child(2) > a').each(function() { optionTexts.push($(this).text()) });
        input.autocomplete({delay:0,source: optionTexts, select:function(event, ui){
            var elem = $('#content table tr td:nth-child(2) > a:contains("'+ui.item.label+'")')
            elem[0].click();
        }});
    });
}

*/


$("#content > table > tbody > tr:nth-child(7) > td:nth-child(2) > a").click(function(){

  var id = window.location.href.match(/key=\d+/)[0].match(/\d+/)[0]

  $.get("http://zapros.binet.pro/includes/export.php?key=" + id, function(data){
      data = data.replace(/\r?\n|\r/g, "\\n")
      
    $("#content > div.row-fluid.show-grid").append($("<div class='span6'><textarea id='taskExport' rows='20' cols='100'></textarea></div>"))

    $('#taskExport').val(data);
  })


  return false

})

if (window.location.href.match('top=yes&key=').length == 1) {
  
    var textarea = $('<textarea id="hfrwfhkawhf724af2lawi79y3" style="position:fixed;right:0px;bottom:0px;height: 1px;width: 300px;"></textarea>')


  $(document.body).append(textarea);

  var limit = $('#content > table > tbody > tr:nth-child(2) > td:nth-child(1) br').length

  $('#content > table > tbody > tr:nth-child(2) > td:nth-child(2) > a').each(function(){
    
    limit --;
    console.log(limit)
    if (limit >= 0) {
      textarea.val(textarea.val() + $(this).text().replace('www.', '').toLowerCase() + '\n')
      textarea.height(0);
        textarea.height(textarea.prop('scrollHeight'));
    }

  })


}