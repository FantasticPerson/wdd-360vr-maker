import React, { Component } from 'react'

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

import styles from '../../../styles/createScenesModal.css'
import { resolve } from 'dns';

export default class CreateScenes extends Component{
    constructor(){
        super()
        this.state = {isLoading:false,totalNum:0,completeNum:0}
    }

    componentDidMount(){
        
    }

    renderContent(){
        if(this.state.isLoading){
            return <div>正在下载，总数{this.state.totalNum}，已完成{this.state.completeNum}</div>
        } else {
            return <Button onClick={this.onOpenFolderClick.bind(this)} variant="contained" color="primary">选择文件夹</Button>
        }
    }

    onOpenFolderClick(){
        openFolder(['multiSelections'],[{name: 'Images', extensions: ['jpg']}])
        .then((res)=>{
            
            console.log(res)
            if(res.length > 0){
                let picArr = res
                var path = window.native_require('path')
                let idx = 0
                let that = this
                
                this.setState({isLoading:true,totalNum:picArr.length})
                upload()
                
                function upload(){
                    if(idx >= picArr.length){
                        console.log('上传完成')
                        that.onCancelClick()
                        return
                    }
                    let promise = new Promise((resolve,reject)=>{
                        try{
                            let sPath = picArr[idx++]
                            createPano(sPath)
                            .then(()=>{
                                console.log(that)
                                that.setState({completeNum:idx})
                                let sceneId = `scene_${new Hashid().encode()}`
                                const {vrId,groupId,groupItem} = that.props
                                const {addScene,updateGroup} = that.props.functions
                               
                                copyImageToScene(getScenePath(sceneId))
                                .then(()=>{
                                    setTimeout(() => {
                                        addScene({
                                            id:sceneId,
                                            vrid:vrId,
                                            name:'默认',
                                            groupId
                                        })  
                                        
                                        let selectIds = groupItem.sceneListIds || []
                                        selectIds.push(sceneId)
                                        let newGroupItem = {...groupItem,sceneListIds:selectIds}
                                        updateGroup(newGroupItem) 
                                    }, 800);
                                    
                                })
                                resolve()
                            })
                            .catch((e)=>{
                                reject(e)
                            })
                            
                        } catch(e){
                            reject(e)
                        }
                    })
                    promise.then(()=>{
                        upload()
                    })
                    .catch((err)=>{
                        alert(err)
                        that.onCancelClick()
                    })
                }
            }
        })
    }

    onCancelClick(){
        const {onCancel} = this.props.functions
        onCancel()
    }

    render(){
        return (
            <Dialog open={true}>
                <DialogTitle id="alert-dialog-title">{"批量创建场景"}</DialogTitle>
                <DialogContent style={{width:'500px'}}>
                    {this.renderContent()}
                </DialogContent>
                <DialogActions>
                    <Button onClick={this.onCancelClick.bind(this)}>取消</Button>,
                </DialogActions>
            </Dialog>
        )
    }
}