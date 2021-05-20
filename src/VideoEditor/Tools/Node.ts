import Konva from "konva"
import { uuid } from "uuidv4"

export default abstract class Node {
    type: string
    name: string
    id: string
    attributes: any 
    data: any
    baseGroup: Konva.Group
    isSelected: boolean
    
    constructor(data: any) {
        this.data = data
        this.id = data._id || uuid()

    }

    draw() {
        this.baseGroup.draw()
    }

    setVisibility(show: boolean) {
        this.baseGroup.visible(show)
    }

    getData() {
        return this.data
    }

    getId(): string {
        return this.id
    }
}

// export {Node}