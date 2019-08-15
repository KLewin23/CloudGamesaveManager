import React from "react";
import store from "../store";
import { GameSavePaths as Games } from "./Games";

const { ipcRenderer } = window.require("electron");
const Launchers = require("./Launchers").sysLaunchers;
const setLaunchers = require("../store/actions/appActions").setLaunchers;
const setGamePaths = require("../store/actions/appActions").setGamePaths;
const addDriveCheckMessage = require("../store/actions/driveCheckActions")
    .addDriveCheckMessage;

export class FileScanner extends React.Component {
    ScanDrives() {
        return ipcRenderer.sendSync("getDrives");
    }

    ScanDriveGameLaunchers(username, system) {
        const launchers = Launchers[system];
        if (system === "WIN") {
            const drivesInfo = this.ScanDrives();
            const drives = drivesInfo
                .map(drive => drivesInfo[drive].mountpoints[0].path)
                .forEach(letter =>
                    launchers.forEach(launcher =>
                        this.CheckLocationExistence(
                            launchers[launcher].replace(
                                "DRIVE",
                                drives[letter]
                            ),
                            launcher
                        )
                    )
                );
        } else if (system === "MAC") {
            Object.keys(launchers).forEach(launcher =>
                this.CheckLocationExistence(
                    launchers[launcher].replace("UNAME", username),
                    launcher
                )
            );
        }
    }

    CheckLocationExistence(path, launcher) {
        const value = ipcRenderer.sendSync("checkLaunchers", path);
        console.log("xy")
        if (value === "exists") {
            console.log(launcher)
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
                } else {
                    reject();
                }
            });
        });
    }

    GetUsername() {
        return ipcRenderer.sendSync("getUsername");
    }

    GetFiles(launchers, system, username) {
        const installedGames = launchers.reduce((acc, launcher) => {
            const path = launcher[1].replace("UNAME", username);
            const value = ipcRenderer
                .sendSync("getFiles", path)
                .filter(i => !i.startsWith("."));
            return {
                ...acc,
                [launcher[0]]: [value]
            };
        }, {});
        Object.keys(installedGames).forEach(launcher => {
            const gamePaths = installedGames[launcher].reduce((acc,installedGame) => {
                const game = installedGames[launcher]
                    .toString()
                    .toLowerCase();
                const GamesSys = Games[system][launcher];
                if (game in GamesSys) {
                    return {
                        ...acc,
                        [game]: GamesSys[game]
                    }
                }
            },{})
            store.dispatch(setGamePaths(gamePaths));
        })
    }

    SearchComplete() {
        ipcRenderer.sendSync("main-screen");
    }
}
