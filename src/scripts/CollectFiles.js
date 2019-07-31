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
            const drives = this.ScanDrives();
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
            store.dispatch(setLaunchers(launcher));
        }
    }

    GetOs() {
        return new Promise((resolve, reject) => {
            ipcRenderer.send("getOs");
            ipcRenderer.on("returnOs", function(even, data) {
                if (data.includes("MACOS")) {
                    resolve("MAC");
                } else if (data.include("WIN")) {
                    resolve("WIN");
                }
            });
        });
    }

    GetUsername() {
        var value = ipcRenderer.sendSync("getUsername");
        return value;
    }

    GetFiles(launchers,system,username) {
        var games = {}
        
        for (var launcher in launchers) {
            var path = Launchers[system][launchers[launcher]]

            var value = ipcRenderer.sendSync("getFiles", path.replace("UNAME", username));
            for (var i in value) {
                if (value[i].startsWith(".")) {
                    delete value[i];
                }
            }
            games[launchers[launcher]] = [value]
        }
        console.log(games);
    }
}
