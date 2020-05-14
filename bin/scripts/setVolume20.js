 


 function setVolume()
 {
   var remote = require( "electron" ).remote;

   // just lowers the volume to 20% of max
   var audio = document.getElementById(document.currentScript.getAttribute('param')); // param is passed in as a script parameter

   // get the global volume


   var volume = remote.getGlobal('sharedObj').global_volume;
   console.log(volume);

   if(audio != null){
      audio.volume = volume;
   }

   var inGameAudio = document.getElementById("in_game_music");
   if(inGameAudio != null){
      inGameAudio.volume = volume;
   }
 }

 setVolume();