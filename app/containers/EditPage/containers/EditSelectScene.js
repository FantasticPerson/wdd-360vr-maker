import React, { Component } from 'react';
import getPathOfSceneHeadImg from '../../../native/getPathOfSceneHeadImg'
// import SelectField from 'material-ui/SelectField';

import SelectField from '@material-ui/core/Select';
// import MenuItem from 'material-ui/MenuItem';
import MenuItem from '@material-ui/core/MenuItem';
// import Checkbox from 'material-ui/Checkbox';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';

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
        debugger
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

    onTypeChange(event){
        this.setState({type:event.target.value})
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
                    <SelectField
                        value={this.state.type}
                        onChange={this.onTypeChange.bind(this)}
                    >
                        <MenuItem value={0}>淡入淡出</MenuItem>
                        <MenuItem value={1}>缩放过渡</MenuItem>
                        <MenuItem value={2}>黑场过渡</MenuItem>
                        <MenuItem value={3}>白场过渡</MenuItem>
                        <MenuItem value={4}>从右至左</MenuItem>
                        <MenuItem value={5}>对角线</MenuItem>
                        <MenuItem value={6}>原型展开</MenuItem>
                        <MenuItem value={7}>水平展开</MenuItem>
                        <MenuItem value={8}>椭圆缩放</MenuItem>
                    </SelectField>
                    
                    <FormControlLabel
                        control={
                            <Checkbox
                            checked={this.state.check}
                            onChange={this.updateCheck.bind(this)}
                            value="在新窗口中打开"
                            color="primary"
                            />
                        }
                        label="在新窗口中打开"
                    />
                    {sceneArr}
                </div>
            </div>
        )
    }
}