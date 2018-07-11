import React, { Component } from 'react';

import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import SelectField from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

import Hashid from '../../../utils/generateHashId'

export default class SceneMoveModal extends Component {
    constructor() {
        super();
        this.state = {group:''}
    }

    componentDidMount(){
        const {groupList} = this.props

        console.log(groupList)
        if(groupList.length > 0){
            this.setState({group:groupList[0].id})
        }
    }

    onCancelClick() {
        const { onHide } = this.props.functions;
        onHide();
    }

    onConfirmClick() {
        const {group} = this.state
        const {itemData} = this.props

        itemData.groupId = group
        this.props.functions.modify(itemData)
        this.props.functions.onHide()
    }

    handleChange(event){
        this.setState({group:event.target.value});
    }

    render() {
        const {groupList}= this.props
        let menuItems = groupList.map((item)=>{
            return <MenuItem value={item.id} key={item.id}>{item.title}</MenuItem>
        })
        return (
            <Dialog
                open={true}
                onClose={this.onCancelClick.bind(this)}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{"移动"}</DialogTitle>
                <DialogContent>
                    <SelectField
                        value={this.state.group}
                        onChange={this.handleChange.bind(this)}
                        style={{width:'200px'}}
                    >
                        {menuItems}
                    </SelectField>
                </DialogContent>
                <DialogActions>
                    <Button onClick={this.onCancelClick.bind(this)}>取消</Button>,
                    <Button onClick={this.onConfirmClick.bind(this)}>确认</Button>
                </DialogActions>
            </Dialog>
        )
    }
}
