import React, { Component } from 'react'
import { findDOMNode } from 'react-dom'
import { DragSource, DropTarget } from 'react-dnd'
import { DragDropContextProvider, DragDropContext } from 'react-dnd'
import styles from '../../../styles/editSceneContainer.css'
import { getHeadImgUrl, getScenePath } from '../../../native/pathUtils'

class Sceneitemspe extends Component {
    constructor() {
        super()
        this.state = {over:false,hover:false}
    }

    onDrag(event) {
        console.log(this.props.item.id)
        let msg =  JSON.stringify({posX : event.pageX,id:this.props.item.id})
        event.dataTransfer.setData('Text', msg)
    }

    onDragOver(event) {
        let msg = {}
        try{
            msg = JSON.parse(event.dataTransfer.getData('Text'))
        }catch(e){
            msg = {}
        }
        if(msg && msg.id != this.props.item.id){
            this.setState({hover:true})
            event.preventDefault()
        }
    }

    onDrop(event) {
        let msg = null
        try{
            msg = JSON.parse(event.dataTransfer.getData('Text'))
        }catch(e){
            msg = null
        }
        
        if (msg.id && msg.id != this.props.item.id) {
            const {onSceneMove} = this.props
            let thisDom = findDOMNode(this)
            let thisPos=thisDom.getBoundingClientRect()
            
            let thatDom = document.getElementById(`scene-to-drag-${msg.id}`)
            let thatPos = thatDom.getBoundingClientRect()
        
            let originPosX = msg.posX
            let cPosX = event.pageX

            if(cPosX - originPosX + thatPos.left > thisPos.left){
                onSceneMove(this.props.item.id,msg.id)
            } else {
                onSceneMove(msg.id,this.props.item.id)
            }
        }
    }

    onDragLeave(){
        this.setState({hover:false})
    }

    render() {
        const {hover} = this.state
        const { item, sceneSelected, onSceneContext, sceneClickHandler } = this.props;
        let className = `${styles.scene} ${item.id == sceneSelected ? styles.selected : ''}`

        return (
            <div id={`scene-to-drag-${item.id}`} style={{opacity:hover? 0.5 : 1}} draggable onDrop={this.onDrop.bind(this)} onDragLeave={this.onDragLeave.bind(this)} onDragOver={this.onDragOver.bind(this)} onDragStart={this.onDrag.bind(this)} className={styles.sceneContainer} key={item.id} onContextMenu={(e) => onSceneContext(e, item)} onClick={() => sceneClickHandler(item.id)}>
                <div className={className}>
                    <img style={{ height: '100%' }} src={getHeadImgUrl(item.id)}></img>
                </div>
                <div className={styles.name}>{item.name}</div>
            </div>
        )
    }
}

export default Sceneitemspe