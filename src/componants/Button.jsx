import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import CloudUploadIcon from "@material-ui/icons/CloudUploadOutlined";
import BoxLogo from "../img/BoxLogo.png";
import 'typeface-roboto';

export default function CustomButton({
    text,
    width,
    height,
    float,
    padding,
    color,
    textColor,
    click,
    type,
    margin,
    icon,
    justify,
    textTrans,
    fontSize,
}) {
    function variant(type) {
        switch (type) {
            case "contained":
                return {
                    type: "contained",
                    label: ""
                };
            case "outlined":
                return {
                    type: "outlined",
                    label: ""
                };
            case "noBackground":
                return {
                    type: "text",
                    label: ""
                };
            default:
                return;
        }
    }
    var buttonIcon;
    if (icon === "upload") {
        buttonIcon = (
            <CloudUploadIcon
                style={{ marginLeft: "10px", marginBottom: "3px" }}
            />
        );
    } else if (icon === "box") {
        buttonIcon = (
            <img
                src={BoxLogo}
                alt="xx"
                style={{ height: "20px", alignContent: "flex-start" ,marginRight: '30px' }}
            />
        );
    }
    const useStyles = makeStyles(theme => ({
        button: {
            margin: theme.spacing(1)
        },
        input: {
            display: "none"
        }
    }));
    return (
        <Button
            onClick={() => click()}
            variant={variant(type).type}
            style={{
                float: float,
                padding: padding,
                color: textColor,
                backgroundColor: color,
                width: width,
                height: height,
                margin: margin,
                justifyContent: justify,
                textTransform: textTrans,
                fontSize: fontSize,
                fontWeight: 'normal'
            }}
            className={useStyles.button}
        >
            {buttonIcon}
            {text}
        </Button>
    );
}
