import React, { Component } from 'react'
import ContextModal from '../../../components/ContextModal'
import styles from '../../../styles/VrContextMenu.css'

export default class FolderContextMenu extends Component {

    onDeleteClick() {
        const { data } = this.props
        const { delVr, onHide } = this.props.functions

        delVr(data)
        onHide()
    }

    onModifyClick() {
        const { data } = this.props
        const { onModify, onHide } = this.props.functions

        onModify(data)
        onHide()
    }

    render() {
        const { posData } = this.props
        const { onHide } = this.props.functions
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