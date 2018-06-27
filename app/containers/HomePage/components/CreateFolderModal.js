import React, { Component } from 'react';

import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

export default class CreateFolderModal extends Component {
    constructor() {
        super();
        this.titleRef = React.createRef();
    }

    onCancelClick() {
        const { hideCreateFolderModal } = this.props.functions;
        hideCreateFolderModal();
    }

    onConfirmClick() {
        const { onCreate } = this.props;
        const title = this.titleRef.value.trim();

        if (title.length > 0) {
            const {data,functions} = this.props
            const {addFolder,updateFolder,hideCreateFolderModal} = functions
            if(data){
                updateFolder({id: data.id,title})
            } else {
                addFolder(title);
            }
            hideCreateFolderModal()
        } else {
            alert('标题不能为空!')
        }
    }

    render() {
        const {data}= this.props

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
                        label="请输入文件夹名称"
                        placeholder="请输入文件夹名称"
                        margin="normal"
                        inputRef={(input) => {this.titleRef = input}}
                        defaultValue={data ? data.title : ''}
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
