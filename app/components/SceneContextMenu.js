import React,{Component} from 'react'
import ContextModal from './ContextModal'
import styles from '../styles/SceneContextMenu.css'

export default class SceneContextModal extends Component{
    onDeleteClick(){
        const {onDelete,sceneData} = this.props

        onDelete(sceneData)
    }

    onModifyClick(){
        const {onModify,sceneData} = this.props

        onModify(sceneData)
    }

    render(){
        const {bgClick,posData} = this.props

        return (
            <ContextModal bgClick={bgClick} data={posData}>
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