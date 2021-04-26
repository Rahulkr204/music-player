import React, { Component } from 'react'
import './MusicPlayer.scss'
import {FaHeart, FaShareAlt} from "react-icons/fa"
import { MdPlaylistAdd } from "react-icons/md";
import { IoIosShuffle, IoIosRepeat } from "react-icons/io";
import { RiRepeatOneFill } from "react-icons/ri";
import { GoSettings } from "react-icons/go";
import {LeftChevron, RightChevron, PauseSvg} from './assets'
import Seekbar from './Seekbar'

export default class MusicPlayer extends Component {
    state = {}

    render() {
        const {title, singer_name, isLiked} = {
            title: "Purple Haze",
            singer_name: "Jimi Hendrix",
            isLiked: true
        }
        return (
            <div className="musicPlayerContainer">
                <div className="banner">
                    <div className="posterContainer">
                        <img className="poster" src="https://images-na.ssl-images-amazon.com/images/I/710TTiZBNIL.jpg"/>
                    </div>
                    <div className="songDetails">
                        <div>Now Playing</div>
                        <div className="albumDetails">
                            <div>
                                {title}
                            </div>
                            <div>
                                {singer_name}
                            </div>
                            <div>
                                {`Woodstock`}
                            </div>
                        </div>
                        <div className="songAction">
                            <div className="inner-btn">
                                <FaHeart 
                                    size={16} 
                                    fill={isLiked ? "#968EF1" : '#C7C5D0' }
                                />
                            </div>
                            <div className="inner-btn">
                                <MdPlaylistAdd size={20}/>
                            </div>
                            <div className="inner-btn">
                                <FaShareAlt size={16}/>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="controls">
                    <div className="songControls">
                        <div className="control-1">
                            <div className="controlBtn">
                                <IoIosShuffle size={22} color={"#C7C5D0"}/>
                            </div>
                            <div className="controlBtn">
                                <RiRepeatOneFill size={16} color={"#C7C5D0"}/>
                            </div>
                        </div>
                        <div className="control-2">
                            <div className="prevBtnContainer neu-btn">
                                <div className="prevBtn neu-btn-child">
                                    <LeftChevron width={12} height={22}/>
                                </div>
                            </div>
                            <div className="playPauseBtnContainer neu-btn">
                                <div className="playPauseBtn neu-btn-child">
                                    <PauseSvg width={20} height={25}/>
                                </div>
                            </div>
                            <div className="nextBtnContainer neu-btn">
                                <div className="nextBtn neu-btn-child">
                                    <RightChevron width={12} height={22}/>
                                </div>
                            </div>
                        </div>
                        <div className="control-3">
                            <div className="controlBtn">
                                <IoIosRepeat size={20} color={"#C7C5D0"}/>
                            </div>
                            <div className="controlBtn">
                                <GoSettings size={20} color={"#C7C5D0"}/>
                            </div>
                        </div>
                        
                    </div>
                    <div className="seekbarContainer">
                        <Seekbar/>
                    </div>
                </div>
            </div>
        )
    }
}
