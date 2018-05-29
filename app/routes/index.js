import React from 'react';
import { Switch, Route, Redirect } from 'react-router';
import App from '../containers/App';
import HomePage from '../containers/HomePage/index';
import EditPage from '../containers/EditPage/index'

export default () => (
    <App>
        <Switch>
            <Route path="/homePage" component={HomePage} />
            <Route path="/edit/:vrid" component={EditPage} />
            <Redirect from="/" to="/homePage"/>
        </Switch>
    </App>
);
