import React,{Component} from 'react'
import styles from './vrItem.css'

export default class VrItem extends Component{
    onItemDbClick(){
        console.log('doubleclick')
        const {onItemClick,data} = this.props
        onItemClick(data)
    }
    
    render(){
        const {data} = this.props
        return (
            <div className={styles.container} onDoubleClick={this.onItemDbClick.bind(this)}>
                <div className={styles.imgContainer}>
                </div>
                <div className={styles.name}>{data.title}</div>
            </div>
        )   
    }                                                                  
}