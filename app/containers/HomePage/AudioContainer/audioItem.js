import React, { Component } from 'react'
import { getAudioPath } from '../../../native/pathUtils'

import styles from '../../../styles/AudioContainer.css'

export default class AudioItem extends Component {
    constructor() {
        super()
        this.audioObj = null
        this.state = { playing: false }
    }

    render() {
        const { data } = this.props
        let source = getAudioPath(data.id + '.' + data.extension)
        return (
            <div style={{ margin: '5px' }}>
                <div className={styles['audio-item']}>
                    {this.renderIcon()}
                    <audio style={{ visibility: 'hidden' }} ref={(audio) => { this.audioObj = audio }} src={source} loop></audio>
                </div>
                <div title={data.showName} style={{ width: '150px', textOverflow: 'ellipsis', overflow: 'hidden',height:'25px',lineHeight:'25px' }}>{data.showName}</div>
            </div>
        )
    }

    play() {
        if (this.audioObj) {
            this.audioObj.play()
            this.setState({ playing: true })
        }
    }

    pause() {
        if (this.audioObj) {
            this.audioObj.pause()
            this.setState({ playing: false })
        }
    }

    renderIcon() {
        if (!this.state.playing) {
            return (
                <span onClick={this.play.bind(this)} style={{ fontSize: '50px', display: 'inline-block', cursor: 'pointer' }}>
                    <i className="iconfont icon-play" style={{ fontSize: '50px' }}></i>
                </span>
            )
        } else {
            return (
                <span onClick={this.pause.bind(this)} style={{ fontSize: '50px', display: 'inline-block', cursor: 'pointer' }}>
                    <i className="iconfont icon-pause" style={{ fontSize: '50px' }}></i>
                </span>
            )
        }
    }
}