import {motion} from "framer-motion"
import React, {useEffect, useState} from "react";
import Image from "next/image";
import styles from "./ProfileVideoList.module.scss"

export default function ProfileVideoList(props:{videos:VideoInfo[]|null}){
    const [hover, setHover] = useState<boolean[]>()

    useEffect(() => {
        if(props.videos?.length!==0){
            var newArr = new Array(props.videos?.length);
            var max:number = props.videos?.length?props.videos?.length:0;
            for(var i=0; i<max; i++){
                newArr[i] = false;
            }
            setHover([...newArr])
        }
    }, [props.videos]);

    const setHoverIndex = (idx:number) =>{
        if(hover){
            if(hover?.length!==0){
                var newArr:boolean[] = [...hover]
                var max:number = props.videos?.length?props.videos?.length:0;
                for(var i=0; i<max; i++){
                    newArr[i] = false;
                }
                newArr[idx] = !hover[idx]
                setHover(newArr)
            }
        }
    }

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
                            <button onClick={(e:React.MouseEvent) => setHoverIndex(idx)}>
                                {
                                    hover?
                                    hover[idx] ?
                                    <video  src={video.url}
                                            autoPlay={true}/> :
                                    <Image src={video.thumb} alt="Main Logo" width="1000" height="1000"/>:
                                    null
                                }
                            </button>
                        </div>
                    )
                })
                :null
            }
        </motion.div>
    )
}