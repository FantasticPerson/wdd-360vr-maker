import React,{Component} from 'react'

import {panoConfig,getSelector} from '../../../store/getStore'

import styles from '../../../styles/panoContainer.css'
import Common from '../../../utils/common'

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as actions from '../../../actions/krpano'
import * as hotspotActions from '../../../actions/hotpot'

class PanoContainer extends Component{
    constructor(){
        super()
        this.state = {updateObj:null}
    }

    componentWillUpdate(prop,state){
        setTimeout(()=>{
            if(state.updateObj){
                this.props.updateHotpotPos(state.updateObj)
            }
            this.setState({updateObj:null})
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
        const {hotList} = this.props
        let item = hotList.find(item=>item.id == hotspotId)
        if(item){
            if(ath != item.ath || atv != item.atv){
                this.setState({updateObj:{...item,ath,atv}})
            }
        }
    }

    componentDidMount(){
        embedpano({
            target:'pano',
            ...Common.KR_EMBED,
            onready:krpano=>{
                const{updateKrpano} = this.props
                updateKrpano(krpano)
            }
        })

        window.onKrpHotspotMoveEnd = this.updateHotSpot.bind(this)
        window.onKrpHotspotClick = hotspotId => {
            const {hotList} = this.props
            let item = hotList.find(item=>item.id == hotspotId)
            if(item){
                this.setState({selectId:hotspotId})
            }
        }
    }

    componentWillUnmount() {
        delete window.onKrpHotspotMoveEnd
        delete window.onKrpHotspotClick
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
        ...bindActionCreators(hotspotActions,dispatch)
    }
}

export default connect(getSelector(panoConfig),mapDispatchToProps)(PanoContainer)