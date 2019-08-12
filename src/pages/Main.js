import React from "react";
import { withStyles, createStyles } from "@material-ui/styles";

function Main() {}

const styles = theme =>
    createStyles({
        title: {
            color: "black",
            marginBottom: "70px"
        }
    });

export default withStyles(styles)(Main);
