import React, { Component } from 'react'
import CanvasContainer from '../../common/CanvasContainer'
import './Seekbar.scss'
import Slider, { Range } from 'rc-slider';
import 'rc-slider/assets/index.css';

interface Props {
    imageDetails: any
    canvasContainer: CanvasContainer | null
}

interface State {
    seekbarVal: number
}

export default class Seekbar extends Component<Props, State> {
    state = {
        seekbarVal: 0
    }
    

    updateSeekbar = (val: number) => {
        const canvasContainer = this.props.canvasContainer
        canvasContainer?.updateSeekbarPosition(val)
        this.updateSeek(val)
    }

    toggleVideo = () => {
        const canvasContainer = this.props.canvasContainer
        if (canvasContainer?.isVideoPlaying) {
            canvasContainer?.pauseVideo()
        } else {
            canvasContainer?.playVideo(this.updateSeek)
        }
    }

    updateSeek = (pos) => {
        this.setState({
            seekbarVal: pos
        })
    }

    onBeforeChange = () => {
        const canvasContainer = this.props.canvasContainer
        if (canvasContainer?.isVideoPlaying) {
            canvasContainer?.pauseVideo()
        }
    }

    onAfterChange = () => {
        const canvasContainer = this.props.canvasContainer
        if (!canvasContainer?.isVideoPlaying) {
            canvasContainer?.playVideo(this.updateSeek)
        }
    }

    render() {
        const seekbarPosition = this.props.canvasContainer?.getSeekbarPosition()
        return (
            <div className="seekbarContainer">
                <div className="videoSeekbar">
                    <div className="playBtn" onClick={() => this.toggleVideo()}>
                        Play
                    </div>
                    <div className="seekbarInput">
                        <Slider 
                            min={1} 
                            max={this.props.imageDetails.length} 
                            onChange={this.updateSeekbar} 
                            handleStyle={{
                                width: '12px',
                                height: '28px',
                                borderRadius: '4px',
                                position: 'relative',
                                top: '-2px'
                            }}
                            value={this.state.seekbarVal}
                            onBeforeChange={this.onBeforeChange}
                            onAfterChange={this.onAfterChange}
                        />
                    </div>
                </div>
            </div>
        )
    }
}
