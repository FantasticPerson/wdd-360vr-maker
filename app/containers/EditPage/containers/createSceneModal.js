import React, { Component } from 'react';
import {Dialog,DialogTitle,DialogContent,DialogActions,TextField,Button} from '@material-ui/core'

import openFolder from '../../../native/openFolder'
import checkPicValid from '../../../native/checkPicValid'
import copyFileToTmp from '../../../native/copyFileToTmp'
import createPano from '../../../utils/createPano'

import { getScenePath, getHeadImgUrl, getTmpPreviewPath } from '../../../native/pathUtils'

import copyImageToScene from '../../../native/copyImageToScene'

import Hashid from '../../../utils/generateHashId'
import Timer from '../../../utils/timer'

import styles from '../../../styles/createSceneModal.css'

export default class CreateVrModal extends Component {
    constructor() {
        super();
        this.state = { tmpImgStatus: 'empty' }
        this.previewImg = getTmpPreviewPath()
        this.titleRef = React.createRef();
    }

    onCancelClick() {
        const { onCancel } = this.props.functions;
        onCancel();
    }


    onUploadMoreClick() {
        const { showAddScenes } = this.props.functions
        showAddScenes()
    }

    async onConfirmClick() {
        const { tmpImgStatus } = this.state
        const { onCancel, addScene, updateGroup } = this.props.functions;
        const { groupItem } = this.props

        const title = this.titleRef.value.trim();

        if (title.length > 0 && tmpImgStatus == 'ready') {
            let sceneId = `scene_${new Hashid().encode()}`
            const { vrId, groupId } = this.props
            const { onCancel, addScene, updateGroup } = this.props.functions

            let err = await copyImageToScene(getScenePath(sceneId))
            if (!err) {
                let selectIds = (groupItem.sceneListIds || []).concat([sceneId])
                let newGroupItem = { ...groupItem, sceneListIds: selectIds }
                await addScene({ id: sceneId, vrid: vrId, name: title, groupId })
                await updateGroup(newGroupItem)
            }
            onCancel()
        }
    }

    async onOpenFileClick() {
        let res = await openFolder()
        if (Array.isArray(res) && res[0] && res[0].indexOf('.jpg') >= 0) {
            this.setState({ tmpImgStatus: 'process' })
            await createPano(res[0])
            await Timer(800)
            this.setState({ tmpImgStatus: 'ready' })
        } else if (res != undefined && res != null) {
            console.log(res)
            alert('上传图片失败!请重试')
        }
    }

    renderUploadPic() {
        const { tmpImgStatus } = this.state
        if (tmpImgStatus != 'ready') {
            return (
                <div className={styles.imgContainer}>
                    {tmpImgStatus == 'empty' ? '等待上传' : '处理图片中 请稍候...'}
                </div>
            )
        } else {
            return (
                <div className={styles.imgContainer}>
                    <img className={styles.thumb} src={this.previewImg} />
                </div>
            )
        }
    }

    render() {
        return (
            <Dialog open={true}>
                <DialogTitle id="alert-dialog-title">{"创建场景"}</DialogTitle>
                <DialogContent style={{ width: '500px' }}>
                    <div style={{ display: 'inline-block', width: '50%', height: '160px' }}>
                        <TextField
                            placeholder="Placeholder"
                            margin="normal"
                            inputRef={(input) => this.titleRef = input}
                        />
                        <br />
                    </div>
                    <div style={{ display: 'inline-block', width: '50%', height: '260px', verticalAlign: 'top' }}>
                        <Button variant="contained" color="primary" style={{ marginLeft: '47px' }} onClick={this.onOpenFileClick.bind(this)}>{'添加全景'}</Button>
                        <Button variant="contained" color="primary" style={{ marginLeft: '140px', marginTop: '-60px' }} onClick={this.onUploadMoreClick.bind(this)}>{'批量上传'}</Button>
                        {this.renderUploadPic()}
                    </div>
                </DialogContent>
                <DialogActions>
                    <Button onClick={this.onCancelClick.bind(this)}>取消</Button>
                    <Button onClick={this.onConfirmClick.bind(this)}>确认</Button>
                </DialogActions>
            </Dialog>
        )
    }
}
