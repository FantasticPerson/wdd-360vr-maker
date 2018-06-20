import React, { Component } from 'react';
// import Dialog from 'material-ui/Dialog';
// import TextField from 'material-ui/TextField';
// import FlatButton from 'material-ui/FlatButton';
// import RaisedButton from 'material-ui/RaisedButton';

import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

export default class EditSceneModal extends Component{
    constructor(){
        super()
        this.titleRef = React.createRef()
    }

    onConfirmClick(){
        const {onModify} = this.props
        const name = this.titleRef.input.value.trim();

        if (name.length > 0) {
            onModify(name);
        }
    }

    onCancelClick(){
        const {onCancel} = this.props;
        onCancel()
    }

    render(){
        let title = this.props.itemData ? this.props.itemData.name : ''
        return (
            <Dialog
                open={this.props.show}
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
                        ref={(input) => this.titleRef = input}
                        defaultValue={title}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={this.onCancelClick.bind(this)}>取消</Button>,
                    <Button onClick={this.onConfirmClick.bind(this)}>确认</Button>
                </DialogActions>
            </Dialog>
        )

        /*const {itemData} = this.props;
        const actions = [
            <FlatButton label="取消" primary onClick={this.onCancelClick.bind(this)} />,
            <FlatButton label="确认" primary onClick={this.onConfirmClick.bind(this)} />
        ];
        return (
            <Dialog title="编辑场景" open actions={actions}>
              <div>
                  <TextField defaultValue={itemData ? itemData.name : ''} fullWidth hintText="请输入场景名称" floatingLabelText="请输入场景名称" ref={(input) => this.titleRef = input} />
                </div>
            </Dialog>
        )*/
    }
}