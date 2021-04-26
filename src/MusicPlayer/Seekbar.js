import React, { useEffect, useState } from 'react'
import './Seekbar.scss'


const Seekbar = () => {
    const [value, setvalue] = useState(160)

    React.useEffect(() => {

        const slider = document.getElementById("range-slide")
        const min = slider.min
        const max = slider.max
        const value = slider.value

        let options = {
            min,
            max,
            value
        }
        let sliderComp = new Slider(slider, options)
        sliderComp.init()
    })

    return (
        <div className="seekbar">
            <>
                <input
                    className="range-slide"
                    id="range-slide"
                    name="range"
                    type="range"
                    min="0"
                    max="400"
                    value={value}
                    step="1"
                    onChange={(e) => setvalue(e.value)}
                />
            </>

            <div className="seekbar-timer">
                <div>
                    {`2:01:00`}
                </div>
                <div>
                    {`4:16:00`}
                </div>
            </div>
        </div>
    )
}


class Slider {
    constructor (rangeElement, options) {
        this.rangeElement = rangeElement
        this.options = options
        // Attach a listener to "change" event
        this.rangeElement.addEventListener('input', this.updateSlider.bind(this))
    }

    // Initialize the slider
    init() {
        this.rangeElement.setAttribute('min', this.options.min)
        this.rangeElement.setAttribute('max', this.options.max)
        this.rangeElement.value = this.options.value

        this.updateSlider()
    }

    generateBackground(rangeElement) {   
        if (this.rangeElement.value === this.options.min) {
            return
        }

        let percentage =  (this.rangeElement.value - this.options.min) / (this.options.max - this.options.min) * 100
        
        return 'background: linear-gradient(to right, #5D24D6, #7E74ED ' + percentage + '%, #dee1e2 ' + percentage + '%, #dee1e2 100%)'
    }

    updateSlider (newValue) {
        this.rangeElement.style = this.generateBackground(this.rangeElement.value)
    }
}

export default Seekbar
