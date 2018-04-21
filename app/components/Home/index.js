import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import styles from './Home.css';

import * as vrActions from '../../actions/vr';
import * as sceneActions from '../../actions/scene';
import * as folderActions from '../../actions/folder';

import CreateVrModal from '../CreateVrModal';
import CreateFolderModal from '../CreateFolderModal';

import { List, ListItem } from 'material-ui/List';

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showCreateFolderItem: false,
            selectedFolderId: -1
        };
    }

    componentDidMount() {
        const { updateFromLocal } = this.props;
        updateFromLocal();
    }

    onCreateFolder(title) {
        const { addFolder, nextFolderId } = this.props;
        addFolder({
            id: nextFolderId,
            title
        });
        this.setState({
            showCreateFolderItem: false
        });
    }

    onHiderCreateFolderModal() {
        this.setState({
            showCreateFolderItem: false
        });
    }

    onCreateFolderClick() {
        this.setState({
            showCreateFolderItem: true
        });
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
                    folder.map((item, index) => <ListItem key={item.id} primaryText={item.title} leftIcon={item.id === selectedFolderId ? icon1 : icon} onClick={() => {this.onFolderItemClick(item,index)}} />)
                }
            </List>
        );
    }

    renderCreateFolderModal() {
        const { showCreateFolderItem } = this.state;
        if (showCreateFolderItem) {
            return (
              <CreateFolderModal onCreate={this.onCreateFolder.bind(this)} onCancel={this.onHiderCreateFolderModal.bind(this)} />
            );
        }
    }

    render() {
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
                <div className={styles.content} />
                {this.renderCreateFolderModal()}
            </div>
        );
    }
}

function mapDispatchToProps(dispatch) {
    return {
        ...bindActionCreators(vrActions, dispatch),
        ...bindActionCreators(sceneActions, dispatch),
        ...bindActionCreators(folderActions, dispatch)
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
