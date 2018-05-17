import React,{Component} from 'react'
import deepEquals from 'deep-equal'
import styles from './index.css'
import Common from '../../common'
import {getPanoXml} from '../../utils/xmlBuilder'
import getScenePath from '../../native/getScenePath'

class PanoContainer extends Component{
    constructor(){
        super()
        this.krpano = null
    }

    componentDidMount(){
        const {setKrpano} = this.props
        embedpano({
            target:'pano',
            ...Common.KR_EMBED,
            onready:krpano=>{
                this.krpano = krpano
                setKrpano(krpano)
            }
        })
    }

    shouldComponentUpdate(nextProps) {
        return !deepEquals(this.props, nextProps)
    }

    componentDidUpdate(){
        const {previewSceneId} = this.props
        if(previewSceneId == -10){
            return
        }

        setTimeout(()=>{
            const {previewSceneId,folderId,vrId} = this.props

            let scenePath = getScenePath(folderId,vrId,previewSceneId)
            if(this.krpano){
                const xml = getPanoXml({
                    scenePath:scenePath
                })
                this.krpano.call(`load_pano_by_multils(${xml})`)
                this.krpano.call('show_view_frame();')
            }
        },500)
    }

    render(){
        return (
            <div className={styles.container}>
                <div id="pano" className={styles.container}></div>
            </div>
        )
    }
}

export default PanoContainer