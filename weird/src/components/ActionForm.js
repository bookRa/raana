import React, { Component } from "react";
import subreddits from "../constants/subredidits";
// import "./ActionForm.css"
import GetData from "./GetData";

class ActionForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            subr1: subreddits.subr1,
            subr2: subreddits.subr2,
            chosen_subr1: undefined, //"oil",//
            chosen_subr2: undefined, //"sad",//
            user_correct: 0,
            raana_correct: 0
        }
        this.handleSubrChange = this.handleSubrChange.bind(this)
    }
    handleSubrChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        })
        if (this.state.chosen_subr1 && this.state.chosen_subr2){
            console.log('Hey')
        //    GetData.sendData(this.state.chosen_subr1, this.state.chosen_subr2)
        }
        else {
            console.log('No good')
        }
        console.log(e.target.name, e.target.value)
    }

    render() {
        let { subr1, subr2 } = this.state;

        return (
            <div>
                {/* Select Subreddit */}
                <div className="row">
                    <div className="col-xs-4">
                        <select name='chosen_subr1' onChange={this.handleSubrChange}>
                            <option value="" selected disabled hidden>Subreddit1</option>
                            {subr1.map(x => <option key={"subr_" + x} value={x}>/r/{x}</option>)}
                        </select>    </div>
                    <div className="col-xs-4">
                        <p className=''> Choose your subreddits </p>
                    </div>
                    <div className="col-xs-4">
                        <select name='chosen_subr2' onChange={this.handleSubrChange}>
                            <option value="" selected disabled hidden>Subreddit2</option>
                            {subr2.map(x => <option key={"subr_" + x} value={x}>/r/{x}</option>)}
                        </select>
                    </div>
                </div>
                {/* Post Display */}
                <div className="row">
                    <div className="col-xs-1"></div>
                    <div className="panel panel-primary col-xs-10 ">
                        <div className="panel-heading">Post Title</div>
                        <div className="panel-body">Post Selftext</div>
                    </div>
                    <div className="col-xs-1"></div>
                </div>
                {this.state.chosen_subr1 && this.state.chosen_subr2 ?
                    <div className="row">
                        {/* <div className="col-xs-1"></div> */}
                        <div className="col-xs-4">
                            {/* <button type="button btn-block" className="btn btn-primary btn-lg">{this.state.chosen_subr1}</button> */}
                            <button type="button" className="btn btn-primary btn-lg btn-block">{this.state.chosen_subr1}</button>
                        </div>
                        <div className="col-xs-4">
                            <p className=''> Where did it come from </p>
                        </div>
                        <div className="col-xs-4">
                            <button type="button" className="btn btn-primary btn-lg btn-block">{this.state.chosen_subr2}</button>
                        </div>
                        {/* <div className="col-xs-1"></div> */}
                    </div>
                    : <p> choose two subreddits! </p>
                }
                <div className="row">
                    <p className="col-xs-10">Your correct guesses: {this.state.user_correct}</p>
                    <hr className="col-xs-12" />
                    <p className="col-xs-10">RAANA's correct guesses: {this.state.raana_correct}</p>
                </div>
            </div>
        )
    }
}

export default ActionForm
