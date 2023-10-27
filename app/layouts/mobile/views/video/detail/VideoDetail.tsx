'use client';

import React, {useEffect, useRef, useState} from "react";
import {useInView} from "react-intersection-observer";
import VideoComment from "@/app/layouts/mobile/views/video/detail/comment/VideoComment";

export default function VideoDetail(props : {video:VideoInfo, muted:boolean, setMuted:Function}) {
    const [videoSectionRef, inVideoView] = useInView();
    const videoBtnListRef = useRef<HTMLDivElement>(null);
    const clickableArea = useRef<HTMLDivElement>(null);
    const videoCaption = useRef<HTMLDivElement>(null)
    const playBtnRef = useRef<HTMLButtonElement>(null);
    const soundBtnRef = useRef<HTMLButtonElement>(null);
    const videoRef = useRef<HTMLVideoElement>(null)
    const videoCommentRef = useRef<HTMLDivElement>(null)

    const [play, setPlay] = useState<boolean>(true)
    const [openComment,setOpenComment] = useState<boolean>(false)

    useEffect(() => {
        if(inVideoView){
            var videoList:any = document.getElementsByClassName("video-player")

            var commentList:any = document.getElementsByClassName("video_comment")

            Array.from(videoList).map((video:any)=>{
                video?.pause()
            })
            //닫아주자 코멘트
            // Array.from(commentList).map((comment) =>{
            //     console.log(comment?.classList)
            // })

            videoRef.current?.play();
            setPlay(true);
        }
    }, [inVideoView]);

    const onClickOutside = (event: Event) => {
        if(openComment){
            if(!videoCommentRef.current?.contains(event.target as Node)){
                setOpenComment(false);
            }
            return;
        }
        if(inVideoView) {
            if (clickableArea.current?.contains(event.target as Node)
                && !playBtnRef.current?.contains(event.target as Node)
                && !soundBtnRef.current?.contains(event.target as Node)
                && !videoBtnListRef.current?.contains(event.target as Node)) {
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
            <div className="clickable_area"
                ref={clickableArea}>
            </div>
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

            <div className="video_btn_list" ref={videoBtnListRef}>
                <button className="user_avatar">
                    <i className="fa-solid fa-face-smile"></i>
                    <span>
                        <i className="fa-solid fa-circle-plus"></i>
                    </span>
                </button>
                <button>
                    <i className="fa-solid fa-heart"></i>
                    <span>14.2k</span>
                </button>
                <button onClick={()=>setOpenComment(true)}>
                    <i className="fa-regular fa-comment-dots"></i>
                    <span>78</span>
                </button>
                <button>
                    <i className="fa-solid fa-share"></i>
                    <span>27</span>
                </button>
            </div>
            {
                props.muted?
                <button className="sound_con" ref={soundBtnRef}  onClick={()=>{props.setMuted(!props.muted)}}>
                    <i className="fa-solid fa-volume-xmark" ></i> <span>음소거 해제</span>
                </button>
                    :
                    <></>
            }

            <div className="video_caption" ref={videoCaption}>
                <div className="video_hashTag">
                    <button>#카테고리1</button>
                    <button>#카테고리2</button>
                    <button>#카테고리3</button>
                </div>
                <div className="video_uploader">
                    햄건(업로더)
                </div>
                <div className="video_name">
                    샘플비디오(영상제목)
                </div>
                <div className="video_description">
                    ㄹㄴ이마ㅓㄹ먀이너히ㅑㅇ러ㅠㅣㅑㅇㄹ너ㅠㅣ얄너ㅠ이랴ㅓㅠ이랴ㅓㅠㅇㄹ니ㅑㅓㅠㅇㄹ니ㅑㅓㅠㅇㄹ니ㅑㅓㅠㄹ이ㅑ뉴
                </div>
            </div>
            <VideoComment openComment={openComment} setRef={videoCommentRef}/>
        </div>
    )
}