import React, { Component } from 'react';
// import Dialog from 'material-ui/Dialog';

import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';


import TextField from '@material-ui/core/TextField';
import FlatButton from '@material-ui/core/Button';

// import FlatButton from 'material-ui/FlatButton';
// import RaisedButton from 'material-ui/RaisedButton';
import { connect } from 'react-redux';
import { createSelector } from 'reselect'
import { bindActionCreators } from 'redux';
import getPathOfAudio from '../../../native/getPathOfAudio'
import ReactAudioPlayer from 'react-audio-player';


class PicListModal extends Component{
    constructor(){
        super()
        this.state = {audioSelect:null}
    }
    onPicClick(item){
        const {pictures} = this.state
        let name = `${item.id}.${item.extension}`
        this.setState({audioSelect:name})
    }

    onCancelClick(){
        const {onCancel} = this.props
        onCancel()
    }

    onConfirmClick(){
        const {audioSelect} = this.state
        const {onConfirm} = this.props
        onConfirm(audioSelect)
    }

    render(){
        const {audioList} = this.props
        const {audioSelect} = this.state

        const list = audioList.map((item)=>{
            let style = {cursor:'pointer',width: '80px',height: '80px',overflow: 'hidden',border: '1px solid #EEE',borderRadius: '5px',float: 'left'}
            if(audioSelect == `${item.id}.${item.extension}`){
                style.border = "3px solid blanchedalmond"
            }
            return (
                <div onClick={()=>{this.onPicClick(item)}} key={item.id} style={style}>
                    <ReactAudioPlayer
                        src={getPathOfAudio(false,`${item.id}.${item.extension}`)}
                        controls
                        style={{width:'100px',marginTop:'21px',marginLeft:'10px'}}
                    />
                </div>
            )
        })

        const actions = [
            <FlatButton label="取消" onClick={this.onCancelClick.bind(this)} primary />,
            <FlatButton label="确认" onClick={this.onConfirmClick.bind(this)} primary />
        ];
        
        return (
            <Dialog
                open
                onClose={this.onCancelClick.bind(this)}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">选择音频</DialogTitle>
                <DialogContent style={{width:'500px'}}>
                    <div style={{height:'300px',overflowY:'auto'}}>
                        {list}
                    </div>
                </DialogContent>
                <DialogActions>
                    <FlatButton onClick={this.onCancelClick.bind(this)}>取消</FlatButton>,
                    <FlatButton onClick={this.onConfirmClick.bind(this)}>确认</FlatButton>
                </DialogActions>
            </Dialog>
        )

        // return (
        //     <Dialog title="选择音频" open actions={actions}>
        //         <div style={{height:'300px',overflowY:'auto'}}>
        //             {list}
        //         </div>
        //     </Dialog>
        // )
    }
}

const selector = createSelector(
    state => state.audio.list,

    (list)=>{
        return {
            audioList : list
        }
    }
)

export default connect(selector,{})(PicListModal)