import React, { Component } from 'react';
import Dialog from 'material-ui/Dialog';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';

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
        const {itemData} = this.props;
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
        )
    }
}