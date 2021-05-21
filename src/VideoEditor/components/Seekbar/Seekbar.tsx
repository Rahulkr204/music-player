import React, { Component } from 'react'
import CanvasContainer from '../../common/CanvasContainer'
import './Seekbar.scss'
import Slider, { Range } from 'rc-slider';
import 'rc-slider/assets/index.css';
import { FaPause, FaPlay } from 'react-icons/fa';
import Button from '../../ui/Button';

interface Props {
    imageDetails: any
    canvasContainer: CanvasContainer | null
}

interface State {
    seekbarVal: number
    isPlaying: boolean
}

export default class Seekbar extends Component<Props, State> {
    state = {
        seekbarVal: 0,
        isPlaying: false
    }
    
    toggleVideoPlay = () => {
        this.setState({
            isPlaying: !this.state.isPlaying
        })
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
        this.toggleVideoPlay()
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
                        {this.state.isPlaying ? <FaPause color="#fff" size="24px"/> : <FaPlay color="#fff" size="24px"/>}
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
