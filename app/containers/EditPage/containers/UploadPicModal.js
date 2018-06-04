import React, { Component } from 'react';
import Dialog from 'material-ui/Dialog';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';

class UploadPicModal extends Component{
    constructor(){
        super()
        this.state = {tmpImgReady:false,previewImg:null}
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

    render(){
        const actions = [
            <FlatButton label="取消" primary onClick={this.onCancelClick.bind(this)} />,
            <FlatButton label="确认" primary onClick={this.onConfirmClick.bind(this)} />
        ];
        return (
            <Dialog title={'添加图片'} open actions={actions}>
                <div style={{display:'inline-block',width:'50%',height:'160px'}}></div>
                <div style={{display:'inline-block',width:'50%',height:'260px',verticalAlign:'top'}}>
                    <RaisedButton label="添加全景" primary={true} style={{marginLeft:'47px'}} onClick={this.onOpenFileClick.bind(this)}/>
                    {this.renderUploadPic()}
                </div>
            </Dialog>
        )
    }
}