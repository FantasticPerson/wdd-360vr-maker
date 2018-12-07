import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createSelector } from 'reselect'
import { bindActionCreators } from 'redux';
import {Dialog,DialogTitle,DialogContent,DialogActions,TextField,Button as FlatButton} from '@material-ui/core'

import getPathOfAudio from '../../../native/getPathOfAudio'
import ReactAudioPlayer from 'react-audio-player';

class AudioListModal extends Component {
    constructor() {
        super()
        this.state = { audioSelect: null,showName:'' }
    }
    onPicClick(item) {
        const { pictures } = this.state
        let name = `${item.id}.${item.extension}`
        this.setState({ audioSelect: name,showName:item.showName })
    }

    onCancelClick() {
        const { onCancel } = this.props
        onCancel()
    }

    onConfirmClick() {
        const { audioSelect,showName } = this.state
        const { onConfirm } = this.props
        onConfirm(audioSelect,showName)
    }

    render() {
        const { audioList } = this.props
        const { audioSelect } = this.state

        let divStyle = {
            width: '42px',
            overflow: 'hidden',
            marginLeft: '14px'
        }

        const list = audioList.map((item) => {
            let style = { cursor: 'pointer', width: '80px', height: '80px', overflow: 'hidden', border: '1px solid #EEE', borderRadius: '5px' }
            if (audioSelect == `${item.id}.${item.extension}`) {
                style.border = "3px solid blanchedalmond"
            }
            let titleStyle = {
                width: 80,
                textOverflow: 'ellipsis',
                overflow: 'hidden',
                whiteSpace: 'nowrap',
                height: '25px',
                lineHeight: '25px'
            }
            return (
                <div style={{margin:5,display:'inline-block'}}>
                    <div onClick={() => { this.onPicClick(item) }} key={item.id} style={style}>
                        <div style={divStyle}>
                            <ReactAudioPlayer
                                src={getPathOfAudio(false, `${item.id}.${item.extension}`)}
                                controls
                                style={{ width: '100px', marginTop: '21px', marginLeft: '10px' }}
                            />
                        </div>
                    </div>
                    <div title={item.showName} style={titleStyle}>{item.showName}</div>
                </div>
            )
        })

        return (
            <Dialog
                open
                onClose={this.onCancelClick.bind(this)}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">选择音频</DialogTitle>
                <DialogContent style={{ width: '500px' }}>
                    <div style={{ height: '300px', overflowY: 'auto' }}>
                        {list}
                    </div>
                </DialogContent>
                <DialogActions>
                    <FlatButton onClick={this.onCancelClick.bind(this)}>取消</FlatButton>
                    <FlatButton onClick={this.onConfirmClick.bind(this)}>确认</FlatButton>
                </DialogActions>
            </Dialog>
        )
    }
}

const selector = createSelector(
    state => state.audio.list,

    (list) => {
        return {
            audioList: list
        }
    }
)

export default connect(selector, {})(AudioListModal)