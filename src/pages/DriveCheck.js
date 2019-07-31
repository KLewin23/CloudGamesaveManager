import React from "react";
import { withStyles, createStyles } from "@material-ui/styles";
import UserInfo from "../componants/UserInfo";
import ProgressBar from "../componants/ProgressBar";
import { Typography, Divider, Grid } from "@material-ui/core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHdd } from "@fortawesome/free-solid-svg-icons";
import { saveOS, getDrives, setLaunchers } from "../store/actions";
import { connect } from "react-redux";
import FileScanner from "../scripts/CollectFiles";
import steam from "../img/SteamLogo.svg";
import { conditionalExpression } from "@babel/types";
//import origin from "../img/Origin.svg";

class DriveCheck extends React.Component {
    constructor(props) {
        super(props);
        const scanner = new FileScanner();
        const username = scanner.GetUsername();
        scanner.GetOs().then(data => props.saveOS(data));
        props.getDrives(scanner.ScanDrives());
        this.state ={
            programs: scanner.ScanDriveGameLaunchers(username, "MAC")
        }
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
        var programs = this.state.programs.programs
        console.log(programs)
        console.log(programs.length)
        return programs.map(x => (
            <Grid
                container
                direction="row"
                key={x}
                justify="center"
                alignItems="center"
                className={classes.drive}
            >
                <Grid item>
                    <img src={steam} className={classes.logo} />
                    <Typography
                        variant="caption"
                        style={{
                            marginRight: "30px",
                            verticalAlign: "middle"
                        }}
                    />
                </Grid>
                <Grid item>
                    <ProgressBar width="260px" />
                </Grid>
            </Grid>
        ));
    }

    render() {
        //const drives = this.diskManager();
        const classes = this.props.classes;
        const Launchers = this.LauncherManager(classes);
        console.log(Launchers)
        return (
            <div>
                <Typography variant="h5" style={{ marginTop: "40px" }}>
                    Checking drives...
                </Typography>
                <Divider style={{ marginTop: "20px" }} variant="middle" />
                <UserInfo
                    email="afrenchrussian@gmail.com"
                    id="1234"
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
            height: "70px"
        }
    });

const mapStateToProps = state => {
    return {
        app: state.appReducer
    };
};

const mapDispatchToProps = {
    saveOS,
    getDrives,
    setLaunchers
};
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withStyles(styles)(DriveCheck));
