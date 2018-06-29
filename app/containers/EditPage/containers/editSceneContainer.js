import React,{Component} from 'react'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import styles from '../../../styles/editSceneContainer.css'

import * as sceneActions from '../../../actions/scene'

import {getHeadImgUrl,getScenePath} from '../../../native/pathUtils'
import {editSceneConfig,getSelector} from '../../../store/getStore'

import CreateSceneModal from './createSceneModal'
import EditSceneModal from './EditSceneModal'
import SceneContextMenu from './SceneContextMenu'

class EditSceneContainer extends Component{
    constructor(){
        super()
        this._isMounted = false
        this.state = {
            containerWidth:'',
            showMenu:false,
            posData:{},
            contextSceneData:{},
            showEditModal:false,
            showCreateScene:false
        }
    }

    componentDidMount(){
        this._isMounted = true
        setTimeout(()=>{
            const {sceneList,updateSceneSelected} = this.props;
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
        const {updateSceneSelected,sceneSelected} = this.props
        if(id != sceneSelected){
            updateSceneSelected(id)
        }
    }

    onAddSceneClick(){
        this.setState({showCreateScene:true})
    }

    renderSceneList(){
        const {sceneList,sceneSelected} = this.props
        const cWidth = sceneList.length * 105 + 90 +'px'

        let sceneItemList = sceneList.map((item,index)=>{
            let className = `${styles.scene} ${item.id == sceneSelected ? styles.selected : ''}`
            return (
                <div className={styles.sceneContainer} key={item.id} onContextMenu={(e)=>this.onSceneContext(e,item)} onClick={()=>this.sceneClickHandler(item.id)}>
                    <div className={className}>
                        <img style={{height:'100%'}} src={getHeadImgUrl(item.id)}></img>
                    </div>
                    <div className={styles.name}>{item.name}</div>
                </div>
            )
        })

        return (
            <div style={{width:cWidth}}>
                {sceneItemList}
                <div className={styles.addBtnContainer} onClick={this.onAddSceneClick.bind(this)}>
                    <div className={`fa fa-plus`}></div>
                    <div className={styles.addScene}>添加场景</div>
                </div>
            </div>
        )
    }

    onCancelCreateModal(){
        this.setState({showCreateScene:false})        
    }

    renderCreateModal(){
        if(this.state.showCreateScene){
            const {addScene,vrId} = this.props
            const functions = {
                onCancel:this.onCancelCreateModal.bind(this),
                addScene
            }
            return (
                <CreateSceneModal functions={functions} vrId={vrId}></CreateSceneModal>
            )
        }
    }

    onEditCancel(){
        this.setState({showEditModal:false})
    }

    renderEditModal(){
        const {showEditModal,contextSceneData} = this.state
        if(showEditModal){
            const {modifyScene} = this.props
            return (
                <EditSceneModal onCancel={this.onEditCancel.bind(this)} onModify={modifyScene} itemData={contextSceneData}></EditSceneModal>
            )
        }
    }

    onSceneContext(e,item){
        e.preventDefault()
        e.stopPropagation()
        this.setState({
            showMenu:true,
            posData:{posX:e.clientX,posY:e.clientY},
            contextSceneData:item
        })                      
    }

    onHideContextMenu(){
        this.setState({showMenu:false})
    }

    handleEditScene(){
        this.setState({showEditModal:true})
    }

    renderContextMenu(){
        if(this.state.showMenu){
            const {posData,contextSceneData} = this.state
            const {delScene} = this.props
            const functions = {
                delScene,
                onHide:this.onHideContextMenu.bind(this),
                showEdit:this.handleEditScene.bind(this)
            }
            return (
                <SceneContextMenu posData={posData} sceneData={contextSceneData} functions={functions}></SceneContextMenu>
            )
        }
    }

    render(){
        const {containerWidth} = this.state

        return (
            <div className={styles.container}>
                <div className={styles.content} style={{width:containerWidth+'px',overflowX:'auto',overflowY:'hidden'}}>
                    {this.renderSceneList()}
                    {this.renderContextMenu()}
                    {this.renderEditModal()}
                    {this.renderCreateModal()}
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