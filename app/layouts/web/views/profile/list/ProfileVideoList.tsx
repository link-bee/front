import {motion} from "framer-motion"
import React, {useState} from "react";
import Image from "next/image";
import styles from "./ProfileVideoList.module.scss"
import VideoPopup from "@/app/layouts/web/views/profile/list/popup/VideoPopUp";

export default function ProfileVideoList(props:{videos:VideoInfo[]|null}){
    const [selectedVideo, setSelectedVideo] = useState<VideoInfo|null>(null);

    const handleVideoClick = (video:VideoInfo) => {
        setSelectedVideo(video);
    };

    const closeVideoPopup = () => {
        setSelectedVideo(null);
    };


    return(
        <motion.div
            exit={{ opacity:0 }}
            initial={{ opacity:0 }}
            animate={{ opacity:1 }}
            className={styles.profile_video_list}>
            {
                props.videos?
                props.videos.map((video,idx)=>{
                    return(
                        <div className={styles.profile_video} key={idx}>
                            <button onClick={() => handleVideoClick(video)}>
                                <Image src={video.thumb} alt="Main Logo" width="1000" height="1000"/>
                            </button>
                        </div>
                    )
                })
                :null
            }
            {selectedVideo && (
                <VideoPopup videoUrl={selectedVideo.url} onClose={closeVideoPopup} />
            )}
        </motion.div>
    )
}