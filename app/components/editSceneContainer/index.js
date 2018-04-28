import React,{Component} from 'react'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { createHashHistory } from 'history'
import TabList from '../TabList'

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
        let tabArr = [
            {id:0,name:'asdasd'},
            {id:1,name:'asdasd'},
            {id:2,name:'asdasd'},
            {id:3,name:'asdasd'},
            {id:4,name:'asdasd'},
            {id:5,name:'asdasd'},
            {id:6,name:'asdasd'},
            {id:7,name:'asdasd'},
            {id:8,name:'asdasd'},
            {id:9,name:'asdasd'},
            {id:10,name:'asdasd'},
            {id:11,name:'asdasd'},
            {id:12,name:'asdasd'},
            {id:13,name:'asdasd'},
            {id:14,name:'asdasd'},
            {id:15 ,name:'asdasd'},
            {id:16 ,name:'asdasd'},
            {id:17 ,name:'asdasd'}
        ]

        return (
            <div className={styles.container}>
                <div className={styles.header}>
                    <TabList tabArr={tabArr}></TabList>
                </div>
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