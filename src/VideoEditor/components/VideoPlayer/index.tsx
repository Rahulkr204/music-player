import React, { Component } from 'react'
import './VideoPlayer.scss'
import Konva from 'konva'


interface Props {
    
}
interface State {
    
}

export default class index extends Component<Props, State> {
    state = {
        play: false
    }

    togglePlay = () => {
        this.setState({
            play: true
        })
    }

    initCanvas = () => {
        const width = window.innerWidth;
        const height = window.innerHeight;

        const stage = new Konva.Stage({
            container: 'container',
            width: width,
            height: height,
        });

        const layer = new Konva.Layer();
        stage.add(layer);

        const video = document.createElement('video');
        video.src =
            'https://upload.wikimedia.org/wikipedia/commons/transcoded/c/c4/Physicsworks.ogv/Physicsworks.ogv.240p.vp9.webm';

        const image = new Konva.Image({
            image: video,
            draggable: true,
            x: 50,
            y: 20,
        });
        layer.add(image);

        const text = new Konva.Text({
            text: 'Loading video...',
            width: stage.width(),
            height: stage.height(),
            align: 'center',
            verticalAlign: 'middle',
        });
        layer.add(text);

        layer.draw();

        const anim = new Konva.Animation(function () {
            // do nothing, animation just need to update the layer
        }, layer);

        video.addEventListener('loadedmetadata', function (e) {
            text.text('Press PLAY...');
            image.width(video.videoWidth);
            image.height(video.videoHeight);
            layer.draw();
        });
        const play = document.getElementById('play')
        const pause = document.getElementById('pause')

        play && play.addEventListener('click', function () {
            text.destroy();
            video.play();
            anim.start();
        });
        pause && pause.addEventListener('click', function () {
            video.pause();
            anim.stop();
        });
    }

    componentDidMount() {
        this.initCanvas()
    }


    render() {
        return (
            <div>
                {/* Video Players */}
                <button id="play" onClick={this.togglePlay}>Play</button>
                <button id="pause" onClick={this.togglePlay}>Pause</button>
                <div id="container"></div>
            </div>
        )
    }
}
