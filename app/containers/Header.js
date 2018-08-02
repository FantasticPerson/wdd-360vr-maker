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
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

import { createHashHistory } from 'history'
import { getProductionXml } from '../utils/xmlBuilder2'
import {GenerateOutput} from '../utils/generateOutput'
import {headerConfig,getSelector} from '../store/getStore'

import packageKrpano from '../native/packageKrpano'

import {updateHomeShowType} from '../actions/app'

class Header extends Component {
    constructor(){
        super()
        this.history = createHashHistory()
        this.state={anchor:null}
    }

    onBackClick(){
        this.history.goBack()
    }

    onOutputClick(){
        const {vrId} = this.props
        packageKrpano(vrId)
    }

    onSaveClick(){
        const {vrItem,sceneList,hotpotList,groupList,allSceneList} = this.props
        GenerateOutput(vrItem,sceneList,hotpotList,groupList,allSceneList)
    }

    onPreviewClick(){
        const {vrId} = this.props

        let url = `http://127.0.0.1:${window.electron_app_server_port}/assets/output/vr-${vrId}/index.html`

        window.open(url,'预览')
    }

    onMenuClick(e){
        this.setState({anchor:e.currentTarget})
    }

    onMenuClose(){
        this.setState({anchor:null})
    }

    onMenuItemClick(type){
        if(type !== this.props.showType){
            this.props.updateHomeShowType(type)
        }
        this.onMenuClose()
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
            const {anchor} = this.state
            return (
                <div>
                    <MenuIcon aria-owns={anchor ? 'simple-menu' : null} aria-haspopup="true" onClick={this.onMenuClick.bind(this)}/>
                    <Menu
                        id="simple-menu"
                        anchorEl={anchor}
                        open={Boolean(anchor)}
                        onClose={this.onMenuClose.bind(this)}
                    >
                        <MenuItem onClick={()=>{this.onMenuItemClick(1)}}>全景库</MenuItem>
                        <MenuItem onClick={()=>{this.onMenuItemClick(2)}}>图片库</MenuItem>
                        <MenuItem onClick={()=>{this.onMenuItemClick(3)}}>音频库</MenuItem>
                    </Menu>
                </div>
            )
        }
    }

    renderBtns(){
        if(this.props.showBack){
            return <div>
                <Button onClick={this.onSaveClick.bind(this)} style={{color:'#FFF'}}>
                    Save
                </Button>
                <Button onClick={this.onPreviewClick.bind(this)} style={{color:'#FFF'}}>
                    Preview
                </Button>
                <Button onClick={this.onOutputClick.bind(this)}  style={{color:'#FFF'}}>
                    Export
                </Button>
            </div>
        }
    }
}

function mapDispatchToProps(dispatch){
    return {
        ...bindActionCreators({updateHomeShowType:updateHomeShowType},dispatch)
    }
}

export default connect(getSelector(headerConfig),mapDispatchToProps)(Header);
