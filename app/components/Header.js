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

    onSaveClick(){
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
                            <FlatButton style={{color: 'rgb(255,255,255)'}} label="保存" onClick={this.onSaveClick.bind(this)}/>
                            <FlatButton style={{color: 'rgb(255,255,255)'}} label="导出" onClick={this.onOutputClick.bind(this)}/>
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
            folderId:findFolderId(vrList,pathname),
            sceneList : filterScene(sceneList,pathname),
            hotpotList : hotpotList
        }
    }

)

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
