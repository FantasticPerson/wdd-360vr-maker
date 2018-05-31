import React,{Component} from 'react'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { createHashHistory } from 'history'
import {createSelector} from 'reselect'

import getNextId from '../utils/getNextId'
import SceneList from './SceneList'
import * as sceneActions from '../actions/scene'

import styles from '../styles/editSceneContainer.css'
import { debug } from 'util';

class EditSceneContainer extends Component{
    constructor(){
        super()
        this.history = createHashHistory()
    }

    componentDidMount(){
        setTimeout(()=>{
            const {sceneList,updateSceneSelected} = this.props;
            if(sceneList.length > 0){
                updateSceneSelected(sceneList[0].id)
            }
        },50)
    }

    filterScene() {
        const {vrId,sceneList} = this.props
        return sceneList.filter((item)=>{
            return item.vrid == vrId
        })
    }

    onSceneClick(id){
        let folderId = this.findFolderId()
        const {updateSceneSelected,vrId} = this.props
        updateSceneSelected(id,vrId,folderId)
    }

    findFolderId(){
        const {vrId,vrList} = this.props
        let item = vrList.find((item)=>{
            return item.id == vrId
        })
        return item ? item.folderId : -1
    }
    
    render(){
        const {modifyScene,addScene,nextSceneId,sceneSelected} = this.props
        const {vrId} = this.props
        let folderId = this.findFolderId()
        let sceneArr = this.filterScene()

        return (
            <div className={styles.container}>
                <div className={styles.content}>
                    <SceneList changeScene={this.onSceneClick.bind(this)} previewSceneId={sceneSelected} nextSceneId={nextSceneId} modifyScene={modifyScene} addScene={addScene} sceneList={sceneArr} vrId ={vrId} folderId={folderId}></SceneList>
                </div>
            </div>
        )
    }
}

function mapDispatchToProps(dispatch){
    return {
        ...bindActionCreators(sceneActions,dispatch),
    }
}

const selector = createSelector(
    state => state.scene.list,
    state => state.scene.sceneSelected,
    state => state.vr.list,
    (sceneList,sceneSelected,vrList) => {
        return {
            sceneList:sceneList,
            vrList:vrList,
            sceneSelected:sceneSelected,
            nextSceneId:getNextId(sceneList,'id',0)
        }
    }
)

export default connect(selector,mapDispatchToProps)(EditSceneContainer);