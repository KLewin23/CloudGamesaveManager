const drivelist = require("drivelist");
const { ipcMain, app, BrowserWindow } = require("electron");
const fs = require("fs");
const os_name = require("os-name");
const username = require("os").userInfo().username;

require("electron-reload")(__dirname);

function createWindow() {
    // Create the browser window.
    win = new BrowserWindow({
        width: 470,
        height: 626,
        webPreferences: {
            nodeIntegration: true
        },
        center: true,
        autoHideMenuBar: true,
        //frame: false
    });
    win.loadURL("http://localhost:3000/");
    win.setResizable(false);
    win.webContents.openDevTools();
    // and load the index.html of the app.     win.loadFile('index.html')
}
app.on("ready", createWindow);

ipcMain.on("find-drives", (event, arg) => {
    win.setSize(470, 820, true);
    win.center();
});

ipcMain.on("main-screen", (event, args) => {
    win.setSize(1280, 720, 1);
    win.center();
});

ipcMain.on("reduce", (event, arg) => {
    win.setSize(470, 626, true);
    win.center();
});

ipcMain.on("close-window", (event, arg) => {
    win.close();
});

ipcMain.on("minimize", (event, arg) => {
    win.minimize();
});

ipcMain.on("toggle_maximize", (event, arg) => {
    if (win.isMaximized()) {
        win.unmaximize();
    } else {
        win.maximize();
    }
});

ipcMain.on("fill", (event , arg) => {
    //win.setFullScreen(true)
    win.setResizable(true);
    win.maximize();
})

ipcMain.on("getDrives", (event, arg) => {
    drivelist
        .list()
        .then(result => {
            //event.sender.send("returnDrives", result);
            event.returnValue = result;
        })
        .catch(err => {
            console.log(err);
        });
});

ipcMain.on("getOs", (event, arg) => {
    event.sender.send("returnOs", os_name().toUpperCase());
});

ipcMain.on("checkLaunchers", (event, arg) => {
    if (fs.existsSync(arg)) {
        event.returnValue = ("return", "exists");
    } else {
        event.returnValue = ("return", "not exists");
    }
});

ipcMain.on("getUsername", (event, arg) => {
    event.returnValue = username;
});

ipcMain.on("getFiles", (event, arg) => {
    event.returnValue = fs.readdirSync(arg);
});
