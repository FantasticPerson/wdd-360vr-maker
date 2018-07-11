import React,{Component} from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {createSelector} from 'reselect';

import FlatButton from '@material-ui/core/Button';
import RadioButton from '@material-ui/core/Radio';
import RadioButtonGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';

import {editEffectConfig,getSelector} from '../../../store/getStore'

import * as krpanoActions from '../../../actions/krpano'
import * as sceneActions from '../../../actions/scene'

class EditEffect extends Component{
    constructor(){
        super()
        this.state = {rainType:'0',snowType:'0'}
    }


    componentDidMount(){
        const {sceneSelectedItem,sceneSelected,updateEffect,AddEffect} = this.props

        if(sceneSelectedItem.hasOwnProperty('effectType') && sceneSelectedItem.hasOwnProperty('effectLevel')){
            if(sceneSelectedItem.effectType == 'rain'){
                this.setState({rainType:sceneSelectedItem.effectLevel})
                AddEffect('rain',sceneSelectedItem.effectLevel)
            } else {
                this.setState({snowType:sceneSelectedItem.effectLevel})
                AddEffect('snow',sceneSelectedItem.effectLevel)
            }
        }
    }

    componentWillReceiveProps(obj,cObj){

        let nItem = obj.sceneSelectedItem
        let cItem = cObj.sceneSelectedItem


        const {AddEffect} = this.props

        if((nItem && !cItem) || (nItem && cItem && nItem.id != cItem.id)){
            if(nItem.hasOwnProperty('effectType') && nItem.hasOwnProperty('effectLevel')){
                if(nItem.effectType == 'rain'){
                    this.setState({'rain':nItem.effectLevel})
                    AddEffect('rain',nItem.effectLevel)
                } else {
                    this.setState({'snow':nItem.effectLevel})
                    AddEffect('snow',nItem.effectLevel)
                }
            }
        }
    }

    onSelectEffectConfirm(){
        const {rainType,snowType} = this.state
        const {updateEffect,sceneSelected,onfinish} = this.props

        if(rainType > 0){
            updateEffect(sceneSelected,'rain',rainType)
        } else if(snowType > 0){
            updateEffect(sceneSelected,'snow',snowType)
        }
        onfinish()
    }

    onChooseSpecislShowChange(event,value){
        const {AddEffect} = this.props

        if(event.target.name == 'rain'){
            if(value != '0'){
                this.setState({snowType:'0'})
            }
            this.setState({rainType:value})
            AddEffect('rain',value)
        } else {
            if(value != '0'){
                this.setState({rainType:'0'})
            }
            this.setState({snowType:value})
            AddEffect('snow',value)
        }
    }

    render(){
        let rainTypes = ["关闭","小雨","中雨","大雨"]
        let snowTypes = ["关闭","小雪","中雪","大雪"]

        let rainFormControls = rainTypes.map((item,index)=>{
            return (
                <FormControlLabel key={index} value={index+''} style={{height:'25px'}} control={<RadioButton color="primary" />} label={item} />
            )
        })

        let snowFormControls = snowTypes.map((item,index)=>{
            return (
                <FormControlLabel key={index} value={index+''} style={{height:'25px'}} control={<RadioButton color="primary" />} label={item} />
            )
        })

        const {rainType,snowType} = this.state

        return (
            <div style={{padding:'5px'}}>
                <div style={{
                    borderBottom:'1px solid #eee'
                }}>
                    <span>
                        <i className='fa fa-magic'></i>
                        <span style={{
                            marginLeft:'5px'
                        }}>特效编辑</span> 
                    </span>
                </div>
                <div>
                    <div>下雨</div>
                    <RadioButtonGroup
                        name="rain"
                        value={rainType}
                        onChange={this.onChooseSpecislShowChange.bind(this)}
                    >
                        {rainFormControls}
                    </RadioButtonGroup>

                    <div>下雪</div>
                    <RadioButtonGroup
                        name="snow"
                        value={snowType}
                        onChange={this.onChooseSpecislShowChange.bind(this)}
                    >
                        {snowFormControls}
                    </RadioButtonGroup>
                </div>
                <FlatButton onClick={this.onSelectEffectConfirm.bind(this)} color="primary" style={{marginLeft:'130px'}}>确定</FlatButton>
            </div>  
        )
    }
}

function mapDispatchToProps(dispatch){
    return {
        ...bindActionCreators(sceneActions,dispatch),
        ...bindActionCreators(krpanoActions,dispatch)
    }
}

export default connect(getSelector(editEffectConfig),mapDispatchToProps)(EditEffect)