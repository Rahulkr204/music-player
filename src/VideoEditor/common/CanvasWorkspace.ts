import Konva from 'konva';

export default class CanvasWorkspace {
    width: number
    height: number
    paddingFactor: {x: number; y: number} = {x: 0, y: 0}
    stage: Konva.Stage | null = null
    img: Konva.Image | null = null
    layer: Konva.Layer 
    textLayer: Konva.Layer

    

    constructor(initFrameURL: string) {
        this.width = 840
        this.height = 480
        this.layer = this.createLayer("base")
        this.textLayer = this.createLayer('text')
        this.initializeCanvas(initFrameURL)
    }

    initializeCanvas(frameURL: string) {

        this.stage = new Konva.Stage({
            container: 'mainpanel',   // id of container <div>
            width: this.width,
            height: this.height
        });
        
        // then create layer
        
        var imageObj = new Image();
        imageObj.src = frameURL;
        imageObj.onload = () => {
            this.img = new Konva.Image({
                x: 200,
                y: 75,
                image: imageObj,
                width: imageObj.width,
                height: imageObj.height,
            });
            // add the shape to the layer
            this.layer.add(this.img);
            this.layer.batchDraw();
        };

        // add the layer to the stage
        this.stage.add(this.layer);

        // add text layer to the stage
        this.stage.add(this.textLayer)
        
        // draw the image
        this.layer.draw();
    }

    createLayer(name: string) {
        return new Konva.Layer({
            name
        })
    }

   
}