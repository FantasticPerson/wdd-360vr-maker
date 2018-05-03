import React,{Component} from 'react'
import styles from './index.css'
import Common from '../../common'
import {getPanoXml} from '../../utils/xmlBuilder'

class PanoContainer extends Component{
    constructor(){
        super()
        this.krpano = null
    }

    componentDidMount(){
        embedpano({
            target:'pano',
            ...Common.KR_EMBED,
            onready:krpano=>{
                this.krpano = krpano
                // console.log(krpano)
                 
            }
        })
    }

    componentDidUpdate(){
        const {previewSceneId} = this.props
        console.log('==============',previewSceneId)
        if(previewSceneId == -10){
            return
        }

        setTimeout(()=>{
            if(this.krpano){
                const xml = getPanoXml({})
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