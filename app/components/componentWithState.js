import React,{Component} from 'react'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import actions from '../actions'

class componentWithState extends Component{
    render(){
        return (
            <div>{this.props.children}</div>
        )
    }
}

function mapDispatchToProps(dispatch) {
    return {
        ...bindActionCreators(actions.VrActions, dispatch),
        ...bindActionCreators(actions.FolderActions, dispatch),
        ...bindActionCreators(actions.SceneActions, dispatch)
    }
}

function mapStateToProps(state) {
    return {
        vr:state.vr,
        scene:state.scene,
        folder:state.folder,
        nextFolderId:getNextId(state.folder,2),
        nextSceneId:getNextId(state.scene,0)
        nextVrId:getNextId(state.vr,0)
    }
}

const getNextId = (arr,startIndex) => {
    let id = startIndex
    arr.map(item => {
      if (item.id > id) {
        id = item.id
      }
    })
    return ++id
}

export default connect(mapStateToProps,mapDispatchToProps)(componentWithState)