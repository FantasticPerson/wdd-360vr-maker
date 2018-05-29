import React,{Component} from 'react'
import ContextModal from '../../components/ContextModal'
import styles from '../../styles/folderContextMenu.css'
                                    
export default class FolderContextMenu extends Component{

    onDeleteClick(){
        const {onDelete,folderData} = this.props

        onDelete(folderData)
    }

    onModifyClick(){
        const {onModify,folderData} = this.props

        onModify(folderData)
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