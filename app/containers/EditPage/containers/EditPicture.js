import React, { Component } from 'react';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';

import UploadPicModal from './UploadPicModal'
import CopyImageTmpToImage from '../../../native/copyImageTmpToImage'
import PicListModal from './PicListModal'
import getPathOfImage from '../../../native/getPathOfImage'

export default class EditPicture extends Component{
    constructor(){
        super()
        this.state = {list:[],showUploadModal:false,showPicListModal:false}
        this.titleRef = React.createRef()
    }

    componentDidMount(){
        const {action} = this.props
        if(action.length > 0){
            let obj = JSON.parse(action)
            if(obj.type == 'pictures'){
                this.titleRef.input.value = obj.title
                this.setState({list:obj.pics})
            }
        }
    }

    onRemoveClick(item){
        const {list} = this.state
        let index = list.indexOf(item)
        if(index >= 0){
            list.splice(index,1)
            this.setState({list,list})
        }
    }

    getResult(){
        const {list} = this.state
        let title = this.titleRef.input.value.trim()

        if(title.length == 0){
            alert('标题不能为空')
            return false
        } else if(list.length == 0){
            alert('请选择图片')
            return false
        }
        return  JSON.stringify({type:'pictures',pics:list,title:title})
    }

    render(){
        const {list} = this.state
        let sceneItemStyle = {
            margin:'5px',
            height:'80px',
            width:'80px',
            display:'inline-block',
            overflow:'hidden',
            position:'relative'
        }
        let picArr = list.map((item)=>{
            return (
                <div style={sceneItemStyle} key={item}>
                    <i onClick={()=>this.onRemoveClick(item)} className="fa fa-times pictureCloseBtn" aria-hidden="true"></i>
                    <img style={{width:'100%'}} src={getPathOfImage(false,item)}/>
                </div>
            )
        })
        return (
            <div>
                <TextField defaultValue={''} fullWidth hintText="请输入标题" floatingLabelText="标题" ref={(input) => this.titleRef = input} />
                <br />
                <FlatButton style={{float: 'right'}} label="从图片库添加" primary onClick={()=>{
                    this.setState({showPicListModal:true})
                }} secondary/>
                <FlatButton style={{float: 'right'}} label="添加图片" primary onClick={()=>{
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