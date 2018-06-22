import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Slider from '@material-ui/lab/Slider';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

import {createSelector} from 'reselect'

import * as sceneActions from '../../../actions/scene'

class EditViewPort extends Component{
    constructor(){
        super()
        this.state = {max:155,min:-5,start:75,max1:90,min1:-90}
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

    onApplyToKarpano(){
        const {max,min,start,min1,max1} = this.state
        const {krpano} = this.props

        if(krpano){
            if (min > krpano.get('view.fov')) {
                krpano.set('view.fov', min)
            }
            if(max < krpano.get('view.fov')){
                krpano.set('view.fov', max)
            }

            krpano.set('view.fov',start)
            krpano.set('view.fovmin',min)
            krpano.set('view.fovmax',max)
            krpano.set('view.vlookatmin',min1)
            krpano.set('view.vlookatmax',max1)

            if(min1 > krpano.get('view.vlookat')){
                krpano.set('view.vlookat',min1)
            }
            if(max1 < krpano.get('view.vlookat')){
                krpano.set('view.vlookat',max1)
            }
        }
    }

    onConfirmToKrpano(){
        const {updateViewRange,sceneSelected} = this.props
        const {max,min,start,max1,min1} = this.state

        updateViewRange(sceneSelected,start,max,min,min1,max1)
    }

    setViewPort(){
        const {updateInitViewPort,sceneSelected} = this.props
        updateInitViewPort(sceneSelected)
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
                        <Slider max={155} min={-5} style={{width:'145px',verticalAlign:'-11px',marginLeft:'16px',display:'inline-block'}} onChange={this.onMinChange.bind(this)} value={min}></Slider>
                    </div>
                    <div>
                        <Typography style={{display:'inline-block'}} id="label">最大值</Typography>
                        <Slider max={155} min={-5} style={{width:'145px',verticalAlign:'-11px',marginLeft:'16px',display:'inline-block'}} onChange={this.onMaxChange.bind(this)} value={max}></Slider>
                    </div>
                    <div>
                        <Typography style={{display:'inline-block'}} id="label">初始值</Typography>
                        <Slider max={155} min={-5} style={{width:'145px',verticalAlign:'-11px',marginLeft:'16px',display:'inline-block'}} onChange={this.onStartChange.bind(this)} value={start}></Slider>
                    </div>
                </div>
                <div style={{margin:'5px'}}>
                    <span>垂直视角限制</span>
                    <div>
                        <Typography  style={{display:'inline-block'}} id="label">最小值</Typography>
                        <Slider max={90} min={-90} style={{width:'145px',verticalAlign:'-11px',marginLeft:'16px',display:'inline-block'}} onChange={this.onMin1Change.bind(this)} value={min1}></Slider>
                    </div>
                    <div>
                        <Typography style={{display:'inline-block'}} id="label">最大值</Typography>
                        <Slider max={90} min={-90} style={{width:'145px',verticalAlign:'-11px',marginLeft:'16px',display:'inline-block'}} onChange={this.onMax1Change.bind(this)} value={max1}></Slider>
                    </div>
                </div>
                <div>
                    <Button color="primary" onClick={this.onApplyToKarpano.bind(this)}>应用查看效果</Button>
                    <Button color="primary" onClick={this.onConfirmToKrpano.bind(this)}>确定</Button>
                </div>
                <div>
                    <Button color="primary" onClick={this.setViewPort.bind(this)} style={{marginLeft:'10px'}}>将当前视角设置为初始视角</Button>
                </div>
            </div>
        )
    }
}

function mapDispatchToProps(dispatch){
    return {
        ...bindActionCreators(sceneActions,dispatch)
    }
}

const selector = createSelector(
    state => state.krpano.obj,
    state => state.scene.sceneSelected,
    (krpano,sceneSelected)=>{
        return {
            krpano:krpano,
            sceneSelected:sceneSelected
        }
    }
)

export default connect(selector,mapDispatchToProps)(EditViewPort)