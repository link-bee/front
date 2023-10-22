'use client'
import React, {useEffect, useState} from "react";
import {useInView} from "react-intersection-observer";
import VideoDetail from "@/app/layouts/mobile/views/detail/VideoDetail";
import {Swiper, SwiperSlide} from "swiper/react";
import {Mousewheel, Pagination} from 'swiper/modules';


export default function VideoView() {
    const [ref, inView] = useInView();
    const [page, setPage] = useState<number>(1)
    const [videoList, setVideoList] = useState<VideoInfo[]>([])
    const [isFirst, setIsFirst] = useState<boolean>(true);

    //스크롤 감지
    useEffect(() => {
        // inView가 true 일때만 실행한다.
        if (inView) {
            // 실행할 함수
            productFetch();
        }
    }, [inView]);

    //초기 로딩
    useEffect(() => {
        productFetch();
    }, []);
    
    const productFetch = () => {
        fetch(`https://6534c577e1b6f4c59046e9cf.mockapi.io/link/${page}`)
            .then((response) => response.json())//읽어온 데이터를 json으로 변환
            .then((json:VideoInfo[]) => {
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
        <Swiper
            direction={'vertical'}
            slidesPerView={1}
            spaceBetween={30}
            mousewheel={true}
            pagination={{
                clickable: true,
            }}
            modules={[Mousewheel, Pagination]}
        >
            {
                videoList?.map((video:VideoInfo,index) =>
                    videoList.length -1 === index?
                        <SwiperSlide key={index}>
                            <div className="video_detail"  >
                                <VideoDetail video={video} key={video.id}/>
                            </div>
                        </SwiperSlide>
                        :
                        <SwiperSlide key={index}>
                            <div className="video_detail" key={index}>
                                <VideoDetail video={video} key={video.id}/>
                            </div>
                        </SwiperSlide>
                )
            }
        </Swiper>
    )
}