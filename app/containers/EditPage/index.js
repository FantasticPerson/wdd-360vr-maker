import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import PanoContainer from '../../components/panoContainer'
import EditSceneContainer from '../../components/editSceneContainer'
import styles from './index.css'
import * as appActions from '../../actions/app'



class EditPage extends Component{
    componentDidMount(){
        console.log(this)
        const {updateAppTitle,updateAppShowBack} = this.props

        updateAppTitle('编辑全景')
        updateAppShowBack(true)
    }

    render(){
        return (
            <div className={styles.container}>
                <div className={styles.leftBar}>
                    <div className={styles.btn}>
                        <i className="fa fa-eye"></i>
                        <p>视角</p>
                    </div>
                    <div className={styles.btn}>
                        <i className="fa fa-dot-circle-o"></i>
                        <p>热点</p>
                    </div>
                    <div className={styles.btn}>
                        <i className="fa fa-music"></i>
                        <p>音乐</p>
                    </div>
                    <div className={styles.btn}>
                        <i className="fa fa-magic"></i>
                        <p>特效</p>
                    </div>
                </div>
                <div className={styles.content}>
                    <div className={styles.panoContainer}>
                        <PanoContainer></PanoContainer>
                    </div>
                    <div className={styles.sceneContainer}>
                        <EditSceneContainer></EditSceneContainer>
                    </div>
                </div>
                <div className={styles.rightBar}></div>
            </div>
        )
    }
}

function mapDispatchToProps(dispatch){
    return {
        ...bindActionCreators(appActions,dispatch)
    }
}

function mapStateToProps(){
    return {}
}

export default connect(mapStateToProps,mapDispatchToProps)(EditPage)