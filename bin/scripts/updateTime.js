//////////////////////////////////////////////////////
// Updates the time to sync with your local system
// plays the appropriate time based music track
// TODO: changes the background to sync with the hour

var text = document.getElementById("title_time");

var alreadyPlaying = false;


function getTime(){
    
    var date = new Date();
    var n = date.getTime();

    var current_hour = date.getHours();
    var current_minute = date.getMinutes();
    var current_second = date.getSeconds();
    var isAM = false;
    var current_track = "DEFAULT_TRACK";
    var timeStamp = "AM";
    var gameName = "wild_world";
    var filetype = ".mp3";

    // for formating (not really necessary)
    var stringHour = "";
    var stringMinute = "";
    var stringSecond = "";

    var name = document.getElementById("game_name").textContent; // get the games name so we don't have to copypasta

    //console.log(name);

    if(name == "Wild world"){
        gameName = "wild_world";
    }
    else if(name == "New Leaf"){
        gameName = "new_leaf";
        filetype = ".wav";
    }
    else if(name == "New Horizions"){
        gameName = "new_horizions"
    }

  

    //console.log("HOUR: " + current_hour + " Min: " + current_minute + " Sec: " + date.getSeconds());

    // not even close to the best way of getting all of the times, but it leaves room to do some stuff 
    // based on the hour in the future I guess. 
    //TODO: Look into a time based skybox or something
    if(current_hour == 0){
        isAm = true;
        current_track = "12AM";
    }
    else if (current_hour == 1){  //1 AM
        isAm = true;
        current_track = "1AM";
    }
    else if (current_hour == 2){ //2 AM
        isAm = true;
        current_track = "2AM";
    }
    else if (current_hour == 3){  //3 AM
        isAm = true;
        current_track = "3AM";
    }
    else if (current_hour == 4){  //4 AM
        isAm = true;
        current_track = "4AM"
    }
    else if (current_hour == 5){  //5 AM
        isAm = true;
        current_track = "5AM";
    }
    else if (current_hour == 6){  //6 AM
        isAm = true;
        current_track = "6AM";
    }
    else if (current_hour == 7){  //7 AM
        isAm = true;
        current_track = "7AM";
    }
    else if (current_hour == 8){  //8 AM
        isAm = true;
        current_track = "8AM";
    }
    else if (current_hour == 9){  //9 AM
        isAm = true;
        current_track = "9AM";
    }
    else if (current_hour == 10){  //10 AM
        isAm = true;
        current_track = "10AM";
    }
    else if (current_hour == 11){ //11 AM
        isAm = true;
        current_track = "11AM";
    }
    else if (current_hour == 12){  //12 PM
        isAm = false;
        current_track = "12PM";
    }
    else if (current_hour == 13){ //1 PM
        isAm = false;
        current_track = "1PM";
    }
    else if (current_hour == 14){ //2 PM
        isAm = false;
        current_track = "2PM";
    }
    else if (current_hour == 15){ //3 PM
        isAm = false;
        current_track = "3PM";
    }
    else if (current_hour == 16){ //4 PM
        isAm = false;
        current_track = "4PM";
    }
    else if (current_hour == 17){ //5 PM
        isAm = false;
        current_track = "5PM";
    }
    else if (current_hour == 18){ //6 PM
        isAm = false;
        current_track = "6PM";
    }
    else if (current_hour == 19){ //7 PM
        isAm = false;
        current_track = "7PM";
    }
    else if (current_hour == 20){ //8 PM
        isAm = false;
        current_track = "8PM";
    }
    else if (current_hour == 21){ //9 PM
        isAm = false;
        current_track = "9PM";
    }
    else if (current_hour == 22){ //10 PM
        isAm = false;
        current_track = "10PM";
    }
    else if (current_hour == 23){ //11 PM
        isAm = false;
        current_track = "11PM";
    }

    if(isAm){
        timeStamp = "AM";
    }
    else {
        timeStamp = "PM";
    }

    // put the 0 in front if the time is a single digit
    stringHour = current_hour - 12;
    if(current_hour - 12 < 10){
        stringHour = "0" + stringHour;
    }

    // put the 0 in front if the time is a single digit
    stringMinute = current_minute;
    if(current_minute  < 10){
        stringMinute = "0" + stringMinute;
    }

    stringSecond =  current_second;
    if(current_second  < 10){
        stringSecond = "0" + stringSecond;
    }

    text.innerHTML = stringHour + " : " + stringMinute + " : " + stringSecond + " " + timeStamp;

    var music = document.getElementById("in_game_music");
    // check if we are already playing the right track

    var filepath = "./bin/music/in_game/" + gameName + "/" + current_track + filetype;

    var fileName = current_track + filetype;
    var trimmedSrc = ""; 
    
    if(current_track.length == 3){
        trimmedSrc = music.src.substr(music.src.length - 7);
    }
    else if(current_track.length == 4){
        trimmedSrc = music.src.substr(music.src.length - 8);
    }

    //console.log(fileName);
    //console.log(trimmedSrc);
    if(fileName != trimmedSrc){
        music.src = filepath;
        alreadyPlaying = false;
    }
      
    if(alreadyPlaying == false){       
        //music.play();
        music.loop = true;
        music.autoplay = true;
        alreadyPlaying = true;
    }
       

}

var t = setInterval(getTime, 1000); // every second we call getTime()