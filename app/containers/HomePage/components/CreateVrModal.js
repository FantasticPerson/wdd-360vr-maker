import React, { Component } from 'react';

import styles from '../../../styles/CreateVrModal.css'

import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import openFolder from '../../../native/openFolder'
import checkPicValid from '../../../native/checkPicValid'
import copyFileToTmp from '../../../native/copyFileToTmp'
import getPathOfPreviewImg from '../../../native/getPathOfPreviewImg'

import copyImageToScene from '../../../native/copyImageToScene'

import Hashid from '../../../utils/generateHashId'

import createPano from '../../../utils/createPano'

import checkVrCoverValid from '../../../utils/checkVrCoverValid'

import {getScenePath,getHeadImgUrl,getTmpPreviewPath} from '../../../native/pathUtils'

import {moveImgToImage,copyImagaToTmpImage,copyImageTmpToImage} from '../../../utils/copyUtil'

import {getTmpImagePath,getImagePath} from '../../../native/pathUtils'


export default class CreateVrModal extends Component {
    constructor() {
        super();
        this.state = {tmpImgStatus:false,imgName:null}
        

        this.titleRef = React.createRef();
        this.summaryRef = React.createRef();
    }

    onCancelClick() {
        this.props.functions.onCancel();
    }

    onConfirmClick() {
        const { tmpImgStatus,imgName } = this.state

        const title = this.titleRef.value.trim();
        const brief = this.summaryRef.value.trim();

        if (title.length > 0) {
            const {data} = this.props
            if(!data){
                if(tmpImgStatus){
                    const {addVr,onCancel,addGroup,addPicture} = this.props.functions
        
                    let id = `vr_${new Hashid().encode()}`
                    let sceneId = `scene_${new Hashid().encode()}`
                    let groupId = `group_${new Hashid().encode()}`
                    let previewImg = imgName ? getImagePath(imgName) : null
                    

                    let arr = imgName.split('.')
                    let picItem = {
                        id:arr[0],
                        extension:arr[1]
                    }
                    addPicture(picItem)

                    copyImageTmpToImage(imgName)

                    setTimeout(()=>{
                        addVr({title,brief,headImg:previewImg,music1:null,music2:null,id})
                        addGroup('默认',id,groupId)
                    },500)
                }
            } else {
                const {modifyVr} = this.props.functions
                modifyVr({...data,title:title,brief:brief})
            }
            setTimeout(()=>{
                this.props.functions.onCancel()
            },50)
        }
    }

    onOpenFileClick(){
        openFolder(['openFile'],[{name: 'Images', extensions: ['jpg', 'png', 'gif']}])
        .then((res)=>{
            if(res[0]){
                return checkVrCoverValid(res[0])
            } else {
                return new Promise.reject()
            }
        })
        .then((path)=>{
            return copyImagaToTmpImage(path)
        })
        .then((name)=>{
            setTimeout(()=>{
                this.setState({tmpImgStatus:true,imgName:name})
            },800)
        })
        .catch((err)=>{
            console.error(err)
            alert(err)
        })
    }

    renderUploadPic(){
        const {tmpImgStatus,imgName} = this.state
        if(!tmpImgStatus){
            return <div className={styles.imgContainer}><br/><br/><span>{'上传封面'}</span><br/><span>{'大小:512*512'}</span></div>
        } else {
            let imgPath = getTmpImagePath(imgName)
            
            return (
                <div className={styles.imgContainer}>
                    <img className={styles.thumb} src={imgPath}/>
                </div>
            )
        }
    }

    render() {
        const {data} = this.props;
        let width = data ? '100%' : '50%'
        let picDisplay = data ? 'none' : 'inline-block'
        let title = data ? '编辑作品' : '创建作品'
        let defaultName = data ? data.title : ''
        let defaultBrief = data ? data.brief : ''

        return (
            <Dialog open>
                <DialogTitle>{title}</DialogTitle>
                <DialogContent style={{width:'500px'}}>
                    <div style={{display:'inline-block',width:width,height:'160px'}}>
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
                    <div style={{display:picDisplay,width:'50%',height:'260px',verticalAlign:'top'}}>
                        <Button color="primary" style={{marginLeft:'47px'}} onClick={this.onOpenFileClick.bind(this)}>{'添加封面'}</Button>
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
