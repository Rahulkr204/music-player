import React, { Component } from 'react'

const RightChevron = props => {
    return (
        <svg width={props.width ? props.width : "16"} height={props.height ? props.height : "26"} viewBox="0 0 16 26" fill="none">
            <path d="M2.89648 3L12.8965 13L2.89648 23" stroke="white" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
    )
}

export default RightChevron