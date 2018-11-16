import React, { Component } from 'react'

import { getImagePath } from '../../../native/pathUtils'
import styles from '../../../styles/PictureContainer.css'

export default class PictureContainer extends Component {
    constructor() {
        super()
    }

    render() {
        let picItems = this.props.picList.map((item) => {
            let url = getImagePath(item.id + '.' + item.extension)
            return (
                <div key={item.timestamp} style={{padding:'5px 0'}}>
                    <div className={styles.pic}>
                        <img src={url} style={{ width: '200px' }} />
                    </div>
                    <span className={styles.span}>{item.id + '.' + item.extension}</span>
                </div>
            )
        }).concat(new Array(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0).map((item, index) => {
            return <div style={{ width: '200px' }} key={index}></div>
        }))

        return (
            <div className={styles.container}>{picItems}</div>
        )
    }
}