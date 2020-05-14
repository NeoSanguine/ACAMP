// Modules to control application life and create native browser window
var electron = require('electron')
const {app, BrowserWindow} = electron;
const path = require('path')


const debug = false;
const showDebugger = true;
const canUseDebugTools = true;

const mainScreenActive = true;

const { ipcMain } = require( "electron" );

ipcMain.on( "setMyGlobalVariable", ( event, myGlobalVariableValue ) => {
  global.myGlobalVariable = myGlobalVariableValue;
} );

global.sharedObj = {global_volume: 0.1};

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
  


  // Open the DevTools.
  if(showDebugger === true){
    mainWindow.webContents.openDevTools();
  }
 
  mainWindow.webContents.on("devtools-opened", () => {
      if(canUseDebugTools === false){
        mainWindow.webContents.closeDevTools();
      }   
    });
    

  // global.sharedObj = {global_volume:2.0};
  
}






// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(createWindow)
//app.whenReady().then(createChildWindow)


// Quit when all windows are closed.
app.on('window-all-closed', function () {
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
