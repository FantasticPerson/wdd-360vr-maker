import React, { Component } from 'react';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';

import UploadAudioModal from './UploadAudioModal'
import CopyAudioTmpToAudio from '../../../native/copyAudioToTmpAudio'
import AudioListModal from './AudioListModal'
import getPathOfAudio from '../../../native/getPathOfAudio'

export default class EditAudio extends Component{
    constructor(){
        super()
        this.state = {url:null,showUploadModal:false,showListModal:false}
    }

    componentDidMount(){
        const url = this.props
        this.setState({url:url})
    }

    render(){
        return (
            <div>
                <TextField defaultValue={''} fullWidth hintText="标题" floatingLabelText="标题" ref={(input) => this.titleRef = input} />
                <br />
                <FlatButton label="从音乐库中添加" primary onClick={()=>{
                    this.setState({showListModal:true})
                }}></FlatButton>
                <FlatButton label="添加音乐" primary onClick={()=>{
                    this.setState({showUploadModal:true})
                }}></FlatButton>
                {this.renderMusic()}
                {this.renderUploadModal()}
                {this.renderListModal()}
            </div>
        )
    }

    renderMusic(){
        const {url} = this.props
        return (
            <div>url</div>
        )
    }

    hideUpload(){
        this.setState({showUploadModal:false})
    }

    onUploadConfirm(path){
        CopyImageTmpToImage(path)
        .then(()=>{
            const {addPicture} = this.props
            let arr = path.split('.')
            let picItem = {
                id:arr[0],
                extension:arr[1]
            }
            addPicture(picItem)
            setTimeout(()=>{
                const {list} = this.state
                var name = `${arr[0]}.${arr[1]}`
                if(list.indexOf(name) <0) {
                    list.push(name)
                    this.setState({list:list})
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

    onLocalListConfirm(arr){
        let list = this.state.list
        if(arr.length > 0){
            for(let i=0;i<arr.length;i++){
                if(list.indexOf(arr[i]) <0 ){
                    list.push(arr[i])
                }
            }
            this.setState({list:list})
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
}