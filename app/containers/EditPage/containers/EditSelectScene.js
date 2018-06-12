import React, { Component } from 'react';
import getPathOfSceneHeadImg from '../../../native/getPathOfSceneHeadImg'
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import Checkbox from 'material-ui/Checkbox';

export default class EditSelectScene extends Component{
    constructor(){
        super()
        this.state = {selectId:null,type:0,check:true}
    }

    componentDidMount(){
        const {action} = this.props
        if(action.length > 0){
            let obj = JSON.parse(action)
            this.setState({selectId:obj.toId,value:obj.type,check:obj.check})
        }
    }

    getResult(){
        const {selectId,type,check} = this.state
        if(selectId != null){
            return  JSON.stringify({type:'switch',toId:this.state.selectId,type:type,check:check})
        }
        return ''
    }

    onItemClick(id){
        this.setState({selectId:id})
    }

    onConfirm(){
        const {selectId} = this.state
        return selectId
    }

    onTypeChange(event, index, value){
        this.setState({type:value})
    }

    updateCheck(){
        this.setState({check:!this.state.check})
    }

    render(){
        const {selectId} = this.state
        const {sceneList,folderId,vrId} = this.props

        let sceneItemStyle = {
            margin:'5px',
            height:'80px',
            width:'80px',
            display:'inline-block',
            overflow:'hidden'
        }

        let sceneArr = sceneList.map((item)=>{
            let itemStyle = sceneItemStyle
            if(selectId == item.id){
                itemStyle = {...itemStyle,border:'3px solid blanchedalmond'}
            }

            return (
                <div onClick={()=>{this.onItemClick(item.id)}} style={itemStyle} key={item.id}>
                    <div style={{height:'80px',width:'80px',overflow:'hidden'}}>
                        <img style={{height:'100%'}} src={getPathOfSceneHeadImg(folderId,vrId,item.id)}/>
                    </div>
                </div>
            )
        })

        return (
            <div>
                <div style={{width:'180px',margin: '0 auto'}}>
                    <SelectField style={{width:'200px'}} floatingLabelText="过渡类型" value={this.state.type} onChange={(event, index, value)=>{this.onTypeChange(event, index, value)}}>
                        <MenuItem value={0} primaryText="淡入淡出" />
                        <MenuItem value={1} primaryText="缩放过渡" />
                        <MenuItem value={2} primaryText="黑场过渡" />
                        <MenuItem value={3} primaryText="白场过渡" />
                        <MenuItem value={4} primaryText="从右至左" />
                        <MenuItem value={5} primaryText="对角线" />
                        <MenuItem value={6} primaryText="原型展开" />
                        <MenuItem value={7} primaryText="水平展开" />
                        <MenuItem value={8} primaryText="椭圆缩放" />
                    </SelectField>
                    <Checkbox labelPosition="left" checked={this.state.check} onCheck={this.updateCheck.bind(this)} label="显示场景名"></Checkbox>
                    {sceneArr}
                </div>
            </div>
        )
    }
}