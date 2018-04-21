import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import styles from './Home.css';
import CreateVr from './createVr';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Dialog from 'material-ui/Dialog';
import TextField from 'material-ui/TextField';
import { bindActionCreators } from 'redux';
import * as vrActions from '../actions/vr';
import * as sceneActions from '../actions/scene';
import * as folderActions from '../actions/folder';
import FlatButton from 'material-ui/FlatButton';
import CreateVrModal from './CreateVrModal';
import { List, ListItem } from 'material-ui/List';
import CreateFolderModal from './CreateFolderModal';


class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showCreateFolderItem: false,
            selectVrItemIndex: -1,
            selectedFolderIndex: -1
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

    }

    renderVrList() {
        const { vr } = this.props;
        const { selectedFolderIndex } = this.state;
        const icon = <i className="fa fa-folder" style={{ top: '5px' }} aria-hidden="true" />;
        return (
          <List>
              {
                    vr.map((item, index) => <ListItem style={{ background: rgba(0, 0, 0, 0.87) }} key={item.id} primaryText={item.title} leftIcon={icon} onClick={this.onVrItemClick.bind(this, item, index)} />)
                }
            </List>
        );
    }

    renderFolderList() {
        const { folder } = this.props;
        const icon = <i className="fa fa-folder" style={{ top: '5px' }} aria-hidden="true" />;
        return (
          <List>
              {
                    folder.map((item, index) => <ListItem key={item.id} primaryText={item.title} leftIcon={icon} onClick={() => { }} />)
                }
            </List>
        );
    }

    renderCreateVrModal() {
        const { showCreateItem } = this.state;
        if (showCreateItem) {
            return (
              <CreateVrModal onCreate={this.onCreate.bind(this)} onCancel={this.onHideCreateVrModal.bind(this)} />
            );
        }
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
              {this.renderCreateVrModal()}
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
