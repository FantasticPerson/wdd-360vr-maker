import React, { Component } from 'react';

import TextField from '@material-ui/core/TextField';
import Checkbox from '@material-ui/core/Checkbox';
import FlatButton from '@material-ui/core/Button';
import FormControlLabel from '@material-ui/core/FormControlLabel';

import UploadPicModal from './UploadPicModal'
import CopyImageTmpToImage from '../../../native/copyImageTmpToImage'
import PicListModal from './PicListModal'
import getPathOfImage from '../../../native/getPathOfImage'

export default class EditPicture extends Component {
    constructor() {
        super()
        this.state = { list: [], showUploadModal: false, showPicListModal: false, check: false, openInNewWindow: true }
        this.titleRef = React.createRef()
        this.moreInfo = React.createRef()
    }

    componentWillMount(){
        const { action } = this.props
        if (action.length > 0) {
            let obj = JSON.parse(action)
            if (obj.type == 'pictures') {
                this.setState({ 
                    list: obj.pics, 
                    check: obj.check, 
                    openInNewWindow: obj.openInNewWindow,
                    defaultTile:obj.title,
                    defaultMoreInfo:obj.moreInfo
                })
            }
        }
    }

    onRemoveClick(item) {
        const { list } = this.state
        let index = list.indexOf(item)
        if (index >= 0) {
            list.splice(index, 1)
            this.setState({ list, list })
        }
    }

    updateCheck() {
        this.setState({ check: !this.state.check })
    }

    updateCheckNew() {
        this.setState({ openInNewWindow: !this.state.openInNewWindow })
    }

    getResult() {
        const { list, check, openInNewWindow } = this.state
        let title = this.titleRef.value.trim()
        let moreInfo = this.moreInfo.value.trim()

        if (title.length == 0) {
            alert('标题不能为空')
            return false
        } else if (list.length == 0) {
            alert('请选择图片')
            return false
        }
        return JSON.stringify({ type: 'pictures', pics: list, title, check, openInNewWindow, moreInfo })
    }

    render() {
        const { list,defaultTile,defaultMoreInfo } = this.state
        let sceneItemStyle = {
            height: '75px',
            width: '75px',
            display: 'inline-block',
            overflow: 'hidden',
            position: 'relative',
            border: '1px solid #ccc',
            borderRadius: '5px'
        }
        let titleStyle = {
            width: 75,
            textOverflow: 'ellipsis',
            overflow: 'hidden',
            whiteSpace: 'nowrap',
            height: '25px',
            lineHeight: '25px'
        }
        let picArr = list.map((item) => {
            return (
                <div style={{display:'inline-block',margin:'5px'}}>
                    <div style={sceneItemStyle} key={item}>
                        <i onClick={() => this.onRemoveClick(item)} className="fa fa-times pictureCloseBtn" aria-hidden="true"></i>
                        <img style={{ width: '100%' }} src={getPathOfImage(false, item.name)} />
                    </div>
                    <div title={item.showName} style={titleStyle}>{item.showName}</div>
                </div>
            )
        })
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
                    defaultValue={defaultTile}
                    inputRef={(input) => this.titleRef = input}
                />

                <br />

                <FlatButton color="primary" variant="contained" style={{ display: 'inline-block' }} onClick={() => this.setState({ showPicListModal: true })}>{'图片库添加'}</FlatButton>

                <FlatButton color="primary" variant="contained" style={{ display: 'inline-block', float: 'right' }} onClick={() => this.setState({ showUploadModal: true })}>{'添加图片'}</FlatButton>

                <div style={{ width: '180px', margin: '0 auto', marginTop: 15 }}>
                    {picArr}
                </div>
                <TextField
                    id="with-placeholder"
                    label="填写网址，展示更多内容"
                    placeholder="更多内容"
                    margin="normal"
                    defaultValue={defaultMoreInfo}
                    inputRef={(input) => this.moreInfo = input}
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

                {this.renderUploadModal()}
                {this.renderPicListModal()}
            </div>
        )
    }

    hideUploadPic() {
        this.setState({ showUploadModal: false })
    }

    onUploadConfirm(path, showName) {
        CopyImageTmpToImage(path)
            .then(() => {
                const { addPicture } = this.props
                let arr = path.split('.')
                let picItem = {
                    id: arr[0],
                    extension: arr[1],
                    showName: showName
                }
                addPicture(picItem)
                setTimeout(() => {
                    const { list } = this.state
                    var name = `${arr[0]}.${arr[1]}`
                    let sameImg = list.find(item => item.name == name)
                    if (!sameImg) {
                        list.push({ name: name, showName: showName })
                        this.setState({ list: list })
                    }
                }, 300)

            })
        this.hideUploadPic()
    }

    renderUploadModal() {
        if (this.state.showUploadModal) {
            return (
                <UploadPicModal onCancel={this.hideUploadPic.bind(this)} onConfirm={this.onUploadConfirm.bind(this)}></UploadPicModal>
            )
        }
    }

    onLocalPicListCancel() {
        this.setState({ showPicListModal: false })
    }

    onLocalPicListConfirm(arr) {
        let list = this.state.list
        if (arr.length > 0) {
            for (let i = 0; i < arr.length; i++) {
                if (!list.find(item => item.name == arr[i].name)) {
                    list.push(arr[i])
                }
            }
            this.setState({ list: list })
        }
        this.onLocalPicListCancel()
    }

    renderPicListModal() {
        if (this.state.showPicListModal) {
            return (
                <PicListModal onCancel={this.onLocalPicListCancel.bind(this)} onConfirm={this.onLocalPicListConfirm.bind(this)}></PicListModal>
            )
        }
    }
}