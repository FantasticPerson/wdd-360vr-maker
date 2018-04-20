import React,{Component} from 'react'

export default class BaseModal extends Component{
    render(){
        return (
            <div className="">
                <div className="">
                    {this.props.children}
                </div>
            </div>
        )
    }
}