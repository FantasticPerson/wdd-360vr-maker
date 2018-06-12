import React, { Component } from 'react';
import TextField from 'material-ui/TextField';

export default class EditVideo extends Component{
    constructor(){
        super()
        this.titleRef = React.createRef()
        this.summaryRef = React.createRef()
        this.moreInfo = React.createRef()
    }

    componentDidMount(){
        const {action} = this.props
        if(action.length > 0){
            let obj = JSON.parse(action)
            if(obj.type == 'video'){
                this.titleRef.input.value = obj.title
                this.summaryRef.input.value = obj.url
                this.moreInfo.input.value = obj.moreInfo

                this.setState({check:obj.check,openInNewWindow:obj.openInNewWindow})
            }
        }
    }

    getResult(){
        let title = this.titleRef.input.value.trim()
        let content = this.summaryRef.input.value.trim()
        let moreInfo = this.moreInfo.input.value.trim()

        const {check,openInNewWindow} = this.state

        if(title.length == 0){
            alert('请输入标题')
            return false
        }

        if(content.length == 0){
            alert('请输入视频地址')
            return false
        }
        return JSON.stringify({type:'video',title:title,url:content,moreInfo,check,openInNewWindow})
    }

    updateCheck(){
        this.setState({check:!this.state.check})
    }  

    updateCheckNew(){
        this.setState({openInNewWindow:!this.state.openInNewWindow})
    }

    render(){
        return (
            <div>
                <Checkbox labelPosition="left" checked={this.state.check} onCheck={this.updateCheck.bind(this)} label="在全景中显示"></Checkbox>
                <TextField defaultValue={''} fullWidth hintText="请输入标题" floatingLabelText="标题" ref={(input) => this.titleRef = input} />
                <br />
                <TextField defaultValue={''} fullWidth hintText="请输入视频地址" floatingLabelText="视频地址" ref={(input) => this.summaryRef = input } />
                <Checkbox labelPosition="left" checked={this.state.openInNewWindow} onCheck={this.updateCheckNew.bind(this)} label="在新窗口中打开"></Checkbox>
                <TextField defaultValue={''} fullWidth hintText="填写网站地址 展示更多内容" floatingLabelText="更多内容" ref={(input) => this.moreInfo = input} />
            </div>
        )
    }
}