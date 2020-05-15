// Checks for the music type (raining, snowing, etc)
// if raining is checked, snowing is not and vice versa
// if either are checked, then we add a flag in the updateTime.js 
// to play from their respective tracks if supported

function makeItSnow(){

    // get the globals
    var remote = require('electron').remote;

    var isRaining = remote.getGlobal("sharedObj").global_raining;
    var isSnowing = remote.getGlobal("sharedObj").global_snowing;

    // rain always overrides snow
    if(isRaining === true){
        remote.getGlobal("sharedObj").global_raining = false;
    }

    if(isSnowing === false){
        remote.getGlobal("sharedObj").global_snowing = true;
    }
    else{
        remote.getGlobal('sharedObj').global_snowing = false;
    }

    // update colors
    var rainColorStyle = document.getElementById('rain_button_color').style;
    var snowColorStyle = document.getElementById('snow_button').style;
    

    console.log("IT IS SNOWING");
}

function makeItRain(){
    // get the remote
    var remote = require('electron').remote;

    //get globals
    var isRaining = remote.getGlobal("sharedObj").global_raining;
    var isSnowing = remote.getGlobal("sharedObj").global_snowing;

    if(isSnowing === true){
        remote.getGlobal('sharedObj').global_snowing = false;
    }


    if(isRaining === false){
        remote.getGlobal('sharedObj').global_raining = true;
    }else{
        remote.getGlobal('sharedObj').global_raining = false;
    }

   

    console.log("IT IS RAINING");
}

// change the color of the text if active
function updateColors(){

     var remote = require('electron').remote;

     var rainColorStyle = document.getElementById('rain_button_color').style;
     var snowColorStyle = document.getElementById('snow_button_color').style;
 
     if(remote.getGlobal('sharedObj').global_raining === true){
         //make it green I guess
         document.getElementById('rain_button_color').style = "color:#00ff00;";
     }
     else{
         document.getElementById('rain_button_color').style = "color:#ffff00";
     }

     if(remote.getGlobal('sharedObj').global_snowing === true){
        //make it green I guess
        document.getElementById('snow_button_color').style = "color:#00ff00;";
    }
    else{
        document.getElementById('snow_button_color').style = "color:#ffff00;";
    }
}

// check if our buttons have been clicked
var snowButton = document.getElementById('snow_button');
snowButton.onclick = makeItSnow;

var rainButton = document.getElementById('rain_button');
rainButton.onclick = makeItRain;

var t = setInterval(updateColors, 1000); // every second we call getColor()