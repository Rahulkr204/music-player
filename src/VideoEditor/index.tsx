import React, { Component } from 'react'
import './VideoEditor.scss'
import VideoPlayer from './components/VideoPlayer'
import CanvasContainer from './common/CanvasContainer';
import Seekbar from './components/Seekbar';
import LeftPanel from './components/LeftPanel';

interface Props {
    
}
interface State {
}

const imgArr = Array(11272).fill("/frames/").map((i, index) => {
    const b = '00000000' + (index + 1)
    return i + `s_${b.substring(b.length-8, b.length)}.jpg`
})

export default class index extends Component<Props, State> {
    state = {

    }

    canvasContainer: CanvasContainer | null = null

    componentDidMount = () => {
        this.canvasContainer = new CanvasContainer(imgArr)
        this.forceUpdate()
    }
    

    toggleVideo = () => {
        if (this.canvasContainer?.isVideoPlaying) {
            this.canvasContainer?.pauseVideo()
        } else {
            this.canvasContainer?.playVideo()
        }
    }
    

    render() {
        return (
            <div className="videoEditorContainer">
                <div className="leftPanel">
                    <LeftPanel
                        canvasContainer={this.canvasContainer}
                    />
                </div>
                <div className="rightPanel">
                    <div className="videoPlayer">
                        <div className="mainpanel" id="mainpanel"></div>
                    </div>
                    <div className="seekbar">
                        <Seekbar
                            imageDetails={imgArr}
                            canvasContainer={this.canvasContainer}
                        />
                    </div>
                </div>
            </div>
        )
    }
}
