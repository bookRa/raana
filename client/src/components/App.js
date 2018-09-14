import React, { Component } from "react";
import ReactDOM from "react-dom";
// import Navig from "./Nav.js"
// import { Navig }from "./Nav.js"
import subreddits from "../constants/subredidits";
import ActionForm from "./ActionForm";

class App extends Component {
    render() {
        return (
            <div>
                <Navig />
                <ActionForm />
            </div>
        )
    }
}


const Navig = () => {
    return (
        <div className="jumbotron jumbotron-fluid">
            <div className="container">
                <h1 className="display-7">RAANA</h1>
                <p className="lead">A Reddit game for MAANA</p>
            </div>
        </div>
    )
}

export default App;