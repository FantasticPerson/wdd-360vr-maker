import React, { Component } from 'react';

import TextField from '@material-ui/core/TextField';
import FlatButton from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';

import UploadPicModal from './UploadPicModal'
import CopyImageTmpToImage from '../../../native/copyImageTmpToImage'
import PicListModal from './PicListModal'
import getPathOfImage from '../../../native/getPathOfImage'

export default class EditPicAndText extends Component{
    constructor(){
        super()
        this.state = {list:[],showUploadModal:false,showPicListModal:false,pickedPic:null,check:true,openInNewWindow:true}
        this.title = React.createRef()
        this.summaryRef = React.createRef()
        this.moreInfo = React.createRef()
    }

    componentDidMount(){
        const {action} = this.props
        if(action.length > 0){
            let obj = JSON.parse(action)
            if(obj.type == 'picAndText'){
                this.setState({list:obj.picArr,check:obj.check,openInNewWindow:obj.openInNewWindow})
                this.title.value = obj.title
                this.moreInfo.value = obj.moreInfo
            }
        }
    }

    getResult(){
        const {pickedPic,list,check,openInNewWindow} = this.state
        let item2 = list.find((obj,index)=>{
            return obj.pic == pickedPic
        })
        if(item2){
            item2.text = this.summaryRef.value.trim()
            this.setState({list:list})
        }

        let title = this.title.value.trim()
        let moreInfo = this.moreInfo.value.trim()
        
        if(title.length == 0){
            alert('请填写标题')
            return false
        }

        if(list.length == 0){
            alert('请选择图片')
            return false
        }
        return JSON.stringify({type:'picAndText',title:title,picArr:list,moreInfo,check,openInNewWindow})
    }

    onRemoveClick(item){
        const {list} = this.state
        let index = list.indexOf(item)
        if(index >= 0){
            list.splice(index,1)
            this.setState({list,list})
        }
    }

    onPicClick(item){
        const {pickedPic,list} = this.state
        if(item.pic == pickedPic){
            return
        }
        let item2 = list.find((obj,index)=>{
            return obj.pic == pickedPic
        })
        if(item2){
            item2.text = this.summaryRef.value.trim()
            this.setState({list:list})
        }
        this.summaryRef.value= (item.text || "")
        this.setState({pickedPic:item.pic})
    }

    updateCheck(){
        this.setState({check:!this.state.check})
    }  

    updateCheckNew(){
        this.setState({openInNewWindow:!this.state.openInNewWindow})
    }

    render(){
        const {list} = this.state
        const {pickedPic} = this.state

        let sceneItemStyle = {margin:'5px',height:'80px',width:'80px',display:'inline-block',overflow:'hidden',position:'relative',cursor:'pointer'}

        let picArr = list.map((item)=>{
            let styleObj = sceneItemStyle
            if(pickedPic == item.pic){
                styleObj = {...styleObj,border:"3px solid blanchedalmond"}
            }

            return (
                <div onClick={()=>{this.onPicClick(item)}} style={styleObj} key={item.pic}>
                    <i onClick={()=>this.onRemoveClick(item)} className="fa fa-times pictureCloseBtn" aria-hidden="true"></i>
                    <img style={{width:'100%'}} src={getPathOfImage(false,item.pic)}/>
                </div>
            )
        })
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
                    inputRef={(input) => this.title = input}
                />

                <FlatButton  style={{marginRight:'65px'}} color="secondary" onClick={()=>this.setState({showPicListModal:true})}>{'从图片库添加'}</FlatButton>

                <FlatButton  style={{float: 'right',marginTop: '-37px'}} color="secondary" onClick={()=>this.setState({showUploadModal:true})}>{'添加图片'}</FlatButton>

                <div style={{width:'180px',margin: '0 auto'}}>
                    {picArr}
                </div>
                <h5>文字介绍</h5>

                <TextField 
                    id="with-placeholder"
                    label="文字介绍"
                    placeholder="请输入文字介绍"
                    margin="normal"
                    inputRef={(input) => this.summaryRef = input}
                />

                <FormControlLabel
                    control={
                        <Checkbox
                        checked={this.state.openInNewWindow}
                        onChange={this.updateCheckNew.bind(this)}
                        value="在新窗口中打开"
                        color="primary"
                        />
                    }
                    label="在新窗口中打开"
                />
                
                <TextField 
                    id="with-placeholder"
                    label="更多内容"
                    placeholder="填写网站地址 展示更多内容"
                    margin="normal"
                    fullWidth
                    inputRef={(input) => this.moreInfo = input}
                />

                {this.renderPicListModal()}
                {this.renderUploadModal()}
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
                for(let i=0;i<list.length;i++){
                    if(list[i].pic == name){
                        return
                    }
                }
                list.push({pic:name,text:''})
                this.setState({list:list})
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
        let newArr = []
        if(arr.length > 0){
            for(let i=0;i<arr.length;i++){
                let item = list.find((item)=>{
                    return item.pic == arr[i]
                })
                if(!item){
                    list.push({pic:arr[i],text:''})
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