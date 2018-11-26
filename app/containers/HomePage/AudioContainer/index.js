import React, { Component } from 'react'
import AudioItem from './audioItem'

import styles from '../../../styles/AudioContainer.css'

export default class AudioContainer extends Component {
    constructor() {
        super()
    }

    render() {
        let audioItems = this.props.audioList.map((item) => {
            return (
                <AudioItem key={item.timestamp} data={item}></AudioItem>
            )
        }).concat(new Array(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0).map((item, index) => {
            return <div style={{ width: '150px' }} key={index}></div>
        }))

        return (
            <div className={styles.container}>{audioItems}</div>
        )
    }
}
