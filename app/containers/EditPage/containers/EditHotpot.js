import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createSelector } from 'reselect'
import { bindActionCreators } from 'redux';
import FlatButton from 'material-ui/FlatButton';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

import * as hotpotActions from '../../../actions/hotpot'
import getPathOfSceneHeadImg from '../../../native/getPathOfSceneHeadImg'

import UploadPicModal from './UploadPicModal'


class EditHotSpot extends Component{
    constructor(){
        super()
        this.state = {hotSpotType:1,sceneId:null,isAdd:false,showUploadModal:false}
    }

    render(){
        return (
            <div style={{padding:'5px'}}> 
                {this.renderHotpotList()}
                {this.renderEditHotPot()}
                {this.renderUploadModal()}
            </div>
        )
    }

    resetState(){
        this.setState({hotSpotType:1,sceneId:null,isAdd:false})
    }

    onAddHotpotClick(){
        this.setState({isAdd:true,sceneId:null})
    }

    selectHotSpot(id){
        const {updateHotspotSelect} = this.props
        updateHotspotSelect(id)
    }

    handleTypeChange(event, index, value){
        this.setState({hotSpotType:value});
    }

    handleScenClick(id){
        this.setState({sceneId:id})
    }

    handleCloseEditHotspot(){
        const {updateHotspotSelect} = this.props
        this.setState({isAdd:false})
        updateHotspotSelect(null)
    }

    onEditConfirmClick(){
        const {isAdd,sceneId,hotSpotType} = this.state
        if(isAdd){
            if(sceneId != null){
                const {addHotpot} = this.props;
                if(hotSpotType == 1){
                    console.log()
                }
                addHotpot({action:'switch',target:sceneId})
            }
            this.setState({isAdd:false})
        }
    }

    onEditDeleteClick(){
        const {delHotpot,hotpotSelected,updateHotspotSelect} = this.props 
        delHotpot(hotpotSelected)
        updateHotspotSelect(null)
    }

    renderUploadModal(){
        const {showUploadModal} = this.state
        if(showUploadModal){
            return (
                <UploadPicModal></UploadPicModal>
            )
        }
    }

    renderHotpotList(){
        const {isAdd} = this.state
        const {hotpotSelected} = this.props
        if(hotpotSelected == null &&　!isAdd){
            const {hotpotList} = this.props

            let hotpotArr = hotpotList.map((item,i)=>{
                return (
                    <div key={item.id} onClick={()=>{this.selectHotSpot(item.id)}}>
                        {item.id}
                    </div>
                )
            })

            return (
                <div style={{borderBottom:'1px solid #eee'}}>
                    <span>
                        <i className='fa fa-dot-circle-o'></i>
                        <span style={{
                            marginLeft:'5px'
                        }}>热点编辑</span> 
                        <FlatButton label="添加热点" primary onClick={this.onAddHotpotClick.bind(this)} />
                    </span>
                    <div>
                        {`当前场景共有热点${hotpotList.length}个`}
                    </div>
                    <div>
                        {hotpotArr}
                    </div>
                </div>  
            )
        }
    }

    renderEditHotPot(){
        const {isAdd} = this.state
        const {hotpotSelected} = this.props
        if(hotpotSelected != null || isAdd){
            return (
                <div>
                    <div style={{borderBottom:'1px solid #eee'}}>
                        <span>
                            <i className='fa fa-dot-circle-o'></i>
                            <span style={{
                                marginLeft:'5px',
                                marginRight:'85px'
                            }}>编辑</span>
                            <FlatButton onClick={()=>{this.handleCloseEditHotspot()}} label="关闭" primary/>
                        </span>
                    </div>
                    <div>
                        <SelectField style={{width:'200px'}} floatingLabelText="热点类型" value={this.state.hotSpotType} onChange={(event, index, value)=>{this.handleTypeChange(event, index, value)}}
                        >
                            <MenuItem value={1} primaryText="切换" />
                            <MenuItem value={2} primaryText="相册" />
                            <MenuItem value={3} primaryText="文本" />
                            <MenuItem value={4} primaryText="图文" />
                            <MenuItem value={5} primaryText="音频" />
                            <MenuItem value={6} primaryText="视频" />
                        </SelectField>
                        {this.renderSwitchScene()}
                        {this.renderPicList()}
                    </div>
                    <div style={{position:'fixed',bottom:0}}>
                        <FlatButton label="确定" onClick={()=>{
                            this.onEditConfirmClick()
                        }} primary/>
                        {
                            isAdd ? null :
                            <FlatButton label="删除" onClick={()=>{
                                this.onEditDeleteClick()
                            }} secondary/>
                        }
                    </div>
                </div>
            )
        }
    }

    showUploadPic(){
        this.setState({showUploadModal:true})
    }

    renderPicList(){
        const {hotSpotType,sceneId} = this.state
        if(hotSpotType == 2){
            let sceneItemStyle = {margin:'5px',height:'80px',width:'80px',display:'inline-block',overflow:'hidden'}
            let picArr = []
            for(var i=0;i<4;i++){
                picArr.push(<div style={sceneItemStyle}><div style={{height:'80px',width:'80px',overflow:'hidden'}}></div></div>)
            }
            return (
                <div>
                    <h4>相册</h4>
                    <FlatButton style={{float: 'right',marginTop: '-37px'}} label="添加图片" primary onClick={()=>{
                        this.showUploadPic()
                    }} secondary/>
                    <div style={{width:'180px',margin: '0 auto'}}>
                        {picArr}
                    </div>
                </div>
            )
        }
    }

    renderSwitchScene(){
        const {hotSpotType,sceneId} = this.state
        if(hotSpotType == 1){
            const {sceneList,folderId,vrId} = this.props
            let sceneArr = sceneList.map((item)=>{
                let sceneItemStyle = sceneId == item.id ? {
                    margin:'5px',height:'80px',width:'80px',display:'inline-block',border:'3px solid blanchedalmond',overflow:'hidden'
                } : {margin:'5px',height:'80px',width:'80px',display:'inline-block',overflow:'hidden'}

                return <div onClick={()=>{this.handleScenClick(item.id)}} style={sceneItemStyle} key={item.id}><div style={{height:'80px',width:'80px',overflow:'hidden'}}><img style={{height:'100%'}} src={getPathOfSceneHeadImg(folderId,vrId,item.id)}/></div></div>
            })
            return (
                <div>
                    <h4>场景列表</h4>
                    <div style={{width:'180px',margin: '0 auto'}}>
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
    state => state.hotpot.selected,

    (vrList,hotpotList,sceneList,pathname,sceneSelected,hotpotSelected)=>{
        return {
            vrList : vrList,
            hotpotList : filterHotSpot(hotpotList,sceneSelected),
            sceneList : filterScene(sceneList,pathname,sceneSelected),
            pathname : pathname,
            vrId: pathname.split('/')[2],
            folderId:findFolderId(vrList,pathname),
            sceneSelected:sceneSelected,
            hotpotSelected:hotpotSelected
        }
    }
)

function filterHotSpot(list,sceneSelected){
    return list.filter((item)=>{
        return item.sceneId == sceneSelected
    })
}

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
