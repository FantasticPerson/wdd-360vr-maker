import React, { Component } from 'react';
import {TextField,Checkbox,FormControlLabel} from '@material-ui/core'

export default class EditLink extends Component {
    constructor() {
        super()
        this.state = { check: false, openInNewWindow: true }

        this.titleRef = React.createRef()
        this.urlRef = React.createRef()
    }

    getResult() {
        let title = this.titleRef.value.trim()
        let url = this.urlRef.value.trim()

        const { check, openInNewWindow } = this.state

        if (title.length == 0) {
            alert('请输入标题')
            return false
        }
        if (url.length == 0) {
            alert('请输入url')
            return false
        }
        return JSON.stringify({ type: 'link', title, url, check, openInNewWindow })
    }

    componentWillMount() {
        const { action } = this.props
        if (action.length > 0) {
            let obj = JSON.parse(action)
            if (obj.type == 'link') {
                this.setState({
                    check: obj.check,
                    openInNewWindow: obj.openInNewWindow,
                    defaultTitle: obj.title,
                    defaultUrl: obj.url
                })
            }
        }
    }

    updateCheck() {
        this.setState({ check: !this.state.check })
    }

    updateCheckNew() {
        this.setState({ openInNewWindow: !this.state.openInNewWindow })
    }

    render() {
        const {defaultTitle,defaultUrl} = this.state

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
                    label="链接地址"
                    placeholder="链接地址"
                    margin="normal"
                    defaultValue={defaultUrl}
                    inputRef={(input) => this.urlRef = input}
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