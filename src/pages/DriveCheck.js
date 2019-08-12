import React from "react";
import { withStyles, createStyles } from "@material-ui/styles";
import UserInfo from "../componants/UserInfo";
import ProgressBar from "../componants/ProgressBar";
import { Typography, Divider, Grid } from "@material-ui/core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHdd } from "@fortawesome/free-solid-svg-icons";
import {
    saveOS,
    getDrives,
    setLaunchers,
    addDriveCheckMessage
} from "../store/actions";
import { connect } from "react-redux";
import FileScanner from "../scripts/CollectFiles";
const launcherImg = require.context("../img/launchers", true);

class DriveCheck extends React.Component {
    constructor(props) {
        super(props);
        const scanner = new FileScanner();
        const username = scanner.GetUsername();
        scanner
            .GetOs()
            .then(data => props.saveOS(data))
            .then(() => props.getDrives(scanner.ScanDrives()))
            .then(() => scanner.GetOs())
            .then(data => scanner.ScanDriveGameLaunchers(username, data))
            // .then(() =>
            //     props.addDriveCheckMessage({
            //         launcher: "",
            //         message: "Searching for games.."
            //     })
            // )
            .then(() => scanner.GetOs())
            .then(data => scanner.GetFiles(props.app.launchers, data, username))
            //.then(() => scanner.SearchComplete());
    }

    diskManager() {
        var drives = [];
        for (var i in this.props.app.drives) {
            if (
                this.props.app.drives[i].description !=
                "APPLE SSD AP0512M Media"
            ) {
                drives.push({
                    key: i,
                    name: this.props.app.drives[i].description
                });
            }
        }
        return drives.map(x => (
            <Grid
                container
                key={x.key}
                direction="row"
                justify="center"
                alignItems="center"
                className={this.props.classes.drive}
            >
                <Grid item>
                    <FontAwesomeIcon
                        icon={faHdd}
                        style={{ marginRight: "20px" }}
                    />
                    <Typography
                        variant="caption"
                        style={{
                            marginRight: "30px",
                            verticalAlign: "middle"
                        }}
                    >
                        {x.name}
                    </Typography>
                </Grid>
                <Grid item>
                    <ProgressBar width="260px" />
                </Grid>
            </Grid>
        ));
    }

    LauncherManager(classes) {
        var launchers = this.props.app.launchers;
        var messages = this.props.drive.progressMessages;
        return launchers.map(x => (
            <Grid
                container
                direction="row"
                key={x}
                justify="center"
                alignItems="center"
                className={classes.drive}
            >
                <Grid item>
                    <img
                        src={launcherImg("./" + x[0] + ".svg")}
                        className={classes.logo}
                    />
                </Grid>
                <Grid item>
                    <Typography className={classes.message} variant="caption">
                        {messages[x[0]]}
                    </Typography>
                    <ProgressBar width="260px" />
                </Grid>
            </Grid>
        ));
    }

    render() {
        const classes = this.props.classes;
        const Launchers = this.LauncherManager(classes);
        return (
            <div>
                <Typography variant="h5" style={{ marginTop: "40px" }}>
                    Checking drives...
                </Typography>
                <Divider style={{ marginTop: "20px" }} variant="middle" />
                <UserInfo
                    email={this.props.app.email}
                    id={this.props.app.id}
                    os={this.props.app.os}
                    status={this.props.app.launchers.status}
                />
                <Divider style={{ marginTop: "20px" }} variant="middle" />
                {Launchers}
            </div>
        );
    }
}

const styles = theme =>
    createStyles({
        title: {
            color: "black",
            marginBottom: "70px"
        },
        drive: {
            fontSize: "20px",
            marginTop: "20px"
        },
        logo: {
            height: "50px",
            marginRight: "40px"
        },
        message: {
            fontWeight: "bold",
            marginBottom: "6px"
        }
    });

const mapStateToProps = state => {
    return {
        app: state.appReducer,
        drive: state.drivecheckReducer
    };
};

const mapDispatchToProps = {
    saveOS,
    getDrives,
    setLaunchers,
    addDriveCheckMessage
};
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withStyles(styles)(DriveCheck));
