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
import { FileScanner, sleep } from "../scripts";
const launcherImg = require.context("../img/launchers", true);

class DriveCheck extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            components: "",
            stage: ""
        };
        const scanner = new FileScanner();
        const username = scanner.GetUsername();
        scanner
            .GetOs()
            .then(data => {
                props.saveOS(data);
            })
            .then(() => {
                props.getDrives(scanner.ScanDrives());
                this.setState({ components: this.diskManager() });
            })
            .then(() => sleep(2000))
            .then(() => {
                this.setState({ components: "" });
                scanner.ScanDriveGameLaunchers(username, this.props.app);
                this.setState({ components: this.LauncherManager() });
            })
            .then(() => sleep(2000))
            .then(() => {
                this.setState({ stage: "complete" });
                scanner.GetFiles(
                    props.app.launchers,
                    this.props.app.os,
                    username
                );
                scanner.SearchComplete();
            })
            .then(()=>props.history.push('/main'))
    }

    diskManager() {
        const drives = this.props.app.drives
            .filter(drive => drive.description !== "APPLE SSD AP0512M Media")
            .map(drive => ({
                key: drive,
                name: drive.description
            }));

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
                        {`Drive ${x.name}  - Found`}
                    </Typography>
                </Grid>
            </Grid>
        ));
    }

    LauncherManager() {
        const launchers = this.props.app.launchers;
        const classes = this.props.classes;
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
                    <Typography className={classes.message} variant="caption" style={{textTransform: "capitalize"}}>
                        {`${x[0]} found`}
                    </Typography>
                </Grid>
            </Grid>
        ));
    }

    render() {
        const stage = this.state.components;
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
                {stage}
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
        drive: state.driveCheckReducer
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
