import React, { Component } from 'react';

import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import FlatButton from '@material-ui/core/Button';

import { connect } from 'react-redux';
import { createSelector } from 'reselect'
import { bindActionCreators } from 'redux';
import getPathOfImage from '../../../native/getPathOfImage'

class PicListModal extends Component{
    constructor(){
        super()
        this.state = {pictures:[]}
    }
    onPicClick(item){
        const {pictures} = this.state
        let name = `${item.id}.${item.extension}`
        let sameImg = pictures.find(item=>item.name == name)
        if(sameImg){
            let index = pictures.indexOf(sameImg)
            pictures.splice(index,1)
        } else {
            pictures.push({
                name:name,showName:item.showName
            })
        }
        this.setState({pictures:pictures})
    }

    onCancelClick(){
        const {onCancel} = this.props
        onCancel()
    }

    onConfirmClick(){
        const {pictures} = this.state
        const {onConfirm} = this.props
        onConfirm(pictures)
    }

    render(){
        const {picList} = this.props
        const {pictures} = this.state

        console.log(picList)
        const list = picList.map((item)=>{
            let style = {cursor:'pointer',width: '80px',height: '80px',overflow: 'hidden',border: '1px solid #EEE',borderRadius: '5px'}
            let titleStyle={
                height:25,
                lineHeight:'25px',
                overflow:'hidden',
                textOverflow:'ellipse',
                whiteSpace:'nowrap'
            }
            let sameImg = pictures.find(item2=>item2.name == `${item.id}.${item.extension}`)
            if(sameImg){
                style.border = "3px solid blanchedalmond"
            }
            return (
                <div style={{display:'inline-block',margin:5}}>
                    <div onClick={()=>{this.onPicClick(item)}} key={item.id} style={style}>
                        <img style={{width:'100%'}} src={getPathOfImage(false,`${item.id}.${item.extension}`)}/>
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
                <DialogTitle id="alert-dialog-title">{'选择图片'}</DialogTitle>
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
    }
}

const selector = createSelector(
    state => state.picture.list,
    (list)=>{
        return {
            picList : list
        }
    }
)

export default connect(selector,{})(PicListModal)