import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {createSelector} from 'reselect'

import packageKrpano from '../native/packageKrpano'
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import NavigationClose from 'material-ui/svg-icons/navigation/close';
import FlatButton from '@material-ui/core/Button';
import { createHashHistory } from 'history'
import { getProductionXml } from '../utils/xmlBuilder2'
import {GenerateOutput} from '../utils/generateOutput'

class Header extends Component {
    constructor(){
        super()
        this.history = createHashHistory()
    }

    onBackClick(){
        this.history.goBack()
    }

    onOutputClick(){
        packageKrpano()
    }

    onSaveClick(){
        const {vrItem,sceneList,hotpotList} = this.props
        getProductionXml(vrItem,sceneList,hotpotList)
        GenerateOutput(vrItem,sceneList,hotpotList)
        console.log('onSaveClick')
        
    }

    render() {
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
    }
}

const selector = createSelector(
    state => state.app.title,
    state => state.app.showBack,
    state => state.vr.list,
    state => state.hotpot.list,
    state => state.scene.list,
    state => state.router.location.pathname,

    (title, showBack,vrList,hotpotList,sceneList,pathname) => {
        return {
            title,
            showBack,
            vrList : vrList,
            vrId: pathname.split('/')[2],
            vrItem:findVrItem(vrList,pathname),
            folderId:findFolderId(vrList,pathname),
            sceneList : filterScene(sceneList,pathname),
            hotpotList : hotpotList
        }
    }
)

function findVrItem(vrList,pathname){
    let vrId = pathname.split('/')[2]
    return vrList.find((item)=>{
        return item.id == vrId
    })
}

function filterScene(list,pathname,selectedSceneId){
    var vrId = pathname.split('/')[2]
    return list.filter((item)=>{
        return item.vrid == vrId
    })
}

function findFolderId(vrList,pathname){
    var vrId = pathname.split('/')[2]
    let item = vrList.find((item)=>{
        return item.id == vrId
    })
    return item ? item.folderId : -1
}

export default connect(selector)(Header);
