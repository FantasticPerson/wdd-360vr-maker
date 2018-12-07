import React, { Component } from 'react';
import {TextField,Checkbox,Button as FlatButton,FormControlLabel} from '@material-ui/core'

import UploadAudioModal from './UploadAudioModal'
import CopyAudioTmpToAudio from '../../../native/copyAudioTmpToAudio'
import AudioListModal from './AudioListModal'
import getPathOfAudio from '../../../native/getPathOfAudio'
import ReactAudioPlayer from 'react-audio-player';

export default class EditAudio extends Component {
    constructor() {
        super()
        this.state = { url: null, showUploadModal: false, showListModal: false, check: true,showName:'' }
        this.titleRef = React.createRef()
    }

    componentWillMount(){
        const { action } = this.props
        if (action.length > 0) {
            let obj = JSON.parse(action)
            if (obj.type == 'audio') {
                this.setState({ url: obj.url, check: obj.check,showName:obj.showName,defaultTitle:obj.title })
                // this.titleRef.value = obj.title
            }
        }
    }

    getResult() {
        const { url, check,showName } = this.state
        let title = this.titleRef.value.trim()
        if (title.length == 0) {
            alert('请填写标题')
            return false
        }
        if (!url) {
            alert('请选择一个音乐文件')
            return false
        }
        return JSON.stringify({ type: 'audio', title: title, url: url, check,showName:showName })
    }

    updateCheck() {
        this.setState({ check: !this.state.check })
    }

    render() {
        const {defaultTitle} = this.state
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
                    defaultValue={defaultTitle}
                    id="with-placeholder"
                    label="标题"
                    placeholder="标题"
                    margin="normal"
                    inputRef={(input) => this.titleRef = input}
                />
                <br />
                <FlatButton color="primary" variant="contained" onClick={() => this.setState({ showListModal: true })}>{'从库中添加'}</FlatButton>

                <FlatButton color="primary" variant="contained" style={{ float: 'right' }} onClick={() => this.setState({ showUploadModal: true })}>{'添加音乐'}</FlatButton>

                {this.renderMusic()}
                {this.renderUploadModal()}
                {this.renderListModal()}
            </div>
        )
    }

    renderMusic() {
        let style = {
            backgroundColor: 'aliceblue',
            padding: '5px',
            border: '1px solid #eee',
            borderRadius: '5px',
            marginBottom: '5px',
            marginTop: '5px'
        }
        const { url,showName } = this.state
        if (url) {
            return (
                <div style={style}>{showName}</div>
            )
        }
    }

    hideUpload() {
        this.setState({ showUploadModal: false })
    }

    onUploadConfirm(path,showName) {
        CopyAudioTmpToAudio(path)
            .then(() => {
                const { addAudio } = this.props
                let arr = path.split('.')
                let picItem = {
                    id: arr[0],
                    extension: arr[1],
                    showName:showName
                }
                addAudio(picItem)
                setTimeout(() => {
                    var name = `${arr[0]}.${arr[1]}`
                    this.setState({ url: name,showName:showName })
                }, 300)
            })
        this.hideUpload()
    }

    renderUploadModal() {
        if (this.state.showUploadModal) {
            return (
                <UploadAudioModal onCancel={this.hideUpload.bind(this)} onConfirm={this.onUploadConfirm.bind(this)}></UploadAudioModal>
            )
        }
    }

    onLocalListCancel() {
        this.setState({ showListModal: false })
    }

    onLocalListConfirm(name, showName) {
        this.setState({ url: name, showName: showName })
        this.onLocalListCancel()
    }

    renderListModal() {
        if (this.state.showListModal) {
            return (
                <AudioListModal onCancel={this.onLocalListCancel.bind(this)} onConfirm={this.onLocalListConfirm.bind(this)}></AudioListModal>
            )
        }
    }
}