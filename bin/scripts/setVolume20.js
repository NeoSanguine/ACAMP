 
 // just lowers the volume to 20% of max
 var audio = document.getElementById(document.currentScript.getAttribute('param')); // param is passed in as a script parameter

 if(audio != null){
    audio.volume = 0.5;
 }

 var inGameAudio = document.getElementById("in_game_music");
 if(inGameAudio != null){
    inGameAudio.volume = 0.5;
 }