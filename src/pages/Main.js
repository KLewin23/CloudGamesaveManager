import React from "react";
import { withStyles, createStyles } from "@material-ui/styles";
import { Typography } from "@material-ui/core";
import { AppBar, Tabs, Tab, Box } from "@material-ui/core";
import { Phone, Favorite } from "@material-ui/icons";
import Logo from "../img/Logo_v2.png";
import PropTypes from "prop-types";
import {MaterialTable} from 'material-table'

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <Typography
            component="div"
            role="tabpanel"
            hidden={value !== index}
            id={`scrollable-force-tabpanel-${index}`}
            aria-labelledby={`scrollable-force-tab-${index}`}
            {...other}
        >
            <Box p={3}>{children}</Box>
        </Typography>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired
};

function a11yProps(index) {
    return {
        id: `scrollable-force-tab-${index}`,
        "aria-controls": `scrollable-force-tabpanel-${index}`
    };
}

const useStyles = createStyles(theme => ({
    root: {
        flexGrow: 1,
        width: "100%",
        backgroundColor: theme.palette.background.paper
    }
}));

function Main() {
    const [value, setValue] = React.useState(0);
    function handleChange(event, newValue) {
        setValue(newValue);
    }
    return (
        <MaterialTable
            title="Basic Tree Data Preview"
            data={[
                {
                    id: 1,
                    name: "a",
                    surname: "Baran",
                    birthYear: 1987,
                    birthCity: 63,
                    sex: "Male",
                    type: "adult"
                },
                {
                    id: 2,
                    name: "b",
                    surname: "Baran",
                    birthYear: 1987,
                    birthCity: 34,
                    sex: "Female",
                    type: "adult",
                    parentId: 1
                },
                {
                    id: 3,
                    name: "c",
                    surname: "Baran",
                    birthYear: 1987,
                    birthCity: 34,
                    sex: "Female",
                    type: "child",
                    parentId: 1
                },
                {
                    id: 4,
                    name: "d",
                    surname: "Baran",
                    birthYear: 1987,
                    birthCity: 34,
                    sex: "Female",
                    type: "child",
                    parentId: 3
                },
                {
                    id: 5,
                    name: "e",
                    surname: "Baran",
                    birthYear: 1987,
                    birthCity: 34,
                    sex: "Female",
                    type: "child"
                },
                {
                    id: 6,
                    name: "f",
                    surname: "Baran",
                    birthYear: 1987,
                    birthCity: 34,
                    sex: "Female",
                    type: "child",
                    parentId: 5
                }
            ]}
            columns={[
                { title: "Adı", field: "name" },
                { title: "Soyadı", field: "surname" },
                { title: "Cinsiyet", field: "sex" },
                { title: "Tipi", field: "type", removable: false },
                { title: "Doğum Yılı", field: "birthYear", type: "numeric" },
                {
                    title: "Doğum Yeri",
                    field: "birthCity",
                    lookup: { 34: "İstanbul", 63: "Şanlıurfa" }
                }
            ]}
            parentChildData={(row, rows) =>
                rows.find(a => a.id === row.parentId)
            }
            options={{
                selection: true
            }}
        />
    );
}

const styles = theme =>
    createStyles({
        title: {
            color: "black",
            marginBottom: "70px"
        }
    });

export default withStyles(styles)(Main);
