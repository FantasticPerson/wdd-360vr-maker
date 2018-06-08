import React, { Component } from 'react';
import TextField from 'material-ui/TextField';

export default class EditText extends Component{
    constructor(){
        super()
        this.titleRef = React.createRef()
        this.summaryRef = React.createRef()
    }

    componentDidMount(){
        const {action} = this.props
        if(action.length > 0){
            let obj = JSON.parse(action)
            if(obj.type == 'text'){
                this.titleRef.input.value = obj.title
                this.summaryRef.input.setValue(obj.content)
            }
        }
    }

    getResult(){
        let title = this.titleRef.input.value.trim()
        let summary = this.summaryRef.getValue().trim()

        if(title.length  == 0){
            alert('请填写标题')
            return false
        }else if(summary.length == 0){
            alert('请填写内容')
            return false
        }
        return JSON.stringify({type:'text',title:title,content:summary})
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