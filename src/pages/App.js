import React from "react";
import "../css/App.css";
import Homepage from "./Homepage";
import DriveCheck from './DriveCheck';
import { BrowserRouter, Route } from "react-router-dom";
import TopBar from '../componants/topBar'

export default class App extends React.Component {
    render() {
        return (
            <div className="App">
                <TopBar/>
                <BrowserRouter>
                    <Route exact path="/" component={Homepage} />
                    <Route exact path="/driveCheck" component={DriveCheck}/>
                </BrowserRouter>
            </div>
        );
    }
}
