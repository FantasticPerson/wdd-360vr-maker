import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {createSelector} from 'reselect'

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import {NavigateBefore} from '@material-ui/icons';

import { createHashHistory } from 'history'
import { getProductionXml } from '../utils/xmlBuilder2'
import {GenerateOutput} from '../utils/generateOutput'
import {headerConfig,getSelector} from '../store/getStore'

class Header extends Component {
    constructor(){
        super()
        this.history = createHashHistory()
    }

    onBackClick(){
        console.log(this.history)
        this.history.goBack()
    }

    // onOutputClick(){
    //     packageKrpano()
    // }

    onSaveClick(){
        const {vrItem,sceneList,hotpotList} = this.props
        // getProductionXml(vrItem,sceneList,hotpotList)
        GenerateOutput(vrItem,sceneList,hotpotList)
        console.log('onSaveClick')
        
    }

    render(){
        const {showBack,title} = this.props
        return (
            <AppBar position="static">
                <Toolbar>
                    <IconButton style={{marginLeft: -12,marginRight: 20}} color="inherit" aria-label="Menu">
                        {this.renderLeftIcon()}
                    </IconButton>
                    <Typography variant="title" color="inherit" style={{flex: 1}}>
                        {title}
                    </Typography>
                    {this.renderBtns()}
                </Toolbar>
            </AppBar>
        )
    }

    renderLeftIcon(){
        if(this.props.showBack){
            return <NavigateBefore onClick={this.onBackClick.bind(this)}/>
        } else {
            return <MenuIcon />
        }
    }

    renderBtns(){
        if(this.props.showBack){
            return <div>
                <Button onClick={this.onSaveClick.bind(this)} style={{color:'#FFF'}}>
                    Save
                </Button>
                <Button style={{color:'#FFF'}}>
                    Export
                </Button>
            </div>
        }
    }

    /*render2() {
        const {showBack,title} = this.props
        if(showBack){
            return (
                <AppBar
                    title={title}
                    iconElementLeft={
                        <div>
                            <IconButton onClick={this.onBackClick.bind(this)}><NavigationClose /></IconButton>
                        </div>}
                    iconElementRight={
                        <div style={{marginTop:'8px'}}>
                            <FlatButton color="primary" style={{color: 'rgb(255,255,255)',fontSize:'15px'}} label="保存" onClick={this.onSaveClick.bind(this)}>保存</FlatButton>
                            <FlatButton color="primary" style={{color: 'rgb(255,255,255)',fontSize:'15px'}} label="导出" onClick={this.onOutputClick.bind(this)}>导出</FlatButton>
                        </div>
                    }
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
    }*/
}

export default connect(getSelector(headerConfig))(Header);
