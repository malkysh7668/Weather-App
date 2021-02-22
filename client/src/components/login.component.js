import React, { Component, useState } from "react";
import { GoogleLogin, Google_Client } from 'react-google-login';
import { refreshTokenSetup } from '../utils/refreshToken';
import '../App.css';
import { connect } from 'react-redux'
import $ from 'jquery';

import actions from '../Store/Redux/actions'

const responseGoogle = (response) => {

    console.log(response);
}

const mapDispatchToProps = (dispatch) => ({
    set_user: (user) => dispatch(actions.setUser(user)),
    set_history_user: (histories) => dispatch(actions.setHistoryUser(histories))
})

export default connect(null, mapDispatchToProps)(class Login extends React.Component {

    constructor(props) {
        super(props)
        this.flag = true;
        this.state = {
            user: {
                firstName: "",
                lastName: "",
                email: "",
                password: ""

            },
            email: "",
            password: "",
            isSignedIn: false,
            isWithGoogle: true
        }
        // props.set_user=props.set_user.bind(this)
        this.submit = this.submit.bind(this)
        this.set_withGoogle = this.set_withGoogle.bind(this)
        // this.history = useHistory();
        this.set_isSignedIn = this.set_isSignedIn.bind(this)
        this.set_email = this.set_email.bind(this)
        this.set_pass = this.set_pass.bind(this)
        this.log = this.log.bind(this)
        this.onFailure = this.onFailure.bind(this)
        this.onSuccess = this.onSuccess.bind(this)
        this.getHistoryForUser = this.getHistoryForUser.bind(this)
        this.func_saveStor = this.func_saveStor.bind(this)
    }
    set_withGoogle = () => {
        
        this.setState({ isWithGoogle: !this.state.isWithGoogle })
    }
    
    async set_email(e) {
        await this.setState({ email: e.target.value })
        return
    }
    async set_pass(e) {
        await this.setState({ password: e.target.value })
        return
    }
    set_isSignedIn = (e) => {
        this.setState({ isSignedIn: !this.state.isSignedIn })
    }
    submit(e) {
        e.preventDefault()
        this.flag = false;
        this.log();
    }
    getHistoryForUser = (userId) => {
        const p = this.props
        debugger
        $.ajax({
            url: `http://localhost:5000/getHistoryForUser/${userId}`,
            method: "get",
            dataType: "json",
            contentType: "application/json",
            success: function (data) {
                // alert(data)
                console.log("data from server"+data)
                debugger
                data.res.map(m=>p.set_history_user(m))
                return data
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                console.log(XMLHttpRequest, " ", textStatus, " ", errorThrown)
            }
        });
    }
    func_saveStor(data) {
        debugger
        let histories = this.getHistoryForUser(data._id)
        this.props.set_user(data)
        debugger
        this.props.set_history_user(histories)
        this.props.history.push("/searchShowCards");

    }
    log(e) {
        var url = ''
        if (this.flag) {
            url = "http://localhost:5000/getUserByEmail/" + e + ""
        }
        else {
            
            url = `http://localhost:5000/getUserLogin/${this.state.email}/${this.state.password}`
        }
        // 
        const p = this.props
        const r = this.getHistoryForUser
        const x = this.props.history


        $.ajax({
            url: url,
            method: "get",
            dataType: "json",
            contentType: "application/json",

            success: function (data) {
                
                console.log(data)
                
                let histories = r(data._id)
                p.set_user(data)
                p.history.push("/searchShowCards");
               
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                console.log(XMLHttpRequest, " ", textStatus, " ", errorThrown)
            }
        });

    }
    onSuccess = (res) => {
        
        this.log(res.profileObj.email)
        console.log('Login Success: currentUser:', res.profileObj);
      
        refreshTokenSetup(res);
    }

    onFailure = (err) => {
        console.log('Login failed: res:', err);
    }
    render() {
        return (
            <>
                <form>
                    <h3>Sign In</h3>

                    <GoogleLogin
                        class="btn_google"
                        clientId="945839483053-hjleld4bkk2l4le2ui563fdt24m5u6bv.apps.googleusercontent.com"
                        buttonText="Login with Google"
                        cookiePolicy={'single_host_origin'}
                        isSignedIn={this.state.isSignedIn}
                        onSuccess={this.onSuccess}
                        onFailure={this.onFailure}
                    />
                    {document.getElementById('googleButton')}
                    <div className="form-group">
                        <label>Email address</label>
                        <input id="_email" type="email" className="form-control" placeholder="Enter email" value={this.state.email} onChange={this.set_email} />
                    </div>

                    <div className="form-group">
                        <label>Password</label>
                        <input id="_pass" type="password" className="form-control" placeholder="Enter password" value={this.state.password} onChange={this.set_pass} />
                    </div>

                    <div className="form-group">
                        <div className="custom-control custom-checkbox">
                            <input type="checkbox" className="custom-control-input" id="customCheck1" onChange={this.set_isSignedIn} />
                            <label className="custom-control-label" htmlFor="customCheck1">Remember me</label>
                        </div>
                    </div>

                    <button type="submit" className="btn btn-primary btn-block" onClick={this.submit}>Submit</button>
                    <p className="forgot-password text-right">
                        Forgot <a href="#">password?</a>
                    </p>
                </form >
             
            </>
        );
    }
});
