import React, { Component } from 'react';
import {Dialog,DialogTitle,DialogContent,DialogActions,TextField,Button as FlatButton} from '@material-ui/core'

import styles from '../../../styles/createSceneModal.css'
import openAudio from '../../../native/openAudio'
import CopyAudioToAudioTmp from '../../../native/copyAudioToTmpAudio'
import getPathOfAudio from '../../../native/getPathOfAudio'
import ReactAudioPlayer from 'react-audio-player';

class UploadPicModal extends Component {
    constructor() {
        super()
        this.state = { tempAudioReady: false, previewImg: null, audioName: null }
        this.nameRef = React.createRef()
    }
    renderUploadPic() {
        const { audioName } = this.state
        if (!audioName) {
            return <div className={styles.imgContainer}>等待上传</div>
        } else {
            let audioSrc = getPathOfAudio(true, audioName)
            return (
                <div className={styles.imgContainer}>
                    <ReactAudioPlayer
                        src={audioSrc}
                        controls
                        style={{ width: '100px' }}
                    />
                </div>
            )
        }
    }

    onUploadClick() {
        openAudio()
            .then(res => {
                if (res && res[0]) {
                    let path = res[0]
                    return CopyAudioToAudioTmp(path)
                }
            })
            .then((name) => {
                setTimeout(() => {
                    this.setState({ audioName: name })
                }, 300)
            })
            .catch(err => {
                console.log(err)
            })
    }

    onConfirmClick() {
        const { audioName } = this.state
        const { onConfirm, onCancel } = this.props;
        const showName = this.nameRef.value.trim()
        if(!showName){
            alert('请先输入音乐名称')
            return
        }
        if (!audioName) {
            onCancel()
        } else {
            onConfirm(audioName,showName)
        }
    }

    render() {
        const { onConfirm, onCancel } = this.props;
        return (
            <Dialog
                open
                onClose={() => { onCancel() }}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">添加音乐</DialogTitle>
                <DialogContent style={{ width: '500px' }}>
                    <div style={{ display: 'inline-block', width: '100%', height: '260px', verticalAlign: 'top' }}>
                        <FlatButton onClick={this.onUploadClick.bind(this)} label="添加音乐" color="primary" style={{ marginLeft: '47px' }}>添加音乐</FlatButton>
                        {this.renderUploadPic()}
                        <TextField
                            id="with-placeholder"
                            label="请输入音乐名称"
                            placeholder="名称"
                            margin="normal"
                            inputRef={(input) => this.nameRef = input}
                            style={{
                                position: 'absolute',
                                left: 280,
                                top: 258
                            }}
                        />
                    </div>
                </DialogContent>
                <DialogActions>
                    <FlatButton onClick={() => { onCancel() }}>取消</FlatButton>,
                    <FlatButton onClick={this.onConfirmClick.bind(this)}>确认</FlatButton>
                </DialogActions>
            </Dialog>
        )
    }
}

export default UploadPicModal