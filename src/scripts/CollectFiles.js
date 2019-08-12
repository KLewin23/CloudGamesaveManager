import React from "react";
import store from "../store";
import { GameSavePaths as Games } from "./Games";
const { ipcRenderer } = window.require("electron");
const Launchers = require("./Launchers").sysLaunchers;
const setLaunchers = require("../store/actions/appActions").setLaunchers;
const setGamePaths = require("../store/actions/appActions").setGamePaths;
const addDriveCheckMessage = require('../store/actions/driveCheckActions').addDriveCheckMessage;

export default class FileScanner extends React.Component {
    ScanDrives() {
        var value = ipcRenderer.sendSync("getDrives");
        return value;
    }

    ScanDriveGameLaunchers(username, system) {
        var launchers = Launchers[system];
        if (system === "WIN") {
            var drivesInfo = this.ScanDrives();
            var drives = [];
            for (var drive in drivesInfo) {
                var driveLetter = drivesInfo[drive].mountpoints[0].path;
                drives.push(driveLetter);
            }
            for (var letter in drives) {
                for (var launcher in launchers) {
                    var path = launchers[launcher].replace(
                        "DRIVE",
                        drives[letter]
                    );
                    this.CheckLocationExistance(path, launcher);
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
            store.dispatch(setLaunchers([launcher, path]));
        }
    }

    GetOs() {
        return new Promise((resolve, reject) => {
            ipcRenderer.send("getOs");
            ipcRenderer.on("returnOs", function(even, data) {
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
        var gamePaths = {};
        var installedGames = {};
        for (var launcher in launchers) {
            var path = launchers[launcher][1].replace('UNAME',username);
            var value = ipcRenderer.sendSync("getFiles", path);
            for (var i in value) {
                if (value[i].startsWith(".")) {
                    value.splice(value[i], 1);
                }
            }
            installedGames[launchers[launcher][0]] = [value];
            // if(value.length === 0){
            //     store.dispatch(addDriveCheckMessage({launcher:launchers[launcher][0],message: "Found 0 games"}))
            // } else if(value.length === 1){
            //     store.dispatch(addDriveCheckMessage({launcher:launchers[launcher][0],message: "Found " + value.length + " game"}))
            // } else{
            //     store.dispatch(addDriveCheckMessage({launcher:launchers[launcher][0],message: "Found " + value.length + " games"}))
            // }
        }
        for (var launcher in installedGames) {
            var launcherGames = installedGames[launcher];

            for (var installedGame in launcherGames) {
                var game = launcherGames[installedGame]
                    .toString()
                    .toLowerCase();
                var GamesSys = Games[system][launcher];
                if (game in GamesSys) {
                    gamePaths[game] = GamesSys[game];
                }
            }
            store.dispatch(setGamePaths(gamePaths));
        }
    }

    SearchComplete(){
        //ipcRenderer.sendSync("main-screen");
    }
}
