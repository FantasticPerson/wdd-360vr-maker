import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import FlatButton from '@material-ui/core/Button';

import UploadAudioModal from './UploadAudioModal'
import CopyAudioTmpToAudio from '../../../native/copyAudioTmpToAudio'
import AudioListModal from './AudioListModal'
import getPathOfAudio from '../../../native/getPathOfAudio'
import ReactAudioPlayer from 'react-audio-player';

import * as audioActions from '../../../actions/audio'
import * as vrActions from '../../../actions/vr'
import * as GroupActions from '../../../actions/group'
import * as sceneActions from '../../../actions/scene'

import {editMusicConfig,getSelector} from '../../../store/getStore'

class EditMusic extends Component{
    constructor(){
        super()
        this.state = {url:null,url2:null,showUploadModal:false,showListModal:false,check:true,type:0}
    }

    componentDidMount(){
        const {sceneSelectedItem} = this.props
        if(sceneSelectedItem){
            this.setState({url:sceneSelectedItem.music1,url2:sceneSelectedItem.music2})
        }
    }

    onAddMusicLocal(type){
        this.setState({type:type,showUploadModal:true})
    }

    onAddMusic2(type){
        this.setState({type:type,showListModal:true})
    }

    hideUpload(){
        this.setState({showUploadModal:false})
    }

    onUploadConfirm(path){
        CopyAudioTmpToAudio(path)
        .then(()=>{
            const {addAudio} = this.props
            let arr = path.split('.')
            let picItem = {
                id:arr[0],
                extension:arr[1]
            }
            addAudio(picItem)
            setTimeout(()=>{
                var name = `${arr[0]}.${arr[1]}`
                if(this.state.type == 1){
                    this.setState({url:name})
                } else {
                    this.setState({url2:name})
                }
            },300)         
        })
        this.hideUpload()   
    }

    renderUploadModal(){
        if(this.state.showUploadModal){
            return (
                <UploadAudioModal onCancel={this.hideUpload.bind(this)} onConfirm={this.onUploadConfirm.bind(this)}></UploadAudioModal>
            )
        }
    }

    onLocalListCancel(){
        this.setState({showListModal:false})
    }

    onLocalListConfirm(name){
        if(this.state.type == 1){
            this.setState({url:name})
        } else {
            this.setState({url2:name})
        }        
        this.onLocalListCancel()
    }

    renderListModal(){
        if(this.state.showListModal){
            return (
                <AudioListModal onCancel={this.onLocalListCancel.bind(this)} onConfirm={this.onLocalListConfirm.bind(this)}></AudioListModal>
            )
        }
    }

    onRemoveMusic1(){
        this.setState({url:null})
    }

    renderMusic(){
        const {url} = this.state
        if(url){
            return (
                <div>
                    {url}
                    <FlatButton color="primary" onClick={()=>{this.onRemoveMusic1()}}>删除</FlatButton>
                </div>
            )
        }
    }

    onRemoveMusic2(){
        this.setState({url2:null})
    }

    renderMusic2(){
        const {url2} = this.state
        if(url2){
            return (
                <div>
                    {url2}
                    <FlatButton color="primary" onClick={()=>{this.onRemoveMusic2()}}>删除</FlatButton>
                </div>
            )
        }
    }

    onConfirmClick(){
        const {onfinish,updateSceneMusic,sceneSelectedItem} = this.props
        const {url,url2} = this.state
        if(sceneSelectedItem){
            updateSceneMusic(sceneSelectedItem,url,url2)
            onfinish()
        }
    }

    onAllConfirmClick(){
        const {onfinish,updateAllMusic,sceneList} = this.props
        const {url,url2} = this.state
        if(sceneList.length > 0){
            updateAllMusic(sceneList,url,url2)
            onfinish()
        }
    }

    render(){
        return (
            <div style={{padding:'5px'}}>
                <div style={{
                    borderBottom:'1px solid #eee'
                }}>
                    <span>
                        <i className='fa fa-music'></i>
                        <span style={{
                            marginLeft:'5px'
                        }}>音乐</span> 
                        
                    </span>
                </div>
                <div>
                    <div style={{marginTop:'10px',borderBottom:'1px solid #eee'}}>背景音乐设置</div>
                    <div>
                        <span>选择一首音乐</span>
                        <div>
                            <FlatButton color="primary" onClick={()=>{this.onAddMusicLocal(1)}}>本地添加</FlatButton>
                            <FlatButton color="primary" onClick={()=>{this.onAddMusic2(1)}}>音乐库添加</FlatButton>
                        </div>
                        {this.renderMusic()}
                    </div>
                    
                    <div style={{marginTop:'10px',borderBottom:'1px solid #eee'}}>解说音乐设置</div>
                    <div>
                        <span>选择一首音乐</span>
                        <div>
                            <FlatButton color="primary" onClick={()=>{this.onAddMusicLocal(2)}}>本地添加</FlatButton>
                            <FlatButton color="primary" onClick={()=>{this.onAddMusic2(2)}}>音乐库添加</FlatButton>
                        </div>
                        {this.renderMusic2()}
                    </div>
                </div>
                <FlatButton  color="primary" onClick={this.onConfirmClick.bind(this)}>确定</FlatButton>
                <FlatButton  color="primary" onClick={this.onAllConfirmClick.bind(this)}>应用到全部分组</FlatButton>
                {this.renderUploadModal()}
                {this.renderListModal()}
            </div>
        )
    }
}

function mapDispatchToProps(dispatch){
    return {
        ...bindActionCreators(audioActions,dispatch),
        ...bindActionCreators(vrActions,dispatch),
        ...bindActionCreators(GroupActions,dispatch),
        ...bindActionCreators(sceneActions,dispatch)
    }
}

export default connect(getSelector(editMusicConfig),mapDispatchToProps)(EditMusic)