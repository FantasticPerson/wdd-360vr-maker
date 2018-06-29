import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';
import { Switch, Route,Redirect } from 'react-router';

import HomePage from './HomePage/index';
import Header from './Header'
import EditPage from './EditPage/index'


export default class Root extends Component<Props> {
  render() {
    let style = {position: 'fixed',top:'64px',bottom: 0,left: 0,right: 0}
    return (
      <Provider store={this.props.store}>
        <ConnectedRouter history={this.props.history}>
          <div>
            <Header></Header>
            <div style={style}>
              <Switch>
                <Route path="/homePage" component={HomePage} />
                <Route path="/edit/:vrid" component={EditPage} />
                <Redirect from="/" to="/homePage"/>
              </Switch>
            </div>
          </div>
        </ConnectedRouter>
      </Provider>
    );
  }
}
