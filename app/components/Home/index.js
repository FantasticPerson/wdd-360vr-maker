import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import styles from './Home.css';

import * as vrActions from '../../actions/vr';
import * as sceneActions from '../../actions/scene';
import * as folderActions from '../../actions/folder';
import * as appActions from '../../actions/app'

import CreateVrModal from '../CreateVrModal';
import CreateFolderModal from '../CreateFolderModal';
import VrContainer from '../VrContainer'

import { List, ListItem } from 'material-ui/List';

import FolderContextMenu from '../folderContextMenu'
import MapToReactComponent from '../../utils/mapToReactComponent'

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showCreateFolderItem: false,
            selectedFolderId: 0,

            showFolderMenu:false,
            posData:{},
            contextFolderData:{}
        };
        MapToReactComponent(this,folderContextObj)
        MapToReactComponent(this,folderModalObj)
    }

    componentDidMount() {
        const { updateFromLocal,updateVrFromLocal,updateAppTitle,updateAppShowBack } = this.props;
        updateFromLocal();
        updateVrFromLocal();
        updateAppTitle('全景制作工具')
        updateAppShowBack(false)
    }

    onFolderItemClick(data, index) {
        this.setState({
            selectedFolderId:data.id
        })
    } 
    
    renderFolderList() {
        const { folder } = this.props;
        const {selectedFolderId} = this.state;
        const icon = <i className="fa fa-folder" style={{ top: '4px' }} aria-hidden="true" />;
        const icon1 = <i className="fa fa-folder-open" style={{ top: '4px' }} aria-hidden="true" />;
        
        return (
            <List>
                {
                    folder.map((item, index) => <ListItem key={item.id} primaryText={item.title} leftIcon={item.id === selectedFolderId ? icon1 : icon} onClick={() => {this.onFolderItemClick(item,index)}} onContextMenu={(e)=>{this.onFolderContext(e,item)}}/>)
                }
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
            return (
                <CreateFolderModal onCreate={this.onCreateFolder.bind(this)} onCancel={this.onHiderCreateFolderModal.bind(this)} />
            );
        }
    },
    onHiderCreateFolderModal() {
        this.setState({
            showCreateFolderItem: false
        });
    },
    onCreateFolderClick() {
        this.setState({
            showCreateFolderItem: true
        });
    },
    onCreateFolder(title) {
        const { addFolder, nextFolderId } = this.props;
        addFolder({
            id: nextFolderId,
            title
        });
        onHiderCreateFolderModal()
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
        console.log(data)
    },

    handleEditFolder(data){
        console.log(data)
    },
    onFolderContext(e,item){
        console.log(e)
        this.setState({
            showFolderMenu:true,
            posData:{
                posX:e.clientX,
                posY:e.clientY
            },
            contextFolderData:item
        })
        e.preventDefault()
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

function mapStateToProps(state) {
    return {
        vr: state.vr,
        scene: state.scene,
        folder: state.folder,
        nextId: getNextId(state.vr, 0),
        nextFolderId: getNextId(state.folder, 2)
    };
}

const getNextId = (arr, startIndex) => {
    let id = startIndex;
    arr.map(item => {
        if (item.id > id) {
            id = item.id;
        }
    });
    return ++id;
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
