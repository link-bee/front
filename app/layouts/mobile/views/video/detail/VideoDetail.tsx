'use client';

import React, {useEffect, useRef, useState} from "react";
import {useInView} from "react-intersection-observer";
import VideoComment from "@/app/layouts/mobile/views/video/detail/comment/VideoComment";
import useTokenStore from "@/app/store/token";

export default function VideoDetail(props : {swiper:any,video:VideoInfo, muted:boolean, setMuted:Function}) {
    const [videoSectionRef, inVideoView] = useInView();
    const { accessToken } = useTokenStore()
    const videoBtnListRef = useRef<HTMLDivElement>(null);
    const clickableArea = useRef<HTMLDivElement>(null);
    const videoCaption = useRef<HTMLDivElement>(null)
    const playBtnRef = useRef<HTMLButtonElement>(null);
    const soundBtnRef = useRef<HTMLButtonElement>(null);
    const videoRef = useRef<HTMLVideoElement>(null)
    const videoCommentRef = useRef<HTMLDivElement>(null)

    const [comments, setComments] = useState<any>();

    const [play, setPlay] = useState<boolean>(true)
    const [openComment,setOpenComment] = useState<boolean>(false)

    useEffect(() => {
        props.swiper.allowTouchMove = !openComment;
    }, [openComment]);

    useEffect(() => {
        if(inVideoView){
            var videoList:any = document.getElementsByClassName("video-player")

            // var commentList:any = document.getElementsByClassName("video_comment")

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
        fetch(`/api/video/reply/list?videoCode=${props.video.idx}`,{
            method:"POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${accessToken}`,
            }})
            .then((response) => response.json())//읽어온 데이터를 json으로 변환
            .then((json) => {
                let tempComment:any = [];

                json.map((e:any)=>{
                    tempComment.push({
                        content:e.content,
                        date:  e.date,
                        idx:   e.idx,
                        likes: e.likes,
                        midx:  e.midx,
                        unLikes:e.unLikes,
                        vidx:  e.vidx,
                    })
                })
                setComments(tempComment)
            })
            .catch((err) => {console.log(err)});
    }, []);



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
                    <source src={props.video.url} type="video/webm" />
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
                    <i className="fa-solid fa-heart" style={{color:props.video.isLikes?"red":''}}></i>
                    <span>{props.video.likes}</span>
                </button>
                <button onClick={()=>setOpenComment(true)}>
                    <i className="fa-regular fa-comment-dots"></i>
                    <span>{comments?.length}</span>
                </button>
                <button>
                    <i className="fa-solid fa-share"></i>
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
                    {props.video.hashTag}
                </div>
                <div className="video_uploader">
                    {props.video.uname}
                </div>
                <div className="video_name">
                    {props.video.title}
                </div>
                <div className="video_description">
                    {props.video.description}
                </div>
            </div>
            <VideoComment setOpenComment={setOpenComment} openComment={openComment} setRef={videoCommentRef} comments={comments}/>
        </div>
    )
}