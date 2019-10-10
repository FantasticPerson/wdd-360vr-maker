import React,{Component} from 'react'
import ContextModal from '../../../components/ContextModal'
import styles from '../../../styles/folderContextMenu.css'
                                    
export default class FolderContextMenu extends Component{

    onDeleteClick(){
        const {folderData} = this.props
        const {deleteFolder,onHide} = this.props.functions

        deleteFolder(folderData)
        onHide()
    }

    onModifyClick(){
        const {folderData} = this.props
        const {onModify} = this.props.functions

        onModify(folderData)
    }

    render(){
        const {posData} = this.props
        const {onHide} = this.props.functions

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