import React from "react";
import GoogleButton from "react-google-button";
import { withStyles, createStyles } from "@material-ui/core/styles";
import Logo from "../img/logo.svg";
import Typeography from "@material-ui/core/Typography";
import Button from "../componants/Button";
import { GoogleLogin } from 'react-google-login'
import {toggleUserStatus,sendUserEmail,sendLocation} from '../store/actions'
import { connect } from 'react-redux'

const { ipcRenderer } = window.require("electron");

function signIn(props,email,googleId) {
    ipcRenderer.send("find-drives");
    props.toggleUserStatus()
    props.sendUserEmail(email)
    props.sendLocation('Drive Check')
    props.history.push('/driveCheck')
}

function Homepage(props) {
    var classes = props.classes;

    const responseGoogle = (response) => {
        var email = response.w3.U3;
        var googleId = response.googleId;
        signIn(props,email,googleId)
    }

    return (
        <header className={classes.AppHeader}>
            <img src={Logo} alt="xx" className={classes.logo} />
            <Typeography className={classes.title}>
                Cloud Save Manager
            </Typeography>
            <GoogleLogin
                clientId="522213692282-vunu5kbjm3fehg8du5cmltebp8gjrfvt.apps.googleusercontent.com"
                render={renderProps => (
                    <GoogleButton type="light" style={{ alignSelf: "center" }} onClick={renderProps.onClick} disabled={renderProps.disabled}>This is my custom Google button</GoogleButton>
                )}
                buttonText="Login"
                onSuccess={responseGoogle}
                onFailure={""}
                cookiePolicy={"single_host_origin"}
            />
            <Button
                type="contained"
                width="245px"
                height="50px"
                color="white"
                margin="20px auto"
                icon="box"
                justify="flex-start"
                text="Sign in with Box"
                textTrans="initial"
                fontSize="16px"
                textColor="rgba(0, 0, 0, 0.54)"
                click={() => signIn()}
            />
        </header>
    );
}
const styles = theme =>
    createStyles({
        AppHeader: {
            backgroundColor: "white",
            minHeight: "100vh",
            display: "flex",
            flexDirection: "column",
            fontSize: "calc(10px + 2vmin)",
            color: "white"
        },
        logo: {
            marginTop: "70px",
            marginBottom: "50px",
            height: "100px"
        },
        title: {
            color: "black",
            marginBottom: "70px"
        }
    });

const mapStateToProps = state => {
    return {
        app: state.appReducer
    };
};

const mapDispatchToProps = {
    toggleUserStatus,
    sendUserEmail,
    sendLocation
};
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withStyles(styles)(Homepage));
