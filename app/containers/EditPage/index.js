import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import PanoContainer from '../../components/panoContainer'
import EditSceneContainer from '../../components/editSceneContainer'
import styles from './index.css'
import * as appActions from '../../actions/app'
import * as groupActions from '../../actions/group'
import * as vrActions from '../../actions/vr'
import * as sceneActions from '../../actions/scene'
import * as folderActions from '../../actions/folder'

class EditPage extends Component{
    constructor(){
        super()
        this.state = {
            vrId : -1,
            previewSceneId:-10
        }
    }

    componentDidMount(){
        const {updateAppTitle,updateAppShowBack,findAddGroup,pathname,updateFromLocal,updateVrFromLocal,updateAllSceneFromLocal} = this.props

        updateAppTitle('编辑全景')
        findAddGroup()


        updateFromLocal();
        updateVrFromLocal();
        updateAllSceneFromLocal()

        updateAppShowBack(true)

        let id = pathname.split('/')[2]
        this.setState({
            vrId:id
        })
    }

    onChangeScene(sceneId){
        this.setState({
            previewSceneId:sceneId
        })
    }

    render(){
        const {vrId,previewSceneId} = this.state
        const {vr} = this.props
        let vrItem = vr.find((item)=>{
            return item.id ==  vrId
        })
        vrItem = vrItem || {}
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
                        <PanoContainer previewSceneId={previewSceneId} folderId={vrItem.folderId} vrId={vrId}></PanoContainer>
                    </div>
                    <div className={styles.sceneContainer}>
                        <EditSceneContainer previewSceneId={previewSceneId} changeScene={this.onChangeScene.bind(this)} vrId={vrId}></EditSceneContainer>
                    </div>
                </div>
                <div className={styles.rightBar}></div>
            </div>
        )
    }
}

function mapDispatchToProps(dispatch){
    return {
        ...bindActionCreators(appActions,dispatch),
        ...bindActionCreators(groupActions,dispatch),
        ...bindActionCreators(sceneActions,dispatch),
        ...bindActionCreators(vrActions,dispatch),
        ...bindActionCreators(folderActions,dispatch)
    }
}

function mapStateToProps(state){
    return {
        pathname:state.router.location.pathname,
        vr:state.vr
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(EditPage)