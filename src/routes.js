import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Switch, Redirect, withRouter} from 'react-router-dom';
import user from './pages/user';


class RoutesRoot extends Component {
    render() {
        return (
            <div>
            <Router>
                <Switch>
                    <Route exact path="/" component={user}/>
                </Switch>
            </Router>
             </div>
        );
    }
}

export default RoutesRoot;

