import React, { Component } from 'react';
import TextField from 'material-ui/TextField';

export default class EditVideo extends Component{
    constructor(){
        super()
        this.titleRef = React.createRef()
        this.summaryRef = React.createRef()
    }

    componentDidMount(){
        const {action} = this.props
        if(action.length > 0){
            let obj = JSON.parse(action)
            if(obj.type == 'video'){
                this.titleRef.input.value = obj.title
                this.summaryRef.input.value = obj.url
            }
        }
    }

    getResult(){
        let title = this.titleRef.input.value.trim()
        let content = this.summaryRef.input.value.trim()

        if(title.length == 0){
            alert('请输入标题')
            return false
        }

        if(content.length == 0){
            alert('请输入视频地址')
            return false
        }
        return JSON.stringify({type:'video',title:title,url:content})
    }

    render(){
        return (
            <div>
                <TextField defaultValue={''} fullWidth hintText="请输入标题" floatingLabelText="标题" ref={(input) => this.titleRef = input} />
                <br />
                <TextField defaultValue={''} fullWidth hintText="请输入视频地址" floatingLabelText="视频地址" ref={(input) => this.summaryRef = input } />
            </div>
        )
    }
}