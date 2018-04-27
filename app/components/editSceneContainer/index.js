import React,{Component} from 'react'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { createHashHistory } from 'history'

import styles from './index.css'

class EditSceneContainer extends Component{
    constructor(){
        super()
        this.history = createHashHistory()
    }

    filterScene() {
        const {folderId,vrId,scene} = this.props
        return scene.filter((item)=>{
            return item.folderId === folderId && item.vrId === vrId
        })
    }
    
    render(){
        let sceneArr = this.filterScene()

        return (
            <div className={styles.container}>
                <div className={styles.header}></div>
                <div className={styles.content}></div>
            </div>
        )
    }
}

function mapDispatchToProps(dispatch) {
    return {
        // ...bindActionCreators(vrActions, dispatch),
        // ...bindActionCreators(sceneActions, dispatch),
        // ...bindActionCreators(folderActions, dispatch),
        // ...bindActionCreators(appActions,dispatch)
    };
}

function mapStateToProps(state) {
    return {
        // vr: state.vr,
        scene: state.scene,
        // folder: state.folder,
        // nextId: getNextId(state.vr, 0),
        // nextFolderId: getNextId(state.folder, 2)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(EditSceneContainer);