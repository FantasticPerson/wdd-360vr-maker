import React,{Component} from 'react'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {createSelector} from 'reselect'
import { createHashHistory } from 'history'
import generateVrFolder from '../../../native/generateVrFolder'
import copyImageToScene from '../../../native/copyImageToScene'
import getScenePath from '../../../native/getScenePath'


import {vrContainerConfig,getSelector} from '../../../store/getStore'

import FlatButton from '@material-ui/core/Button';

import styles from '../../../styles/VrContainer.css'
import * as vrActions from '../../../actions/vr'
import * as sceneActions from '../../../actions/scene'
import CreateVrModal from './CreateVrModal'
import VrItem from './vrItem'
import getPathOfPreviewImg from '../../../native/getPathOfPreviewImg'
import VrContextMenu from './VrContextMenu'
import mapToReactComponent from '../../../utils/mapToReactComponent'

class VrContainer extends Component{
    constructor(){
        super()
        this.state = {
            showCreateVrModal:false,
            showVrContextMenu:false,
            vrContextItem:null,
            contextPosData:{}
        }
        this.history = createHashHistory()
        mapToReactComponent(this,vrModalContext)
        mapToReactComponent(this,vrItemContextObj)
    }

    getVrByFolderId(){
        const {folderSelectedId,vrList} = this.props
        return vrList.filter((item)=>{
            return item.folderId === folderSelectedId
        })
    }

    renderContent(){
        console.log(this.props)
        let  vrArr = this.getVrByFolderId()


        if(vrArr.length > 0){
            let vrItems =  vrArr.map((item,index)=>{
                   return <VrItem key={index}  onContextMenu={this.onVrItemContext.bind(this)} history={this.history} data={item}></VrItem>     
            })
            for(var i=0;i<20;i++){
                vrItems.push(<div key={`placeHolder${i}`} style={{width:'230px',height:'0'}}></div>)
            }
            return vrItems
        } else {
            return <h3>{`暂无内容，点击左上角按钮进行添加！`}</h3>
        }
    }

    render(){
        return (
            <div className={styles.container}>
                <div className={styles.header}>
                    <div style={{paddingLeft:'10px'}} onClick={()=>{this.onAddClick()}}>
                        <i className={"fa fa-plus "+styles.plusIcon}/>
                        <FlatButton color="primary"  style={{height:'30px',lineHeight:'30px',paddingLeft:'32px',marginTop:'-4px'}}>
                            创建全景
                        </FlatButton>
                        {/* <FlatButton primary={true} label="创建全景" style={{height:'30px',lineHeight:'30px',paddingLeft:'20px'}}/> */}
                    </div>
                </div>
                <div className={styles.content}>
                    {this.renderContent()}         
                </div>
                {this.renderCreateVrModal()}
                {this.renderVrContextMenu()}
            </div>
        )
    }
}

let vrItemContextObj = {
    showVrContext(){
        this.setState({
            showVrContextMenu:true
        })
    },
    hideVrContext(){
        this.setState({
            showVrContextMenu:false
        })
    },
    onVrItemContext(e,data){
        e.preventDefault()
        this.setState({
            showVrContextMenu:true,
            vrContextItem:data,
            contextPosData:{
                posX:e.clientX,
                posY:e.clientY
            }
        })
    },
    bgClick(){
        this.hideVrContext()
    },
    onDelete(){
        const {delVr} = this.props;
        const {vrContextItem} = this.state
        delVr(vrContextItem)
    },
    onModify(){
        this.setState({
            showCreateVrModal:true
        })
    },
    renderVrContextMenu(){
        const {showVrContextMenu,contextPosData} = this.state
        if(showVrContextMenu){
            return (
                <VrContextMenu posData={contextPosData} bgClick={this.bgClick.bind(this)} onDelete={this.onDelete.bind(this)} onModify={this.onModify.bind(this)}></VrContextMenu>
            )
        }
    }
}

let vrModalContext={
    onAddClick(){
        this.setState({
            showCreateVrModal:true
        })
    },

    onCancelClick(){
        this.setState({
            showCreateVrModal:false,
            vrContextItem:null
        })
    },

    onCreateClick(title,brief,isTmpImageReady){
        const {vrContextItem} = this.state
        if(!vrContextItem){
            const {nextVrId,nextSceneId,folderSelectedId,addScene,addVr} = this.props

            let previewImg = getPathOfPreviewImg(false,nextVrId,folderSelectedId,nextSceneId)

            addVr({
                id:nextVrId,
                title:title,
                brief:brief,
                folderId:folderSelectedId,
                headImg:previewImg
            })

            addScene({
                id:nextSceneId,
                vrid:nextVrId,
                name:'test'
            })

            setTimeout(()=>{
                generateVrFolder(folderSelectedId,nextVrId,nextSceneId)
                .then(()=>{
                    return copyImageToScene(getScenePath(folderSelectedId,nextVrId,nextSceneId))
                })
                .catch((e)=>{
                    console.error(e)
                })
            },20)
        } else {
            const {modifyVr} = this.props
            modifyVr({
                ...vrContextItem,
                title:title,
                brief:brief
            })
        }
        this.onCancelClick()
    },
    renderCreateVrModal(){
        const {showCreateVrModal,vrContextItem} = this.state
        // if(showCreateVrModal){
            return (
                <CreateVrModal show={showCreateVrModal} itemData={vrContextItem} onCancel={this.onCancelClick.bind(this)} onCreate={this.onCreateClick.bind(this)}></CreateVrModal>
            )
        // }
    }
}

function mapDispatchToProps(dispatch){
    return {
        ...bindActionCreators(vrActions,dispatch),
        ...bindActionCreators(sceneActions,dispatch)
    }
}

export default connect(getSelector(vrContainerConfig),mapDispatchToProps)(VrContainer)
