import React, { Component } from 'react'
import { DragSource, DropTarget } from 'react-dnd'
import { DragDropContextProvider, DragDropContext } from 'react-dnd'
import styles from '../../../styles/editSceneContainer.css'
import { getHeadImgUrl, getScenePath } from '../../../native/pathUtils'

class Sceneitemspe extends Component {
    constructor() {
        super()
    }

    render() {
        const { item, sceneSelected, onSceneContext, sceneClickHandler } = this.props;
        let className = `${styles.scene} ${item.id == sceneSelected ? styles.selected : ''}`

        return (
            <div className={styles.sceneContainer} key={item.id} onContextMenu={(e) => onSceneContext(e, item)} onClick={() => sceneClickHandler(item.id)}>
                <div className={className}>
                    <img style={{ height: '100%' }} src={getHeadImgUrl(item.id)}></img>
                </div>
                <div className={styles.name}>{item.name}</div>
            </div>
        )
    }
}

export default Sceneitemspe