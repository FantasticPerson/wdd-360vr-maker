import React, { Component } from 'react';
import {Dialog,DialogTitle,DialogContent,DialogActions,TextField,Button} from '@material-ui/core'

import Hashid from '../../../utils/generateHashId'

export default class CreateFolderModal extends Component {
    constructor() {
        super();
        this.titleRef = React.createRef();
    }

    onCancelClick() {
        const { hideModal } = this.props.functions;
        hideModal();
    }

    onConfirmClick() {
        const title = this.titleRef.value.trim();

        if (title.length > 0) {
            const { itemData, functions, vrId } = this.props
            const { addGroup, updateGroup, hideModal } = functions
            if (itemData) {
                updateGroup({ id: itemData.id, title, vrId: itemData.vrId })
            } else {
                let groupId = `group_${new Hashid().encode()}`
                addGroup(title, vrId, groupId);
            }
            hideModal()
        } else {
            alert('名称不能为空!')
        }
    }

    render() {
        const { itemData } = this.props
        return (
            <Dialog
                open={true}
                onClose={this.onCancelClick.bind(this)}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{"新建分组"}</DialogTitle>
                <DialogContent>
                    <TextField
                        label="请输入名称"
                        placeholder="请输入名称"
                        margin="normal"
                        inputRef={(input) => { this.titleRef = input }}
                        defaultValue={itemData ? itemData.title : ''}
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
