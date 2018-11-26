import React, { Component } from 'react';
// import TextField from 'material-ui/TextField';

import Checkbox from '@material-ui/core/Checkbox';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';

export default class EditVideo extends Component{
    constructor(){
        super()
        this.titleRef = React.createRef()
        this.summaryRef = React.createRef()
        this.moreInfo = React.createRef()

        this.state={check:false,openInNewWindow:true}
    }

    componentWillMount(){
        const {action} = this.props
        if(action.length > 0){
            let obj = JSON.parse(action)
            if(obj.type == 'video'){
                this.setState({
                    check:obj.check,
                    openInNewWindow:obj.openInNewWindow,
                    defaultTitle:obj.title,
                    defaultSummary:obj.url,
                    defaultMoreInfo:obj.moreInfo
                })
            }
        }
    }

    getResult(){
        let title = this.titleRef.value.trim()
        let content = this.summaryRef.value.trim()
        let moreInfo = this.moreInfo.value.trim()

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
        const {defaultTitle,defaultSummary,defaultMoreInfo} = this.state

        return (
            <div>
                <FormControlLabel
                    control={
                        <Checkbox
                        checked={this.state.check}
                        onChange={this.updateCheck.bind(this)}
                        value="在新窗口中打开"
                        color="primary"
                        />
                    }
                    label="在全景中显示"
                />

                <TextField 
                    id="with-placeholder"
                    label="请输入标题"
                    placeholder="标题"
                    margin="normal"
                    defaultValue={defaultTitle}
                    inputRef={(input) => this.titleRef = input}
                />

                <br />
                <TextField 
                    id="with-placeholder"
                    label="请输入视频地址"
                    placeholder="视频地址"
                    defaultValue={defaultSummary}
                    margin="normal"
                    inputRef={(input) => this.summaryRef = input}
                />

                <FormControlLabel
                    control={
                        <Checkbox
                        checked={this.state.openInNewWindow}
                        onChange={this.updateCheckNew.bind(this)}
                        value="在新窗口中打开"
                        color="primary"
                        />
                    }
                    label="在新窗口中打开"
                />

                <TextField 
                    id="with-placeholder"
                    label="填写网址 展示更多内容"
                    placeholder="更多内容"
                    margin="normal"
                    defaultValue={defaultMoreInfo}
                    inputRef={(input) => this.moreInfo = input}
                />
            </div>
        )
    }
}