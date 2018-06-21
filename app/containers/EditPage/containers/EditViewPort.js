import React, { Component } from 'react';

import Slider from '@material-ui/lab/Slider';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

export default class EditViewPort extends Component{
    constructor(){
        super()
        this.state = {max:100,min:0,start:50,max1:100,min1:0}
    }

    componentDidMount(){

    }

    onMax1Change(event,value){
        const {min1} = this.state
        if(value >= min1){
            this.setState({max1:value})
        }
    }

    onMin1Change(event,value){
        const {max1} = this.state
        if(value <= max1){
            this.setState({min1:value})
        }
    }

    onMaxChange(event,value){
        const {min,start} = this.state
        if(value >= min && value >= start){
            this.setState({max:value})
        }
    }

    onMinChange(event,value){
        const {max,start} = this.state
        if(value <= max && value <= start){
            this.setState({min:value})
        }
    }

    onStartChange(event,value){
        const {min,max} = this.state
        if(value >= min && value <= max){
            this.setState({start:value})
        }
    }

    render(){
        const {max,min,start,max1,min1} = this.state

        return (
            <div style={{padding:'5px'}}>
                <div style={{
                    borderBottom:'1px solid #eee',
                    paddingBottom:'10px'
                }}>
                    <span>
                        <i className='fa fa-eye'></i>
                        <span style={{
                            marginLeft:'5px'
                        }}>视角</span>
                        
                    </span>
                </div>
                <div style={{margin:'5px'}}> 
                    <span>视角范围设置</span>
                    <div>
                        <Typography style={{display:'inline-block'}} id="label">最小值</Typography>
                        <Slider style={{width:'145px',verticalAlign:'-11px',marginLeft:'16px',display:'inline-block'}} onChange={this.onMinChange.bind(this)} value={min}></Slider>
                    </div>
                    <div>
                        <Typography style={{display:'inline-block'}} id="label">最大值</Typography>
                        <Slider style={{width:'145px',verticalAlign:'-11px',marginLeft:'16px',display:'inline-block'}} onChange={this.onMaxChange.bind(this)} value={max}></Slider>
                    </div>
                    <div>
                        <Typography style={{display:'inline-block'}} id="label">初始值</Typography>
                        <Slider style={{width:'145px',verticalAlign:'-11px',marginLeft:'16px',display:'inline-block'}} onChange={this.onStartChange.bind(this)} value={start}></Slider>
                    </div>
                </div>
                <div style={{margin:'5px'}}>
                    <span>垂直视角限制</span>
                    <div>
                        <Typography  style={{display:'inline-block'}} id="label">最小值</Typography>
                        <Slider style={{width:'145px',verticalAlign:'-11px',marginLeft:'16px',display:'inline-block'}} onChange={this.onMin1Change.bind(this)} value={min1}></Slider>
                    </div>
                    <div>
                        <Typography style={{display:'inline-block'}} id="label">最大值</Typography>
                        <Slider style={{width:'145px',verticalAlign:'-11px',marginLeft:'16px',display:'inline-block'}} onChange={this.onMax1Change.bind(this)} value={max1}></Slider>
                    </div>
                </div>
                <div>
                    <Button color="primary" style={{marginLeft:'130px'}}>确定</Button>
                </div>
                <div>
                    <Button color="primary" style={{marginLeft:'10px'}}>将当前视角设置为初始视角</Button>
                </div>
            </div>
        )
    }
}