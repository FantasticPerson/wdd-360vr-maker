import React, { Component } from 'react';
import {TextField,Checkbox,FormControlLabel} from '@material-ui/core'

export default class EditText extends Component {
    constructor() {
        super()
        this.titleRef = React.createRef()
        this.summaryRef = React.createRef()
        this.moreInfo = React.createRef()

        this.state = { check: false, openInNewWindow: true }
    }

    componentWillMount(){
        const { action } = this.props
        if (action.length > 0) {
            let obj = JSON.parse(action)
            if (obj.type == 'text') {
                this.setState({ 
                    check: obj.check, 
                    openInNewWindow: obj.openInNewWindow,
                    defaultTitle:obj.title,
                    defaultMoreInfo:obj.moreInfo,
                    defaultSummary:obj.content
                })
            }
        }
    }

    getResult() {
        let title = this.titleRef.value.trim()
        let moreInfo = this.moreInfo.value.trim()
        let summary = this.summaryRef.value.trim()

        const { check, openInNewWindow } = this.state

        if (title.length == 0) {
            alert('请填写标题')
            return false
        } else if (summary.length == 0) {
            alert('请填写内容')
            return false
        }
        return JSON.stringify({ type: 'text', title, content: summary, moreInfo, check, openInNewWindow })
    }

    updateCheck() {
        this.setState({ check: !this.state.check })
    }

    updateCheckNew() {
        this.setState({ openInNewWindow: !this.state.openInNewWindow })
    }

    render() {
        const {defaultTitle,defaultMoreInfo,defaultSummary} = this.state
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
                    label="请输入作品名称"
                    placeholder="标题"
                    margin="normal"
                    defaultValue={defaultTitle}
                    inputRef={(input) => this.titleRef = input}
                />

                <br />
                <TextField
                    id="with-placeholder"
                    label="请输入作品简介"
                    placeholder="内容"
                    margin="normal"
                    multiline rows={2} rowsMax={4}
                    fullWidth
                    defaultValue={defaultSummary}
                    inputRef={(input) => this.summaryRef = input}
                />
                <TextField
                    id="with-placeholder"
                    label="更多内容"
                    placeholder="填写网站地址 展示更多内容"
                    margin="normal"
                    multiline rows={2} rowsMax={4}
                    fullWidth
                    defaultValue={defaultMoreInfo}
                    inputRef={(input) => this.moreInfo = input}
                    style={{marginTop:50}}
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
            </div>
        )
    }
}