import React, { Component } from 'react';
import Dialog from 'material-ui/Dialog';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';

export default class CreateVrModal extends Component {
    constructor() {
        super();
        this.titleRef = React.createRef();
        this.summaryRef = React.createRef();
    }

    onCancelClick() {
        const { onCancel } = this.props;

        onCancel();
    }

    onConfirmClick() {
        const { onCreate } = this.props;

        const title = this.titleRef.input.value.trim();
        const brief = this.summaryRef.input.refs.input.value.trim();

        if (title.length > 0) {
            onCreate(title, brief);
        }
    }

    render() {
        const actions = [
          <FlatButton label="取消" primary onClick={this.onCancelClick.bind(this)} />,
          <FlatButton label="确认" primary onClick={this.onConfirmClick.bind(this)} />
        ];

        return (
          <Dialog title="新建作品" open actions={actions}>
              <div>
                  <TextField fullWidth hintText="请输入作品名称" floatingLabelText="请输入作品名称" ref={(input) => this.titleRef = input} />
                  <br />
                  <TextField fullWidth hintText="请输入作品简介" floatingLabelText="请输入作品简介" multiLine rows={2} rowsMax={4} ref={(input) => this.summaryRef = input} />
                </div>
            </Dialog>
        );
    }
}
