import React,{Component} from 'react'
import styles from '../styles/panoContainer.css'
import Common from '../common'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as actions from '../actions/krpano'

class PanoContainer extends Component{
    constructor(){
        super()
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
    }
}

function selector(){
    return {}
}

export default connect(selector,mapDispatchToProps)(PanoContainer)