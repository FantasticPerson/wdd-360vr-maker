import React,{Component} from 'react'
import styles from '../styles/SceneList.css'
import getPathOfSceneHeadImg from '../native/getPathOfSceneHeadImg'
import SceneContextMenu from './SceneContextMenu'
import EditSceneModal from './EditSceneModal'
import MapToReactComponent from '../utils/mapToReactComponent'
import CreateSceneModal from './createSceneModal'
import copyImageToScene from '../native/copyImageToScene'
import getScenePath from '../native/getScenePath'
import generateVrFolder from '../native/generateVrFolder'

class SceneItem extends Component{
    onContextMenu(e){
        const {onContext,data} = this.props
        onContext(e,data)
    }

    onItemClick(){
        const {changeScene,data,previewSceneId} = this.props
        if(previewSceneId != data.id){
            changeScene(data.id)
        }
    }

    render(){
        const {data,vrId,folderId,changeScene,previewSceneId} = this.props;

        let className = `${styles.scene} ${data.id == previewSceneId ? styles.selected : ''}`
        return (
            <div className={styles.sceneContainer} onContextMenu={(e)=>{this.onContextMenu(e)}} onClick={this.onItemClick.bind(this)}>
                <div className={className}>
                    <img style={{height:'100%'}} src={getPathOfSceneHeadImg(folderId,vrId,data.id)}></img>
                </div>
                <div className={styles.name}>{data.name}</div>
            </div>
        )
    }
}

export default class SceneList extends Component{
    constructor() {
        super()
        MapToReactComponent(this,sceneMenuObj)
        MapToReactComponent(this,sceneModalObj)
        MapToReactComponent(this,createSceneObj)
        this.state = {
            showMenu:false,
            posData:{},
            contextSceneData:{},
            showEditModal:false,
            showCreateScene:false
        }
    }

    onAddSceneClick(){
        this.setState({
            showCreateScene:true
        })
    }

    renderAddSceneBtn(){
        return (
            <div className={styles.addBtnContainer} onClick={this.onAddSceneClick.bind(this)}>
                <div className={`fa fa-plus`}></div>
                <div className={styles.addScene}>添加场景</div>
            </div>
        )
    }

    render(){
        const {sceneList,vrId,folderId,changeScene,previewSceneId} = this.props

        let sceneItemList = sceneList.map((item,index)=>{
            return <SceneItem previewSceneId={previewSceneId} changeScene={changeScene} onContext={this.onSceneContext.bind(this)} key={item.id} data={item} vrId={vrId} folderId={folderId}></SceneItem>
        })
        return (
            <div>
                <div>{sceneItemList}{this.renderAddSceneBtn()}</div>
                {this.renderContextMenu()}
                {this.renderEditModal()}
                {this.renderCreateModal()}
            </div>
        )
    }
}

let createSceneObj={
    onCreate(name,imgReady){
        const {nextSceneId,addScene,vrId,folderId} = this.props
        
        generateVrFolder(folderId,vrId,nextSceneId)
        .then(()=>{
            return copyImageToScene(getScenePath(folderId,vrId,nextSceneId))
        })
        .then(()=>{
            setTimeout(()=>{
                addScene({
                    id:nextSceneId,
                    vrid:vrId,
                    name:name
                })
            },20) 
        })
        .catch((e)=>{
            console.error(e)
        })
        
        this.onCancel()
    },
    onCancel(){
        this.setState({
            showCreateScene:false
        })        
    },
    renderCreateModal(){
        const {showCreateScene} = this.state
        if(showCreateScene){
            return (
                <CreateSceneModal onCreate={this.onCreate.bind(this)} onCancel={this.onCancel.bind(this)}></CreateSceneModal>
            )
        }
    }
}

let sceneModalObj={
    onEditConfirm(value){
        const {modifyScene} = this.props
        const {contextSceneData} = this.state
        modifyScene({
            ...contextSceneData,
            name:value
        })
        this.onEditCancel()
    },

    onEditCancel(){
        this.setState({
            showEditModal:false
        })
    },

    renderEditModal(){
        const {showEditModal,contextSceneData} = this.state
        if(showEditModal){
            return (
                <EditSceneModal onCancel={this.onEditCancel.bind(this)} onModify={this.onEditConfirm.bind(this)} itemData={contextSceneData}></EditSceneModal>
            )
        }
    }
}

let sceneMenuObj={
    onSceneContext(e,item){
        e.preventDefault()
        e.stopPropagation()
        const {sceneList} = this.props
        this.setState({
            showMenu:true,
            posData:{
                posX:e.clientX,
                posY:e.clientY
            },
            contextSceneData:item
        })
    },

    onContextBgClick(){
        this.setState({
            showMenu:false
        })
    },

    onHideContextMenu(){
        this.setState({
            showMenu:false
        })
    },

    handleDeleteScene(){
        const {contextSceneData} = this.state
        this.onHideContextMenu()
    },

    handleEditScene(){
        const {contextSceneData} = this.state

        this.onHideContextMenu()
        this.setState({
            showEditModal:true
        })
    },

    renderContextMenu(){
        const {showMenu,posData,contextSceneData} = this.state
        if(showMenu){
            return (
                <SceneContextMenu posData={posData} sceneData={contextSceneData} bgClick={this.onContextBgClick.bind(this)} onDelete={this.handleDeleteScene.bind(this)} onModify={this.handleEditScene.bind(this)}></SceneContextMenu>
            )
        }
    }
}