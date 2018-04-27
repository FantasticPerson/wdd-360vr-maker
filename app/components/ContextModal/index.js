import React,{Component} from 'react'
import styles from './index.css'

export default class ContextModal extends Component{
    constructor(){
        super()
        this.dom = React.createRef()
        this.state = {style:{}}
    }

    componentDidMount(){
        setTimeout(() => {
            const {posX,posY} = this.props.data
            const {clientHeight} = this.dom
            let clientWidth = 150
            const {innerHeight,innerWidth} = window

            console.log(clientHeight,clientWidth)
            console.log(this.dom)

            let posLeft = posX 
            if(posX + clientWidth > innerWidth){
                posLeft = innerWidth - clientWidth
            }
            let posTop = posY
            if(posY + clientHeight > innerHeight){
                posTop = innerHeight - clientHeight
            }
            this.setState({
                style:{
                    position:'absolute',
                    left:posLeft+'px',
                    top:posTop+'px'
                }
            })
        }, 50);
    }

    onBgClick(e){
        const {bgClick} = this.props
        
        e.preventDefault()
        e.stopPropagation()

        bgClick()
    }

    onContextMenuClick(e){
        e.preventDefault()
        e.stopPropagation()
    }

    render(){
        const {style} = this.state
        return (
            <div className={styles.container} onClick={(e)=>{this.onBgClick(e)}} onContextMenu={(e)=>{this.onContextMenuClick(e)}}>
                <div className={styles.menucontainer} style={style} ref={dom => this.dom = dom}>
                    {this.props.children}
                </div>
            </div>
        )
    }
}