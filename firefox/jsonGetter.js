(function($) {

	var setting = {
	    	srclang: 'ru',
	    	dstlang: 'en,fr',
	    	dstlanglist: {},

	    	apikey: '',
	    	adrlanglist: 'https://translate.yandex.net/api/v1.5/tr.json/getLangs?key=[apikey]&ui=[srclang]',
	    	adrtranslate: 'https://translate.yandex.net/api/v1.5/tr.json/translate?key=[apikey]&text=[text]&lang=[lang]&format=[format]',

	    	showtranslatedirs: null,
	    	hidetranslatedirs: null,

	    	menustyle: null,
	    	menuclass: null
	    },

	    oTranslateDiv = null,
	    sOldParentPos = '',
	    bLeaveObject = true,

	    showTranslateText = function(adr) {
	    	//console.log(adr);
	      $.getJSON(
	        adr,
	        function(data) {
	        	if( ('code' in data) && (data.code == 200) && ('text' in data) ) {
	        		console.log(data.text[0]);
	        		updateBox(data.text[0]);
	        	}
	        }
	      );
	    },

	    showTranslateMenu = function(ob, input) {
		  	var dstList = setting.dstlanglist,
		  	    s = '',
		  	    sAdr = '',
		  	    oParent = $(ob);

		  	    var splitInput = input.slice(Math.max(input.length-30, 0));
	      		if( !$.isEmptyObject(dstList) ) {
	      			for(s in dstList) {
	      				sAdr = setting.adrtranslate
	      				  .replace(/\[apikey\]/, setting.apikey)
	      				  .replace(/\[lang\]/, setting.srclang + '-' + s)
	      				  .replace(/\[text\]/, encodeURIComponent(splitInput))
	      				  .replace(/\[format\]/, 'plain');

	      				showTranslateText(sAdr);
	      			}
	      		}
	    };

	$.fn.yaTranslate = function(param, input) {

		var adrList = setting.adrlanglist,
		    dstList = setting.dstlanglist;

		setting = $.extend(setting, param || {});

		adrList = adrList
			.replace(/\[apikey\]/, setting.apikey)
			.replace(/\[srclang\]/, setting.srclang);

		console.log("yaTranslate " + adrList);

		$.getJSON(
			adrList,
			function(data) {

				var dirs = data.dirs || [],
				    langs = data.langs || {},
				    aDstLang = setting.dstlang.split(','),
				    srcPattern = setting.srclang.toLocaleLowerCase() + '-',
				    nPatternLength = srcPattern.length,
				    i = 0,
				    nMax = 0,
				    s = '';
				for(i = 0, nMax = aDstLang.length; i < nMax; i = i + 1) {
					s = aDstLang[i].replace(/^\s+|\s+$/g, '').toLocaleLowerCase();
					dstList[s] = '';
				}

				for(i = dirs.length - 1; i >= 0; i = i - 1) {
					if( dirs[i].indexOf(srcPattern) !== 0 ) {
						continue;
					}
					s = dirs[i].substr(nPatternLength);
					if( (s in dstList) && (s in langs) ) {
						dstList[s] = langs[s];
					}
				}
				showTranslateMenu(this, input)
			}
		);
		
		return this;

}

})(jQuery)