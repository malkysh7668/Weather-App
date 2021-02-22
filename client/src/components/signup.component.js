import React, { Component } from "react";
import Login from "./login.component"
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import $ from 'jquery';


export default class SignUp extends Component {
    constructor(props) {
        super(props)
        this.state = {
            dataId: '',
            f_name: '',
            l_name: '',
            email: '',
            pass: ''
        }
        this.save = this.save.bind(this)
        this.saveUser = this.saveUser.bind(this)
        this.set_email = this.set_email.bind(this)
        this.set_f_name = this.set_f_name.bind(this)
        this.set_l_name = this.set_l_name.bind(this)
        this.set_pass = this.set_pass.bind(this)

    }
    set_pass = async (e) => {
        await this.setState({ pass: e.target.value })
        return
    }
    set_f_name = async (e) => {
        await this.setState({ f_name: e.target.value })
        return
    }
    set_l_name = async (e) => {
        await this.setState({ l_name: e.target.value })
        return
    }
    set_email = async (e) => {
        await this.setState({ email: e.target.value })
        return
    }


    saveUser() {
        debugger

        $.ajax({
            url: `http://localhost:5000/newUser`,
            method: "post",
            dataType: "json",
            contentType: "application/json",
            data: JSON.stringify({
                "first_name": this.state.f_name,
                "last_name": this.state.l_name,
                "email": this.state.email,
                "pass": this.state.pass
            }),
            success: function (data) {
                // alert(data)
                console.log(data)

            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                console.log(XMLHttpRequest, " ", textStatus, " ", errorThrown)

            }
        });

        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        const requestOptions = {
            method: 'POST',
            cache: 'no-cache',
            credentials: 'same-origin',
            headers: myHeaders,
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': 'https://javascript.info',
                'mode': 'no-cors'
            },

            redirect: 'follow'

        };

    }
    save = () => {
        try {
            fetch("https://localhost:5000/newUser", {

                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({
                    first_name: "leha",
                    last_name: "pozen",
                    user_name: "lea_p",
                    pass: "222222"
                })
            })
            debugger
        } catch {
            debugger
        }
    }
    render() {
        return (
            <form>
                <h3>Sign Up</h3>

                <div className="form-group">
                    <label>First name</label>
                    <input type="text" className="form-control" placeholder="First name" value={this.state.f_name} onChange={this.set_f_name} />
                </div>

                <div className="form-group">
                    <label>Last name</label>
                    <input type="text" className="form-control" placeholder="Last name" value={this.state.l_name} onChange={this.set_l_name} />
                </div>

                <div className="form-group">
                    <label>Email address</label>
                    <input type="email" className="form-control" placeholder="Enter email" value={this.state.email} onChange={this.set_email} />
                </div>

                <div className="form-group">
                    <label>Password</label>
                    <input type="password" className="form-control" placeholder="Enter password" value={this.state.pass} onChange={this.set_pass} />
                </div>

                <button type="submit" className="btn btn-primary btn-block" onClick={this.saveUser}>Sign Up</button>
                <p className="forgot-password text-right">
                    Already registered <a href={"/sign-in"}>sign in?</a>

                </p>
                <Switch>
                    <Route path="/sign-in" component={Login} />
                </Switch>
            </form>

        );
    }
}