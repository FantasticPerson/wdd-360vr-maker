import React,{Component} from 'react'
import styles from '../../../styles/SceneContextMenu.css'
import ContextModal from '../../../components/ContextModal'

export default class GroupContextModal extends Component{
    onDeleteClick(){
        const {canDelete} = this.props
        if(canDelete){
            this.props.functions.deleteGroup(this.props.itemData)
            const {groupSelectId,groupList,itemData} = this.props
            if(groupSelectId == itemData.id){
                for(var i=0;i<groupList.length;i++){
                    if(groupList[i].id != groupSelectId){
                        this.props.functions.updateSceneSelected(groupList[i].id)
                        break
                    }
                }
            }
        } else {
            alert('目前不能删除该分组')
        }
        this.props.functions.onHide()
    }

    onModifyClick(){
        this.props.functions.showEdit(this.props.itemData)
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