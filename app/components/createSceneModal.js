import React, { Component } from 'react';

// import Dialog from 'material-ui/Dialog';
// import TextField from 'material-ui/TextField';
// import FlatButton from 'material-ui/FlatButton';
// import RaisedButton from 'material-ui/RaisedButton';

import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import openFolder from '../native/openFolder'
import checkPicValid from '../native/checkPicValid'
import copyFileToTmp from '../native/copyFileToTmp'
import getPathOfPreviewImg from '../native/getPathOfPreviewImg'

import styles from '../styles/createSceneModal.css'

export default class CreateVrModal extends Component {
    constructor() {
        super();
        this.state = {tmpImgReady:false}
        this.previewImg = getPathOfPreviewImg(true)

        this.titleRef = React.createRef();
    }

    onCancelClick() {
        const { onCancel } = this.props;

        onCancel();
    }

    onConfirmClick() {
        const {tmpImgReady} = this.state
        const { onCreate } = this.props;

        const title = this.titleRef.value.trim();

        if (title.length > 0 && tmpImgReady) {
            onCreate(title, tmpImgReady);
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
                open
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

        /*const actions = [
          <FlatButton label="取消" primary onClick={this.onCancelClick.bind(this)} />,
          <FlatButton label="确认" primary onClick={this.onConfirmClick.bind(this)} />
        ];

        return (
            <Dialog title={'创建场景'} open actions={actions}>
                <div style={{display:'inline-block',width:'50%',height:'160px'}}>
                    <TextField fullWidth hintText="请输入场景名称" floatingLabelText="请输入场景名称" ref={(input) => this.titleRef = input} />
                    <br />
                </div>
                <div style={{display:'inline-block',width:'50%',height:'260px',verticalAlign:'top'}}>
                    <RaisedButton label="添加全景" primary={true} style={{marginLeft:'47px'}} onClick={this.onOpenFileClick.bind(this)}/>
                    {this.renderUploadPic()}
                </div>
            </Dialog>
        );*/
    }
}
