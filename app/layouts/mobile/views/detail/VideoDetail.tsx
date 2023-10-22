'use client';

import React, {useEffect, useRef, useState} from "react";
import {useInView} from "react-intersection-observer";

export default function VideoDetail(props : {video:VideoInfo, muted:boolean, setMuted:Function}) {
    const [videoSectionRef, inVideoView] = useInView();
    const playBtnRef = useRef<HTMLButtonElement>(null);
    const soundBtnRef = useRef<HTMLButtonElement>(null);
    const videoRef = useRef<HTMLVideoElement>(null)
    const [play, setPlay] = useState<boolean>(true)

    useEffect(() => {
        if(inVideoView){
            console.log('??')
            var videoList:any = document.getElementsByClassName("video-player")

            Array.from(videoList).map((video:any)=>{
                video?.pause()
            })

            videoRef.current?.play();
            setPlay(true);
        }
    }, [inVideoView]);

    const onClickOutside = (event: Event) => {
        if(inVideoView) {
            if (!playBtnRef.current?.contains(event.target as Node) && !soundBtnRef.current?.contains(event.target as Node)) {
                if (play) {
                    videoRef.current?.pause();
                } else {
                    videoRef.current?.play();
                }
                setPlay(!play)
            }
        }
    };


    useEffect(() => {
        document.addEventListener('click', onClickOutside, true);
        return () => {
            document.removeEventListener('click', onClickOutside, true);
        };
    });

    return(
        <div className="video_detail"
             ref={videoSectionRef}>
            <div className="video_section">
                <video
                    ref={videoRef}
                    width={"100%"}
                    controls={false}
                    muted={props.muted}
                    className="video-player w-2/3 h-full aspect-square object-cover rounded-xl "
                >
                    <source src={props.video.sources[0]} type="video/webm" />
                </video>
            </div>
            {
                play?
                    <></>
                    :
                    <button ref={playBtnRef}
                            className="play_btn"
                            onClick={()=>{
                                setPlay(true);
                                videoRef.current?.play()}
                            }
                    >
                        <i className="fa-solid fa-play" style={{color: "#ffffff"}}></i>
                    </button>
            }

            <button ref={soundBtnRef}  className="sound_con" onClick={()=>{props.setMuted(!props.muted)}}>
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