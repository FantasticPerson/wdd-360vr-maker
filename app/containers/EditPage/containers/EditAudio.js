import React, { Component } from 'react';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';

import UploadAudioModal from './UploadAudioModal'
import CopyAudioTmpToAudio from '../../../native/copyAudioTmpToAudio'
import AudioListModal from './AudioListModal'
import getPathOfAudio from '../../../native/getPathOfAudio'
import ReactAudioPlayer from 'react-audio-player'; 

export default class EditAudio extends Component{
    constructor(){
        super()
        this.state = {url:null,showUploadModal:false,showListModal:false}
        this.titleRef = React.createRef()
    }

    componentDidMount(){
        const {url} = this.props

        this.setState({url:url})
    }

    getResult(){
        const {url} = this.state
        let title = this.titleRef.input.value.trim()
        if(title.length == 0){
            alert('请填写标题')
            return false
        }
        if(!url){
            alert('请选择一个音乐文件')
            return false
        }
        return JSON.stringify({type:'audio',title:title,url:url})
    }

    render(){
        return (
            <div>
                <TextField defaultValue={''} fullWidth hintText="标题" floatingLabelText="标题" ref={(input) => this.titleRef = input} />
                <br />
                <FlatButton label="从音乐库中添加" primary onClick={()=>{
                    this.setState({showListModal:true})
                }}></FlatButton>
                <FlatButton label="添加音乐" style={{position:'absolute',marginLeft:'-10px'}} primary onClick={()=>{
                    this.setState({showUploadModal:true})
                }}></FlatButton>
                {this.renderMusic()}
                {this.renderUploadModal()}
                {this.renderListModal()}
            </div>
        )
    }

    renderMusic(){
        const {url} = this.state
        if(url){
            return (
                <div>{url}</div>
            )
        }
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
                this.setState({url:name})
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
        this.setState({url:name})        
        this.onLocalListCancel()
    }

    renderListModal(){
        if(this.state.showListModal){
            return (
                <AudioListModal onCancel={this.onLocalListCancel.bind(this)} onConfirm={this.onLocalListConfirm.bind(this)}></AudioListModal>
            )
        }
    }
}