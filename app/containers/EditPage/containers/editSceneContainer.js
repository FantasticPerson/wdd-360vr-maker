import React, { Component } from 'react'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as sceneActions from '../../../actions/scene'
import * as groupActions from '../../../actions/group'

import { getHeadImgUrl, getScenePath } from '../../../native/pathUtils'
import { getSelector } from '../../../store/getStore'

import CreateSceneModal from './createSceneModal'
import CreateScenesModal from './CreateScenesModal'
import EditSceneModal from './EditSceneModal'
import SceneContextMenu from './SceneContextMenu'
import CreateGroupModal from './CreateGroupModal'
import ContextMenu from './groupContextMenu'
import GroupContextModal from './groupContextMenu';
import SceneMove from './sceneMove'

import SceneItem from './SceneItem'

import styles from '../../../styles/editSceneContainer.css'

class EditSceneContainer extends Component {
    constructor() {
        super()
        this._isMounted = false
        this.state = {
            containerWidth: '',
            showSceneMenu: false,
            posData: {},
            contextSceneData: {},
            showEditSceneModal: false,
            showCreateScene: false,
            showCreateScenes: false,
            hasSelectedId: false,
            contextGroupData: null,
            showCreateGroup: false,
            showGroupContext: false,
            moveGroupList: [],
            showSceneMove: false,
            sceneToMove: null
        }
        this.sceneListC = null
    }

    componentDidMount() {
        this._isMounted = true
        setTimeout(() => {
            const { sceneList, updateSceneSelected, groupList, updateGroupSelected } = this.props;
            if (sceneList.length > 0) {
                updateSceneSelected(sceneList[0].id)
            }
            if (groupList.length > 0) {
                updateGroupSelected(groupList[0].id)
            }
        }, 50)

        const containerWidth = window.innerWidth - 280
        this.setState({ containerWidth: containerWidth })

        window.onresize = () => {
            if (this._isMounted) {
                const containerWidth = window.innerWidth - 280
                this.setState({ containerWidth: containerWidth })
            }
        }
    }

