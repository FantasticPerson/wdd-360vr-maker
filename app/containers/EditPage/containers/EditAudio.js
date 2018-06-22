import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import Checkbox from '@material-ui/core/Checkbox';
import FlatButton from '@material-ui/core/Button';
import FormControlLabel from '@material-ui/core/FormControlLabel';

import UploadAudioModal from './UploadAudioModal'
import CopyAudioTmpToAudio from '../../../native/copyAudioTmpToAudio'
import AudioListModal from './AudioListModal'
import getPathOfAudio from '../../../native/getPathOfAudio'
import ReactAudioPlayer from 'react-audio-player'; 

export default class EditAudio extends Component{
    constructor(){
        super()
        this.state = {url:null,showUploadModal:false,showListModal:false,check:true}
        this.titleRef = React.createRef()
    }

    componentDidMount(){
        const {action} = this.props
        if(action.length > 0){
            let obj = JSON.parse(action)
            if(obj.type == 'audio'){
                this.setState({url:obj.url,check:obj.check})
                this.titleRef.value = obj.title
            }
        }
    }

    getResult(){
        const {url,check} = this.state
        let title = this.titleRef.value.trim()
        if(title.length == 0){
            alert('请填写标题')
            return false
        }
        if(!url){
            alert('请选择一个音乐文件')
            return false
        }
        return JSON.stringify({type:'audio',title:title,url:url,check})
    }

    updateCheck(){
        this.setState({check:!this.state.check})
    }  

    render(){
        return (
            <div>
                <FormControlLabel
                    control={
                        <Checkbox
                        checked={this.state.check}
                        onChange={this.updateCheck.bind(this)}
                        value="在新窗口中打开"
                        color="primary"
                        />
                    }
                    label="在全景中显示"
                />
                <TextField 
                    id="with-placeholder"
                    label="标题"
                    placeholder="标题"
                    margin="normal"
                    inputRef={(input) => this.titleRef = input}
                />

                <br />
                <FlatButton color="primary" onClick={()=>this.setState({showListModal:true})}>{'从音乐库中添加'}</FlatButton>

                <FlatButton color="primary" style={{position:'absolute',marginLeft:'-10px'}} onClick={()=>this.setState({showUploadModal:true})}>{'添加音乐'}</FlatButton>

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