import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {createSelector} from 'reselect'

import {editIndexConfig,getSelector} from '../../store/getStore'

import styles from '../../styles/EditPage.css'

import FlatButton from '@material-ui/core/Button';
import RadioButton from '@material-ui/core/Radio';
import RadioButtonGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import Slider from '@material-ui/lab/Slider';

import PanoContainer from './containers/panoContainer'
import EditSceneContainer from './containers/editSceneContainer'
import getPathOfHotSpotIconPath from '../../native/getHotspotIconPath'
import getPathOfSceneHeadImg from '../../native/getPathOfSceneHeadImg'
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
import EditMusic from './containers/EditMusic'
import EditEffect from './containers/EditEffect'

class EditPage extends Component{
    constructor(){
        super()
        this.state = {editType : 0}
    }

    componentDidMount(){
        this.props.updateAppTitle('编辑全景')
        this.props.updateFromLocal();
        this.props.updateVrFromLocal();
        this.props.updateAllSceneFromLocal();
        this.props.updatePictureFromLocal()
        this.props.updateAllHotpotFromLocal();
        this.props.updateAudioFromLocal()
        this.props.updateAppShowBack(true);
    }

    onAddMusicLocal(type){
        console.log(type)
    }

    onAddMusic2(type){
        console.log(type)
    }

    showHotspotEdit(){
        this.setState({editType:1})
    }

    onEditClick(type){
        this.setState({editType:type})
        if(type != 1){
            this.props.updateHotspotSelect(null)
        }
    }

    renderEditViewPort(){
        if(this.state.editType == 0){
            return <EditViewPort></EditViewPort>
        }
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
            return <EditMusic></EditMusic>
        }
    }

    renderSpecialShow(){
        if(this.state.editType == 3){
            return <EditEffect></EditEffect>
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
            let btnClassName =  this.state.editType == index ? `${styles.btn} ${styles.btnSelected}` : `${styles.btn}`

            return  (
                <div key={item.class} className={btnClassName} onClick={()=>{this.onEditClick(index)}}>
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
                        <PanoContainer showEditHotpot={this.showHotspotEdit.bind(this)}></PanoContainer>
                    </div>
                    <div className={styles.sceneContainer}>
                        <EditSceneContainer></EditSceneContainer>
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

export default connect(getSelector(editIndexConfig),mapDispatchToProps)(EditPage)