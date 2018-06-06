import React, { Component } from 'react';
import FlatButton from 'material-ui/FlatButton';

import UploadPicModal from './UploadPicModal'
import CopyImageTmpToImage from '../../../native/copyImageTmpToImage'
import PicListModal from './PicListModal'
import getPathOfImage from '../../../native/getPathOfImage'

export default class EditPicture extends Component{
    constructor(){
        super()
        this.state = {list:[],showUploadModal:false,showPicListModal:false}
    }

    componentDidMount(){
        const {list} = this.props
        this.setState({list:list})
    }

    render(){
        const {list} = this.state
        let sceneItemStyle = {
            margin:'5px',
            height:'80px',
            width:'80px',
            display:'inline-block',
            overflow:'hidden'
        }
        let picArr = list.map((item)=>{
            return (
                <div style={sceneItemStyle}>
                    <img style={{width:'100%'}} src={getPathOfImage(false,item)}/>
                </div>
            )
        })
        return (
            <div>
                <h4>相册</h4>
                <FlatButton style={{float: 'right',marginTop: '-37px',marginRight:'65px'}} label="从图片库添加" primary onClick={()=>{
                    this.setState({showPicListModal:true})
                }} secondary/>
                <FlatButton style={{float: 'right',marginTop: '-37px'}} label="添加图片" primary onClick={()=>{
                    this.setState({showUploadModal:true})
                }} secondary/>
                <div style={{width:'180px',margin: '0 auto'}}>
                    {picArr}
                </div>
                {this.renderUploadModal()}
                {this.renderPicListModal()}
            </div>
        ) 
    }

    hideUploadPic(){
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
        this.hideUploadPic()   
    }

    renderUploadModal(){
        if(this.state.showUploadModal){
            return (
                <UploadPicModal onCancel={this.hideUploadPic.bind(this)} onConfirm={this.onUploadConfirm.bind(this)}></UploadPicModal>
            )
        }
    }

    onLocalPicListCancel(){
        this.setState({showPicListModal:false})
    }

    onLocalPicListConfirm(arr){
        let list = this.state.list
        if(arr.length > 0){
            for(let i=0;i<arr.length;i++){
                if(list.indexOf(arr[i]) <0 ){
                    list.push(arr[i])
                }
            }
            this.setState({list:list})
        }
        
        this.onLocalPicListCancel()
    }

    renderPicListModal(){
        if(this.state.showPicListModal){
            return (
                <PicListModal onCancel={this.onLocalPicListCancel.bind(this)} onConfirm={this.onLocalPicListConfirm.bind(this)}></PicListModal>
            )
        }
    }
}