function decreaseVolume()
 {
   var remote = require( "electron" ).remote;

   // just lowers the volume to 20% of max

    var currentVolume = remote.getGlobal('sharedObj').global_volume;

   if( currentVolume - 0.1 <= 0.0 ||  currentVolume === null){

    remote.getGlobal('sharedObj').global_volume = 0.0;

   }
   else{

    remote.getGlobal('sharedObj').global_volume = remote.getGlobal('sharedObj').global_volume - 0.1;

   }

   var volume = remote.getGlobal('sharedObj').global_volume;
   console.log("New Volume: " + volume);


   // update the volume so the user can hear 
   var menuAudio = document.getElementById("menu_music");
   if(menuAudio != null){
        menuAudio.volume = volume;
   }

   var inGameAudio = document.getElementById("in_game_music");
   if(inGameAudio != null){
      inGameAudio.volume = volume;
   }

 }


 var el = document.getElementById('volume_button_decrease');
 el.onclick = decreaseVolume;