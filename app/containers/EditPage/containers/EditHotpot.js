import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createSelector } from 'reselect'
import { bindActionCreators } from 'redux';

import SelectField from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import FlatButton from '@material-ui/core/Button';

import * as hotpotActions from '../../../actions/hotpot'
import * as PicActions from '../../../actions/picture'
import * as AudioActions from '../../../actions/audio'
import getPathOfSceneHeadImg from '../../../native/getPathOfSceneHeadImg'

import UploadPicModal from './UploadPicModal'
import CopyImageTmpToImage from '../../../native/copyImageTmpToImage'
import PicListModal from './PicListModal'
import getPathOfImage from '../../../native/getPathOfImage'

import EditSelectScene from './EditSelectScene'
import EditPicture from './EditPicture'
import EditText from './EditText'
import EditPicAndText from './EditPicAndText'
import EditAudio from './EditAudio'
import EditVideo from './EditVideo'
import EditLink from './EditLink'

import {editHotPotConfig,getSelector} from '../../../store/getStore'

class EditHotSpot extends Component{
    constructor(){
        super()

        this.state = {
            hotSpotType:1,
            isAdd:false,
            showPicList:false,
            picList:[],
            picTextList:[],
            hotpotIndex:1
        }

        this.editEle = React.createRef()
    }

    componentWillReceiveProps(nProp,cProp){
        let nHotSpotItem = nProp.hotpotSelected
        let cHotSpotItem = cProp.hotpotSelected

        if((nHotSpotItem && !cHotSpotItem) || (nHotSpotItem && cHotSpotItem && nHotSpotItem.id != cHotSpotItem.id)){
            this.setState({hotpotIndex:nHotSpotItem.icon})
        }
    }

    resetState(){
        this.setState({hotSpotType:1,isAdd:false})
    }

    onAddHotpotClick(){
        this.setState({isAdd:true})
    }

    selectHotSpot(id){
        const {updateHotspotSelect} = this.props
        updateHotspotSelect(id)
    }

    handleTypeChange(event){
        // type:event.target.value
        this.setState({hotSpotType:event.target.value});
    }

    handleCloseEditHotspot(){
        const {updateHotspotSelect} = this.props
        this.setState({isAdd:false,hotSpotType:1})
        updateHotspotSelect(null)
    }

    onEditConfirmClick(){ 
        let result = this.editEle.getResult()
        if(!result){
            return
        }
        const {sceneSelected} = this.props
        const {hotpotIndex} = this.state
        if(this.state.isAdd){
            if(sceneSelected != null){
                const {addHotpot} = this.props;
                addHotpot(result,hotpotIndex)
            }
        } else {
            const {hotpotSelected,modifyHotpot} = this.props
            if(hotpotSelected){
                if(hotpotSelected.icon != hotpotIndex){
                    modifyHotpot({...hotpotSelected,action:result,icon:hotpotIndex},true)
                } else {
                    modifyHotpot({...hotpotSelected,action:result,icon:hotpotIndex},false)
                }
            }
        }
        this.handleCloseEditHotspot()
    }

    onEditDeleteClick(){
        const {delHotpot,hotpotSelected,updateHotspotSelect} = this.props 
        delHotpot(hotpotSelected)
        this.handleCloseEditHotspot()
    }

    render(){
        return (
            <div style={{padding:'5px'}}> 
                {this.renderHotpotList()}
                {this.renderEditHotPot()}                
            </div>
        )
    }

