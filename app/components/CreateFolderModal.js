import React, { Component } from 'react';
import Dialog from 'material-ui/Dialog';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';

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
        const title = this.titleRef.input.value.trim();

        if (title.length > 0) {
            onCreate(title);
        }
    }

    render() {
        const actions = [
          <FlatButton label="取消" primary onClick={this.onCancelClick.bind(this)} />,
          <FlatButton label="确认" primary onClick={this.onConfirmClick.bind(this)} />
        ];

        return (
          <Dialog title="新建文件夹" open actions={actions}>
              <div>
                  <TextField fullWidth hintText="请输入文件夹名称" floatingLabelText="请输入文件夹名称" ref={(input) => this.titleRef = input} />
                </div>
            </Dialog>
        );
    }
}
