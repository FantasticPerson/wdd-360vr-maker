// @flow
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import styles from './Home.css';
import CreateVr from './createVr'
import { bindActionCreators } from 'redux';
import * as vrActions from '../actions/vr'
import * as sceneActions from '../actions/scene'

type Props = {};

class Home extends Component<Props> {
  props: Props;

  constructor(props){
    super(props)
    this.state = {
      showCreateItem:false
    }
  }

  componentDidMount(){
    console.log(this)
  }


  onCreate(value){
    const {addVr} = this.props
    addVr({
      id:1,
      name:value
    })
    console.log('on create',value)

  }

  onCreateClick(){
    this.setState({
      showCreateItem:true
    })
  }

  renderCreateVr(){
    const {showCreateItem} = this.state
    if(showCreateItem){
      return <CreateVr onCreate={this.onCreate.bind(this)}></CreateVr>
    }
  }

  render() {
    const {showCreateItem} = this.state
    return (
      <div className={styles.container}>
        <div className={styles.menu}>
          <div className={styles.projectList}>
          {
            this.renderCreateVr()
          }
          </div>
          <div className={styles.addProject} onClick={()=>{this.onCreateClick()}}>新建项目</div>
        </div>
        <div className={styles.content}>
        </div>
        <div className={styles.rightContent}></div>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
      ...bindActionCreators(vrActions, dispatch),
      ...bindActionCreators(sceneActions,dispatch)
  }
}

function mapStateToProps(state) {
  return {
    vr: state.vr,
    scene: state.scene
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);