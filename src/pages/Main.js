import React from "react";
import { withStyles, createStyles } from "@material-ui/styles";
import {Typography} from "@material-ui/core";

function Main() {
    return(
        <Typography>xd</Typography>
    )
}

const styles = theme =>
    createStyles({
        title: {
            color: "black",
            marginBottom: "70px"
        }
    });

export default withStyles(styles)(Main);
