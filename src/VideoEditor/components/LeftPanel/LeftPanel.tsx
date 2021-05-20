import React, { Component } from 'react'
import CanvasContainer from '../../common/CanvasContainer'
import TextTool from '../../Tools/TextTool'
import './LeftPanel.scss'
import Button from '../../ui/Button'

interface Props {
    canvasContainer: CanvasContainer | null
}
interface State {
    textValue: string
    duration: number
    batchValue: number
}

export default class LeftPanel extends Component<Props, State> {
    canvasContainer: CanvasContainer
    state = {
        textValue: '',
        duration: 0,
        batchValue: 15
    }

    constructor(props) {
        super(props)
        this.canvasContainer = props.canvasContainer
        // this.canvasContainer.createBatches(this.state.batchValue)
    }

    updateBatch = params => {
        const canvasContainer = this.props.canvasContainer
        this.setState({
            batchValue: params.target.value
        })
        canvasContainer.setBatchCount(params.target.value)
    }

    updateText = (params: any) => {
        this.setState({
            textValue: params.target.value
        })
    }
    
    updateDuration = (params: any) => {
        this.setState({
            duration: parseInt(params.target.value)
        })
    }

    addText = () => {
        const canvasContainer = this.props.canvasContainer
        const textNode = new TextTool(canvasContainer)
        textNode.addText(this.state.textValue, this.state.duration)
        this.setState({
            textValue: '',
            duration: 0,
        })
    }

    

    schedule = () => {
        const canvasContainer = this.props.canvasContainer
        canvasContainer.shuffleFrames()
        console.log({
            frames: canvasContainer.frames,
            textNodes: canvasContainer.textNodes
        })
        
    }

    componentDidMount() {
        // const canvasContainer = this.props.canvasContainer
        // this.canvasContainer.createBatches(this.state.batchValue)
    }
    

    render() {
        const canvasContainer = this.props.canvasContainer
        return (
            <div className="leftPanelContainer">
                <div className="toolPanel">
                    <div className="title">
                        Tool Config
                    </div>
                    <div className="section">
                        <div className="label">
                            {`Batch Count`}
                        </div>
                        <div className="input">
                            <input 
                                type="number"
                                value={this.state.batchValue} 
                                onChange={this.updateBatch}
                                placeholder={`Add text here...`}
                            />
                        </div>
                    </div>
                </div>
                
                <div className="toolConfig">
                    <div className="title">
                        Tools 
                    </div>
                    <div className="section">
                        <div className="label">
                            {`Text`}
                        </div>
                        <div className="input">
                            <input 
                                value={this.state.textValue} 
                                onChange={this.updateText}
                                placeholder={`Add text here...`}
                            />
                        </div>
                    </div>
                    <div className="section">
                        <div className="label">
                            {`Duration`}
                        </div>
                        <div className="input">
                            <input 
                                type="number"
                                value={this.state.duration} 
                                onChange={this.updateDuration}
                                placeholder={`Add duration for text here`}
                            />
                        </div>
                    </div>
                    <Button
                        onClick={this.addText}
                    >
                        Add Text
                    </Button>
                </div>

                <div className="footer">
                    <Button
                        onClick={this.schedule}
                    >
                        Copy Data
                    </Button>
                    <Button
                        onClick={this.schedule}
                    >
                        Schedule
                    </Button>
                </div>
            </div>
        )
    }
}
