const { ipcRenderer } = window.require("electron");
const os = require('os')
 
export default class FileScanner {
    
    ScanDrives() {
        return ipcRenderer.sendSync("getDrives");
    }

    ScanDriveGameLaunchers(){
        ipcRenderer.send("checkLaunchers")
        ipcRenderer.on('return', function(even,data){
            console.log(data)
        })
    }

    GetOs(){
        ipcRenderer.send("getOs")
        ipcRenderer.on('returnOs' ,function(even,data){
            console.log(data)
        })
    }
    
}
