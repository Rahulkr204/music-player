import CanvasContainer from '../common/CanvasContainer';
import {uuid} from 'uuidv4';

export default abstract class Tool {
    abstract toolType: string
    canvasContainer: CanvasContainer
    id: string = uuid()

    constructor(canvasContainer: CanvasContainer) {
        this.canvasContainer = canvasContainer
    }
}