    componentWillReceiveProps(props) {
        if (props.groupSelectId != this.props.groupSelectId) {

            const { updateSceneSelected } = props
            if (props.sceneList.length > 0) {
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

    onGroupClick(id) {
        const { groupSelectId } = this.props
        if (groupSelectId != id) {
            this.props.updateGroupSelected(id)
        }
    }

    showCreateGroupModal() {
        this.setState({ showCreateGroup: true })
    }

    hideCreateGroupModal() {
        this.setState({ showCreateGroup: false, contextGroupData: null })
    }

    renderCreateGroupModal() {
        if (this.state.showCreateGroup) {
            const { addGroup, updateGroup, vrId } = this.props
            const { contextGroupData } = this.state
            let functions = {
                addGroup,
                updateGroup,
                hideModal: this.hideCreateGroupModal.bind(this)
            }
            return (
                <CreateGroupModal functions={functions} vrId={vrId} itemData={contextGroupData}></CreateGroupModal>
            )
        }
    }

    onGroupContext(e, item) {
        e.preventDefault()
        e.stopPropagation()
        this.setState({
            showGroupContext: true,
            posData: { posX: e.clientX, posY: e.clientY },
            contextGroupData: item
        })
    }

    hideGroupContext() {
        this.setState({
            showGroupContext: false
        })
    }

    renderGroupContext() {
        if (this.state.showGroupContext) {
            const { contextGroupData, posData } = this.state
            const { deleteGroup, updateGroupSelected, updateSceneSelected } = this.props

            let functions = {
                onHide: this.hideGroupContext.bind(this),
                showEdit: this.showCreateGroupModal.bind(this),
                deleteGroup,
                updateSceneSelected
            }

            const { groupList, allSceneList, groupSelectId } = this.props
            let groupSceneList = allSceneList.filter((item) => {
                return item.groupId == contextGroupData.id
            })

            let canDelete = groupSceneList.length > 0 ? false : true
            if (groupList.length <= 1) {
                canDelete = false
            }
            return (
                <GroupContextModal
                    groupSelectId={groupSelectId}
                    groupList={groupList}
                    canDelete={canDelete}
                    posData={posData}
                    functions={functions}
                    itemData={contextGroupData}
                />
            )
        }
    }

    renderGroup() {
        const { groupList, groupSelectId } = this.props
        if (groupList.length > 0) {
            let item = groupList.find((item) => {
                return item.id == groupSelectId
            })
            if (!item) {
                this.props.updateGroupSelected(groupList[0].id)
            }
        }
        let groupItems = groupList.map((item) => {
            let styleObj = {}
            if (item.id == groupSelectId) {
                styleObj = { backgroundColor: '#eee' }
            }
            return (
                <div
                    className={styles['normal-btn-style'] + ' group'}
                    onContextMenu={(e) => { this.onGroupContext(e, item) }}
                    onClick={() => { this.onGroupClick(item.id) }}
                    key={item.title}
                    style={styleObj}
                >{item.title}</div>
            )
        })
        return (
            <div style={{ marginTop: '10px' }}>
                {groupItems}
                <div className={styles['add-btn-style']} onClick={this.showCreateGroupModal.bind(this)}>+</div>
            </div>
        )
    }

    renderSceneList() {
        const { sceneList, sceneSelected } = this.props
        const cWidth = sceneList.length * 105 + 90 + 'px'

        let sceneItemList = sceneList.map((item, index) => (
            <SceneItem
                onSceneContext={this.onSceneContext.bind(this)}
                sceneClickHandler={this.sceneClickHandler.bind(this)}
                sceneSelected={sceneSelected}
                item={item}
                key={item.id}
            />)
        )

        return (
            <div style={{ width: cWidth, height: '111px', overflow: 'hidden', marginTop: '10px' }}>
                {sceneItemList}
                <div className={styles.addBtnContainer} onClick={this.onAddSceneClick.bind(this)}>
                    <div className={`fa fa-plus`}></div>
                    <div className={styles.addScene}>添加场景</div>
                </div>
            </div>
        )
    }

    sceneClickHandler(id) {
        const { updateSceneSelected, sceneSelected } = this.props
        if (id != sceneSelected) {
            updateSceneSelected(id)
        }
    }

    onAddSceneClick() {
        this.setState({ showCreateScene: true })
    }

    onMoveScene(data) {
        const { groupList, groupSelectId } = this.props

        let arr = groupList.filter((item) => { item.id != data.id })
        if (arr.length > 0) {
            this.setState({ moveGroupList: arr, showSceneMove: true, sceneToMove: data })
        }
    }

    onHideMove() {
        this.setState({ showSceneMove: false })
    }

    renderSceneMove() {
        if (this.state.showSceneMove) {
            const { modifyScene } = this.props
            const { moveGroupList, sceneToMove } = this.state
            let functions = {
                modify: modifyScene,
                onHide: this.onHideMove.bind(this)
            }
            return (
                <SceneMove functions={functions} groupList={moveGroupList} itemData={sceneToMove}></SceneMove>
            )
        }
    }

    onCancelCreateModal() {
        this.setState({ showCreateScene: false })
    }

    onShowUploadScenes() {
        this.setState({ showCreateScene: false, showCreateScenes: true })
    }

    renderCreateModal() {
        if (this.state.showCreateScene) {
            const { addScene, vrId, groupSelectId, updateGroup, groupSelectItem } = this.props
            const functions = {
                onCancel: this.onCancelCreateModal.bind(this),
                showAddScenes: this.onShowUploadScenes.bind(this),
                addScene,
                updateGroup
            }
            return (
                <CreateSceneModal
                    groupItem={groupSelectItem}
                    functions={functions}
                    groupId={groupSelectId}
                    vrId={vrId}
                />
            )
        }
    }

    onCancelCreateScenes(closeTop) {
        if (closeTop) {
            this.setState({ showCreateScenes: false, showCreateScene: false })
        }
        this.setState({ showCreateScenes: false, showCreateScene: true })
    }

    renedrCreateScenes() {
        if (this.state.showCreateScenes) {
            const { addScene, vrId, groupSelectId, groupSelectItem, updateGroup } = this.props
            const functions = {
                onCancel: this.onCancelCreateScenes.bind(this),
                addScene,
                updateGroup
            }
            return (
                <CreateScenesModal
                    functions={functions}
                    groupItem={groupSelectItem}
                    groupId={groupSelectId}
                    vrId={vrId}
                />
            )
        }
    }

    onEditSceneCancel() {
        this.setState({ showEditSceneModal: false })
    }

    renderEditSceneModal() {
        const { showEditSceneModal, contextSceneData } = this.state
        if (showEditSceneModal) {
            const { modifyScene } = this.props
            return (
                <EditSceneModal onCancel={this.onEditSceneCancel.bind(this)} onModify={modifyScene} itemData={contextSceneData}></EditSceneModal>
            )
        }
    }

    onSceneContext(e, item) {
        e.preventDefault()
        e.stopPropagation()
        this.setState({
            showSceneMenu: true,
            posData: { posX: e.clientX, posY: e.clientY },
            contextSceneData: item
        })
    }

    onHideSceneContextMenu() {
        this.setState({ showSceneMenu: false })
    }

    handleEditScene() {
        this.setState({ showEditSceneModal: true })
    }

    renderContextMenu() {
        if (this.state.showSceneMenu) {
            const { posData, contextSceneData } = this.state
            const { delScene } = this.props
            const functions = {
                delScene,
                onHide: this.onHideSceneContextMenu.bind(this),
                showEdit: this.handleEditScene.bind(this),
                moveScene: this.onMoveScene.bind(this)
            }
            return (
                <SceneContextMenu posData={posData} sceneData={contextSceneData} functions={functions} />
            )
        }
    }

    render() {
        const { containerWidth } = this.state

        return (
            <div className={styles.container}>
                <div className={styles.content} style={{ width: containerWidth + 'px', overflowX: 'auto', overflowY: 'hidden' }}>
                    {this.renderGroup()}
                    {this.renderSceneList()}
                    {this.renderContextMenu()}
                    {this.renderEditSceneModal()}
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

function mapDispatchToProps(dispatch) {
    return {
        ...bindActionCreators(sceneActions, dispatch),
        ...bindActionCreators(groupActions, dispatch)
    }
}

let editSceneConfig = {
    sceneList: true,
    allSceneList: true,
    vrList: true,
    sceneSelected: true,
    vrId: true,
    groupList: true,
    groupSelectId: true,
    groupSelectItem: true
}

export default connect(getSelector(editSceneConfig), mapDispatchToProps)(EditSceneContainer);