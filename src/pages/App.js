import React from "react";
import "../css/App.css";
import Homepage from "./Homepage";
import DriveCheck from './DriveCheck';
import { BrowserRouter, Route } from "react-router-dom";
import TopBar from '../componants/topBar'
import  FileScanner from '../scripts/CollectFiles'

export default class App extends React.Component {
    render() {
        var scanner = new FileScanner();
        console.log(scanner.GetOs())
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
