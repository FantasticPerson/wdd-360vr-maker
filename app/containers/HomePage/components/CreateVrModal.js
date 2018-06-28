import React, { Component } from 'react';

import styles from '../../../styles/CreateVrModal.css'

import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import openFolder from '../../../native/openFolder'
import checkPicValid from '../../../native/checkPicValid'
import copyFileToTmp from '../../../native/copyFileToTmp'
import getPathOfPreviewImg from '../../../native/getPathOfPreviewImg'

import copyImageToScene from '../../../native/copyImageToScene'

import Hashid from '../../../utils/generateHashId'

import {getScenePath,getHeadImgUrl} from '../../../native/pathUtils'

export default class CreateVrModal extends Component {
    constructor() {
        super();
        this.state = {tmpImgReady:false}
        this.previewImg = getPathOfPreviewImg(true)

        this.titleRef = React.createRef();
        this.summaryRef = React.createRef();
    }

    onCancelClick() {
        this.props.functions.onCancel();
    }

    onConfirmClick() {
        const { tmpImgReady } = this.state

        const title = this.titleRef.value.trim();
        const brief = this.summaryRef.value.trim();

        if (title.length > 0) {
            const {data} = this.props
            if(!data){
                if(tmpImgReady){
                    const {addScene,addVr,onCancel} = this.props.functions
        
                    let id = `vr_${new Hashid().encode()}`
                    let sceneId = `scene_${new Hashid().encode()}`

                    let previewImg = getHeadImgUrl(sceneId)
                    

                    addVr({title,brief,headImg:previewImg,music1:null,music2:null,id})
                    addScene({vrid:id,name:title,id:sceneId})
        
                    copyImageToScene(getScenePath(sceneId))
                    .catch((e)=>{
                        console.error(e)
                    })
                } else {
                    alert('请先上传一个场景!')
                }
            } else {
                const {modifyVr} = this.props.functions
                modifyVr({...data,title:title,brief:brief})
            }
            setTimeout(()=>{
                this.props.functions.onCancel()
            },50)
        }
    }

    onOpenFileClick(){
        openFolder()
        .then((res)=>{
            return checkPicValid(res[0])
        })
        .then((res)=>{
            return copyFileToTmp(res.rootPath)
        })
        .then(()=>{
            setTimeout(()=>{
                this.setState({tmpImgReady:true})
            },800)
        })
        .catch((err)=>{
            console.error(err)
        })
    }

    renderUploadPic(){
        const {tmpImgReady} = this.state
        console.log(tmpImgReady)
        if(!tmpImgReady){
            return <div className={styles.imgContainer}>等待上传</div>
        } else {
            return (
                <div className={styles.imgContainer}>
                    <img className={styles.thumb} src={this.previewImg}/>
                </div>
            )
        }
    }

    render() {
        const {data} = this.props;
        let width = data ? '100%' : '50%'
        let picDisplay = data ? 'none' : 'inline-block'
        let title = data ? '编辑作品' : '创建作品'
        let defaultName = data ? data.title : ''
        let defaultBrief = data ? data.brief : ''

        return (
            <Dialog
                open={true}
                onClose={this.onCancelClick.bind(this)}
            >
                <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
                <DialogContent style={{width:'500px'}}>
                    <div style={{display:'inline-block',width:width,height:'160px'}}>
                        <TextField 
                            label="请输入作品名称"
                            placeholder="请输入作品名称"
                            margin="normal"
                            inputRef={(input) => this.titleRef = input}
                            defaultValue={defaultName}
                        />
                        <br />
                        <TextField 
                            label="请输入作品简介"
                            placeholder="请输入作品简介"
                            margin="normal"
                            inputRef={(input) => this.summaryRef = input}
                            defaultValue={defaultBrief}
                            multiline rows={2} rowsMax={4} 
                        />
                    </div>
                    <div style={{display:picDisplay,width:'50%',height:'260px',verticalAlign:'top'}}>
                        <Button color="primary" style={{marginLeft:'47px'}} onClick={this.onOpenFileClick.bind(this)}>{'添加全景'}</Button>
                        {this.renderUploadPic()}
                    </div>
                </DialogContent>
                <DialogActions>
                    <Button onClick={this.onCancelClick.bind(this)}>取消</Button>,
                    <Button onClick={this.onConfirmClick.bind(this)}>确认</Button>
                </DialogActions>
            </Dialog>
        )
    }
}
