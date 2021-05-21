import CanvasWorkspace from "./CanvasWorkspace"
import { uuid } from 'uuidv4';
import Konva from 'konva';

interface Frames {
    id: string
    image: any
    elements: any
}

export default class CanvasContainer {
    canvasWorkspace: CanvasWorkspace
    initFrameURL: string
    imageArr: string[]
    fps: number = 60
    videoPlayInterval: any
    videoTime: number 
    isVideoPlaying: boolean = false
    seekbarPosition: number
    frames: Frames[]
    batches: any[]
    batchCount: number
    textNodes: {[id:string] : Konva.Text} = {}

    constructor(imageArr: any) {
        this.imageArr = imageArr
        this.videoTime = this.imageArr.length / this.fps * 1000
        this.initFrameURL = imageArr[0]
        this.canvasWorkspace = new CanvasWorkspace(imageArr[0])
        this.seekbarPosition = 0
        this.frames = this.imageArr.map((i, index) => {
            return ({
                id: uuid(),
                frame_id: index,
                image: i,
                elements: {}
            })
        })
        this.batchCount = 15
        this.batches = chunk(Object.assign([], this.frames), this.batchCount)
        console.log(this.batches)
    }

    setBatchCount = (batchCount: number) => {
        this.batchCount = batchCount
    }

    addTextNode = (textNode: Konva.Text, duration: number) => {
        this.textNodes[textNode.id()] = textNode
        this.addNodeToFrame({
            textNodeId: textNode.id(),
            duration
        })
        textNode.show()
        this.canvasWorkspace.textLayer.draw()
        this.canvasWorkspace.layer.draw()
    }

    playVideo = (cb?: Function) => {
        let count = this.seekbarPosition

        this.videoPlayInterval = setInterval(() => {
            var imageObj = new Image();
            imageObj.src = this.imageArr[count];
            imageObj.onload = () => {
                this.canvasWorkspace.img?.image(imageObj)
                this.canvasWorkspace.layer.draw()
                this.updateSeekbarPosition(this.seekbarPosition)
            };
            count += 1
            this.seekbarPosition += 1
            cb(this.seekbarPosition)
        }, this.fps)
        this.isVideoPlaying = true
        
        setTimeout(() => {
            clearInterval(this.videoPlayInterval)
        }, this.videoTime)
    }

    pauseVideo = () => {
        this.isVideoPlaying = false
        clearInterval(this.videoPlayInterval)
    }

    updateSeekbarPosition = (positionVal: number) => {
        this.seekbarPosition = positionVal
        var imageObj = new Image();
        imageObj.src = this.imageArr[positionVal];
        imageObj.onload = () => {
            const frames = this.frames
            const textNodes = this.textNodes
            const currentFrame = frames[positionVal]
            const textElements = currentFrame.elements?.text
            this.canvasWorkspace.img?.image(imageObj)
            Object.keys(textNodes).map(id => {
                if (textElements && textElements.includes(id)) {
                    textNodes[id].show()
                } else {
                    textNodes[id].hide()
                }
                this.canvasWorkspace.textLayer.draw();
            })

            this.canvasWorkspace.layer.draw()
        };
    }

    getSeekbarPosition = () => {
        return this.seekbarPosition
    }
    
    getVideoPlaying = () => {
        return this.isVideoPlaying
    }

    addNodeToFrame = (params: any) => {
        const {
            textNodeId,
            duration
        } = params
        
        if (duration > 0) {
            this.frames.forEach((i: any) => {
                if (i.frame_id >= this.seekbarPosition && i.frame_id <= (this.seekbarPosition + duration*this.fps)) {
                    const elem = i['elements']
                    if (elem['text']) {
                        elem['text'].push(textNodeId)
                    } else {
                        elem['text'] = [textNodeId]
                    }
                }
            })
            this.canvasWorkspace.textLayer.draw();
        }
    }

    shuffleFrames = () => {
        const frames = Object.assign([], this.frames)
        const result = []
        let tempBatch = []
        let start = 0
        frames.forEach(frame => {
            if (frame.frame_id >= start && frame.frame_id < start + this.batchCount) {
                if (tempBatch.length <= 15) {
                    tempBatch.push(frame)
                } else {
                    result.push(tempBatch)
                    tempBatch = []
                    start = frame.frame_id
                }
            }
        })
    }

    createBatches = (batchValue: number) => {
        this.batches = chunk(this.frames, batchValue)
    }

    

}

function chunk(array: any, size: number) {
    let result = [];
    while(array.length) {
        result.push(array.splice(0, size));
    }
    return result;
}