import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createSelector } from 'reselect'
import { bindActionCreators } from 'redux';

import SelectField from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import FlatButton from '@material-ui/core/Button';

import * as hotpotActions from '../../../actions/hotpot'
import * as PicActions from '../../../actions/picture'
import * as AudioActions from '../../../actions/audio'
import getPathOfSceneHeadImg from '../../../native/getPathOfSceneHeadImg'

import UploadPicModal from './UploadPicModal'
import CopyImageTmpToImage from '../../../native/copyImageTmpToImage'
import PicListModal from './PicListModal'
import getPathOfImage from '../../../native/getPathOfImage'
import { getHotspotIconPath } from '../../../native/pathUtils'

import EditSelectScene from './EditSelectScene'
import EditPicture from './EditPicture'
import EditText from './EditText'
import EditPicAndText from './EditPicAndText'
import EditAudio from './EditAudio'
import EditVideo from './EditVideo'
import EditLink from './EditLink'

import { getSelector } from '../../../store/getStore'

import styles from '../../../styles/editHotpot.css'

const typeObj = {
    'switch': '切换',
    'pictures': '相册',
    'text': '文本',
    'picAndText': '图文',
    'link': '链接',
    'audio': '音频',
    'video': '视频'
}
class EditHotSpot extends Component {
    constructor() {
        super()

        this.state = {
            hotSpotType: 1,
            isAdd: false,
            showPicList: false,
            picList: [],
            picTextList: [],
            hotpotIndex: 1
        }

        this.editEle = React.createRef()
    }

    componentWillReceiveProps(nProp, cProp) {
        let nHotSpotItem = nProp.hotpotSelected
        let cHotSpotItem = cProp.hotpotSelected

        if ((nHotSpotItem && !cHotSpotItem) || (nHotSpotItem && cHotSpotItem && nHotSpotItem.id != cHotSpotItem.id)) {
            this.setState({ hotpotIndex: nHotSpotItem.icon })
        }
    }

    resetState() {
        this.setState({ hotSpotType: 1, isAdd: false })
    }

    onAddHotpotClick() {
        this.setState({ isAdd: true })
    }

    selectHotSpot(id) {
        const { updateHotspotSelect } = this.props
        updateHotspotSelect(id)
    }

    handleTypeChange(event) {
        this.setState({ hotSpotType: event.target.value });
    }

    handleCloseEditHotspot() {
        const { updateHotspotSelect } = this.props
        this.setState({ isAdd: false, hotSpotType: 1 })
        updateHotspotSelect(null)
    }

    onEditConfirmClick() {
        let result = this.editEle.getResult()
        if (!result) {
            return
        }
        const { sceneSelected } = this.props
        const { hotpotIndex } = this.state
        if (this.state.isAdd) {
            if (sceneSelected != null) {
                const { addHotpot } = this.props;
                addHotpot(result, hotpotIndex)
            }
        } else {
            const { hotpotSelected, modifyHotpot } = this.props
            if (hotpotSelected) {
                if (hotpotSelected.icon != hotpotIndex) {
                    modifyHotpot({ ...hotpotSelected, action: result, icon: hotpotIndex }, true)
                } else {
                    modifyHotpot({ ...hotpotSelected, action: result, icon: hotpotIndex }, false)
                }
            }
        }
        this.handleCloseEditHotspot()
    }

    onEditDeleteClick() {
        const { delHotpot, hotpotSelected, updateHotspotSelect } = this.props
        delHotpot(hotpotSelected)
        this.handleCloseEditHotspot()
    }

    render() {
        return (
            <div style={{ padding: '5px' }}>
                {this.renderHotpotList()}
                {this.renderEditHotPot()}
            </div>
        )
    }

    renderHotpotList() {
        const { isAdd } = this.state
        const { hotpotSelected, sceneSelected } = this.props
        if (hotpotSelected == null && !isAdd) {
            const { hotpotList } = this.props

            let hList = hotpotList.filter(item => {
                return item.sceneId == sceneSelected
            })

            let hotpotArr = hList.map((item, i) => {
                let type = JSON.parse(item.action).type
                var typeText = typeObj[type]
                return (
                    <div className={styles['hotPot-item']} key={item.id} onClick={() => { this.selectHotSpot(item.id) }}>
                        {`${typeText} ${item.id}`}
                    </div>
                )
            })

            return (
                <div style={{ borderBottom: '1px solid #eee' }}>
                    <span>
                        <i className='fa fa-dot-circle-o'></i>
                        <span style={{
                            marginLeft: '5px'
                        }}>热点编辑</span>
                        <FlatButton color="primary" onClick={this.onAddHotpotClick.bind(this)}>添加热点</FlatButton>
                    </span>
                    <div>
                        {`当前场景共有热点${hList.length}个`}
                    </div>
                    <div>
                        {hotpotArr}
                    </div>
                </div>
            )
        }
    }

