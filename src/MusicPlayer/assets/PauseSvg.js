import React, { Component } from 'react'

const PauseSvg = props => {
    return (
        <svg width={props.width ? props.width : "29"} height={props.height ? props.height : "33"} viewBox="0 0 29 33" fill="none">
            <rect y="0.432373" width="10.973" height="32.1351" rx="5.48649" fill="white"/>
            <rect x="18.0271" y="0.432373" width="10.973" height="32.1351" rx="5.48649" fill="white"/>
        </svg>
    )
}

export default PauseSvg