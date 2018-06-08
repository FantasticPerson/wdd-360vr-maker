import React, { Component } from 'react';
import getPathOfSceneHeadImg from '../../../native/getPathOfSceneHeadImg'


export default class EditSelectScene extends Component{
    constructor(){
        super()
        this.state = {selectId:null}
    }

    componentDidMount(){
        const {action} = this.props
        if(action.length > 0){
            let obj = JSON.parse(action)
            this.setState({selectId:obj.toId})
        }
    }

    getResult(){
        const {selectId} = this.state
        if(selectId != null){
            return  JSON.stringify({type:'switch',toId:this.state.selectId})
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
                    {sceneArr}
                </div>
            </div>
        )
    }
}