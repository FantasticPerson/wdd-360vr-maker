import React, { Component } from 'react';

export default class EditLink extends Component{
    constructor(){
        super()
        this.setState({check:true,openInNewWindow:true})

        this.titleRef = React.createRef()
        this.urlRef = React.createRef()
    }

    getResult(){
        let title = this.titleRef.input.value.trim()
        let url = this.urlRef.input.value.trim()

        const {check,openInNewWindow} = this.state

        if(title.length == 0){
            alert('请输入标题')
            return false
        }
        if(url.length == 0){
            alert('请输入url')
            return false
        }
        return JSON.stringify({type:'link',title,url,check,openInNewWindow})
    }

    componentDidMount(){
        const {action} = this.props
        if(action.length > 0){
            let obj = JSON.parse(action)
            if(obj.type == 'link'){
                this.titleRef.input.value = obj.title
                this.urlRef.input.value = obj.url

                this.setState({check:obj.check,openInNewWindow:obj.openInNewWindow})
            }
        }
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
                <TextField defaultValue={''} fullWidth hintText="标题" floatingLabelText="标题" ref={(input) => this.titleRef = input} />
                <br />
                <Checkbox labelPosition="left" checked={this.state.openInNewWindow} onCheck={this.updateCheckNew.bind(this)} label="在新窗口中打开"></Checkbox>
                <TextField defaultValue={''} fullWidth hintText="链接地址" floatingLabelText="链接地址" ref={(input) => this.urlRef = input} />
            </div>
        )  
    }
}