    renderHotpotList(){
        const {isAdd} = this.state
        const {hotpotSelected,sceneSelected} = this.props
        if(hotpotSelected == null &&　!isAdd){
            const {hotpotList} = this.props

            let hList = hotpotList.filter(item=>{
                return item.sceneId == sceneSelected
            })

            let hotpotArr = hList.map((item,i)=>{
                let type = JSON.parse(item.action).type

                var typeText = ''
                if(type == 'switch'){
                    typeText = "切换"
                } else if(type == 'pictures'){
                    typeText = "相册"
                } else if(type == 'text'){
                    typeText = '文本'
                } else if(type == 'picAndText'){
                    typeText = '图文'
                } else if(type == 'link'){
                    typeText = '链接'
                } else if(type == 'audio'){
                    typeText = '音频'
                } else if(type == 'video'){
                    typeText = "视频"
                }

                let itemStyle = {
                    backgroundColor: 'aliceblue',
                    padding: '5px',
                    border: '1px solid #eee',
                    borderRadius: '5px',
                    marginBottom: '5px',
                    marginTop: '5px',
                    cursor:'pointer'
                }

                return (
                    <div style={itemStyle} key={item.id} onClick={()=>{this.selectHotSpot(item.id)}}>
                        {`${typeText} ${item.id}`}
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
                        <FlatButton color="primary" onClick={this.onAddHotpotClick.bind(this)}>添加热点</FlatButton>
                    </span>
                    <div>
                        {`当前场景共有热点${hList.length}个`}
                    </div>
                    <div>
                        {hotpotArr}
                    </div>
                </div>  
            )
        }
    }


    onHotSpotIconClick(index){
        if(index != this.state.hotpotIndex){
            this.setState({hotpotIndex:index})
        }
    }

    renderHotpotIcon(){
        const krpPath = window.electron_app_krp_assets_path
        const nativeRequire = window.native_require
        const {hotpotSelected} = this.props
        const path = nativeRequire('path')
        const {hotpotIndex} = this.state

        let style = {
            width:'34px',height:'34px',display:'inline-block',border:'2px solid transparent'
        }

        let iconArr = [1,2,3,4,5,6,7,8,9,10,11]
        
        return iconArr.map((item)=>{
            let cStyle = {...style}
            if(hotpotIndex == item){
                cStyle.border = "2px solid #eee"
            }

            let id = String(item).length == 1 ? 0+''+item : String(item)

            let iconPath = path.resolve(krpPath,`./hotspotIcons/new_spotd${id}.png`)

            if(window.NODE_ENV == 'prod'){
                let appRootPath = window.electron_app_root_path
                iconPath = path.resolve(appRootPath,`./app.asar/krp/hotspotIcons/new_spotd${id}.png`)
            }

            return (
                <div key={item} onClick={()=>{this.onHotSpotIconClick(item)}} style={cStyle}>
                    <img style={{width:'30px',height:'30px'}} src={iconPath}/> 
                </div>
            )
        })
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
                                marginLeft:'5px'
                            }}>编辑</span>
                            <FlatButton color="primary" onClick={()=>{this.handleCloseEditHotspot()}} >关闭</FlatButton>
                        </span>
                    </div>
                    <div>
                        <span>选择图标</span>
                        <div>{this.renderHotpotIcon()}</div>
                    </div>
                    <div>
                        <SelectField
                            value={this.state.hotSpotType}
                            onChange={this.handleTypeChange.bind(this)}
                            style={{width:'200px'}}
                        >
                            <MenuItem value={1}>切换</MenuItem>
                            <MenuItem value={2}>相册</MenuItem>
                            <MenuItem value={3}>文本</MenuItem>
                            <MenuItem value={4}>图文</MenuItem>
                            <MenuItem value={5}>链接</MenuItem>
                            <MenuItem value={6}>音频</MenuItem>
                            <MenuItem value={7}>视频</MenuItem>
                        </SelectField>
                        <div style={{position: 'absolute',left: '0',right: '0',bottom: '35px',top: '165px',margin: '5px',padding: '5px',border: '2px solid #eee',borderRadius: '5px',overflowY:'auto'}}>
                            {this.renderEditByType()}
                        </div>
                    </div>
                    <div style={{position:'fixed',bottom:0}}>
                        <FlatButton color="primary" onClick={()=>this.onEditConfirmClick()}>{'确定'}</FlatButton>
                        {
                            isAdd ? null :
                            <FlatButton color="secondary" onClick={()=>this.onEditDeleteClick()}>{'删除'}</FlatButton>
                        }
                    </div>
                </div>
            )
        }
    }

    renderEditByType(){
        const {hotSpotType} = this.state
        const {hotpotSelected,sceneSelected} = this.props
        let action = hotpotSelected ? hotpotSelected.action : ''
        switch(hotSpotType){
            case 1:{
                const {sceneList,folderId,vrId} = this.props            
                return (
                    <EditSelectScene action = {action} ref={(ref)=>{this.editEle = ref}} selectId={null} sceneList={sceneList} folderId={folderId} sceneSelected={sceneSelected} vrId={vrId}></EditSelectScene>
                )
            }break;
            
            case 2:{
                const {addPicture} =  this.props
                return (
                    <EditPicture action={action} ref={(ref)=>{this.editEle = ref}} addPicture={addPicture}></EditPicture>
                )
            }break;

            case 3:{
                return (
                    <EditText action={action} ref={(ref)=>{this.editEle = ref}} ></EditText>
                )
            }break;

            case 4:{
                const {addPicture} = this.props 
                return (
                    <EditPicAndText action={action} ref={(ref)=>{this.editEle = ref}} addPicture={addPicture}></EditPicAndText>
                )
            } break;

            case 5:{
                const {addPicture} = this.props 
                return (
                    <EditLink action={action} ref={(ref)=>{this.editEle = ref}}></EditLink>
                )
            } break;

            case 6:{
                const {addAudio} = this.props
                return (
                    <EditAudio action={action} ref={(ref)=>{this.editEle = ref}} addAudio={addAudio}></EditAudio>
                )
            }break;

            case 7:{
                return (
                    <EditVideo action={action} ref={(ref)=>{this.editEle = ref}}></EditVideo>
                )
            } break;
        }
    }
}

function mapDispatchToProps(dispatch){
    return {
        ...bindActionCreators(hotpotActions,dispatch),
        ...bindActionCreators(PicActions,dispatch),
        ...bindActionCreators(AudioActions,dispatch)
    }
}

export default connect(getSelector(editHotPotConfig),mapDispatchToProps)(EditHotSpot)
