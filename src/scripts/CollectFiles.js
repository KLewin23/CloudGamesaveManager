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
        var assessedLaunchers = {status: "Searching", programs:[]};
        store.dispatch(setLaunchers(assessedLaunchers));
        assessedLaunchers.status = "Complete"
        var launchers = Launchers[system];
        if (system === "WIN") {
            const drives = this.ScanDrives();
        } else if (system === "MAC") {
            for (var x in launchers) {
                this.CheckLocationExistance(
                    launchers[x].replace("UNAME", username),
                    x
                ).then(function(y) {
                    if (y[0] === "exists") {
                        assessedLaunchers.programs.push(y[1]);
                    }
                });
            }
        }
        store.dispatch(setLaunchers(assessedLaunchers))
        return assessedLaunchers
    }

    CheckLocationExistance(path,launcher) {
        return new Promise((resolve, reject) => {
            ipcRenderer.send("checkLaunchers", path);
            ipcRenderer.on("return", function(even, data) {
                resolve([data,launcher]);
            });
        });
    }

    GetOs() {
        return new Promise((resolve, reject) => {
            ipcRenderer.send("getOs");
            ipcRenderer.on("returnOs", function(even, data) {
                if (data.includes("MACOS")) {
                    resolve("MAC");
                }
            });
        });
    }

    GetUsername() {
        var value = ipcRenderer.sendSync("getUsername");
        return value;
    }
}
