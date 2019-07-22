const { app, BrowserWindow } = require("electron");
require('electron-reload')(__dirname);
function createWindow() {
    // Create the browser window.
    win = new BrowserWindow({ width: 470, height: 626, frame: false });
    win.loadURL("http://localhost:3000/");
    //mainWindow.loadUrl("http://localhost:3000/");
    // and load the index.html of the app.     win.loadFile('index.html')
}
app.on("ready", createWindow);


