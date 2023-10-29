import {motion} from "framer-motion"
import React from "react";
import Image from "next/image";
import styles from "./ProfileVideoList.module.scss"

export default function ProfileVideoList(props:{videos:VideoInfo[]|null}){

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
                            <button>
                                <Image src={video.thumb} alt="Main Logo" width="1000" height="1000"/>
                            </button>
                        </div>
                    )
                })
                :null
            }
        </motion.div>
    )
}