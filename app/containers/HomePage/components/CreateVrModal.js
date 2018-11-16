import React, { Component } from 'react';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import openFolder from '../../../native/openFolder'
import checkPicValid from '../../../native/checkPicValid'
import copyFileToTmp from '../../../native/copyFileToTmp'
import copyImageToScene from '../../../native/copyImageToScene'
import Hashid from '../../../utils/generateHashId'
import createPano from '../../../utils/createPano'
import checkVrCoverValid from '../../../utils/checkVrCoverValid'
import { getScenePath, getHeadImgUrl, getTmpPreviewPath } from '../../../native/pathUtils'
import { moveImgToImage, copyImagaToTmpImage, copyImageTmpToImage } from '../../../utils/copyUtil'
import { getTmpImagePath, getImagePath } from '../../../native/pathUtils'
import styles from '../../../styles/CreateVrModal.css'

export default class CreateVrModal extends Component {
    constructor() {
        super();
        this.state = { tmpImgStatus: false, imgName: null }

        this.titleRef = React.createRef();
        this.summaryRef = React.createRef();
    }

    onCancelClick() {
        this.props.functions.onCancel();
    }

    async onConfirmClick() {
        const { data } = this.props
        const { tmpImgStatus, imgName } = this.state
        const { addVr, onCancel, addGroup, addPicture, modifyVr } = this.props.functions
        const title = this.titleRef.value.trim();
        const brief = this.summaryRef.value.trim();

        let previewImg = null

        if (title.length == 0) return

        if (imgName) {
            let arr = imgName.split('.')
            let picItem = { id: arr[0], extension: arr[1] }

            previewImg = imgName

            await copyImageTmpToImage(imgName)
            await addPicture(picItem)
        }
        if (data) {
            previewImg = previewImg ? previewImg : data.headImg

            await modifyVr({ ...data, title: title, brief: brief, headImg: previewImg })
        } else {
            let id = `vr_${new Hashid().encode()}`
            let sceneId = `scene_${new Hashid().encode()}`
            let groupId = `group_${new Hashid().encode()}`

            await addGroup('默认', id, groupId)
            await addVr({ title, brief, headImgId: previewImg, music1: null, music2: null, id })
        }
        onCancel()
    }

    async addPoster() {
        let res = await openFolder(['openFile'], [{ name: 'Images', extensions: ['jpg', 'png', 'gif'] }])
        if (!res || !res[0]) {
            alert('上传失败！')
            return
        }
        let path = await checkVrCoverValid(res[0])
        let name = await copyImagaToTmpImage(path)
        this.setState({ tmpImgStatus: true, imgName: name })
    }

    renderUploadPic() {
        const { tmpImgStatus, imgName } = this.state
        const { data } = this.props
        if (!tmpImgStatus && (!data || !data.headImg)) {
            return <div className={styles.imgContainer}><br /><br /><span>{'上传封面'}</span><br /><span>{'大小:512*512'}</span></div>
        } else {
            let imgPath = imgName ? getTmpImagePath(imgName) : (data.headImg ? getImagePath(data.headImg) : '')
            return (
                <div className={styles.imgContainer}>
                    <img className={styles.thumb} src={imgPath} />
                </div>
            )
        }
    }

    render() {
        const { data } = this.props;
        let title = data ? '编辑作品' : '创建作品'
        let defaultName = data ? data.title : ''
        let defaultBrief = data ? data.brief : ''

        return (
            <Dialog open>
                <DialogTitle>{title}</DialogTitle>
                <DialogContent style={{ width: '500px' }}>
                    <div style={{ display: 'inline-block', width: '50%', height: '160px' }}>
                        <TextField
                            label="请输入作品名称"
                            placeholder="请输入作品名称"
                            margin="normal"
                            inputRef={(input) => this.titleRef = input}
                            defaultValue={defaultName}
                        />
                        <br />
                        <TextField
                            label="请输入作品简介"
                            placeholder="请输入作品简介"
                            margin="normal"
                            inputRef={(input) => this.summaryRef = input}
                            defaultValue={defaultBrief}
                            multiline rows={2} rowsMax={4}
                        />
                    </div>
                    <div style={{ display: 'inline-block', width: '50%', height: '260px', verticalAlign: 'top' }}>
                        <Button color="primary" style={{ marginLeft: '47px' }} onClick={this.addPoster.bind(this)}>{'添加封面'}</Button>
                        {this.renderUploadPic()}
                    </div>
                </DialogContent>
                <DialogActions>
                    <Button onClick={this.onCancelClick.bind(this)}>取消</Button>,
                    <Button onClick={this.onConfirmClick.bind(this)}>确认</Button>
                </DialogActions>
            </Dialog>
        )
    }
}
