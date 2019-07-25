import React from "react";
import { withStyles, createStyles } from "@material-ui/styles";
import UserInfo from "../componants/UserInfo";
import ProgressBar from "../componants/ProgressBar";
import { Typography, Divider, Grid } from "@material-ui/core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHdd } from "@fortawesome/free-solid-svg-icons";

function DriveCheck(props) {
    const classes = props.classes;
    return (
        <div>
            <Typography variant="h5" style={{ marginTop: "40px" }}>
                Checking drives...
            </Typography>
            <Divider style={{ marginTop: "20px" }} variant="middle" />
            <UserInfo email="afrenchrussian@gmail.com" id="1234" />
            <Divider style={{ marginTop: "20px" }} variant="middle" />
            <Grid
                container
                direction="row"
                justify="center"
                alignItems="center"
                className={classes.drive}
            >
                <Grid item>
                    <FontAwesomeIcon icon={faHdd} style={{marginRight: "60px"}} />
                </Grid>
                <Grid item>
                    <ProgressBar width="260px" />
                </Grid>
            </Grid>
        </div>
    );
}

const styles = theme =>
    createStyles({
        title: {
            color: "black",
            marginBottom: "70px"
        },
        drive: {
            fontSize: "30px",
            marginLeft: "10px",
            marginTop: "20px",
        }
    });

export default withStyles(styles)(DriveCheck);
