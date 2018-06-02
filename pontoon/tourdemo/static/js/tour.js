//initialize instance
//simple config.
//Only one step - highlighting(with description) "New" button
//hide EnjoyHint after a click on the button.
var enjoyhint_script_steps = [
		{
          selector:'body > header',
          event:'next',
          description:'Set first task as completed',
          timeout:100
        },
 		 {
          selector:'#progress .number',
          event:'click',
          description:'Set first task as completed',
          shape:'circle',
        },
        {
          selector:'.details div.translated',
          event:'click',
          description:'Select all completed tasks',
        },
]
var enjoyhint_instance = null;
      $(document).ready(function(){
      	setTimeout(function(){
      	enjoyhint_instance = new EnjoyHint({});
        enjoyhint_instance.setScript(enjoyhint_script_steps);
        enjoyhint_instance.runScript();
    }, 1000);

      });