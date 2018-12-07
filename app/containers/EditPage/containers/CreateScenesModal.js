import React, { Component } from 'react'
import {Dialog,DialogTitle,DialogContent,DialogActions,TextField,Button} from '@material-ui/core'

import openFolder from '../../../native/openFolder'
import checkPicValid from '../../../native/checkPicValid'
import copyFileToTmp from '../../../native/copyFileToTmp'
import createPano from '../../../utils/createPano'

import { getScenePath, getHeadImgUrl, getTmpPreviewPath } from '../../../native/pathUtils'
import copyImageToScene from '../../../native/copyImageToScene'
import Hashid from '../../../utils/generateHashId'
import Timer from '../../../utils/timer'

import styles from '../../../styles/createScenesModal.css'

export default class CreateScenes extends Component {
    constructor() {
        super()
        this.state = { isLoading: false, totalNum: 0, completeNum: 0 }
    }

    renderContent() {
        if (this.state.isLoading) {
            return <div>正在下载，总数{this.state.totalNum}，已完成{this.state.completeNum}</div>
        } else {
            return <Button onClick={this.onOpenFolderClick.bind(this)} variant="contained" color="primary">选择文件夹</Button>
        }
    }

    async onOpenFolderClick() {
        const { vrId, groupId, groupItem } = this.props
        const { addScene, updateGroup } = this.props.functions
        let res = await openFolder(['multiSelections'], [{ name: 'Images', extensions: ['jpg'] }])
        if (Array.isArray(res) && res.length > 0) {
            this.setState({ isLoading: true, totalNum: res.length })
            for (let i = 0; i < res.length; i++) {
                let err = await createPano(res[i])
                if (!err) {
                    this.setState({ completeNum: i+1 })
                    let sceneId = `scene_${new Hashid().encode()}`
                    await copyImageToScene(getScenePath(sceneId))
                    await Timer(800)
                    await addScene({ id: sceneId, vrid: vrId, name: '默认', groupId })
                    let selectIds = groupItem.sceneListIds || []
                    selectIds.push(sceneId)
                    debugger
                    let newGroupItem = { ...groupItem, sceneListIds: selectIds }
                    updateGroup(newGroupItem)
                } else {
                    alert('上传失败')
                    this.onCancelClick()
                    return
                }
            }
            alert('上传完成')
            this.onCancelClick(true)
        } else if(res == undefined){
            this.onCancelClick()
        } else {
            alert('上传失败')
            this.onCancelClick()
        }
    }

    onCancelClick() {
        const { onCancel } = this.props.functions
        onCancel()
    }

    render() {
        return (
            <Dialog open={true}>
                <DialogTitle id="alert-dialog-title">{"批量创建场景"}</DialogTitle>
                <DialogContent style={{ width: '500px' }}>
                    {this.renderContent()}
                </DialogContent>
                <DialogActions>
                    <Button onClick={this.onCancelClick.bind(this)}>取消</Button>,
                </DialogActions>
            </Dialog>
        )
    }
}