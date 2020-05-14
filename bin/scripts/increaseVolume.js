function increaseVolume()
 {
   var remote = require( "electron" ).remote;

   // just lowers the volume to 20% of max

   var volume = remote.getGlobal('sharedObj').global_volume = remote.getGlobal('sharedObj').global_volume + 0.1;
   console.log("New Volume: " + volume);

 }


 var el = document.getElementById('volume_button_increase');
 el.onclick = increaseVolume;
