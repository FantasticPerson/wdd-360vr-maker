import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

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
        const {app} = this.props
        if(app.showBack){
            return (
                <AppBar
                    title={app.title}
                    iconElementLeft={<IconButton onClick={this.onBackClick.bind(this)}><NavigationClose /></IconButton>}
                    iconElementRight={<FlatButton label="导出" onClick={this.onOutputClick.bind(this)}/>}
                />
            );
        } else {
            return (
                <AppBar
                    title={app.title}
                    iconClassNameRight="muidocs-icon-navigation-expand-more"
                />
            )
        }
    }
}

function mapDispatchToProps(dispatch) {
    return {};
}

function mapStateToProps(state) {
    return {
        app: state.app
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);
