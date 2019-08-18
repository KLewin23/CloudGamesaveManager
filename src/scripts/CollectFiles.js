import React from "react";
import store from "../store";
import { GameSavePaths as Games } from "./Games";

const { ipcRenderer } = window.require("electron");
const Launchers = require("./Launchers").sysLaunchers;
const setLaunchers = require("../store/actions/appActions").setLaunchers;
const setGamePaths = require("../store/actions/appActions").setGamePaths;
const sendLocation = require("../store/actions/appActions").sendLocation;
const toggleFullscreen = require("../store/actions/appActions").toggleFullscreen;

export class FileScanner extends React.Component {
    ScanDrives() {
        //BUG -- skips spanned volumes
        return ipcRenderer.sendSync("getDrives");
    }

    ScanDriveGameLaunchers(username, app) {
        //Takes in system username and the os, runs a function which checks what launchers they have and adds them to redux
        const launchers = Launchers[app.os];
        if (app.os === "WIN") {
            app.drives.forEach(drive => {
                if (drive.mountpoints[0] !== undefined) {
                    Object.keys(launchers).forEach(launcher => {
                        this.CheckLocationExistence(
                            launchers[launcher].replace(
                                "DRIVE",
                                drive.mountpoints[0].path
                            ),
                            launcher
                        );
                    });
                }
            });
        } else if (app.os === "MAC") {
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
            const gamePaths = installedGames[launcher].reduce(
                (acc, installedGame) => {
                    const game = installedGames[launcher]
                        .toString()
                        .toLowerCase();
                    const GamesSys = Games[system][launcher];
                    if (game in GamesSys) {
                        return {
                            ...acc,
                            [game]: GamesSys[game]
                        };
                    }
                },
                {}
            );
            store.dispatch(setGamePaths(gamePaths));
        });
    }

    SearchComplete() {
        ipcRenderer.send("toggle_maximize");
        store.dispatch(toggleFullscreen())
        store.dispatch(sendLocation('Main'));

    }
}
