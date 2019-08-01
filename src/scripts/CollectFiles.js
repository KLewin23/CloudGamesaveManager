import React from "react";
import store from "../store";
const { ipcRenderer } = window.require("electron");
const Launchers = require("./Launchers").sysLaunchers;
const setLaunchers = require("../store/actions/appActions").setLaunchers;

export default class FileScanner extends React.Component {
    ScanDrives() {
        var value = ipcRenderer.sendSync("getDrives");
        return value;
    }

    ScanDriveGameLaunchers(username, system) {
        var launchers = Launchers[system];
        if (system === "WIN") {
            var drivesInfo = this.ScanDrives();
            var drives = []
            for (var drive in drivesInfo) {
                var driveLetter = drivesInfo[drive].mountpoints[0].path
                drives.push(driveLetter)
            }
            for (var letter in drives) {
                for (var launcher in launchers) {
                    var path = launchers[launcher].replace("DRIVE", drives[letter])
                    this.CheckLocationExistance(
                        path,
                        launcher
                    )
                }
            }

        } else if (system === "MAC") {
            for (var x in launchers) {
                //console.log(launchers[x].replace("UNAME", username))
                this.CheckLocationExistance(
                    launchers[x].replace("UNAME", username),
                    x
                );
            }
        }
    }

    CheckLocationExistance(path, launcher) {
        var value = ipcRenderer.sendSync("checkLaunchers", path);
        if (value === "exists") {
            store.dispatch(setLaunchers([launcher,path]));
        }
    }

    GetOs() {
        return new Promise((resolve, reject) => {
            ipcRenderer.send("getOs");
            ipcRenderer.on("returnOs", function (even, data) {
                if (data.includes("MACOS")) {
                    resolve("MAC");
                } else if (data.includes("WIN")) {
                    resolve("WIN");
                }
            });
        });
    }

    GetUsername() {
        var value = ipcRenderer.sendSync("getUsername");
        return value;
    }

    GetFiles(launchers, system, username) {
        var games = {}
        for (var launcher in launchers) {
            var path = launchers[launcher][1]
            var value = ipcRenderer.sendSync("getFiles", path);
            for (var i in value) {
                if (value[i].startsWith(".")) {
                    delete value[i];
                }
            }
            games[launchers[launcher][0]] = [value]
        }
        console.log(games)
    }
}
