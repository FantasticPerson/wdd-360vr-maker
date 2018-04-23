import React,{Component} from 'react'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import FlatButton from 'material-ui/FlatButton';

import styles from './index.css'
import * as vrActions from '../../actions/vr'
import CreateVrModal from '../CreateVrModal'

class VrContainer extends Component{
    constructor(){
        super()
        this.state = {
            showCreateVrModal:false
        }
    }

    onAddClick(){
        this.setState({
            showCreateVrModal:true
        })
    }

    onCancelClick(){
        this.setState({
            showCreateVrModal:false
        })
    }

    onCreateClick(title,brief){
        this.onCancelClick()
    }
    
    renderContent(){
        const {vr} = this.props
        if(vr.length > 0){

        } else {
            return (
                <h3>暂无内容</h3>
            )
        }
    }

    renderCreateVrModal(){
        const {showCreateVrModal} = this.state
        if(showCreateVrModal){
            return (
                <CreateVrModal onCancel={this.onCancelClick.bind(this)} onCreate={this.onCreateClick.bind(this)}></CreateVrModal>
            )
        }
    }

    render(){
        return (
            <div className={styles.container}>
                <div className={styles.header}>
                    <div style={{paddingLeft:'10px'}} onClick={()=>{this.onAddClick()}}>
                        <i className={"fa fa-plus "+styles.plusIcon}/>
                        <FlatButton primary={true} label="创建全景" style={{height:'30px',lineHeight:'30px',paddingLeft:'20px'}}/>
                    </div>
                </div>
                <div className={styles.content}>
                    {this.renderContent()}         
                </div>
                {this.renderCreateVrModal()}
            </div>
        )
    }
}

function mapStateToProps(state){
    return {
        vr:state.vr
    }
}

function mapDispatchToProps(dispatch){
    return {
        ...bindActionCreators(vrActions,dispatch)
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(VrContainer)
