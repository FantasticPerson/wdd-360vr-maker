import React, { Component } from 'react';

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

import {getScenePath,getPreviewPath} from '../../../native/pathUtils'

import Hashid from '../../../utils/generateHashId'

import styles from '../../../styles/createSceneModal.css'

export default class CreateVrModal extends Component {
    constructor() {
        super();
        this.state = {tmpImgReady:false}
        this.previewImg = getPreviewPath(true)

        this.titleRef = React.createRef();
    }

    onCancelClick() {
        const { onCancel } = this.props.functions;

        onCancel();
    }

    onConfirmClick() {
        const {tmpImgReady} = this.state
        const { onCancel,addScene } = this.props.functions;

        const title = this.titleRef.value.trim();

        if (title.length > 0 && tmpImgReady) {
            let sceneId = `scene_${new Hashid().encode()}`
            const {vrId} = this.props
            const {onCancel,addScene} = this.props.functions
            
            copyImageToScene(getScenePath(sceneId))
            .then(()=>{
                setTimeout(()=>{
                    addScene({
                        id:sceneId,
                        vrid:vrId,
                        name:name
                    })
                },20) 
            })
            .catch((e)=>{
                console.error(e)
            })
        
            onCancel()
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
            },300)
        })
        .catch((err)=>{
            console.error(err)
        })
    }

    renderUploadPic(){
        const {tmpImgReady} = this.state
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
        return (
            <Dialog
                open={true}
                onClose={this.onCancelClick.bind(this)}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{"创建场景"}</DialogTitle>
                <DialogContent>
                    <div style={{display:'inline-block',width:'50%',height:'160px'}}>
                        <TextField
                            id="with-placeholder"
                            label="With placeholder"
                            placeholder="Placeholder"
                            margin="normal"
                            inputRef={(input) => this.titleRef = input}
                        />
                        <br />
                    </div>
                    <div style={{display:'inline-block',width:'50%',height:'260px',verticalAlign:'top'}}>
                        <Button  variant="contained" color="primary"style={{marginLeft:'47px'}} onClick={this.onOpenFileClick.bind(this)}>{'添加全景'}</Button>
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
