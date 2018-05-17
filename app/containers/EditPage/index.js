import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import FlatButton from 'material-ui/FlatButton';

import Hashid from '../../utils/generateHashId'
import PanoContainer from '../../components/panoContainer'
import EditSceneContainer from '../../components/editSceneContainer'
import getPathOfHotSpotIconPath from '../../native/getHotspotIconPath'
import {addHotspotToKrpano,selectHotspotInKrpano} from '../../utils/krpanoFunctions'
import styles from './index.css'
import * as appActions from '../../actions/app'
import * as groupActions from '../../actions/group'
import * as vrActions from '../../actions/vr'
import * as sceneActions from '../../actions/scene'
import * as folderActions from '../../actions/folder'
import * as hotpotActions from '../../actions/hotpot'

class EditPage extends Component{
    constructor(){
        super()
        this.state = {
            vrId : -1,
            previewSceneId:-10,
            editType : 0,
            editHotpot:false
        }
        this.krpano = null
    }

    componentDidMount(){
        const {updateAppTitle,updateAppShowBack,findAddGroup,pathname,updateFromLocal,updateVrFromLocal,updateAllSceneFromLocal} = this.props

        updateAppTitle('编辑全景')
        findAddGroup()

        updateFromLocal();
        updateVrFromLocal();
        updateAllSceneFromLocal();

        updateAppShowBack(true)

        let id = pathname.split('/')[2]
        this.setState({
            vrId:id
        })
    }

    setKrpano(krpano){
        this.krpano = krpano
    }

    onChangeScene(sceneId){
        this.setState({
            previewSceneId:sceneId
        })
    }

    getEditClassName(type){
        const {editType} = this.state
        return editType == type ? `${styles.btn} ${styles.btnSelected}` : `${styles.btn}`
    }

    onEditClick(type){
        console.log('on click')
        this.setState({editType:type})
    }

    onAddHotpotClick(){
        if(this.krpano){
            const _id = `hs${new Hashid().encode()}`
            const ath = this.krpano.get('view.hlookat')
            const atv = this.krpano.get('view.vlookat')
            const icon = getPathOfHotSpotIconPath()
            let data = {
                _id,
                ath,
                atv,
                icon,
                animated: true,
                type: undefined,
                typeProps: {},
            }
            addHotspotToKrpano(this.krpano, data, true)
            setTimeout(()=>{
                selectHotspotInKrpano(this.krpano,data._id)
            },50)
        }
        console.log('onAddHotpotClick')
        
    }

    renderEditHotpot1(){
        const {editHotpot} = this.state
        if(!editHotpot){
            return (
                <div>
                    <div>{`当前场景共有热点1个`}</div>
                    <div></div>
                </div>
            )
        }
    }

    renderEditHotPot2(){
        const {editHotpot} = this.state
        if(editHotpot){
            return (
                <div></div>
            )
        }
    }

    renderEditHotPot(){
        return (
            <div style={{padding:'5px'}}>
                <div style={{
                    borderBottom:'1px solid #eee'
                }}>
                    <span>
                        <i className='fa fa-dot-circle-o'></i>
                        <span style={{
                            marginLeft:'5px'
                        }}>热点编辑</span> 
                        <FlatButton label="添加热点" primary onClick={this.onAddHotpotClick.bind(this)} />
                    </span>
                </div>
                <div>
                    {this.renderEditHotpot1}
                    {this.renderEditHotPot2}
                </div>
            </div>
        )
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
                    <div className={this.getEditClassName(0)} onClick={()=>{this.onEditClick(0)}}>
                        <i className="fa fa-dot-circle-o"></i>
                        <p>热点</p>
                    </div>
                    <div className={this.getEditClassName(1)} onClick={()=>{this.onEditClick(1)}}>
                        <i className="fa fa-music"></i>
                        <p>音乐</p>
                    </div>
                    <div className={this.getEditClassName(2)} onClick={()=>{this.onEditClick(2)}}>
                        <i className="fa fa-magic"></i>
                        <p>特效</p>
                    </div>
                </div>
                <div className={styles.content}>
                    <div className={styles.panoContainer}>
                        <PanoContainer previewSceneId={previewSceneId} setKrpano={this.setKrpano.bind(this)} folderId={vrItem.folderId} vrId={vrId}></PanoContainer>
                    </div>
                    <div className={styles.sceneContainer}>
                        <EditSceneContainer previewSceneId={previewSceneId} changeScene={this.onChangeScene.bind(this)} vrId={vrId}></EditSceneContainer>
                    </div>
                </div>
                <div className={styles.rightBar}>
                    {this.renderEditHotPot()}
                </div>
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
        ...bindActionCreators(folderActions,dispatch),
        ...bindActionCreators(hotpotActions,dispatch)
    }
}

function mapStateToProps(state){
    return {
        pathname:state.router.location.pathname,
        vr:state.vr,
        hotpot:state.hotpot
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(EditPage)