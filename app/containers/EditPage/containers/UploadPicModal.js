import React, { Component } from 'react';
import Dialog from 'material-ui/Dialog';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import styles from '../../../styles/createSceneModal.css'//../styles/createSceneModal.css

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
        const {onConfirm,onCancel} = this.props;
        const actions = [
            <FlatButton label="取消" primary />,
            <FlatButton label="确认" primary />
        ];
        return (
            <Dialog title={'添加图片'} open actions={actions}>
                <div style={{display:'inline-block',width:'50%',height:'160px'}}></div>
                <div style={{display:'inline-block',width:'50%',height:'260px',verticalAlign:'top'}}>
                    <RaisedButton label="添加图片" primary={true} style={{marginLeft:'47px'}}/>
                    {this.renderUploadPic()}
                </div>
            </Dialog>
        )
    }
}

export default UploadPicModal