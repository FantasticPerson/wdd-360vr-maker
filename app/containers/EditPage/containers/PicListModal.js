import React, { Component } from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
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
        if(pictures.indexOf(name) >= 0){
            let index = pictures.indexOf(name)
            pictures.splice(index,1)
        } else {
            pictures.push(name)
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

        const list = picList.map((item)=>{
            let style = {cursor:'pointer',width: '80px',height: '80px',overflow: 'hidden',border: '1px solid #EEE',borderRadius: '5px',float: 'left'}
            if(pictures.indexOf(`${item.id}.${item.extension}`) >= 0){
                style.border = "3px solid blanchedalmond"
            }
            return (
                <div onClick={()=>{this.onPicClick(item)}} key={item.id} style={style}>
                    <img style={{width:'100%'}} src={getPathOfImage(false,`${item.id}.${item.extension}`)}/>
                </div>
            )
        })

        const actions = [
            <FlatButton label="取消" onClick={this.onCancelClick.bind(this)} primary />,
            <FlatButton label="确认" onClick={this.onConfirmClick.bind(this)} primary />
        ];
        
        return (
            <Dialog title="选择图片" open actions={actions}>
                <div style={{height:'300px',overflowY:'auto'}}>
                    {list}
                </div>
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