import React, { Component } from 'react'
import CanvasContainer from '../../common/CanvasContainer'
import './Seekbar.scss'
import Slider, { Range } from 'rc-slider';
import 'rc-slider/assets/index.css';
import { FaPlay, FaPause } from "react-icons/fa";

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
    
    togglePlay = () => {
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
        this.togglePlay()
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
        const canvasContainer = this.props.canvasContainer
        return (
            <div className="seekbarContainer">
                <div className="videoSeekbar">
                    <div className="playBtn" onClick={() => this.toggleVideo()}>
                        {this.state.isPlaying ? <FaPause fill={"#FFF"} size={24}/> : <FaPlay fill={"#FFF"} size={24}/>}
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
                <div className="seekbarTime">
                    <div className="startTime">{displayTime(this.state.seekbarVal / canvasContainer?.fps)}</div>
                    <div className="endTime">{displayTime(canvasContainer?.videoTime)}</div>
                </div>
            </div>
        )
    }
}



function displayTime (seconds) {
    const format = val => `0${Math.floor(val)}`.slice(-2)
    const hours = seconds / 3600
    const minutes = (seconds % 3600) / 60
  
    return [hours, minutes, seconds % 60].map(format).join(':')
}