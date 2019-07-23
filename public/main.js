const {ipcMain, app, BrowserWindow } = require("electron");

require("electron-reload")(__dirname);
function createWindow() {
    // Create the browser window.
    win = new BrowserWindow({
        width: 470,
        height: 626,
        frame: true,
        webPreferences: {
            nodeIntegration: true
        }
    });
    win.loadURL("http://localhost:3000/");
    //mainWindow.loadUrl("http://localhost:3000/");
    // and load the index.html of the app.     win.loadFile('index.html')
}
app.on("ready", createWindow);

ipcMain.on('resize-me-please', (event, arg) => {
    win.setSize(1280,720,1)
    win.center();
})


