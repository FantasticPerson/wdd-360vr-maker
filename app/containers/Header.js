import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { createSelector } from 'reselect'
import { createHashHistory } from 'history'

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { NavigateBefore } from '@material-ui/icons';

import { getProductionXml } from '../utils/xmlBuilder2'
import { GenerateOutput } from '../utils/generateOutput'
import { getSelector } from '../store/getStore'
import { getPreviewUrl } from '../native/pathUtils'

import packageKrpano from '../native/packageKrpano'
import { updateAppShowType } from '../actions/app'

import { APP_SHOW_TYPE_VR, APP_SHOW_TYPE_PIC, APP_SHOW_TYPE_AUDIO } from '../actions/app'

class Header extends Component {
    constructor() {
        super()
        this.history = createHashHistory()
        this.state = { anchor: null }
    }

    onBackClick() {
        this.history.goBack()
    }

    onOutputClick() {
        const { vrId } = this.props
        packageKrpano(vrId)
    }

    onSaveClick() {
        const { vrItem, sceneList, hotpotList, groupList, allSceneList } = this.props
        GenerateOutput(vrItem, sceneList, hotpotList, groupList, allSceneList)
    }

    onPreviewClick() {
        window.open(getPreviewUrl(this.props.vrId), '预览')
    }

    onMenuClick(e) {
        this.setState({ anchor: e.currentTarget })
    }

    onMenuClose() {
        this.setState({ anchor: null })
    }

    onMenuItemClick(type) {
        if (type !== this.props.showType) {
            this.props.updateAppShowType(type)
        }
        this.onMenuClose()
    }

    render() {
        const { showBack, title } = this.props
        return (
            <AppBar position="static">
                <Toolbar>
                    <IconButton style={{ marginLeft: -12, marginRight: 20 }} color="inherit" aria-label="Menu">
                        {this.renderLeftIcon()}
                    </IconButton>
                    <Typography variant="title" color="inherit" style={{ flex: 1 }}>
                        {title}
                    </Typography>
                    {this.renderBtns()}
                </Toolbar>
            </AppBar>
        )
    }

    renderLeftIcon() {
        if (this.props.showBack) {
            return <NavigateBefore onClick={this.onBackClick.bind(this)} />
        } else {
            const { anchor } = this.state
            return (
                <div>
                    <MenuIcon aria-owns={anchor ? 'simple-menu' : null} aria-haspopup="true" onClick={this.onMenuClick.bind(this)} />
                    <Menu
                        id="simple-menu"
                        anchorEl={anchor}
                        open={Boolean(anchor)}
                        onClose={this.onMenuClose.bind(this)}
                    >
                        <MenuItem onClick={() => { this.onMenuItemClick(APP_SHOW_TYPE_VR) }}>全景库</MenuItem>
                        <MenuItem onClick={() => { this.onMenuItemClick(APP_SHOW_TYPE_PIC) }}>图片库</MenuItem>
                        <MenuItem onClick={() => { this.onMenuItemClick(APP_SHOW_TYPE_AUDIO) }}>音频库</MenuItem>
                    </Menu>
                </div>
            )
        }
    }

    renderBtns() {
        if (this.props.showBack) {
            return <div>
                <Button onClick={this.onSaveClick.bind(this)} style={{ color: '#FFF' }}>
                    保存
                </Button>
                <Button onClick={this.onPreviewClick.bind(this)} style={{ color: '#FFF' }}>
                    预览
                </Button>
                <Button onClick={this.onOutputClick.bind(this)} style={{ color: '#FFF' }}>
                    导出
                </Button>
            </div>
        }
    }
}

function mapDispatchToProps(dispatch) {
    return {
        ...bindActionCreators({ updateAppShowType: updateAppShowType }, dispatch)
    }
}

let headerConfig = {
    title: true,
    showBack: true,
    vrList: true,
    vrId: true,
    vrItem: true,
    folderId: true,
    sceneList: true,
    hotpotList: true,
    groupList: true,
    allSceneList: true,
    appShowType: true
}

export default connect(getSelector(headerConfig), mapDispatchToProps)(Header);
