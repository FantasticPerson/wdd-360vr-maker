import React,{Component} from 'react'

import {getImagePath} from '../../../native/pathUtils'

export default class PictureContainer extends Component{
    constructor(){
        super()
    }

    render(){
        let picStyle = {
            width: '200px',
            height: '200px',
            overflow: 'hidden',
            borderRadius: '5px',
            border: '1px solid #ccc'
        }

        let spanStyle = {
            display: 'inline-block',
            width: '200px',
            textAlign: 'center',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
            marginTop: '5px'
        }

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


        const {picList} = this.props
        let picItems = picList.map((item)=>{
            let url = getImagePath(item.id+'.'+item.extension)
            return (
                <div key={item.timestamp} >
                    <div style={picStyle}>
                        <img src={url} style={{width:'200px'}}/>
                    </div>
                    <span style={spanStyle}>{item.id+'.'+item.extension}</span>
                </div>
            )
        })

        let imagePlaceHolder = new Array(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0).map((item,index)=>{
            return <div style={{width:'200px'}} key={index}></div>
        })

        picItems = picItems.concat(imagePlaceHolder)

        return (
            <div style={containerStyle}>
                {picItems}
            </div>
        )
    }
}