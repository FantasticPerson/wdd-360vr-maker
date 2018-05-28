import React, { Component } from 'react';
import Dialog from 'material-ui/Dialog';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
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

        const title = this.titleRef.input.value.trim();

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
        const actions = [
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
        );
    }
}
