import React,{Component} from 'react'
import styles from '../styles/panoContainer.css'
import Common from '../utils/common'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as actions from '../actions/krpano'
import * as hotspotActions from '../actions/hotpot'
import { createSelector } from 'reselect';

class PanoContainer extends Component{
    constructor(){
        super()
        this.state = {updateObj:null,selectId:null}
    }

    componentWillUpdate(prop,state){
        setTimeout(()=>{
            if(state.updateObj){
                this.props.updateHotpotPos(state.updateObj)
            }
            if(state.selectId){
                this.props.updateHotspotSelect(state.selectId)
                this.props.showEditHotpot()
            }
            this.setState({updateObj:null,selectId:null})
        },20)
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

const selector = createSelector(
    state => state.hotpot.list,
    (hotlist) => {
        return {
            hotList : hotlist
        }
    }
)

export default connect(selector,mapDispatchToProps)(PanoContainer)