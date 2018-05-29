import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {createSelector} from 'reselect'

import packageKrpano from '../native/packageKrpano'
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import NavigationClose from 'material-ui/svg-icons/navigation/close';
import FlatButton from 'material-ui/FlatButton';
import { createHashHistory } from 'history'

class Header extends Component {
    constructor(){
        super()
        this.history = createHashHistory()
    }

    onBackClick(){
        console.log(this.history)
        this.history.goBack()
    }

    onOutputClick(){
        packageKrpano()
    }

    render() {
        const {showBack,title} = this.props
        if(showBack){
            return (
                <AppBar
                    title={title}
                    iconElementLeft={<IconButton onClick={this.onBackClick.bind(this)}><NavigationClose /></IconButton>}
                    iconElementRight={<FlatButton label="导出" onClick={this.onOutputClick.bind(this)}/>}
                />
            );
        } else {
            return (
                <AppBar
                    title={title}
                    iconClassNameRight="muidocs-icon-navigation-expand-more"
                />
            )
        }
    }
}

const selector = createSelector(
    state=>state.app.title,
    state=>state.app.showBack,
    (title, showBack) => {
        return {
            title,
            showBack
        }
    }
)

export default connect(selector)(Header);
