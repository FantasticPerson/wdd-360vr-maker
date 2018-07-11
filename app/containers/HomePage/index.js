import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

import styles from '../../styles/Home.css';

import * as vrActions from '../../actions/vr';
import * as sceneActions from '../../actions/scene';
import * as folderActions from '../../actions/folder';
import * as appActions from '../../actions/app'
import * as groupActions from '../../actions/group'

import CreateVrModal from './components/CreateVrModal';
import CreateFolderModal from './components/CreateFolderModal';
import VrContainer from './components/VrContainer'
import FolderContextMenu from './components/folderContextMenu'

import {homePageConfig,getSelector} from '../../store/getStore'

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showCreateFolderItem: false,
            showFolderMenu:false,
            posData:{},
            contextFolderData:{},
        };
    }

    componentDidMount() {
        const { updateFromLocal,updateVrFromLocal,updateAppTitle,updateAppShowBack,updateAllSceneFromLocal } = this.props;
        updateFromLocal();
        updateVrFromLocal();
        updateAllSceneFromLocal()
        updateAppTitle('全景制作工具')
        updateAppShowBack(false)
    }

    onFolderItemClick(data, index) {
        const {updateSelectedFolder,folderSelectedId} = this.props;
        if(data.id != folderSelectedId){
            updateSelectedFolder(data.id)
        }
    } 
    
    renderFolderList() {
        const { folderList,folderSelectedId } = this.props;
        
        let listItems = folderList.map((item, index) => {
            let iconClassName = item.id === folderSelectedId ? 'fa fa-folder-open' : 'fa fa-folder'
            return (
                <ListItem  
                    style={{padding:'5px'}}
                    button
                    key={item.id} 
                    onClick={() => {this.onFolderItemClick(item,index)}} 
                    onContextMenu={(e)=>{this.onFolderContext(e,item)}}
                >
                    <ListItemIcon>
                        <i className={iconClassName} style={{top:'4px'}} aria-hidden="true"/>
                    </ListItemIcon>
                    <ListItemText primary={item.title} />
                </ListItem>
            )
        })

        return (
            <List component="nav">{listItems}</List>
        );
    }

    onCreateFolderClick(){
        this.setState({
            showCreateFolderItem: true,
            contextFolderData:null
        });
    }

    hideCreateFolderModal() {
        this.setState({
            showCreateFolderItem: false
        });
    }

    renderCreateFolderModal(){
        if (this.state.showCreateFolderItem) {
            const { addFolder,updateFolder} = this.props;
            const functions = {addFolder,updateFolder,hideCreateFolderModal:this.hideCreateFolderModal.bind(this)}
            const {contextFolderData} = this.state

            return (
                <CreateFolderModal data={contextFolderData} functions={functions}/>
            );
        }
    }

    onFolderContext(e,item){
        e.preventDefault()
        if(item.id === 0){
            return
        }
        this.setState({
            showFolderMenu:true,
            posData:{posX:e.clientX,posY:e.clientY},
            contextFolderData:item
        })
    }

    onFolderContextMenuHide(){
        this.setState({
            showFolderMenu : false
        })
    }

    handleEditFolder(data){
        this.setState({
            showCreateFolderItem: true
        });
    }

    renderContextMenu(){
        if(this.state.showFolderMenu){
            const {posData,contextFolderData} = this.state
            const {deleteFolder} = this.props 
            const functions = {
                onHide:this.onFolderContextMenuHide.bind(this),
                onModify:this.handleEditFolder.bind(this),
                deleteFolder
            }

            return (
                <FolderContextMenu posData={posData} folderData={contextFolderData} functions={functions}></FolderContextMenu>
            )
        }
    }

    render() {
        const {selectedFolderId} = this.state

        return (
            <div className={styles.container}>
                <div className={styles.menu}>
                    <div className={styles.projectList}>
                        <div>
                            {this.renderFolderList()}
                        </div>
                    </div>
                    <div className={styles.addProject} onClick={() => {this.onCreateFolderClick()}}>
                        <i className="fa fa-plus" />
                        <span style={{marginLeft:'17px'}}>新建文件夹</span>
                    </div>
                </div>
                <div className={styles.content}>
                    <VrContainer selectedFolderId={selectedFolderId}></VrContainer>
                </div>
                {this.renderCreateFolderModal()}
                {this.renderContextMenu()}
            </div>
        );
    }
}

function mapDispatchToProps(dispatch) {
    return {
        ...bindActionCreators(vrActions, dispatch),
        ...bindActionCreators(sceneActions, dispatch),
        ...bindActionCreators(folderActions, dispatch),
        ...bindActionCreators(appActions,dispatch),
        ...bindActionCreators(groupActions,dispatch),

    };
}

export default connect(getSelector(homePageConfig),mapDispatchToProps)(Home);
