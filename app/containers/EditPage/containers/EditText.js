import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import Checkbox from 'material-ui/Checkbox';

export default class EditText extends Component{
    constructor(){
        super()
        this.titleRef = React.createRef()
        this.summaryRef = React.createRef()
        this.moreInfo = React.createRef()

        this.state = {check:true,openInNewWindow:true}
    }

    componentDidMount(){
        const {action} = this.props
        if(action.length > 0){
            let obj = JSON.parse(action)
            if(obj.type == 'text'){
                this.titleRef.input.value = obj.title
                this.moreInfo.input.value = obj.moreInfo
                this.summaryRef.input.setValue(obj.content)

                this.setState({check:obj.check,openInNewWindow:obj.openInNewWindow})
                
            }
        }
    }

    getResult(){
        let title = this.titleRef.input.value.trim()
        let moreInfo = this.moreInfo.input.value.trim()
        let summary = this.summaryRef.getValue().trim()

        const {check,openInNewWindow} = this.state

        if(title.length  == 0){
            alert('请填写标题')
            return false
        }else if(summary.length == 0){
            alert('请填写内容')
            return false
        }
        return JSON.stringify({type:'text',title,content:summary,moreInfo,check,openInNewWindow})
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
                <TextField defaultValue={''} fullWidth hintText="请输入作品名称" floatingLabelText="标题" ref={(input) => this.titleRef = input} />
                <br />
                <TextField defaultValue={''} fullWidth hintText="请输入作品简介" floatingLabelText="内容" multiLine rows={2} rowsMax={4} ref={(input) => this.summaryRef = input} />
                <Checkbox labelPosition="left" checked={this.state.openInNewWindow} onCheck={this.updateCheckNew.bind(this)} label="在新窗口中打开"></Checkbox>
                <TextField defaultValue={''} fullWidth hintText="填写网站地址 展示更多内容" floatingLabelText="更多内容" ref={(input) => this.moreInfo = input} />
            </div>
        )
    }
}