import React from 'react';
import { Switch, Route, Redirect } from 'react-router';
import App from '../containers/App';
import HomePage from '../containers/HomePage';
import CounterPage from '../containers/CounterPage';
import EditPage from '../containers/EditPage'

export default () => (
    <App>
        <Switch>
            <Route path="/counter" component={CounterPage} />
            <Route path="/homePage" component={HomePage} />
            <Route path="/edit/:vrid" component={EditPage} />
            <Redirect from="/" to="/homePage"/>
        </Switch>
    </App>
);
