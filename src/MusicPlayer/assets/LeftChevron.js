import React, { Component } from 'react'

const LeftChevron = props => {
    return (
        <svg width={props.width ? props.width : "16"} height={props.height ? props.height : "26"} viewBox="0 0 16 26" fill="none">
            <path d="M12.8965 2.89655L2.89648 12.8965L12.8965 22.8965" stroke="white" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
    )
}

export default LeftChevron