import React from "react";
import "../css/App.css";
import Homepage from "./Homepage";
import { BrowserRouter, Route } from "react-router-dom";

export default class App extends React.Component {
    render() {
        return (
            <div className="App">
                <BrowserRouter>
                    <Route exact path="/" component={Homepage} />
                </BrowserRouter>
            </div>
        );
    }
}
