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

import openFolder from '../../../native/openFolder'
import checkPicValid from '../../../native/checkPicValid'
import copyFileToTmp from '../../../native/copyFileToTmp'
import getPathOfPreviewImg from '../../../native/getPathOfPreviewImg'

import styles from '../../../styles/CreateVrModal.css'

export default class CreateVrModal extends Component {
    constructor() {
        super();
        this.state = {tmpImgReady:false}
        this.previewImg = getPathOfPreviewImg(true)

        this.titleRef = React.createRef();
        this.summaryRef = React.createRef();
    }

    onCancelClick() {
        const { onCancel } = this.props;

        onCancel();
    }

    onConfirmClick() {
        const {tmpImgReady} = this.state
        const { onCreate } = this.props;

        const title = this.titleRef.value.trim();
        const brief = this.summaryRef.value.trim();

        if (title.length > 0) {
            onCreate(title, brief,tmpImgReady);
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
        const {itemData} = this.props;
        let width = itemData ? '100%' : '50%'
        let picDisplay = itemData ? 'none' : 'inline-block'
        let title = itemData ? '编辑作品' : '创建作品'
        let defaultName = itemData ? itemData.title : ''
        let defaultBrief = itemData ? itemData.brief : ''

        return (
            <Dialog
                open={this.props.show}
                onClose={this.onCancelClick.bind(this)}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
                <DialogContent style={{width:'500px'}}>
                    <div style={{display:'inline-block',width:width,height:'160px'}}>
                        <TextField 
                            id="with-placeholder"
                            label="请输入作品名称"
                            placeholder="请输入作品名称"
                            margin="normal"
                            inputRef={(input) => this.titleRef = input}
                            defaultValue={defaultName}
                        />
                        <br />
                        <TextField 
                            id="with-placeholder"
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

        /*return (
            <Dialog title={title} open actions={actions}>
                <div style={{display:'inline-block',width:width,height:'160px'}}>
                    <TextField defaultValue={defaultName} fullWidth hintText="请输入作品名称" floatingLabelText="请输入作品名称" ref={(input) => this.titleRef = input} />
                    <br />
                    <TextField defaultValue={defaultBrief} fullWidth hintText="请输入作品简介" floatingLabelText="请输入作品简介" multiLine rows={2} rowsMax={4} ref={(input) => this.summaryRef = input} />
                </div>
                <div style={{display:picDisplay,width:'50%',height:'260px',verticalAlign:'top'}}>
                    <RaisedButton label="添加全景" primary={true} style={{marginLeft:'47px'}} onClick={this.onOpenFileClick.bind(this)}/>
                    {this.renderUploadPic()}
                </div>
            </Dialog>
        );*/
    }
}
