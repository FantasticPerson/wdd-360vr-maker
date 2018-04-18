// @flow
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import styles from './Home.css';
import CreateVr from './createVr'

type Props = {};

export default class Home extends Component<Props> {
  props: Props;

  constructor(props){
    super(props)
    this.state = {
      showCreateItem:false
    }
  }


  onCreateClick(){
    this.setState({
      showCreateItem:true
    })
  }

  renderCreateVr(){
    const {showCreateItem} = this.state
    if(showCreateItem){
      return <CreateVr></CreateVr>
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
