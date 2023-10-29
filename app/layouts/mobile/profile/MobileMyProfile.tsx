import styles from './MobileMyProfile.module.scss'
import Image from "next/image";
import React, {useEffect, useState} from "react";
import {motion} from "framer-motion"
import ProfileVideoList from "@/app/layouts/mobile/profile/list/ProfileVideoList";

export default function MobileMyProfile(){
    const [curList, setCurList] =useState<string>('video')


    //테스트용
    const [videoList, setVideoList] = useState<VideoInfo[]>([])
    const [likeList, setLikeList] = useState<VideoInfo[]>([])
    const [privateList, setPrivateList] = useState<VideoInfo[]>([])

    useEffect(() => {
        getVideoList()
        getLikeList()
        getPrivateList()
    }, []);

    const getVideoList = () => {
        // fetch(`https://6534c577e1b6f4c59046e9cf.mockapi.io/link/${page}`)
        // fetch(`https://gist.githubusercontent.com/deepakpk009/99fd994da714996b296f11c3c371d5ee/raw/28c4094ae48892efb71d5122c1fd72904088439b/media.json`)
        fetch('/video.json')
            .then((response) => response.json())//읽어온 데이터를 json으로 변환
            .then((json) => {
                setVideoList([...json])
            })
            .catch((err) => {console.log(err)});
    };
    const getLikeList = () => {
        // fetch(`https://6534c577e1b6f4c59046e9cf.mockapi.io/link/${page}`)
        // fetch(`https://gist.githubusercontent.com/deepakpk009/99fd994da714996b296f11c3c371d5ee/raw/28c4094ae48892efb71d5122c1fd72904088439b/media.json`)
        fetch('/video.json')
            .then((response) => response.json())//읽어온 데이터를 json으로 변환
            .then((json) => {
                setLikeList([...json])
            })
            .catch((err) => {console.log(err)});
    };
    const getPrivateList = () => {
        // fetch(`https://6534c577e1b6f4c59046e9cf.mockapi.io/link/${page}`)
        // fetch(`https://gist.githubusercontent.com/deepakpk009/99fd994da714996b296f11c3c371d5ee/raw/28c4094ae48892efb71d5122c1fd72904088439b/media.json`)
        fetch('/video.json')
            .then((response) => response.json())//읽어온 데이터를 json으로 변환
            .then((json) => {
                setPrivateList([...json])
            })
            .catch((err) => {console.log(err)});
    };



    return (
        <motion.div
            exit={{ opacity:0 }}
            initial={{ opacity:0 }}
            animate={{ opacity:1 }}>
            <div className={styles.m_myProfile}>
                <div className={styles.m_myProfile_detail}>

                    <div className={styles.m_myProfile_avatar}>
                        <Image src="/images/man.jpg" alt="man" width={90} height={90} style={{borderRadius:'50%'}}/>
                        <span style={{fontWeight:"bold"}}>@gun7728</span>
                    </div>

                    <div className={styles.m_myProfile_relation}>
                        <ul>
                            <li><span>1</span></li>
                            <li>Link</li>
                        </ul>
                        <ul>
                            <li><span>0</span></li>
                            <li>Linked</li>
                        </ul>
                        <ul>
                            <li><span>0</span></li>
                            <li>좋아요</li>
                        </ul>
                    </div>
                    <div className={styles.m_myProfile_btn_list}>
                        <button>프로필 편집</button>
                    </div>
                    <div className={styles.m_myProfile_introduce}>
                        <span>
                            안녕하세요! 반가워요!
                        </span>
                    </div>
                    <div className={styles.m_myProfile_list_change_btn_list}>
                        <button onClick={()=>setCurList('video')} className={curList==='video'? `${styles.active}`:''}>
                            <i className="fa-solid fa-video"></i>
                        </button>
                        <button onClick={()=>setCurList('like')} className={curList==='like'? `${styles.active}`:''}>
                            <i className="fa-solid fa-heart"></i>
                        </button>
                        <button onClick={()=>setCurList('private')} className={curList==='private'? `${styles.active}`:''}>
                            <i className="fa-solid fa-lock"></i>
                        </button>
                    </div>
                </div>
                <ProfileVideoList videos={
                    curList==='video'?videoList
                        :curList==='like'?likeList
                            :curList==='private'?privateList
                                :null
                } key={curList}/>
            </div>
        </motion.div>
    )
}