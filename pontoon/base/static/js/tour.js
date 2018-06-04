var enjoyhint_script_steps = [
	     {
    			'next header' : 'The main toolbar allows you to navigate between projects without leaving the translation workspace'
          }  ,
          {
          'click #progress .number': 'An overview of the status of the selected resource is located to the right of the main toolbar. Translators can view the overview in detail by clicking it once.',
          'shape':'circle',
          'showSkip' : false,
        },
        {
          'next aside.menu': 'An overview of the status of the selected resource is located to the right of the main toolbar. Translators can view the overview in detail by clicking it once.',
          'showSkip' : false,
        },
          {
          onBeforeStart: function(){
          	$("#progress .number").click();
            $("#entitylist").children().css('pointer-events','none');

          },
          selector:'#entitylist',
          event:'to_do',
          event_type:'custom',
          description:'The sidebar displays the list of strings in the current project resource.<br> Each string is displayed with the string status (i.e. Missing, Translated, etc.) <br><script> $("#progress .number").click(); </script> identified by a colored square, the source string, <br> and the approved translation or the most recent suggestion if available',
          'showSkip' : false,
          'showNext': true
        },
       {
          onBeforeStart: function(){
            $("#entitylist").children().css('pointer-events','auto');

          },
          selector:'.uneditables li:nth-child(3)',
          event:'click',
          description:'Selecting an entity by clicking it opens up the editor.',
          'showSkip' : false,
          'showNext': false,
        },
        {
          onBeforeStart: function(){
            $("#editor").children().css('pointer-events','none');

          },
          selector:'#editor #single',
          event:'next',
          description:'The translation workspace is where strings are translated.',
          'showSkip' : false,
          'showNext': true,
        },
        {
    			'next header' : '',
    			'showSkip' : false,
				'nextButton' : {className: "myNext", text: "Got it!"}
          }  ,
]
var enjoyhint_instance = null;
      $(document).ready(function(){
      	setTimeout(function(){
      	enjoyhint_instance = new EnjoyHint({});
        enjoyhint_instance.setScript(enjoyhint_script_steps);
        enjoyhint_instance.runScript();
    }, 1000);

      });