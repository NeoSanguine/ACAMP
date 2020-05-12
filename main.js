// Modules to control application life and create native browser window
const {app, BrowserWindow} = require('electron')
const path = require('path')

var nodeConsole = require('console');
var myConsole = new nodeConsole.Console(process.stdout, process.stderr);


const debug = false;
const showDebugger = false;

const mainScreenActive = true;

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
      preload: path.join(__dirname, 'preload.js')
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

  if(showDebugger == true)
  {
    mainWindow.webContents.openDevTools();
  }
 
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