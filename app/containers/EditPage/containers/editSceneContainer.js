import React,{Component} from 'react'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import styles from '../../../styles/editSceneContainer.css'

import * as sceneActions from '../../../actions/scene'
import * as groupActions from '../../../actions/group'

import {getHeadImgUrl,getScenePath} from '../../../native/pathUtils'
import {editSceneConfig,getSelector} from '../../../store/getStore'

import CreateSceneModal from './createSceneModal'
import CreateScenesModal from './CreateScenesModal'
import EditSceneModal from './EditSceneModal'
import SceneContextMenu from './SceneContextMenu'
import CreateGroupModal from './CreateGroupModal'
import ContextMenu from './groupContextMenu'
import GroupContextModal from './groupContextMenu';
import SceneMove from './sceneMove'

import {DragSource,DropTarget} from 'react-dnd'
import { DragDropContextProvider,DragDropContext } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'


@DragDropContext(HTML5Backend)
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
            showCreateScene:false,
            showCreateScenes:false,
            hasSelectedId:false,
            contextGroupData:null,
            showCreateGroup:false,
            showGroupContext:false,
            moveGroupList:[],
            showMove:false,
            sceneToMove:null
        }
        this.sceneListC = null
    }

    componentDidMount(){
        this._isMounted = true
        setTimeout(()=>{
            const {sceneList,updateSceneSelected,groupList,updateSelected} = this.props;
            if(sceneList.length > 0){
                updateSceneSelected(sceneList[0].id)
            }
            if(groupList.length > 0){
                updateSelected(groupList[0].id)
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

    componentWillReceiveProps(props){
        if(props.groupSelectId != this.props.groupSelectId){

            const {updateSceneSelected} = props
            if(props.sceneList.length > 0){
                updateSceneSelected(props.sceneList[0].id)
            } else {
                updateSceneSelected(null)
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

    onGroupClick(id){
        const {groupSelectId} = this.props
        if(groupSelectId != id){
            this.props.updateSelected(id)
        }
    }

    showCreateGroupModal(){
        this.setState({showCreateGroup:true})
    }

    hideCreateGroupModal(){
        this.setState({showCreateGroup:false,contextGroupData:null})
    }

    renderCreateGroupModal(){
        if(this.state.showCreateGroup){
            const {addGroup,updateGroup,vrId} = this.props
            const {contextGroupData} = this.state
            let functions = {
                addGroup,
                updateGroup,
                hideModal:this.hideCreateGroupModal.bind(this)
            }
            return (
                <CreateGroupModal functions={functions} vrId={vrId} itemData={contextGroupData}></CreateGroupModal>
            )
        }
    }

    onGroupContext(e,item){
        e.preventDefault()
        e.stopPropagation()
        this.setState({
            showGroupContext:true,
            posData:{posX:e.clientX,posY:e.clientY},
            contextGroupData:item
        })                      
    }

    hideGroupContext(){
        this.setState({
            showGroupContext:false
        })
    }

    renderGroupContext(){
        if(this.state.showGroupContext){
            const {contextGroupData,posData} = this.state
            const {deleteGroup,updateSelected,updateSceneSelected} = this.props

            let functions = {
                onHide:this.hideGroupContext.bind(this),
                showEdit:this.showCreateGroupModal.bind(this),
                deleteGroup,
                updateSceneSelected
            }

            const {groupList,allSceneList,groupSelectId} = this.props
            let groupSceneList = allSceneList.filter((item)=>{
                return item.groupId == contextGroupData.id
            })

            let canDelete = groupSceneList.length > 0 ? false : true
            if(groupList.length <= 1){
                canDelete = false
            }
            return (
                <GroupContextModal groupSelectId={groupSelectId} groupList={groupList} canDelete={canDelete} posData={posData} functions={functions} itemData={contextGroupData}></GroupContextModal>
            )
        }
    }

    renderGroup(){
        let normalStyle={
            display: 'inline-block',
            padding: '2px 5px',
            minWidth: '50px',
            border: '1px solid #eee',
            height: '30px',
            lineHeight: '30px',
            textAlign: 'center',
            margin: '0 3px',
            borderRadius: '5px',
            cursor:'pointer'
        }

        let addStyle = {
            display: 'inline-block',
            minWidth: '30px',
            textAlign:'center',
            height: '20px',
            lineHeight: '20px',
            border: '1px solid #336699',
            backgroundColor: '#eee',
            borderRadius: '5px',
            cursor:'pointer'
        }

        const {groupList,groupSelectId} = this.props
        if(groupList.length > 0){
            let item = groupList.find((item)=>{
                return item.id == groupSelectId
            })
            if(!item){
                this.props.updateSelected(groupList[0].id)
            }
        }
        return (
            <div style={{marginTop:'10px'}}>
                {
                    groupList.map((item)=>{
                        let styleObj = normalStyle
                        if(item.id == groupSelectId){
                            styleObj = {...styleObj,backgroundColor:'#eee'}
                        }
                        return <div onContextMenu={(e)=>{this.onGroupContext(e,item)}} className="group" onClick={()=>{this.onGroupClick(item.id)}} key={item.title} style={styleObj}>{item.title}</div>
                    })
                }
                <div onClick={this.showCreateGroupModal.bind(this)} style={addStyle}>+</div>
            </div>
        )
    }

    renderSceneList(){
        const {sceneList,sceneSelected} = this.props
        const cWidth = sceneList.length * 105 + 90 +'px'

        let sceneItemList = sceneList.map((item,index)=>{
            return <SceneItem onSceneContext={this.onSceneContext.bind(this)} sceneClickHandler={this.sceneClickHandler.bind(this)} item={item} key={item.id} sceneSelected={sceneSelected}></SceneItem>
        })

        return (
            
                <div style={{width:cWidth,height:'111px',overflow:'hidden',marginTop:'10px'}}>
                    {sceneItemList}
                    <div className={styles.addBtnContainer} onClick={this.onAddSceneClick.bind(this)}>
                        <div className={`fa fa-plus`}></div>
                        <div className={styles.addScene}>添加场景</div>
                    </div>
                </div>
        )
    }

    onMoveScene(data){
        const {groupList,groupSelectId} = this.props

        let arr = []
        if(groupList.length > 0){
            for(var i=0;i<groupList.length;i++){
                if(groupList[i].id != data.groupId){
                    arr.push(groupList[i])
                }
            }
            this.setState({moveGroupList:arr,showMove:true,sceneToMove:data})
        }
    }

    onHideMove(){
        this.setState({showMove:false})
    }

    renderSceneMove(){
        if(this.state.showMove){
            const {modifyScene} = this.props
            const {moveGroupList,sceneToMove} = this.state
            let functions = {
                modify:modifyScene,
                onHide:this.onHideMove.bind(this)
            }
            return (
                <SceneMove functions={functions} groupList={moveGroupList} itemData={sceneToMove}></SceneMove>
            )
        }
    }

    onCancelCreateModal(){
        this.setState({showCreateScene:false})        
    }

    onShowUploadScenes(){
        this.setState({showCreateScene:false,showCreateScenes:true})
    }

    renderCreateModal(){
        if(this.state.showCreateScene){
            const {addScene,vrId,groupSelectId,updateGroup,groupSelectItem} = this.props
            const functions = {
                onCancel:this.onCancelCreateModal.bind(this),
                addScene,
                updateGroup,
                showAddScenes:this.onShowUploadScenes.bind(this)
            } 
            return (
                <CreateSceneModal groupItem ={groupSelectItem} functions={functions} groupId={groupSelectId} vrId={vrId}></CreateSceneModal>
            )
        }
    }


    onCancelCreateScenes(){
        this.setState({showCreateScenes:false})
    }

    renedrCreateScenes(){
        if(this.state.showCreateScenes){
            const {addScene,vrId,groupSelectId,groupSelectItem,updateGroup} = this.props
            const functions = {
                onCancel:this.onCancelCreateScenes.bind(this),
                addScene,
                updateGroup
            } 
            return (
                <CreateScenesModal functions={functions} groupItem ={groupSelectItem}  groupId={groupSelectId} vrId={vrId}></CreateScenesModal>
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
                showEdit:this.handleEditScene.bind(this),
                moveScene:this.onMoveScene.bind(this)
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
                    {this.renderGroup()}
                    {this.renderSceneList()}
                    {this.renderContextMenu()}
                    {this.renderEditModal()}
                    {this.renderCreateModal()}
                    {this.renderCreateGroupModal()}
                    {this.renderGroupContext()}
                    {this.renderSceneMove()}
                    {this.renedrCreateScenes()}
                </div>
            </div>
        )
    }
}


@DragSource('SceneItem',{
    isDragging(props,monitor,component){
        console.log(props)
    },
    canDrag(){
        console.log('canDrag')
        return true
    }
},(connect,monitor)=>{
    return {
        connectDragSource: connect.dragSource(),
        isDragging: monitor.isDragging(),
    }
})(SceneItem)

@DropTarget('SceneItem',{
    drop(props,monitor,component){
        console.log(props)
    },
},(connect,monitor)=>{})(SceneItem)
class SceneItem extends Component{
    constructor(){
        super()
    }

    render(){
        const {item,sceneSelected,isDragging, connectDragSource} = this.props;
        let className = `${styles.scene} ${item.id == sceneSelected ? styles.selected : ''}`
        return (
            <div className={styles.sceneContainer} key={item.id} onContextMenu={(e)=>this.props.onSceneContext(e,item)} onClick={()=>this.props.sceneClickHandler(item.id)}>
                {/* <span style={{    
                    position: 'absolute',
                    zIndex: 10,
                    color: '#FFF',
                    marginLeft: '60px'}}><i style={{    
                        fontSize: '30px',
                        color: '#FFF'}} className="iconfont icon-drag"></i></span> */}
                <div className={className}>
                    <img style={{height:'100%'}} src={getHeadImgUrl(item.id)}></img>
                </div>
                <div className={styles.name}>{item.name}</div>
            </div>
        )
    }
}

function mapDispatchToProps(dispatch){
    return {
        ...bindActionCreators(sceneActions,dispatch),
        ...bindActionCreators(groupActions,dispatch)
    }
}

export default connect(getSelector(editSceneConfig),mapDispatchToProps)(EditSceneContainer);