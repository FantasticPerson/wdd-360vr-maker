import React,{Component} from 'react'

import {getAudioPath} from '../../../native/pathUtils'

export default class AudioContainer extends Component{
    constructor(){
        super()
    }

    render(){
        let containerStyle = {
            display: 'flex',
            justifyContent: 'space-around',
            flexWrap: 'wrap',
            padding: '15px',
            flex: 1,
            boxSizing: 'content-box',
            overflowY: 'auto',
            paddingTop: '10px',
            paddingBottom: '10px'
        }

        const {audioList} = this.props
        let audioItems = audioList.map((item)=>{
            return (
                <AudioItem key={item.timestamp} data={item}></AudioItem>
            )
        })

        let audioPlaceHolder = new Array(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0).map((item,index)=>{
            return <div style={{width:'150px'}} key={index}></div>
        })
        audioItems = audioItems.concat(audioPlaceHolder)

        return (
            <div style={containerStyle}>{audioItems}</div>
        )
    }
}

class AudioItem extends Component{
    constructor(){
        super()
        this.audioObj = null
        this.state={playing:false}
    }

    render(){
        const {data} = this.props
        let cStyle = {
            width: '150px',
            height: '150px',
            border: '1px solid #ccc',
            borderRadius: '5px',
            textAlign: 'center',
            lineHeight: '150px',
            backgroundColor: '#eee'
        }
        let source = getAudioPath(data.id+'.'+data.extension)
        return (
            <div style={{margin:'5px'}}>
                <div style={cStyle}>
                    {this.renderIcon()}
                    <audio style={{visibility:'hidden'}} ref={(audio)=>{this.audioObj=audio}} src={source} loop></audio>
                </div>
                <div style={{width:'150px',textOverflow: 'ellipsis',overflow: 'hidden'}}>{data.id+'.'+data.extension}</div>
            </div>
        )
    }

    play(){
        if(this.audioObj){
            this.audioObj.play()
            this.setState({playing:true})
        }
    }

    pause(){
        if(this.audioObj){
            this.audioObj.pause()  
            this.setState({playing:false}) 
        }
    }

    renderIcon(){
        if(!this.state.playing){
            return (
                <span onClick={this.play.bind(this)} style={{fontSize:'50px',display:'inline-block',cursor:'pointer'}}>
                    <i className="iconfont icon-play" style={{fontSize:'50px'}}></i>
                </span>
            )
        } else {
            return (
                <span onClick={this.pause.bind(this)} style={{fontSize:'50px',display:'inline-block',cursor:'pointer'}}>
                    <i className="iconfont icon-pause" style={{fontSize:'50px'}}></i>
                </span>
            )
        }
    }
}