import React, { Component } from 'react';

import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import styles from '../../../styles/createSceneModal.css'
import openImage from '../../../native/openImage'
import CopyImageToImageTmp from '../../../native/copyImageToImageTmp'
import getPathOfImage from '../../../native/getPathOfImage'

class UploadPicModal extends Component{
    constructor(){
        super()
        this.state = {tmpImgReady:false,previewImg:null,imageName:null}
    }
    renderUploadPic(){
        const {imageName} = this.state
        if(!imageName){
            return <div className={styles.imgContainer}>等待上传</div>
        } else {
            let imgUrl = getPathOfImage(true,imageName)
            return (
                <div className={styles.imgContainer}>
                    <img className={styles.thumb} src={imgUrl}/>
                </div>
            )
        }
    }

    onUploadClick(){
        openImage()
        .then(res=>{
            if(res && res[0]){
                let path = res[0]
                return CopyImageToImageTmp(path)
            }
        })
        .then((name)=>{
            console.log(name)
            setTimeout(()=>{
                this.setState({imageName:name})
            },300)
        })
        .catch(err=>{
            console.log(err)
        })
    }

    onConfirmClick(){
        const {imageName} = this.state
        const {onConfirm,onCancel} = this.props;
        if(!imageName){
            onCancel()
        } else {
            onConfirm(imageName)
        }
    }

    render(){
        const {onConfirm,onCancel} = this.props;
        return (
            <Dialog
                open
                onClose={()=>{onCancel()}}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{'添加图片'}</DialogTitle>
                <DialogContent style={{width:'500px'}}>
                    <div style={{display:'inline-block',width:'100%',height:'260px',verticalAlign:'top'}}>
                        <Button  style={{marginLeft:'47px'}} color="primary" onClick={this.onUploadClick.bind(this)}>添加图片</Button>
                        {this.renderUploadPic()}
                    </div>
                </DialogContent>
                <DialogActions>
                    <Button onClick={()=>{onCancel()}}>取消</Button>,
                    <Button onClick={this.onConfirmClick.bind(this)}>确认</Button>
                </DialogActions>
            </Dialog>
        )
    }
}

export default UploadPicModal