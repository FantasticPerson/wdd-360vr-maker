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
import createPano from '../../../utils/createPano'

import {getScenePath,getHeadImgUrl,getTmpPreviewPath} from '../../../native/pathUtils'

import copyImageToScene from '../../../native/copyImageToScene'

import Hashid from '../../../utils/generateHashId'

import styles from '../../../styles/createSceneModal.css'

export default class CreateVrModal extends Component {
    constructor() {
        super();
        this.state = {tmpImgStatus:'empty'}
        this.previewImg = getTmpPreviewPath()

        this.titleRef = React.createRef();
    }

    onCancelClick() {
        const { onCancel } = this.props.functions;

        onCancel();
    }


    onUploadMoreClick(){
        const {showAddScenes} = this.props.functions
        showAddScenes()
    }

    onConfirmClick() {
        const {tmpImgStatus} = this.state
        const { onCancel,addScene,updateGroup } = this.props.functions;
        const {groupItem} = this.props

        const title = this.titleRef.value.trim();

        if (title.length > 0 && tmpImgStatus == 'ready') {
            let sceneId = `scene_${new Hashid().encode()}`
            const {vrId,groupId} = this.props
            const {onCancel,addScene,updateGroup} = this.props.functions
            
            copyImageToScene(getScenePath(sceneId))
            .then(()=>{
                setTimeout(()=>{
                    addScene({
                        id:sceneId,
                        vrid:vrId,
                        name:title,
                        groupId
                    })
                    let selectIds = groupItem.sceneListIds || []
                    selectIds.push(sceneId)
                    let newGroupItem = {...groupItem,sceneListIds:selectIds}
                    updateGroup(newGroupItem)
                },20) 
            })
            .catch((e)=>{
                console.error(e)
            })
        
            onCancel()
        }
    }

    onOpenFileClick(){
        openFolder()
        .then((res)=>{
            if(res[0] && res[0].indexOf('.jpg') >= 0){
                this.setState({tmpImgStatus:'process'})
                return createPano(res[0])
            } else {
                return new Promise.reject()
            }
        })
        .then(()=>{
            setTimeout(()=>{
                this.setState({tmpImgStatus:'ready'})
            },800)
        })
        .catch((err)=>{
            console.error(err)
            alert('上传图片失败!请重试')
        })
    }

    renderUploadPic(){
        const {tmpImgStatus} = this.state
        if(tmpImgStatus != 'ready'){
            return <div className={styles.imgContainer}>{tmpImgStatus == 'empty' ? '等待上传' : '处理图片中 请稍候...'}</div>
        } else {
            return (
                <div className={styles.imgContainer}>
                    <img className={styles.thumb} src={this.previewImg}/>
                </div>
            )
        }
    }

    render() {
        return (
            <Dialog
                open={true}
            >
                <DialogTitle id="alert-dialog-title">{"创建场景"}</DialogTitle>
                <DialogContent style={{width:'500px'}}>
                    <div style={{display:'inline-block',width:'50%',height:'160px'}}>
                        <TextField
                            placeholder="Placeholder"
                            margin="normal"
                            inputRef={(input) => this.titleRef = input}
                        />
                        <br />
                    </div>
                    <div style={{display:'inline-block',width:'50%',height:'260px',verticalAlign:'top'}}>
                        <Button  variant="contained" color="primary"style={{marginLeft:'47px'}} onClick={this.onOpenFileClick.bind(this)}>{'添加全景'}</Button>
                        <Button  variant="contained" color="primary"style={{    marginLeft: '140px',marginTop: '-60px'}} onClick={this.onUploadMoreClick.bind(this)}>{'批量上传'}</Button>
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
