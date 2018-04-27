import React,{Component} from 'react'
import styles from './index.css'

class TabItem extends Component{
    
}

export class TabList extends Component{
    constructor(){
        super()
        this.dom = React.createRef();
    }

    calculateWidth(){
        console.log(this.dom)
    }

    render(){
        const {data} = this.props;
        
        return (
            <div ref={(dom)=>this.dom=dom}>
                
            </div>
        )
    }
}

