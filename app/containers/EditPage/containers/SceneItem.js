import React,{Component} from 'react'
import {DragSource,DropTarget} from 'react-dnd'
import { DragDropContextProvider,DragDropContext } from 'react-dnd'
import styles from '../../../styles/editSceneContainer.css'
import {getHeadImgUrl,getScenePath} from '../../../native/pathUtils'
import draggle from 'react-draggable'


// @DragSource('sceneitemspe',{
//     isDragging(props,monitor,component){
//         console.log(props)
//     },
//     canDrag(){
//         console.log('canDrag')
//         return true
//     }
// },(connect,monitor)=>{
//     return {
//         connectDragSource: connect.dragSource(),
//         isDragging: monitor.isDragging(),
//     }
// })

// @DropTarget('sceneitemspe',{
//     drop(props,monitor,component){
//         console.log(props)
//     },
// },(connect,monitor)=>{

// })

class Sceneitemspe extends Component{
    constructor(){
        super()
    }

    render(){
        const {item,sceneSelected,isDragging, connectDragSource} = this.props;
        let className = `${styles.scene} ${item.id == sceneSelected ? styles.selected : ''}`

        // console.log(connectDragSource)
        return (
            <div className={styles.sceneContainer} key={item.id} onContextMenu={(e)=>this.props.onSceneContext(e,item)} onClick={()=>this.props.sceneClickHandler(item.id)}>
                {/* <span style={{    
                    position: 'absolute',
                    zIndex: 10,
                    color: '#FFF',
                    marginLeft: '60px'}}><i style={{    
                        fontSize: '30px',
                        color: '#FFF'}} className="iconfont icon-drag"></i></span> */}
                <div className={className}>
                    <img style={{height:'100%'}} src={getHeadImgUrl(item.id)}></img>
                </div>
                <div className={styles.name}>{item.name}</div>
            </div>
        )
    }
}

export default Sceneitemspe