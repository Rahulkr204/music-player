import React from 'react'
import './Button.scss'

const Button = (props) => {

    return (
        <div className="buttonContainer" onClick={props.onClick}>
            {props.children}
        </div>
    )
}

export default Button