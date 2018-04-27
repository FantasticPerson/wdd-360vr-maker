import React,{Component} from 'react'
import styles from './vrItem.css'

export default class VrItem extends Component{
    constructor(){
        super()
        this.dom = React.createRef()
    }
    onItemDbClick(){
        const {history} = this.props
        console.log('doubleclick',history)
        const {onItemClick,data} = this.props
        onItemClick(data)
        history.push(`/edit/${data.id}`)
        
    }

    componentDidMount(){
        console.log(this.dom)
        console.log(this.dom.clientWidth)
    }
    
    renderImage(){
        const { data} = this.props
        if(data.headImg && data.headImg.length>0){
            return <img style={{height:'100%'}} src={data.headImg}></img>
        }
    }

    render(){
        const {data} = this.props
        
        return (
            <div ref={(dom)=>this.dom=dom} className={styles.container} onDoubleClick={this.onItemDbClick.bind(this)}>
                <div className={styles.imgContainer}>
                    {this.renderImage()}
                </div>
                <div className={styles.name}>{data.title}</div>
            </div>
        )   
    }                                                                  
}