import React,{Component} from 'react'
import styles from './index.css'
import Common from '../../common'
import {getPanoXml} from '../../utils/xmlBuilder'

class PanoContainer extends Component{
    componentDidMount(){
        embedpano({
            target:'pano',
            ...Common.KR_EMBED,
            onready:krpano=>{
                setTimeout(()=>{
                    const xml = getPanoXml({})
                    krpano.call(`load_pano_by_multils(${xml})`)
                    krpano.call('show_view_frame();')
                },500)
                this.krpano = krpano
                // console.log(krpano)
                
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

export default PanoContainer