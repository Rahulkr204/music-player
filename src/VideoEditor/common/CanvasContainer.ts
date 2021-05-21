import CanvasWorkspace from "./CanvasWorkspace"
import { uuid } from 'uuidv4';
import Konva from 'konva';

interface Frames {
    id: string
    image: any
    frame_id: number
    elements: any
}

export default class CanvasContainer {
    canvasWorkspace: CanvasWorkspace
    initFrameURL: string
    imageArr: string[]
    fps: number = 10
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
        this.videoTime = (this.imageArr.length / this.fps) * 1000
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
            imageObj.src = this.frames[count].image;
            imageObj.onload = () => {
                this.canvasWorkspace.img?.image(imageObj)
                this.canvasWorkspace.layer.draw()
                this.updateSeekbarPosition(this.seekbarPosition)
            };
            count += 1
            this.seekbarPosition += 1
            cb(this.seekbarPosition)
            if (count === this.frames.length) {
                clearInterval(this.videoPlayInterval)
                this.updateSeekbarPosition(0)
                this.canvasWorkspace.layer.clear()
                this.canvasWorkspace.layer.draw()
            }
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

    shuffleAndPlayFrames = () => {
        const shuffledFrames = this.getShuffledBatches()
        this.frames = [].concat.apply([],  shuffledFrames)
        this.updateSeekbarPosition(0)
    }

    getFrames = () => {
        const framesWithAnnotation = []
        const textNodes = Object.keys(this.textNodes)
        const temp = {}
        this.frames.forEach(i => {
            if(i.elements['text']) {
                framesWithAnnotation.push(i)
            }
        })
    
        framesWithAnnotation.forEach(i => {
            textNodes.forEach(j => {
                if (i.elements.text.includes(j)) {
                    if (temp[j]) {
                        temp[j].push(i.frame_id)
                    } else {
                        temp[j] = [i.frame_id]
                    }
                }
            })
        })
        console.log(temp, "temp")
        return temp
    }

    getShuffledBatches = () => {
        const result = []
        let temp = []
        const batchCount = 15
        const textWithFrame = this.getFrames()
        let idx = 0
        while(idx < this.frames.length) {
            // Handeling 0'th element
            if (this.frames[idx].frame_id === 0) {
                temp.push(this.frames[idx])
            } else if (this.frames[idx].frame_id % batchCount !== 0 && !this.frames[idx].elements['text']) {
                temp.push(this.frames[idx])
            } else if (this.frames[idx].elements['text']) {
                result.push(temp)
                temp = []
                this.frames[idx].elements['text'].forEach(k => {
                    if (textWithFrame[k]) {
                        textWithFrame[k].forEach(i => {
                            temp.push(this.frames[i])
                            idx +=1
                        })
                        result.push(temp)
                        temp = [this.frames[idx]]
                    }
                })
            } else if (this.frames[idx].frame_id % batchCount === 0 && !this.frames[idx].elements['text']) {
                result.push(temp)
                temp = [this.frames[idx]]
            }
            idx += 1
        }
        result.push(temp)
        temp = []

        const shuffledFrames = shuffle(result)
        // return result
        return shuffledFrames
    }


    createBatches = (batchValue: number) => {
        this.batches = chunk(this.frames, batchValue)
    }
}

function shuffle(arr) {
    var len = arr.length;
    var d = len;
    var array = [];
    var k, i;
    for (i = 0; i < d; i++) {
        k = Math.floor(Math.random() * len);
        array.push(arr[k]);
        arr.splice(k, 1);
        len = arr.length;
    }
    for (i = 0; i < d; i++) {
        arr[i] = array[i];
    }
    return arr;
}

function chunk(array: any, size: number) {
    let result = [];
    while(array.length) {
        result.push(array.splice(0, size));
    }
    return result;
}