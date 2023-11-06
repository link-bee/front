'use client'
import React, {FunctionComponent, useEffect, useState} from "react";
import {useInView} from "react-intersection-observer";
import VideoDetail from "@/app/layouts/mobile/views/video/detail/VideoDetail";
import {Swiper, SwiperSlide} from "swiper/react";
import {motion} from "framer-motion"
import useTokenStore from "@/app/store/token";

export default function MobileVideoView() {
    const {accessToken} = useTokenStore()
    const [ref, inView] = useInView();
    const [page, setPage] = useState<number>(1)
    const [muted, setMuted] = useState<boolean>(true)
    const [videoList, setVideoList] = useState<VideoInfo[]>([])
    const [swiper, setSwiper] = useState<any>();

    //스크롤 감지
    useEffect(() => {
        // inView가 true 일때만 실행한다.
        if (inView) {
            // 실행할 함수
            productFetch();
        }
    }, [inView]);

    useEffect(() => {
        productFetch()
    }, []);

    const productFetch = () => {
            fetch('/api/video/lista',{
                method:"POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${accessToken}`,
                    // 'Content-Type': 'application/x-www-form-urlencoded',
                }})
            .then((response) => response.json())//읽어온 데이터를 json으로 변환
            .then((json) => {
                setVideoList([...videoList, ...json])
                // 요청 성공 시에 페이지에 1 카운트 해주기
                // if(page===1){
                //     setIsFirst(false);
                // }
                setPage((page) => page + 1)
            })
            .catch((err) => {console.log(err)});
    };

    return (
        <motion.div
            exit={{ opacity:0 }}
            initial={{ opacity:0 }}
            animate={{ opacity:1 }}>
            <Swiper

                onSwiper={(s) => {
                    setSwiper(s);
                }}
                direction={'vertical'}
                spaceBetween={50}
                mousewheel={true}
                observer ={true}	// 추가
                observeParents = {true}	// 추가
            >
                {
                    videoList?.map((video:VideoInfo,index) =>
                        videoList.length -1 === index?
                            <SwiperSlide key={index}>
                                <VideoDetail swiper={swiper}  muted={muted} setMuted={setMuted} video={video} key={index}/>
                                <div className="checkLast" ref={ref}></div>
                            </SwiperSlide>
                            :
                            <SwiperSlide key={index}>
                                <VideoDetail swiper={swiper} muted={muted} setMuted={setMuted} video={video} key={index}/>
                            </SwiperSlide>
                    )
                }
            </Swiper>
        </motion.div>
    )
}