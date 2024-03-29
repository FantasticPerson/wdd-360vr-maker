import React, { Component } from 'react'; 
import {Dialog,DialogTitle,DialogContent,DialogActions,TextField,Button} from '@material-ui/core'

export default class EditSceneModal extends Component{
    constructor(){
        super()
        this.titleRef = React.createRef()
    }

    onConfirmClick(){
        const {onModify,itemData} = this.props
        const name = this.titleRef.value.trim();

        if (name.length > 0) {
            onModify({...itemData,name:name});
        }
        this.onCancelClick()
    }

    onCancelClick(){
        const {onCancel} = this.props;
        onCancel()
    }

    render(){
        let title = this.props.itemData ? this.props.itemData.name : ''
        return (
            <Dialog
                open={true}
                onClose={this.onCancelClick.bind(this)}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{"编辑场景"}</DialogTitle>
                <DialogContent>
                    <TextField
                        id="with-placeholder"
                        label="请输入场景名称"
                        placeholder="请输入场景名称"
                        margin="normal"
                        inputRef={(input) => this.titleRef = input}
                        defaultValue={title}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={this.onCancelClick.bind(this)}>取消</Button>,
                    <Button onClick={this.onConfirmClick.bind(this)}>确认</Button>
                </DialogActions>
            </Dialog>
        )
    }
}