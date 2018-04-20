// @flow
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import styles from './Home.css';
import CreateVr from './createVr'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Dialog from 'material-ui/Dialog';
import TextField from 'material-ui/TextField';
import { bindActionCreators } from 'redux';
import * as vrActions from '../actions/vr'
import * as sceneActions from '../actions/scene'
import FlatButton from 'material-ui/FlatButton';
import CreateVrModal from './CreateVrModal'
import {List, ListItem} from 'material-ui/List';

type Props = {};

class Home extends Component<Props> {
  props: Props;

  constructor(props) {
    super(props)
    this.state = {
      showCreateItem: false,
      selectVrItemIndex:-1
    }
  }

  onCreate(title, brief) {
    const { addVr, nextId } = this.props
    addVr({
      id: nextId,
      title: title,
      brief: brief
    })
    this.setState({
      showCreateItem: false
    })
  }

  onHideCreateVrModal() {
    this.setState({
      showCreateItem: false
    })
  }

  onCreateClick() {
    this.setState({
      showCreateItem: true
    })
  }

  onVrItemClick(data,index){
    console.log(index)
    this.setState({
      selectVrItemIndex:index
    })
  }

  renderVrList() {
    const { vr } = this.props
    let icon = <i className="fa fa-folder" style={{top:'5px'}} aria-hidden="true"></i>
    return (
      <List>
        {
          vr.map((item,index) => {
            return <ListItem key={item.id} primaryText={item.title} leftIcon={icon} onClick={this.onVrItemClick.bind(this,item,index)}></ListItem>
          })
        }
      </List>
    )
  }

  renderCreateVrModal() {
    const { showCreateItem } = this.state
    if (showCreateItem) {
      return (
        <CreateVrModal onCreate={this.onCreate.bind(this)} onCancel={this.onHideCreateVrModal.bind(this)}></CreateVrModal>
      )
    }
  }

  renderSelectedVr(){

  }

  render() {
    return (
      <div className={styles.container}>
        <div className={styles.menu}>
          <div className={styles.projectList}>
            <div>
              {this.renderVrList()}
            </div>
          </div>
          <div className={styles.addProject} onClick={() => { this.onCreateClick() }}>
            <i className="fa fa-plus"></i>
            <span style={{ marginLeft: '17px' }}>新建文件夹</span>
          </div>
        </div>
        <div className={styles.content}>
        </div>
        {/* <div className={styles.rightContent}></div> */}
        {this.renderCreateVrModal()}
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    ...bindActionCreators(vrActions, dispatch),
    ...bindActionCreators(sceneActions, dispatch)
  }
}

function mapStateToProps(state) {
  return {
    vr: state.vr,
    scene: state.scene,
    nextId: getNextId(state.vr,0),
    nextFolderId: getNextId(state.folder,2)
  };
}

const getNextId = (arr,startIndex) => {
  let id = startIndex
  arr.map(item => {
    if (item.id > id) {
      id = item.id
    }
  })
  return ++id
}

const getNextFolderId = (arr) => {
  let id = 2
  arr.map((item)=>)
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);