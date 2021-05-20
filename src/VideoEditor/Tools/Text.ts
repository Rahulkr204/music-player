import Konva from 'konva'
import { uuid } from 'uuidv4'
import Node from './Node'

export default class Text extends Node {
    text: Konva.Text

    handleSelectionDeselection(value: boolean) {
        this.isSelected = value
    }

    getTextCoordinates = () => {
        let rectX = this.text.x() + this.baseGroup.x(),
            rectY = this.text.y() + this.baseGroup.y()
        const width = this.text.width(),
            height = this.text.height(),
            containerWidth = this.data.containerWidth,
            containerHeight = this.data.containerHeight

        const coordinates = [
            {
                x: rectX / containerWidth,
                y: rectY / containerHeight
            },
            {
                x: (rectX + Math.abs(width)) / containerWidth,
                y: rectY / containerHeight
            },
            {
                x: (rectX + Math.abs(width)) / containerWidth,
                y: (rectY + Math.abs(height)) / containerHeight
            },
            {
                x: rectX / containerWidth,
                y: (rectY + Math.abs(height)) / containerHeight
            }
        ]
        return coordinates
    }

    getFormattedMetadata(): any {
        const coordinates = this.getTextCoordinates()
        const data: any = {
            _id: this.id || uuid(),
            label: this.getLabel(),
            coordinates,
            type: 'text',
            attributes: this.attributes,
        }
        return data
    }

    getLabel = (): string => {
        return this.data.label
    }

    // addText(textValue: string, duration: string) {
    //     var textNode = new Konva.Text({
    //         text: textValue,
    //         x: 350,
    //         y: 120,
    //         fontSize: 20,
    //         strokeWidth: 1,
    //         fill: "white",
    //         stroke: "white",
    //         draggable: true
    //     });
    //     // Adding transformation to text
    //     var tr = new Konva.Transformer();
    //     this.canvasContainer.canvasWorkspace.textLayer.add(tr);
    //     tr.nodes([textNode]);
    
    //     this.canvasContainer.canvasWorkspace.textLayer.add(textNode);
        
    //     debugger
    //     this.canvasContainer?.addNodeToFrame({
    //         nodeConfig: {...textNode.getAttrs()},
    //         toolType: this.toolType,
    //         duration
    //     })

    //     this.canvasContainer.canvasWorkspace.textLayer.draw();
    // }
}

