import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import FlatButton from 'material-ui/FlatButton';
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';
import {createSelector} from 'reselect'

import Hashid from '../../utils/generateHashId'
import PanoContainer from '../../components/panoContainer'
import EditSceneContainer from '../../components/editSceneContainer'
import getPathOfHotSpotIconPath from '../../native/getHotspotIconPath'
import getPathOfSceneHeadImg from '../../native/getPathOfSceneHeadImg'
import styles from '../../styles/EditPage.css'
import {addHotspotToKrpano,selectHotspotInKrpano,addRainEffect,addSnowEffect} from '../../utils/krpanoFunctions'
import * as appActions from '../../actions/app'
import * as vrActions from '../../actions/vr'
import * as sceneActions from '../../actions/scene'
import * as folderActions from '../../actions/folder'
import * as hotpotActions from '../../actions/hotpot'
import * as PictureActions from '../../actions/picture'
import * as audioActions from '../../actions/audio'
import * as krpanoActions from '../../actions/krpano'

import EditHotSpot from './containers/EditHotpot'

class EditPage extends Component{
    constructor(){
        super()
        this.state = {
            vrId : -1,
            editType : 0,
            editHotpot:false,
            selectSceneId:-1
        }
        this.hotspots = []
        this.selectedHotspotId = null
        this.lastSceneId = null
        this.radioGroup1 = React.createRef()
        this.radioGroup2 = React.createRef()
    }

    componentDidMount(){
        const {updateAppTitle,updateAppShowBack,pathname,updateFromLocal,updateVrFromLocal,updateAllSceneFromLocal,updateAllHotpotFromLocal,updatePictureFromLocal,updateAudioFromLocal} = this.props
        this.lastSceneId = this.state.previewSceneId
        updateAppTitle('编辑全景')

        updateFromLocal();
        updateVrFromLocal();
        updateAllSceneFromLocal();
        updatePictureFromLocal()
        updateAllHotpotFromLocal();
        updateAudioFromLocal()

        updateAppShowBack(true);
    }

    getEditClassName(type){
        const {editType} = this.state
        return editType == type ? `${styles.btn} ${styles.btnSelected}` : `${styles.btn}`
    }

    onSceneClick(id){
        const {updateSceneSelected,vrId,folderId} = this.props
        updateSceneSelected(id,vrId,folderId)

        this.setState({editHotpot:false})
    }

    onEditClick(type){
        this.setState({editType:type})
        // if(type == 0){
        //     if(this.krpano){
        //         this.krpano.call('show_view_frame();')
        //     }
        // } else {
        //     if(this.krpano){
        //         this.krpano.call('hide_view_frame();')
        //     }
        // }
    }

    renderEditHotPot(){
        const {editType} = this.state
        if(editType == 0){
            return (
                <EditHotSpot></EditHotSpot>
            )
        }
    }

    onChooseSpecislShowChange(name,e){
        const {AddEffect} = this.props
        console.log(name)
        setTimeout(()=>{
            if(name == 'rain'){
                let rainSelected = this.radioGroup1.getSelectedValue()
                console.log('rainSelected:'+rainSelected)
                if(rainSelected != '0'){
                    this.radioGroup2.setSelectedValue('0')
                }
                AddEffect('rain',rainSelected)
            } else {
                let snowSelected = this.radioGroup2.getSelectedValue()
                console.log('snowSelected:'+snowSelected)
                if(snowSelected != '0'){
                    this.radioGroup1.setSelectedValue('0')
                }
                AddEffect('snow',snowSelected)
            }
        },50)
        
    }

    renderEditMusic(){
        const {editType} = this.state
        if(editType == 1){
            return (
                <div style={{padding:'5px'}}>
                    <div style={{
                        borderBottom:'1px solid #eee'
                    }}>
                        <span>
                            <i className='fa fa-music'></i>
                            <span style={{
                                marginLeft:'5px'
                            }}>音乐</span> 
                            
                        </span>
                    </div>
                    <div>
                        <div style={{marginTop:'10px',borderBottom:'1px solid #eee'}}>背景音乐设置</div>
                        <div>
                            <span>选择一首音乐</span>
                            <FlatButton label="添加" primary/>
                        </div>
                        <div style={{marginTop:'10px',borderBottom:'1px solid #eee'}}>解说音乐设置</div>
                        <div>
                            <span>选择一首音乐</span>
                            <FlatButton label="添加" primary/>
                        </div>
                    </div>
                </div>
            )
        }
    }

