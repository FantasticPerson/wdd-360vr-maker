import React,{Component} from 'react'
import FlatButton from 'material-ui/FlatButton';

export default class SetHotpotPanel extends Component{
    constructor(){
        super()
        this.state={
            mode:'common'
        }
    }


    onAddClick(){
        this.setState({
            mode:'edit'
        })
    }

    renderCommon(){
        return (
            <div>
                <div>
                    <i className="fa fa-dot-circle-o"></i>
                    <span>热点设置</span>
                    <FlatButton label="热点设置" onClick={this.onAddClick.bind(this)}></FlatButton>
                </div>
                <div>{`当前场景共有热点1个`}</div>
            </div>
        )
    }

    renderEdit(){
        return (
            <div>
                <div>编辑热点</div>
                <div>图标样式</div>
                <div></div>
                <div>
                    <div>热点类型</div>
                    <select>
                        <option>切换</option>
                        <option>文本</option>
                        <option>链接</option>
                    </select>
                </div>
            </div>
        )
    }

    render(){
        const {mode} = this.state

        if(mode == 'common'){
            return (
                <div>{this.renderCommon}</div>
            )
        } else if(mode == 'edit'){
            return (
                <div>{this.renderEdit()}</div>
            )
        }
    }
}