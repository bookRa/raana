import App from "./components/App.js";
import ReactDOM from "react-dom";
import React from "react";

const wrapper = document.getElementById("create-article-form");
wrapper ? ReactDOM.render(<App />, wrapper): false;