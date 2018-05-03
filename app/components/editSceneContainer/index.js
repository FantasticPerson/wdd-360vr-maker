import React,{Component} from 'react'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { createHashHistory } from 'history'
import TabList from '../TabList'
import SceneList from '../SceneList'
import * as sceneActions from '../../actions/scene'

import styles from './index.css'

class EditSceneContainer extends Component{
    constructor(){
        super()
        this.history = createHashHistory()
    }

    filterScene() {
        const {vrId,scene} = this.props
        return scene.filter((item)=>{
            return item.vrid == vrId
        })
    }

    componentDidMount(){
        const {pathname} = this.props
        
    }

    findFolderId(){
        const {vrId,vr} = this.props
        let item = vr.find((item)=>{
            return item.id == vrId
        })
        return item ? item.folderId : -1
    }
    
    render(){
        const {modifyScene,addScene,nextSceneId,changeScene,previewSceneId} = this.props
        const {vrId} = this.props
        let folderId = this.findFolderId()
        let sceneArr = this.filterScene()
        let tabArr = [
            {id:0,name:'asdasd'},
            {id:1,name:'asdasd'},
            {id:2,name:'asdasd'},
            {id:3,name:'asdasd'}
        ]

        return (
            <div className={styles.container}>
                {/* <div className={styles.header}>
                    <TabList tabArr={tabArr}></TabList>
                </div> */}
                <div className={styles.content}>
                    <SceneList changeScene={changeScene} previewSceneId={previewSceneId} nextSceneId={nextSceneId} modifyScene={modifyScene} addScene={addScene} sceneList={sceneArr} vrId ={vrId} folderId={folderId}></SceneList>
                </div>
            </div>
        )
    }
}

function mapDispatchToProps(dispatch) {
    return {
        // ...bindActionCreators(vrActions, dispatch),
        ...bindActionCreators(sceneActions, dispatch),
        // ...bindActionCreators(folderActions, dispatch),
        // ...bindActionCreators(appActions,dispatch)
    };
}

function mapStateToProps(state) {
    return {
        // vr: state.vr,
        scene: state.scene,
        vr:state.vr,
        nextSceneId:getNextId(state.scene,0)
        // folder: state.folder,
        // nextId: getNextId(state.vr, 0),
        // nextFolderId: getNextId(state.folder, 2)，
        // pathname:state.router.location.pathname
    };
}

const getNextId = (arr, startIndex) => {
    let id = startIndex;
    arr.map(item => {
        if (item.id > id) {
            id = item.id;
        }
    });
    return ++id;
};

export default connect(mapStateToProps, mapDispatchToProps)(EditSceneContainer);