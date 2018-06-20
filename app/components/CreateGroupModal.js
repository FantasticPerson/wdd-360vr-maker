import React, { Component } from 'react';
// import Dialog from 'material-ui/Dialog';

import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';


// import TextField from 'material-ui/TextField';
// import FlatButton from 'material-ui/FlatButton';

export default class CreateGroupModal extends Component {
    constructor() {
        super();
        this.titleRef = React.createRef();
    }

    onCancelClick() {
        const { onCancel } = this.props;
        onCancel();
    }

    onConfirmClick() {
        const { onCreate } = this.props;
        const title = this.titleRef.input.value.trim();

        if (title.length > 0) {
            onCreate(title);
        }
    }

    render() {
        let title = this.props.folderData ? this.props.folderData.title : ''

        return (
            <Dialog
                open={this.props.show}
                onClose={this.onCancelClick.bind(this)}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{"新建分组"}</DialogTitle>
                <DialogContent>
                    <TextField
                        id="with-placeholder"
                        label="With placeholder"
                        placeholder="Placeholder"
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


        /*return (
            <Dialog title="新建分组" open actions={actions}>
                <div>
                    <TextField defaultValue={folderData ? folderData.title : ''} fullWidth hintText="请输入分组名称" floatingLabelText="请输入分组名称" ref={(input) => this.titleRef = input} />
                </div>
            </Dialog>
        );*/
    }
}
