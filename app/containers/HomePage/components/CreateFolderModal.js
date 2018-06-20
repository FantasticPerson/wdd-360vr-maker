import React, { Component } from 'react';

import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

// import Dialog from 'material-ui/Dialog';
// import TextField from 'material-ui/TextField';
// import FlatButton from 'material-ui/FlatButton';

export default class CreateFolderModal extends Component {
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
        const title = this.titleRef.value.trim();

        if (title.length > 0) {
            onCreate(title);
        }
    }

    render() {
        const {folderData}= this.props

        console.log('--------',folderData)
        


        return (
            <Dialog
                open={true}
                onClose={this.onCancelClick.bind(this)}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{"新建文件夹"}</DialogTitle>
                <DialogContent>
                    <TextField
                        id="with-placeholder"
                        label="请输入文件夹名称"
                        placeholder="请输入文件夹名称"
                        margin="normal"
                        inputRef={(input) => {this.titleRef = input}}
                        defaultValue={folderData ? folderData.title : ''}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={this.onCancelClick.bind(this)}>取消</Button>,
                    <Button onClick={this.onConfirmClick.bind(this)}>确认</Button>
                </DialogActions>
            </Dialog>
        )

        /*return (
          <Dialog title="新建文件夹" open actions={actions}>
              <div>
                  <TextField defaultValue={folderData ? folderData.title : ''} fullWidth hintText="请输入文件夹名称" floatingLabelText="请输入文件夹名称" ref={(input) => this.titleRef = input} />
                </div>
            </Dialog>
        );*/
    }
}
