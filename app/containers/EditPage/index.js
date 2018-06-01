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
import {addHotspotToKrpano,selectHotspotInKrpano,addRainEffect,addSnowEffect} from '../../utils/krpanoFunctions'
import styles from '../../styles/EditPage.css'
import * as appActions from '../../actions/app'
import * as vrActions from '../../actions/vr'
import * as sceneActions from '../../actions/scene'
import * as folderActions from '../../actions/folder'
import * as hotpotActions from '../../actions/hotpot'

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
        const {updateAppTitle,updateAppShowBack,pathname,updateFromLocal,updateVrFromLocal,updateAllSceneFromLocal,updateAllHotpotFromLocal} = this.props
        this.lastSceneId = this.state.previewSceneId
        updateAppTitle('编辑全景')

        updateFromLocal();
        updateVrFromLocal();
        updateAllSceneFromLocal();
        updateAllHotpotFromLocal();

        updateAppShowBack(true)

        let id = pathname.split('/')[2]
        this.setState({
            vrId:id
        })
    }

    setKrpano(krpano){
        this.krpano = krpano
        this.krpano.call('hide_view_frame();')
    }

    getEditClassName(type){
        const {editType} = this.state
        return editType == type ? `${styles.btn} ${styles.btnSelected}` : `${styles.btn}`
    }

    onEditClick(type){
        this.setState({editType:type})
        if(type == 0){
            if(this.krpano){
                this.krpano.call('show_view_frame();')
            }
        } else {
            if(this.krpano){
                this.krpano.call('hide_view_frame();')
            }
        }
    }

    onAddHotpotClick(){
        if(this.krpano){
            const {vrId,previewSceneId} = this.state
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
                action:''
            }
            addHotspotToKrpano(this.krpano, data, true)
            setTimeout(()=>{
                selectHotspotInKrpano(this.krpano,data._id)
            },50)
            this.hotspots.push({sceneId:previewSceneId,data:data})
            this.selectedHotspotId = data._id

            this.setState({
                editHotpot:true
            })
        }
    }

    renderEditHotpot1(){
        const {editHotpot} = this.state
        return (
            <div>
                <div>{`当前场景共有热点1个`}</div>
                <div>
                    
                </div>
            </div>
        )
    }

    renderEditHotPot2(){
        const {editHotpot,vrId,selectSceneId,previewSceneId} = this.state
        const {scene} = this.props
        let sceneArr = this.fiterScene()
        let sceneList = sceneArr.map((item)=>{
            let folderId = this.findFolderId()
            let sceneItemStyle = selectSceneId == item.id ? {
                margin:'5px',height:'100px',width:'80px',display:'inline-block',border:'1px solid #123',overflow:'hidden'
            } : {margin:'5px',height:'100px',width:'80px',display:'inline-block',overflow:'hidden'}

            return <div style={sceneItemStyle} key={item.id}><div style={{height:'80px',width:'80px',overflow:'hidden'}}><img style={{height:'100%'}} src={getPathOfSceneHeadImg(folderId,vrId,item.id)}/></div></div>
        })
        if(editHotpot){
            return (
                <div>
                    <h1>选择一个场景</h1>
                    <div>
                        {sceneList}
                    </div>
                </div>
            )
        }
    }

    fiterScene(){
        const {sceneList} = this.props
        const {vrId,previewSceneId} = this.state
        return sceneList.filter((item)=>{
            return item.vrid == vrId && item.id !== previewSceneId
        })
    }

    findFolderId(){
        const {vrList} = this.props
        const {vrId} = this.state
        let item = vrList.find((item)=>{
            return item.id == vrId
        })
        return item ? item.folderId : -1
    }


    renderEditTitle(){
        const {editHotpot} = this.state

        if(!editHotpot){
            return (
                <span>
                    <i className='fa fa-dot-circle-o'></i>
                    <span style={{
                        marginLeft:'5px'
                    }}>热点编辑</span> 
                    <FlatButton label="添加热点" primary onClick={this.onAddHotpotClick.bind(this)} />
                </span>
            ) 
        } else {
            return (
                <span>
                    <i className='fa fa-dot-circle-o'></i>
                    <span style={{
                        marginLeft:'5px'
                    }}>编辑</span> 
                </span>
            )
        }
    }

    renderEditHotPot(){
        const {editType} = this.state
        if(editType == 0){
            return (
                <EditHotSpot></EditHotSpot>
            )
        }
    }

    onChooseSpecislShowChange(name){
        if(name == 'rain'){
            let rainSelected = this.radioGroup1.getSelectedValue()
            if(rainSelected != '0'){
                this.radioGroup2.setSelectedValue('0')

                if(this.krpano){
                    addRainEffect(this.krpano,rainSelected)
                }
            }
        } else {
            let snowSelected = this.radioGroup2.getSelectedValue()
            if(snowSelected != '0'){
                this.radioGroup1.setSelectedValue('0')
                if(snowSelected){
                    addSnowEffect(this.krpano,snowSelected)
                }
            }
        }
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
                            <FlatButton label="添加" primary onClick={this.onAddHotpotClick.bind(this)} />
                        </div>
                        <div style={{marginTop:'10px',borderBottom:'1px solid #eee'}}>解说音乐设置</div>
                        <div>
                            <span>选择一首音乐</span>
                            <FlatButton label="添加" primary onClick={this.onAddHotpotClick.bind(this)} />
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
                        <RadioButtonGroup name="rain" ref={(rg)=>{this.radioGroup1=rg}} defaultSelected={'0'}onChange={()=>this.onChooseSpecislShowChange('rain')}>
                            <RadioButton value="0" label="关闭" style={styles.radioButton}/>
                            <RadioButton value="3" label="小雨" style={styles.radioButton}/>
                            <RadioButton value="2" label="中雨" style={styles.radioButton}/>
                            <RadioButton value="1" label="大雨" style={styles.radioButton}/>
                        </RadioButtonGroup>
                        <div>下雪</div>
                        <RadioButtonGroup name="snow" ref={(rg)=>{this.radioGroup2=rg}} defaultSelected={'0'} onChange={()=>this.onChooseSpecislShowChange('snow')}>
                            <RadioButton value="0" label="关闭" style={styles.radioButton}/>
                            <RadioButton value="3" label="小雪" style={styles.radioButton}/>
                            <RadioButton value="2" label="中雪" style={styles.radioButton}/>
                            <RadioButton value="1" label="大雪" style={styles.radioButton}/>
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
        const {vrId,previewSceneId} = this.state
        const {vrList} = this.props
        let vrItem = vrList.find((item)=>{
            return item.id ==  vrId
        })
        vrItem = vrItem || {}
        return (
            <div className={styles.container}>
                {this.renderLeftBtns()}
                <div className={styles.content}>
                    <div className={styles.panoContainer}>
                        <PanoContainer previewSceneId={previewSceneId} setKrpano={this.setKrpano.bind(this)} folderId={vrItem.folderId} vrId={vrId}></PanoContainer>
                    </div>
                    <div className={styles.sceneContainer}>
                        <EditSceneContainer previewSceneId={previewSceneId} vrId={vrId}></EditSceneContainer>
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
        ...bindActionCreators(hotpotActions,dispatch)
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
            pathname : pathname
        }
    }
)

export default connect(selector,mapDispatchToProps)(EditPage)