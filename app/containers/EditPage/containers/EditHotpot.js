import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createSelector } from 'reselect'
import { bindActionCreators } from 'redux';
import FlatButton from 'material-ui/FlatButton';

import * as hotpotActions from '../../../actions/hotpot'
import getPathOfSceneHeadImg from '../../../native/getPathOfSceneHeadImg'

class EditHotSpot extends Component{
    constructor(){
        super()
        this.state = {editHotpot:false}
    }

    render(){
        return (
            <div style={{padding:'5px'}}>
                <div style={{
                    borderBottom:'1px solid #eee'
                }}>
                    {this.renderEditTitle()}
                </div>
                <div>
                    {this.renderEditHotPot()}
                </div>
            </div>
        )
    }

    onAddHotpotClick(){
        const {addHotpot} = this.props;
        addHotpot()
        // const {vrId,previewSceneId} = this.state
        // const _id = `hs${new Hashid().encode()}`
        // const ath = this.krpano.get('view.hlookat')
        // const atv = this.krpano.get('view.vlookat')
        // const icon = getPathOfHotSpotIconPath()
        // let data = {
        //     _id,
        //     ath,
        //     atv,
        //     icon,
        //     animated: true,
        //     type: undefined,
        //     typeProps: {},
        //     action:''
        // }
        // addHotspotToKrpano(this.krpano, data, true)
    }

    renderEditTitle(){
        const {editHotpot} = this.state

        if(!editHotpot){
            return (
                <span>
                    <i className='fa fa-dot-circle-o'></i>
                    <span style={{
                        marginLeft:'5px'
                    }}>热点编辑</span> 
                    <FlatButton label="添加热点" primary onClick={this.onAddHotpotClick.bind(this)} />
                </span>
            ) 
        } else {
            return (
                <span>
                    <i className='fa fa-dot-circle-o'></i>
                    <span style={{
                        marginLeft:'5px'
                    }}>编辑</span>
                </span>
            )
        }
    }

    renderEditHotPot(){
        const {editHotpot} = this.state
        const {sceneList,folderId,vrId,sceneSelected} = this.props
        let sceneArr = sceneList.map((item)=>{
            let sceneItemStyle = sceneSelected == item.id ? {
                margin:'5px',height:'100px',width:'80px',display:'inline-block',border:'1px solid #123',overflow:'hidden'
            } : {margin:'5px',height:'100px',width:'80px',display:'inline-block',overflow:'hidden'}

            return <div style={sceneItemStyle} key={item.id}><div style={{height:'80px',width:'80px',overflow:'hidden'}}><img style={{height:'100%'}} src={getPathOfSceneHeadImg(folderId,vrId,item.id)}/></div></div>
        })
        if(editHotpot){
            return (
                <div>
                    <h1>选择一个场景</h1>
                    <div>
                        {sceneArr}
                    </div>
                </div>
            )
        }
    }
}

const selector = createSelector(
    state => state.vr.list,
    state => state.hotpot.list,
    state => state.scene.list,
    state => state.router.location.pathname,
    state => state.scene.sceneSelected,

    (vrList,hotpotList,sceneList,pathname,sceneSelected)=>{
        return {
            vrList : vrList,
            hotpotList : hotpotList,
            sceneList : filterScene(sceneList,pathname,sceneSelected),
            pathname : pathname,
            vrId: pathname.split('/')[2],
            folderId:findFolderId(vrList,pathname),
            sceneSelected:sceneSelected
        }
    }
)

function filterScene(list,pathname,selectedSceneId){
    var vrId = pathname.split('/')[2]
    return list.filter((item)=>{
        return item.vrid == vrId && item.id !== selectedSceneId
    })
}

function mapDispatchToProps(dispatch){
    return {
        ...bindActionCreators(hotpotActions,dispatch)
    }
}

function findFolderId(vrList,pathname){
    var vrId = pathname.split('/')[2]
    let item = vrList.find((item)=>{
        return item.id == vrId
    })
    return item ? item.folderId : -1
}

export default connect(selector,mapDispatchToProps)(EditHotSpot)