    onHotSpotIconClick(index) {
        if (index != this.state.hotpotIndex) {
            this.setState({ hotpotIndex: index })
        }
    }

    renderHotpotIcon() {
        let iconArr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]
        const { hotpotIndex } = this.state

        return iconArr.map((item) => {
            let className = styles['hotspot-icon'] + ' ' + (hotpotIndex == item ? styles['hotspot-icon-selected'] : '')
            let id = String(item).length == 1 ? 0 + '' + item : String(item)

            return (
                <div key={item} onClick={() => { this.onHotSpotIconClick(item) }} className={className}>
                    <img style={{ width: '30px', height: '30px' }} src={getHotspotIconPath(id)} />
                </div>
            )
        })
    }

    renderEditHotPot() {
        const { isAdd } = this.state
        const { hotpotSelected } = this.props
        const menuList = ['切换', '相册', '文本', '图文', '链接', '音频', '视频']
        if (hotpotSelected != null || isAdd) {
            return (
                <div>
                    <div style={{ borderBottom: '1px solid #eee' }}>
                        <span>
                            <i className='fa fa-dot-circle-o'></i>
                            <span style={{ marginLeft: '5px' }}>编辑</span>
                            <FlatButton color="primary" onClick={() => { this.handleCloseEditHotspot() }} >关闭</FlatButton>
                        </span>
                    </div>
                    <div>
                        <span>选择图标</span>
                        <div className={styles['icon-container']}>{this.renderHotpotIcon()}</div>
                    </div>
                    <div>
                        <SelectField
                            value={this.state.hotSpotType}
                            onChange={this.handleTypeChange.bind(this)}
                            className={styles['select-container']}
                        >
                            {menuList.map((item, index) => <MenuItem value={1 + index}>{item}</MenuItem>)}
                        </SelectField>
                        <div className={styles['edit-type-container']}>
                            {this.renderEditByType()}
                        </div>
                    </div>
                    <div style={{ position: 'fixed', bottom: 0 }}>
                        <FlatButton color="primary" onClick={() => this.onEditConfirmClick()}>{'确定'}</FlatButton>
                        {isAdd ? null :
                            <FlatButton color="secondary" onClick={() => this.onEditDeleteClick()}>{'删除'}</FlatButton>}
                    </div>
                </div>
            )
        }
    }

    renderEditByType() {
        const { hotSpotType } = this.state
        const { hotpotSelected, sceneSelected } = this.props
        let action = hotpotSelected ? hotpotSelected.action : ''
        let hotSpotTypeActions = {
            'type1': () => {
                const { sceneList, folderId, vrId } = this.props
                return (
                    <EditSelectScene action={action} ref={(ref) => { this.editEle = ref }} selectId={null} sceneList={sceneList} folderId={folderId} sceneSelected={sceneSelected} vrId={vrId}></EditSelectScene>
                )
            },
            'type2': () => {
                const { addPicture } = this.props
                return (
                    <EditPicture action={action} ref={(ref) => { this.editEle = ref }} addPicture={addPicture}></EditPicture>
                )
            },
            'type3': () => {
                return (
                    <EditText action={action} ref={(ref) => { this.editEle = ref }} ></EditText>
                )
            },
            'type4': () => {
                const { addPicture } = this.props
                return (
                    <EditPicAndText action={action} ref={(ref) => { this.editEle = ref }} addPicture={addPicture}></EditPicAndText>
                )
            },
            'type5': () => {
                const { addPicture } = this.props
                return (
                    <EditLink action={action} ref={(ref) => { this.editEle = ref }}></EditLink>
                )
            },
            'type6': () => {
                const { addAudio } = this.props
                return (
                    <EditAudio action={action} ref={(ref) => { this.editEle = ref }} addAudio={addAudio}></EditAudio>
                )
            },
            'type7': () => {
                return (
                    <EditVideo action={action} ref={(ref) => { this.editEle = ref }}></EditVideo>
                )
            }
        }
        return hotSpotTypeActions['type' + hotSpotType]()
    }
}

function mapDispatchToProps(dispatch) {
    return {
        ...bindActionCreators(hotpotActions, dispatch),
        ...bindActionCreators(PicActions, dispatch),
        ...bindActionCreators(AudioActions, dispatch)
    }
}

let editHotPotConfig = {
    vrList: true,
    hotpotList: true,
    sceneList: true,
    pathname: true,
    vrId: true,
    folderId: true,
    sceneSelected: true,
    hotpotSelected: true,
    hotpotSelectedId: true
}

export default connect(getSelector(editHotPotConfig), mapDispatchToProps)(EditHotSpot)
