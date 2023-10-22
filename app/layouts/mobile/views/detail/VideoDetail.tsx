'use client';

import React, {useEffect, useRef, useState} from "react";
import {useInView} from "react-intersection-observer";

export default function VideoDetail(props : {video:VideoInfo, muted:boolean, setMuted:Function}) {
    const [videoSectionRef, inVideoView] = useInView();
    const videoRef = useRef<HTMLVideoElement>(null)

    useEffect(() => {
        if(inVideoView){
            var videoList:any = document.getElementsByClassName("video-player")

            Array.from(videoList).map((video:any)=>{
                video?.pause()
            })

            videoRef.current?.play();
        }
    }, [inVideoView]);

    return(
        <div className="video_detail"
             ref={videoSectionRef}>
                <video
                    ref={videoRef}
                    width={"100%"}
                    controls={false}
                    muted={props.muted}
                    className="video-player w-2/3 h-full aspect-square object-cover rounded-xl "
                >
                    <source src={props.video.sources[0]} type="video/webm" />
                </video>
                <button className="sound_con" onClick={()=>{props.setMuted(!props.muted)}}>
                    {
                        props.muted?
                        <i className="fa-solid fa-volume-xmark" style={{color: 'lightgray'}}></i>
                            :
                        <i className="fa-solid fa-volume-high" style={{color: 'lightgray'}}></i>
                    }
                </button>
        </div>
    )
}