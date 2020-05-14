function decreaseVolume()
 {
   var remote = require( "electron" ).remote;

   // just lowers the volume to 20% of max

    var currentVolume = remote.getGlobal('sharedObj').global_volume;

   if( currentVolume - 0.1 <= 0.0 ||  currentVolume === null){

    remote.getGlobal('sharedObj').global_volume = 0.0;

   }
   else{

    var volume = remote.getGlobal('sharedObj').global_volume = remote.getGlobal('sharedObj').global_volume - 0.1;

   }

   
   console.log("New Volume: " + volume);

 }


 var el = document.getElementById('volume_button_decrease');
 el.onclick = decreaseVolume;