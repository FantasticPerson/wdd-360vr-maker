import React,{Component} from 'react'
import styles from './index.css'

class TabItem extends Component{
    render(){
        const {data,width} = this.props;
        let style = {
            minWidth:`60px`,
            maxWidth:`150px`,
            marginLeft:0
        }
        let itemWidth = width === `auto` ? width : `${width}px`;
        
        return (
            <div className={styles.tabItemContainer} style={{width:`${width}px`}}>
                <span>{data.name}</span>
            </div>
        )
    }
}

export default class TabList extends Component{
    constructor(){
        super()
        this.dom = React.createRef();
        this.tabContainer = React.createRef();
        this.state = {
            tabId:0,
            width:'auto',
            totalWidth:0,
            marginLeft:0
        }
    }

    componentDidMount(){
        this.placeTabItems()
    }
    
    componentDidUpdate(){
    
    }

    placeTabItems(){
        setTimeout(()=>{
            const {tabArr} = this.props
            let tabItems = this.tabContainer.children
            let maxWidth = 50
            for(let i = 0;i<tabItems.length;i++){
                if(tabItems[i].clientWidth > maxWidth){
                    maxWidth = tabItems[i].clientWidth
                }
            }

            maxWidth = maxWidth > 150 ? 150 : maxWidth
            this.tabContainer.style.width = maxWidth * tabItems.length + 'px'
            this.setState({
                totalWidth:maxWidth * tabItems.length
            })
            // console.log(maxWidth * tabItems.length)
            // console.log(this.tabContainer.style.width)
            this.setState({
                width:maxWidth
            })
        },20)
    }

    calculateWidth(){
        console.log(this.dom)
    }

    onTabClick(id){
        this.setState({
            tabId:id
        })
    }

    onLeftArrowClick(){
        const {marginLeft,totalWidth,width} = this.state
        let containerWidth = window.innerWidth - 280

        let cLeft = marginLeft - width
        if(cLeft +totalWidth < containerWidth){
            cLeft = containerWidth - totalWidth
        }
        this.setState({
            marginLeft:cLeft
        })
    }

    renderLeftArrow(){
        const {marginLeft,totalWidth} = this.state
        console.log(marginLeft+totalWidth)
        if(marginLeft+totalWidth > window.innerWidth - 280){
            return (
                <div className={styles.leftArrow} onClick={this.onLeftArrowClick.bind(this)}>
                    <i className="fa fa-angle-left"></i>
                </div>
            )
        }
    }

    onRightArrowClick(){
        const {marginLeft,totalWidth,width} = this.state
        let containerWidth = window.innerWidth - 280
        
        let cLeft = marginLeft + width
        if(cLeft > 0){
            cLeft = 0
        }
        this.setState({
            marginLeft:cLeft
        })

    }

    renderRigthArrow(){
        
        const {marginLeft} = this.state
        if(marginLeft < 0){
            return (
                <div className={styles.rightArrow} onClick={this.onRightArrowClick.bind(this)}>
                    <i className="fa fa-angle-right"></i>
                </div>
            )
        }
    }

    renderTabItems(){
        const {tabArr} = this.props
        const {width,marginLeft} = this.state
        let tabItems = tabArr.map((item,index)=>{
            return <TabItem key={item.id} width={width} data={item}></TabItem>
        })
        let totalWidth = width * tabArr.length

        return <div style={{overflow:'hidden'}}><div style={{marginLeft:`${marginLeft}px`}} ref={(dom)=>this.tabContainer=dom}>{tabItems}</div></div>
    }

    render(){
        const {data} = this.props;
        let cWidth = window.innerWidth - 280
        return (
            <div style={{width:`${cWidth}px`}} ref={ (dom)=>this.dom=dom }>
                {this.renderLeftArrow()}
                {this.renderTabItems()}
                {this.renderRigthArrow()}          
            </div>
        )
    }
}

