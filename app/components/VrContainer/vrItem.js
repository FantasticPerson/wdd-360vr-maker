import React,{Component} from 'react'
import styles from './vrItem.css'

export default class VrItem extends Component{
    onItemDbClick(){
        const {history} = this.props
        console.log('doubleclick',history)
        const {onItemClick,data} = this.props
        onItemClick(data)
        history.push(`/edit/${data.id}`)
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