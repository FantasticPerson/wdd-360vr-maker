import React,{Component} from 'react'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { createSelector } from 'reselect'
import { createHashHistory } from 'history'

import styles from '../../../styles/VrContainer.css'

import FlatButton from '@material-ui/core/Button';

import {vrContainerConfig,getSelector} from '../../../store/getStore'

import generateVrFolder from '../../../native/generateVrFolder'
import copyImageToScene from '../../../native/copyImageToScene'
import getScenePath from '../../../native/getScenePath'


import * as vrActions from '../../../actions/vr'
import * as sceneActions from '../../../actions/scene'
import * as groupActions from '../../../actions/group'

import CreateVrModal from './CreateVrModal'
import VrItem from './vrItem'
import getPathOfPreviewImg from '../../../native/getPathOfPreviewImg'
import VrContextMenu from './VrContextMenu'

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
    }

    renderContent(){
        const {vrListToShow} = this.props

        if(vrListToShow.length > 0){
            let vrItems =  vrListToShow.map((item,index)=>{
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

    onAddClick(){
        this.setState({showCreateVrModal:true,vrContextItem:null})
    }

    onCancelClick(){
        this.setState({showCreateVrModal:false,vrContextItem:null})
    }

    renderCreateVrModal(){
        if(this.state.showCreateVrModal){
            const {vrContextItem} = this.state
            const {addScene,addVr,modifyVr,addGroup} = this.props
            const functions = {
                addScene,
                addVr,
                modifyVr,
                addGroup,
                onCancel:this.onCancelClick.bind(this)
            }

            return (
                <CreateVrModal data={vrContextItem} functions={functions}></CreateVrModal>
            )
        }
    }

    hideVrContext(){
        this.setState({showVrContextMenu:false})
    }

    onVrItemContext(e,data){
        e.preventDefault()
        this.setState({
            showVrContextMenu:true,
            vrContextItem:data,
            contextPosData:{posX:e.clientX,posY:e.clientY}
        })
    }

    onModify(){
        this.setState({showCreateVrModal:true})
    }

    renderVrContextMenu(){
        if(this.state.showVrContextMenu){
            const {contextPosData,vrContextItem} = this.state
            const {delVr} = this.props
            const functions = {
                delVr,
                onModify:this.onModify.bind(this),
                onHide:this.hideVrContext.bind(this)
            }
            return (
                <VrContextMenu posData={contextPosData} data={vrContextItem} functions={functions}></VrContextMenu>
            )
        }
    }

    render(){
        return (
            <div className={styles.container}>
                <div className={styles.header}>
                    <div style={{paddingLeft:'10px'}} onClick={()=>{this.onAddClick()}}>
                        <i className={"fa fa-plus "+styles.plusIcon}/>
                        <FlatButton color="primary" style={{height:'30px',lineHeight:'30px',paddingLeft:'32px',marginTop:'-4px'}}>创建全景</FlatButton>
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

function mapDispatchToProps(dispatch){
    return {
        ...bindActionCreators(vrActions,dispatch),
        ...bindActionCreators(sceneActions,dispatch),
        ...bindActionCreators(groupActions,dispatch)
    }
}

export default connect(getSelector(vrContainerConfig),mapDispatchToProps)(VrContainer)
