import React, { Component } from "react";
import subreddits from "../constants/subredidits";
// import "./ActionForm.css"
import { sendData } from "./GetData";

class ActionForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            subr0: subreddits.subr0,//["futurology"],//
            subr1: subreddits.subr1,//["askscience"],//
            chosen_subr0: undefined, //"futurology",//
            chosen_subr1: undefined, //"askscience",//
            user_correct: 0,
            raana_correct: 0,
            posts: [],
            currPost: undefined,
            prev_u_pred: undefined,
            prev_r_pred: undefined
        }
        this.handleSubrChange = this.handleSubrChange.bind(this)
        this.requestSubrs = this.requestSubrs.bind(this)
        this.nextPost = this.nextPost.bind(this)
        this.predict = this.predict.bind(this)
    }
    predict(choice){
        let userScore= this.state.user_correct
        let raanaScore= this.state.raana_correct
        let currPost= this.state.currPost;
        let trueSubr = currPost.subreddit;
        let raanaChoice= currPost.raana_pred;
        if (choice.toLowerCase() == trueSubr){
            userScore+=1
            console.log('correct!', userScore)
        } else{
            console.log('nope', userScore)
        }
        if (raanaChoice == trueSubr){
            raanaScore+=1
            console.log('Raana Guessed right!', raanaScore)
        } else{
            console.log('Raana was wrong', raanaScore)
        }
        this.setState({
            user_correct: userScore,
            raana_correct: raanaScore
        })
        this.nextPost()
    }
    nextPost() {
        let currPosts = this.state.posts;
        console.log(currPosts.length)
        let randInd = Math.floor(Math.random() * currPosts.length);
        let nextPost = currPosts[randInd];
        // console.log('newPosts ', nextPost)
        currPosts.splice(randInd, 1);
        this.setState({
            posts: currPosts,
            currPost: nextPost
        })//, () => console.log("posts updated"))
    }

    requestSubrs(e) {
        // sendData('futurology', 'askscience')
        // .then(res=>console.log(res))
        // return true

        if (this.state.chosen_subr0 && this.state.chosen_subr1) {
            // console.log('Hey')

            sendData(this.state.chosen_subr0, this.state.chosen_subr1)
                .then(res => {
                    // console.log(res.data)
                    // console.log(JSON.parse(res.data))
                    let obj= res.data
                    // console.log(obj)
                    let arr = [];
                    Object.keys(obj).forEach(k => {
                        // //   console.log(k)
                          Object.keys(obj[k]).forEach(v => {
                        //     console.log(v)
                            (arr[v] = (arr[v] || {id: v}))[k]=obj[k][v]
                        //     (res[v] = (res[v] || { id: v }))[k] = obj[k][v];
                          });
                        });
                        
                        // console.log(arr);

                    this.setState({
                        posts: arr // JSON.parse(res.data)//JSON.parse(res.data)
                    }, () => {console.log("set the posts state"); this.nextPost() }) //console.log(res.data))//
                })
            
        }
        else {
            console.log('No good') //Replace with Error message
        }
    }

    handleSubrChange(e) {
        // console.log(e.target)
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    render() {
        let { subr0, subr1 } = this.state;

        return (
            <div>
                {/* Select Subreddit */}
                <div className="row">
                    <div className="col-xs-4">
                        <select name='chosen_subr0' defaultValue="default" onChange={this.handleSubrChange}>
                            <option value="default" disabled hidden>Subreddit1</option>
                            {subr0.map(x => <option key={"subr_" + x} value={x}>/r/{x}</option>)}
                        </select>    </div>
                    <div className="col-xs-4">
                        <p className=''> Choose your subreddits and</p>
                        <button className="btn btn-warning" onClick={this.requestSubrs}>Test RAANA</button>
                    </div>
                    <div className="col-xs-4">
                        <select name='chosen_subr1' defaultValue="default" onChange={this.handleSubrChange}>
                            <option value="default" disabled hidden>Subreddit2</option>
                            {subr1.map(x => <option key={"subr_" + x} value={x}>/r/{x}</option>)}
                        </select>
                    </div>
                </div>
                {/* Post Display */}
                <div className="row">
                    <div className="col-xs-1"></div>
                    {this.state.currPost ?
                        <div className="panel panel-primary col-xs-10 ">
                            <div className="panel-heading">{this.state.currPost.title || "Choose a Subreddit"}</div>
                            <div className="panel-body"><a
                                className="btn btn-warning btn-lg btn-block"
                                href={"https://reddit.com/" + this.state.currPost.permalink}>
                                Permalink</a></div>
                        </div>
                        :
                        <div className="panel panel-primary col-xs-10 ">
                            <div className="panel-heading">{"Choose a Subreddit"}</div>
                            <div className="panel-body"><p>DUNNO?!</p></div>
                        </div>
                    }
                    <div className="col-xs-1"></div>
                </div>
                {this.state.chosen_subr0 && this.state.chosen_subr1 ?
                    <div className="row">
                        {/* <div className="col-xs-1"></div> */}
                        <div className="col-xs-4">
                            {/* <button type="button btn-block" className="btn btn-primary btn-lg">{this.state.chosen_subr0}</button> */}
                            <button type="button" onClick={()=> this.predict(this.state.chosen_subr0)}className="btn btn-primary btn-lg btn-block">{this.state.chosen_subr0}</button>
                        </div>
                        <div className="col-xs-4">
                            <p className=''> Where did it come from? </p>
                        </div>
                        <div className="col-xs-4">
                            <button type="button" onClick={()=> this.predict(this.state.chosen_subr1)}className="btn btn-primary btn-lg btn-block">{this.state.chosen_subr1}</button>
                        </div>
                        {/* <div className="col-xs-1"></div> */}
                    </div>
                    : <p> choose two subreddits! </p>
                }
                <div className="row">
                    <p className="col-xs-10">Your correct guesses: {this.state.user_correct}</p>
                    <p className="col-xs-10">RAANA's correct guesses: {this.state.raana_correct}</p>
                </div>
            </div>
        )
    }
}

export default ActionForm