    renderSpecialShow(){
        const {editType} = this.state
        if(editType == 2){
            return (
                <div style={{padding:'5px'}}>
                    <div style={{
                        borderBottom:'1px solid #eee'
                    }}>
                        <span>
                            <i className='fa fa-magic'></i>
                            <span style={{
                                marginLeft:'5px'
                            }}>特效编辑</span> 
                            <FlatButton label="添加特效" primary />
                        </span>
                    </div>
                    <div>
                        <div>下雨</div>
                        <RadioButtonGroup name="rain" ref={(rg)=>{this.radioGroup1=rg}} defaultSelected={'0'}onChange={(e)=>this.onChooseSpecislShowChange('rain',e)}>
                            <RadioButton value="0" label="关闭" style={styles.radioButton}/>
                            <RadioButton value="1" label="小雨" style={styles.radioButton}/>
                            <RadioButton value="2" label="中雨" style={styles.radioButton}/>
                            <RadioButton value="3" label="大雨" style={styles.radioButton}/>
                        </RadioButtonGroup>
                        <div>下雪</div>
                        <RadioButtonGroup name="snow" ref={(rg)=>{this.radioGroup2=rg}} defaultSelected={'0'} onChange={(e)=>this.onChooseSpecislShowChange('snow',e)}>
                            <RadioButton value="0" label="关闭" style={styles.radioButton}/>
                            <RadioButton value="1" label="小雪" style={styles.radioButton}/>
                            <RadioButton value="2" label="中雪" style={styles.radioButton}/>
                            <RadioButton value="3" label="大雪" style={styles.radioButton}/>
                        </RadioButtonGroup>
                    </div>
                </div>  
            )
        }
    }

    renderLeftBtns(){
        return (
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
        )
    }

    render(){
        const {previewSceneId} = this.state
        const {vrList,vrId} = this.props
        let vrItem = vrList.find((item)=>{
            return item.id ==  vrId
        })
        vrItem = vrItem || {}
        return (
            <div className={styles.container}>
                {this.renderLeftBtns()}
                <div className={styles.content}>
                    <div className={styles.panoContainer}>
                        <PanoContainer previewSceneId={previewSceneId}></PanoContainer>
                    </div>
                    <div className={styles.sceneContainer}>
                        <EditSceneContainer onSceneClick={this.onSceneClick.bind(this)} previewSceneId={previewSceneId} vrId={vrId}></EditSceneContainer>
                    </div>
                </div>
                <div className={styles.rightBar}>
                    {this.renderEditHotPot()}
                    {this.renderSpecialShow()}
                    {this.renderEditMusic()}
                </div>
            </div>
        )
    }
}

function mapDispatchToProps(dispatch){
    return {
        ...bindActionCreators(appActions,dispatch),
        ...bindActionCreators(sceneActions,dispatch),
        ...bindActionCreators(vrActions,dispatch),
        ...bindActionCreators(folderActions,dispatch),
        ...bindActionCreators(hotpotActions,dispatch),
        ...bindActionCreators(PictureActions,dispatch),
        ...bindActionCreators(audioActions,dispatch),
        ...bindActionCreators(krpanoActions,dispatch)
    }
}

const selector = createSelector(
    state => state.vr.list,
    state => state.hotpot.list,
    state => state.scene.list,
    state => state.router.location.pathname,

    (vrList,hotpotList,sceneList,pathname)=>{
        return {
            vrList : vrList,
            hotpotList : hotpotList,
            sceneList : sceneList,
            pathname : pathname,
            vrId:pathname.split('/')[2],
            folderId:findFolderId(pathname,vrList)
        }
    }
)

function findFolderId(pathname,vrList){
    var vrId = pathname.split('/')[2]
    let item = vrList.find((item)=>{
        return item.id == vrId
    })
    return item ? item.folderId : -1
}

export default connect(selector,mapDispatchToProps)(EditPage)