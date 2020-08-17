// Modules to control application life and create native browser window
var electron = require('electron')
const https = require('https');

var fs = require('fs');


const {app, BrowserWindow} = electron;
const path = require('path')


const debug = false;
const showDebugger = true;
const canUseDebugTools = true;

const numberOfVars = 4;

const mainScreenActive = true;

const { ipcMain } = require( "electron" );

ipcMain.on( "setMyGlobalVariable", ( event, myGlobalVariableValue ) => {
  global.myGlobalVariable = myGlobalVariableValue;
} );

global.sharedObj = {
  global_volume: 0.1,
  global_raining:false,
  global_snowing:false,
  global_dynamicWeather:true,
  global_state:"TEXAS",
  global_city:"DALLAS",
};

// main window
let mainWindow;


function createWindow () {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    show: false,
    resizable: true,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration:true
    }
  })

  mainWindow.on('ready-to-show',()=>{
    mainWindow.show();
  })

  // and load the index.html of the app.
  mainWindow.loadFile('index.html');
  mainWindow.setMenuBarVisibility(debug);

  //create the icon
  mainWindow.setIcon("./bin/icon/icon.png");
  
// global.sharedObj = {global_volume:2.0};

  // Open the DevTools.
  if(showDebugger === true){
    mainWindow.webContents.openDevTools();
  }
 
  mainWindow.webContents.on("devtools-opened", () => {
      if(canUseDebugTools === false){
        mainWindow.webContents.closeDevTools();
      }   
    });
    
  // Load settings from our .ini file
  LoadSettings();

  GetDataFromWeatherAPI();
  
}


// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(createWindow)
//app.whenReady().then(createChildWindow)


// Quit when all windows are closed.
app.on('window-all-closed', function () {

  // save our data to our settings file
  SaveSettings();

  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') app.quit()
})

app.on('activate', function () {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) createWindow()
})




// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.


function LoadSettings()
{
  
  var settings = "";

  settings = fs.readFileSync("./bin/settings/settings.ini", 'utf8');

  console.log("Loaded Settings: ");
  console.log(settings);

  var arraySettings = settings.split("\n");

  sharedObj.global_volume = JSON.parse(arraySettings[0]);
  sharedObj.global_raining = JSON.parse(arraySettings[1]);
  sharedObj.global_snowing = JSON.parse(arraySettings[2]);
  sharedObj.global_dynamicWeather = JSON.parse(arraySettings[3]);
  sharedObj.global_state = arraySettings[4];
  sharedObj.global_city = arraySettings[5];

  //console.log("Loaded Settings: ");

  var currentSettings = "";

  currentSettings += JSON.parse(sharedObj.global_volume) + "\n";
  currentSettings += JSON.parse(sharedObj.global_raining) + "\n";
  currentSettings += JSON.parse(sharedObj.global_snowing) + "\n";
  currentSettings += JSON.parse(sharedObj.global_dynamicWeather) + "\n";
  currentSettings += JSON.stringify(sharedObj.global_state) + "\n";
  currentSettings += JSON.stringify(sharedObj.global_city) + "\n";

  console.log( "Currrent Settings: \n" + currentSettings);

}

function  SaveSettings()
{
  /*
    global_volume: 0.1,
    global_raining:false,
    global_snowing:false,
    global_dynamicWeather:true,
    global_state:"TEXAS",
    global_city:"DALLAS",
  */
 var settings = "";

 // save each setting
 settings += JSON.parse(sharedObj.global_volume) + "\n";
 settings += JSON.parse(sharedObj.global_raining) + "\n";
 settings += JSON.parse(sharedObj.global_snowing) + "\n";
 settings += JSON.parse(sharedObj.global_dynamicWeather) + "\n";
 settings += RemoveQuotesFromString(JSON.stringify(sharedObj.global_state)) + "\n";
 settings += RemoveQuotesFromString(JSON.stringify(sharedObj.global_city)) + "\n";


 console.log("Saving Settings: \n " + settings);

 fs.writeFile("./bin/settings/settings.ini", settings, function (err){
   if(err)
     return console.log(err);
 });
}

function RemoveQuotesFromString(originalString){

  var newString = "";

  newString = (String)(originalString).substring(1,originalString.length-1);

  //newString = (String)(newString).substring(newString.length,newString.length-1);

  return newString;
}

function GetDataFromWeatherAPI()
{

  https.get("https://api.openweathermap.org/data/2.5/weather?q={" + sharedObj.global_city + "}&appid={c0b3e0b2c8eb15d8e0e120627ad21c91}", (resp) => {

  let data = "";

  // chunk received
  resp.on('data',(chunk)=>{
    data += chunk;
  });

  //response has ended
  resp.on('end', () => {
    console.log(JSON.parse(data));
  });



  }).on("error",(err) => {
    console.log("Error: " + err);
  });


  //change set the weather tracks based on the data we got from the weather api

  if(sharedObj.global_dynamicWeather == true){
    console.log("Setting Weather Tracks With API");
  }


}
