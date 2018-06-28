import React,{Component} from 'react'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { createHashHistory } from 'history'
import {createSelector} from 'reselect'

import getNextId from '../utils/getNextId'
import SceneList from './SceneList'
import * as sceneActions from '../actions/scene'

import styles from '../styles/editSceneContainer.css'


import {editSceneConfig,getSelector} from '../store/getStore'

import { debug } from 'util';

class EditSceneContainer extends Component{
    constructor(){
        super()
        this.history = createHashHistory()
        this._isMounted = false
        this.state = {containerWidth:''}
    }

    componentDidMount(){
        this._isMounted = true
        setTimeout(()=>{
            const {sceneList,updateSceneSelected,vrId,folderId} = this.props;
            if(sceneList.length > 0){
                updateSceneSelected(sceneList[0].id)
            }
        },50)

        const containerWidth = window.innerWidth - 280
        this.setState({containerWidth:containerWidth})

        window.onresize = () => {
            if(this._isMounted){
                const containerWidth = window.innerWidth - 280
                this.setState({containerWidth:containerWidth})
            }
        }
    }
    
    componentWillUnmount() {
        this._isMounted = false
        window.onresize = null
    }
    

    sceneClickHandler(id){
        const {onSceneClick} = this.props
        onSceneClick(id)
    }
    
    render(){
        const {modifyScene,addScene,nextSceneId,sceneSelected,folderId,vrId,sceneList} = this.props

        const {containerWidth} = this.state

        return (
            <div className={styles.container}>
                <div className={styles.content} style={{width:containerWidth+'px',overflowX:'auto',overflowY:'hidden'}}>
                    <SceneList changeScene={this.sceneClickHandler.bind(this)} previewSceneId={sceneSelected} nextSceneId={nextSceneId} modifyScene={modifyScene} addScene={addScene} sceneList={sceneList} vrId ={vrId} folderId={folderId}></SceneList>
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

export default connect(getSelector(editSceneConfig),mapDispatchToProps)(EditSceneContainer);