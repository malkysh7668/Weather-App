import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Login from "./login.component";
import SignUp from "./signup.component";

export default class newComponent extends React.Component {

    render() {
        return (
            <>
                <div className="auth-wrapper" >
                    <div className="auth-inner" >

                        <Route exact path='/0' component={Login} />
                        <Route path="/0/sign-in" component={Login} />
                        <Route path="/0/sign-up" component={SignUp} />

                    </div>
                </div>
            </>
        )
    }
}