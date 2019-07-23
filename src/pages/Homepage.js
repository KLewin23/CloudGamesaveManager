import React from "react";
import GoogleButton from "react-google-button";
import {withStyles,createStyles} from '@material-ui/core/styles'
import logo from "../img/logo.svg"
const {ipcRenderer} = window.require('electron');

function signIn(){
    ipcRenderer.send('resize-me-please')
}

function Homepage(props) {
    var classes = props.classes
    return (
        <header className={classes.AppHeader}>
            <p>
                Edit <code>src/App.js</code> and save to reload.
            </p>
            <GoogleButton type="light" onClick={()=>signIn()}/>
        </header>
    );
};
const styles = theme =>
    createStyles({
        AppHeader: {
            backgroundColor: "#20232a",
            minHeight: "100vh",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "calc(10px + 2vmin)",
            color: "white"
        }
});

export default withStyles(styles)(Homepage);
