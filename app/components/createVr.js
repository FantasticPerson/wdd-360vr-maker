import React,{Component} from 'react'
import styles from './createVr.css'


// type props = {}

export default class CreateVR extends Component{
    // props:props;

    onKeyDown(e){
        
        if(e.keyCode == 13){
            console.log(e.target)
            let value = e.target.value.trim()
            if(value.length > 0){
                
            }            
        }
    }

    render(){
        return (
            <div className={styles.container}>
                <input className={styles.input} type="text" onKeyDown={(e)=>{this.onKeyDown(e)}}/>
            </div>
        )
    }
}