import React,{Component} from 'react'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {panoConfig,getSelector} from '../../../store/getStore'

import styles from '../../../styles/panoContainer.css'
import Common from '../../../utils/common'

import * as actions from '../../../actions/krpano'
import * as hotspotActions from '../../../actions/hotpot'
import * as sceneActions from '../../../actions/scene'

class PanoContainer extends Component{
    constructor(){
        super()
        this.state = {updateObj:null,updateSunlightObj:null}
        this._mounted = false
    }

    componentWillUpdate(prop,state){
        setTimeout(()=>{
            if(this._mounted && state.updateObj){
                this.props.updateHotpotPos(state.updateObj)
                this.setState({updateObj:null})
            }

            if(this._mounted && state.updateSunlightObj){
                const {id,ath,atv} = state.updateSunlightObj
                this.props.updateSunlight(id,ath,atv)
                this.setState({updateSunlightObj:null})
            }
        },20)
    }

    componentWillReceiveProps(obj){
        let selectIdNew = obj.sceneSelected
        let selectIdOld = this.props.sceneSelected                                

        if(selectIdNew != selectIdOld && selectIdNew != null){
            this.props.updateHotspotSelect(selectIdNew)
            this.props.showEditHotpot()
        }
    }

    updateHotSpot(hotspotId, ath, atv){
        const {updateHotpotPos} = this.props
        const {hotpotList} = this.props
        let item = hotpotList.find(item=>item.id == hotspotId)
        if(item){
            if(ath != item.ath || atv != item.atv){
                this.setState({updateObj:{...item,ath,atv}})
            }
        }
    }

    updateSunlight(ath,atv){
        const {sceneSelectedItem} = this.props
        if(sceneSelectedItem){
            let sunlightObj = sceneSelectedItem.sunlight && sceneSelectedItem.sunlight.length > 0 ? JSON.parse(sceneSelectedItem.sunlight) : null 
            
            if(sunlightObj){
                if(sunlightObj.ath == ath || sunlightObj.atv == atv){
                    return
                }
            }

            this.setState({updateSunlightObj:{id:sceneSelectedItem.id,ath,atv}})
        }
    }

    componentDidMount(){
        this._mounted = true
        embedpano({
            target:'pano',
            ...Common.KR_EMBED,
            onready:krpano=>{
                const{updateKrpano} = this.props
                updateKrpano(krpano)
            }
        })

        top.window.onKrpHotspotMoveEnd = this.updateHotSpot.bind(this)
        top.window.onKrpHotspotClick = hotspotId => {
            const {hotpotList} = this.props
            let item = hotpotList.find(item=>item.id == hotspotId)
            if(item,this._mounted){
                this.props.updateHotspotSelect(hotspotId)
                this.props.showEditHotpot()
            }
        }

        top.window.onKrpSunHotspotMoveEnd = this.updateSunlight.bind(this)
    }

    componentWillUnmount() {
        delete window.onKrpHotspotMoveEnd
        delete window.onKrpHotspotClick

        this._mounted = false
    }
    
    render(){
        return (
            <div className={styles.container}>
                <div id="pano" className={styles.container}></div>
            </div>
        )
    }
}

function mapDispatchToProps(dispatch){
    return {
        ...bindActionCreators(actions,dispatch),
        ...bindActionCreators(hotspotActions,dispatch),
        ...bindActionCreators(sceneActions,dispatch)
    }
}

export default connect(getSelector(panoConfig),mapDispatchToProps)(PanoContainer)