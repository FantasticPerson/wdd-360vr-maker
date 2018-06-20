import React, { Component } from 'react';

import TextField from '@material-ui/core/TextField';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';

export default class EditLink extends Component{
    constructor(){
        super()
        this.state = {check:false,openInNewWindow:true}

        this.titleRef = React.createRef()
        this.urlRef = React.createRef()
    }

    getResult(){
        let title = this.titleRef.value.trim()
        let url = this.urlRef.value.trim()

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
                this.titleRef.value = obj.title
                this.urlRef.value = obj.url

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
                    inputRef={(input) => this.titleRef = input}
                />

                <br />
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
                    label="链接地址"
                    placeholder="链接地址"
                    margin="normal"
                    inputRef={(input) => this.urlRef = input}
                />
            </div>
        )  
    }
}