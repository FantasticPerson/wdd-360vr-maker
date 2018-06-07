import React, { Component } from 'react';
import TextField from 'material-ui/TextField';

export default class EditText extends Component{
    constructor(){
        super()
        this.titleRef = React.createRef()
        this.summaryRef = React.createRef()
    }

    render(){
        return (
            <div>
                <TextField defaultValue={''} fullWidth hintText="请输入作品名称" floatingLabelText="标题" ref={(input) => this.titleRef = input} />
                <br />
                <TextField defaultValue={''} fullWidth hintText="请输入作品简介" floatingLabelText="内容" multiLine rows={2} rowsMax={4} ref={(input) => this.summaryRef = input} />
            </div>
        )
    }
}