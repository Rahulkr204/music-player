import Tool from "./Tool";
import Konva from 'konva';
import CanvasContainer from '../common/CanvasContainer';
import { uuid } from "uuidv4";

export default class TextTool extends Tool {
    toolType: 'text'
    textNode: Konva.Text

    constructor(canvasContainer: CanvasContainer) {
        super(canvasContainer)
    }

    addText(textValue: string, duration: number) {
        var textNode = new Konva.Text({
            id: uuid(),
            text: textValue,
            x: 350,
            y: 120,
            fontSize: 20,
            strokeWidth: 1,
            fill: "white",
            stroke: "white",
            draggable: true
        });
        this.canvasContainer.canvasWorkspace.textLayer.add(textNode);
        this.canvasContainer.addTextNode(textNode, duration)
    }

}