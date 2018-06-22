import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {createSelector} from 'reselect'

import FlatButton from '@material-ui/core/Button';
import RadioButton from '@material-ui/core/Radio';
import RadioButtonGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import Slider from '@material-ui/lab/Slider';

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

import EditViewPort from './containers/EditViewPort'
import EditHotSpot from './containers/EditHotpot'

class EditPage extends Component{
    constructor(){
        super()
        this.state = {
            editType : 0,
            editHotpot:false,
            rainType:'0',
            snowType:'0',
            zuijin:5,
            zuiyuan:150,
            zuidi:-90,
            zuigao:90,
            sliderWidth:300
        }
        this.radioGroup1 = React.createRef()
        this.radioGroup2 = React.createRef()
    }

    componentDidMount(){
        const {updateAppTitle,updateAppShowBack,pathname,updateFromLocal,updateVrFromLocal,updateAllSceneFromLocal,updateAllHotpotFromLocal,updatePictureFromLocal,updateAudioFromLocal} = this.props
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
        if(type != 1){
            this.props.updateHotspotSelect(null)
        }
    }

    showHotspotEdit(){
        this.setState({editType:1})
    }

    renderEditHotPot(){
        if(this.state.editType == 1){
            return (
                <EditHotSpot></EditHotSpot>
            )
        }
    }

    renderEditMusic(){
        if(this.state.editType == 2){
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
                            <FlatButton color="primary">添加</FlatButton>
                        </div>
                        <div style={{marginTop:'10px',borderBottom:'1px solid #eee'}}>解说音乐设置</div>
                        <div>
                            <span>选择一首音乐</span>
                            <FlatButton color="primary">添加</FlatButton>
                        </div>
                    </div>
                </div>
            )
        }
    }

    onChooseSpecislShowChange(event,value){
        const {AddEffect} = this.props

        if(event.target.name == 'rain'){
            if(value != '0'){
                this.setState({snowType:'0'})
            }
            this.setState({rainType:value})
            AddEffect('rain',value)
        } else {
            if(value != '0'){
                this.setState({rainType:'0'})
            }
            this.setState({snowType:value})
            AddEffect('snow',value)
        }
    }

    renderSpecialShow(){
        if(this.state.editType == 3){
            let rainTypes = ["关闭","小雨","中雨","大雨"]
            let snowTypes = ["关闭","小雪","中雪","大雪"]

            let rainFormControls = rainTypes.map((item,index)=>{
                return (
                    <FormControlLabel key={index} value={index+''} style={{height:'25px'}} control={<RadioButton color="primary" />} label={item} />
                )
            })

            let snowFormControls = snowTypes.map((item,index)=>{
                return (
                    <FormControlLabel key={index} value={index+''} style={{height:'25px'}} control={<RadioButton color="primary" />} label={item} />
                )
            })

            const {rainType,snowType} = this.state
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
                        </span>
                    </div>
                    <div>
                        <div>下雨</div>
                        <RadioButtonGroup
                            name="rain"
                            value={rainType}
                            onChange={this.onChooseSpecislShowChange.bind(this)}
                        >
                            {rainFormControls}
                        </RadioButtonGroup>

                        <div>下雪</div>
                        <RadioButtonGroup
                            name="snow"
                            value={snowType}
                            onChange={this.onChooseSpecislShowChange.bind(this)}
                        >
                            {snowFormControls}
                        </RadioButtonGroup>
                    </div>
                    <FlatButton onClick={this.onSelectEffectConfirm.bind(this)} color="primary" style={{marginLeft:'130px'}}>确定</FlatButton>
                </div>  
            )
        }
    }

    onSelectEffectConfirm(){
        const {rainType,snowType} = this.state
        const {updateEffect,sceneSelected} = this.props

        if(rainType > 0){
            updateEffect(sceneSelected,'rain',rainType)
        } else if(snowType > 0){
            updateEffect(sceneSelected,'snow',snowType)
        }
        
    }

    renderEditViewPort(){
        if(this.state.editType == 0){
            return <EditViewPort></EditViewPort>
        }
    }

    renderLeftBtns(){
        let btnProps = [
            {class:'fa fa-eye',name:'视角'},
            {class:'fa fa-dot-circle-o',name:'热点'},
            {class:'fa fa-music',name:'音乐'},
            {class:'fa fa-magic',name:'特效'}
        ]
        let btns = btnProps.map((item,index)=>{
            return  (
                <div key={item.class} className={this.getEditClassName(index)} onClick={()=>{this.onEditClick(index)}}>
                    <i className={item.class}></i>
                    <p>{item.name}</p>
                </div>
            )
        })
        return (
            <div className={styles.leftBar}>
                {btns}
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
                        <PanoContainer showEditHotpot={this.showHotspotEdit.bind(this)} previewSceneId={previewSceneId}></PanoContainer>
                    </div>
                    <div className={styles.sceneContainer}>
                        <EditSceneContainer onSceneClick={this.onSceneClick.bind(this)} previewSceneId={previewSceneId} vrId={vrId}></EditSceneContainer>
                    </div>
                </div>
                <div className={styles.rightBar}>
                    {this.renderEditHotPot()}
                    {this.renderSpecialShow()}
                    {this.renderEditMusic()}
                    {this.renderEditViewPort()}
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
    state => state.scene.sceneSelected,

    (vrList,hotpotList,sceneList,pathname,sceneSelected)=>{
        return {
            vrList : vrList,
            hotpotList : hotpotList,
            sceneList : sceneList,
            pathname : pathname,
            vrId:pathname.split('/')[2],
            folderId:findFolderId(pathname,vrList),
            sceneSelected:sceneSelected
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