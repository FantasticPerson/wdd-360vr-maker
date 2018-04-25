import React,{Component} from 'react'
import styles from './index.css'
import Common from '../../common'

class PanoContainer extends Component{
    componentDidMount(){
        embedpano({
            target:'pano',
            ...Common.KR_EMBED,
            onready:krpano=>{
                console.log(krpano)
            }
        })
    }

    render(){
        return (
            <div className={styles.container}>
                <div id="pano"></div>
            </div>
        )
    }
}

export default PanoContainer