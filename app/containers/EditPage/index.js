import React, { Component } from 'react';
import PanoContainer from '../../components/panoContainer'
import styles from './index.css'


export default class EditPage extends Component{
    render(){
        return (
            <div className={styles.container}>
                <div className={styles.leftBar}>
                    <div>
                        <i className="fa fa-eye"></i>
                        <p>视角</p>
                    </div>
                    <div>
                        <i className="fa fa-dot-circle-0"></i>
                        <p>热点</p>
                    </div>
                    <div>
                        <i className="fa fa-music"></i>
                        <p>音乐</p>
                    </div>
                    <div>
                        <i className="fa fa-magic"></i>
                        <p>特效</p>
                    </div>
                </div>
                <div className={styles.content}>
                    <div className={styles.panoContainer}>
                        <PanoContainer></PanoContainer>
                    </div>
                    <div className={styles.sceneContainer}></div>
                </div>
                <div className={styles.rightBar}></div>
            </div>
        )
    }
}