import React,{Component} from 'react'
import styles from '../../../styles/SceneContextMenu.css'
import ContextModal from '../../../components/ContextModal'

export default class SceneContextModal extends Component{
    onDeleteClick(){
        this.props.functions.delScene(this.props.sceneData)
        this.props.functions.onHide()
    }

    onModifyClick(){
        this.props.functions.showEdit(this.props.sceneData)
        this.props.functions.onHide()
    }

    render(){
        const {onHide} = this.props.functions
        const {posData} = this.props

        return (
            <ContextModal bgClick={onHide} data={posData}>
                <ul>
                    <li>
                        <div onClick={this.onDeleteClick.bind(this)}>
                            <i className="fa fa-edit"></i>
                            <span>{`删除`}</span>
                        </div>
                    </li>
                    <li>
                        <div onClick={this.onModifyClick.bind(this)}>
                            <i className="fa fa-trash"></i>
                            <span>{`编辑`}</span>
                        </div>
                    </li>
                </ul>
            </ContextModal>
        )
    }
}