import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {createSelector} from 'reselect'

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';

import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

import styles from '../../styles/Home.css';

import * as vrActions from '../../actions/vr';
import * as sceneActions from '../../actions/scene';
import * as folderActions from '../../actions/folder';
import * as appActions from '../../actions/app'

import CreateVrModal from './components/CreateVrModal';
import CreateFolderModal from './components/CreateFolderModal';
import VrContainer from './components/VrContainer'
import FolderContextMenu from './components/folderContextMenu'

import MapToReactComponent from '../../utils/mapToReactComponent'

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
        MapToReactComponent(this,folderContextObj)
        MapToReactComponent(this,folderModalObj)
    }

    
    componentWillUnmount() {
        this._mounted = false
    }
    
    componentDidMount() {
        this._mounted=true
        const { updateFromLocal,updateVrFromLocal,updateAppTitle,updateAppShowBack,updateAllSceneFromLocal } = this.props;
        updateFromLocal();
        updateVrFromLocal();
        updateAllSceneFromLocal()
        updateAppTitle('全景制作工具')
        updateAppShowBack(false)
    }

    onFolderItemClick(data, index) {
        const {updateSelectedFolder} = this.props;
        this.setState({
            selectedFolderId:data.id
        })
        updateSelectedFolder(data.id)
    } 
    
    renderFolderList() {
        const { folderList,folderSelectedId } = this.props;
        const icon = <i className="fa fa-folder" style={{ top: '4px' }} aria-hidden="true" />;
        const icon1 = <i className="fa fa-folder-open" style={{ top: '4px' }} aria-hidden="true" />;
        
        let items = folderList.map((item, index) => {
            return (
                <ListItem  
                    style={{padding:'5px'}}
                    button
                    key={item.id} 
                    onClick={() => {this.onFolderItemClick(item,index)}} 
                    onContextMenu={(e)=>{this.onFolderContext(e,item)}}
                >
                    <ListItemIcon>
                        {item.id === folderSelectedId ? icon1 : icon} 
                    </ListItemIcon>
                    <ListItemText primary={item.title} />
                </ListItem>
            )
        })

        return (
            <List component="nav">
                {items}
            </List>
        );
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
                    <div className={styles.addProject} onClick={() => { this.onCreateFolderClick(); }}>
                        <i className="fa fa-plus" />
                        <span style={{ marginLeft: '17px' }}>新建文件夹</span>
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

let folderModalObj = {
    renderCreateFolderModal() {
        const { showCreateFolderItem } = this.state;
        if (showCreateFolderItem) {
            const {contextFolderData} = this.state

            return (
                <CreateFolderModal onCreate={this.onCreateFolder.bind(this)} folderData={contextFolderData } onCancel={this.onHiderCreateFolderModal.bind(this)} />
            );
        }
    },
    onHiderCreateFolderModal() {
        this.setState({
            showCreateFolderItem: false
        });
    },
    onCreateFolderClick() {
        if(this._mounted=true){
            this.setState({
                showCreateFolderItem: true,
                contextFolderData:null
            });
        }
    },
    onCreateFolder(title) {
        const { addFolder, nextFolderId ,updateFolder} = this.props;
        const {contextFolderData} = this.state
        if(contextFolderData){
            updateFolder({
                id: contextFolderData.id,
                title
            })
        } else {
            addFolder({
                id: nextFolderId,
                title
            });
        }
        this.onHiderCreateFolderModal()
    }
}

let folderContextObj = {
    renderContextMenu(){
        const {showFolderMenu} = this.state

        if(showFolderMenu){
            const {posData,contextFolderData} = this.state

            return (
                <FolderContextMenu posData={posData} folderData={contextFolderData} bgClick={this.onFolderContextMenuBgClick.bind(this)} onDelete={this.handleDeleteFolder.bind(this)} onModify={this.handleEditFolder.bind(this)}></FolderContextMenu>
            )
        }
    },
    onFolderContextMenuBgClick(){
        this.setState({
            showFolderMenu : false
        })
    },
    handleDeleteFolder(data){
        const {deleteFolder} = this.props 
        deleteFolder(data)
    },

    handleEditFolder(data){
        this.setState({
            showCreateFolderItem: true
        });
    },
    onFolderContext(e,item){
        e.preventDefault()
        if(item.id === 0){
            return
        }
        this.setState({
            showFolderMenu:true,
            posData:{
                posX:e.clientX,
                posY:e.clientY
            },
            contextFolderData:item
        })
    }
}

function mapDispatchToProps(dispatch) {
    return {
        ...bindActionCreators(vrActions, dispatch),
        ...bindActionCreators(sceneActions, dispatch),
        ...bindActionCreators(folderActions, dispatch),
        ...bindActionCreators(appActions,dispatch)
    };
}

export default connect(getSelector(homePageConfig),mapDispatchToProps)(Home);
