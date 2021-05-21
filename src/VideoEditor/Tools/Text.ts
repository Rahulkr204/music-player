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
}

