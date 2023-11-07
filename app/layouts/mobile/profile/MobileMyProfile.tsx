import styles from './MobileMyProfile.module.scss'
import Image from "next/image";
import React, {useEffect, useState} from "react";
import {motion} from "framer-motion"
import ProfileVideoList from "@/app/layouts/mobile/profile/list/ProfileVideoList";
import useViewStore from "@/app/store/view";
import useTokenStore from "@/app/store/token";
import useUserStore from "@/app/store/user";

export default function MobileMyProfile(){
    const [curList, setCurList] =useState<string>('video')
    const {setView} = useViewStore()
    const { accessToken } = useTokenStore()
    const {info} =useUserStore()

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
        fetch(`/api/video/listm?memberCode=${info.id}`,{
            method:"POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${accessToken}`,
            }})
            .then((response) => response.json())//읽어온 데이터를 json으로 변환
            .then((json) => {
                let tempJson = [...json]
                tempJson.map((e:any,idx:number)=>{
                    if(e.originVideoPath.split('/')[6]){
                        tempJson[idx].customThumbUrl = `/file/${e.originVideoPath.split('/')[6]}/${e.pictureSaveName}`
                        tempJson[idx].customUrl = `/file/${e.originVideoPath.split('/')[6]}/${e.makeFileName}`
                    }else{
                        tempJson[idx].customThumbUrl = ''
                        tempJson[idx].customUrl = ''
                    }
                })
                setVideoList([...tempJson])
            })
            .catch((err) => {console.log(err)});
    };
    const getLikeList = () => {
        fetch(`/api/video/heart/list?memberCode=${info.id}`,{
            method:"POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${accessToken}`,
            }})
            .then((response) => response.json())//읽어온 데이터를 json으로 변환
            .then((json) => {
                let tempJson = [...json]
                tempJson.map((e:any,idx:number)=>{
                    if(e.originVideoPath.split('/')[6]){
                        tempJson[idx].customThumbUrl = `/file/${e.originVideoPath.split('/')[6]}/${e.pictureSaveName}`
                        tempJson[idx].customUrl = `/file/${e.originVideoPath.split('/')[6]}/${e.makeFileName}`
                    }else{
                        tempJson[idx].customThumbUrl = ''
                        tempJson[idx].customUrl = ''
                    }
                })
                console.log(tempJson)
                setLikeList([...tempJson])
            })
            .catch((err) => {console.log(err)});
    };
    const getPrivateList = () => {
        // fetch(`https://6534c577e1b6f4c59046e9cf.mockapi.io/link/${page}`)
        // fetch(`https://gist.githubusercontent.com/deepakpk009/99fd994da714996b296f11c3c371d5ee/raw/28c4094ae48892efb71d5122c1fd72904088439b/media.json`)
        fetch('/video.json',{
            headers: {
                Authorization: `Bearer ${accessToken}`,
                // 'Content-Type': 'application/x-www-form-urlencoded',
            }})
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
            animate={{ opacity:1 }}
            className={styles.myProfile_wrap}>
            <div className={styles.myProfile_top}>
                <div onClick={()=>{setView('home')}}>
                    <button>
                        <i className="fa-solid fa-arrow-left"></i>
                    </button>
                </div>
                <div>
                    <span>프로필</span>
                </div>
                <div></div>
            </div>

            <div className={styles.m_myProfile}>
                <div className={styles.m_myProfile_detail}>

                    <div className={styles.m_myProfile_avatar}>
                        <Image src="/avatar.png" alt="man" width={80} height={80} style={{borderRadius:'50%'}}/>
                        <span style={{fontWeight:"bold"}}>{info.username}</span>
                    </div>

                    <div className={styles.m_myProfile_relation}>
                        <ul>
                            <li><span>{info.myLink.length}</span></li>
                            <li>Link</li>
                        </ul>
                        <ul>
                            <li><span>{info.linked.length}</span></li>
                            <li>Linked</li>
                        </ul>
                        <ul>
                            <li><span>{info.likes.length}</span></li>
                            <li>좋아요</li>
                        </ul>
                    </div>
                    {/*<div className={styles.m_myProfile_btn_list}>*/}
                    {/*    <button>프로필 편집</button>*/}
                    {/*</div>*/}
                    <div className={styles.m_myProfile_introduce}>
                        <span>

                        </span>
                    </div>
                    <div className={styles.m_myProfile_list_change_btn_list}>
                        <button onClick={()=>setCurList('video')} className={curList==='video'? `${styles.active}`:''}>
                            <i className="fa-solid fa-video"></i>
                        </button>
                        <button onClick={()=>setCurList('like')} className={curList==='like'? `${styles.active}`:''}>
                            <i className="fa-solid fa-heart"></i>
                        </button>
                        {/*<button onClick={()=>setCurList('private')} className={curList==='private'? `${styles.active}`:''}>*/}
                        {/*    <i className="fa-solid fa-lock"></i>*/}
                        {/*</button>*/}
                    </div>
                    <ProfileVideoList videos={
                        curList==='video'?videoList
                            :curList==='like'?likeList
                                :curList==='private'?privateList
                                    :null
                    } key={curList}/>
                </div>
            </div>
        </motion.div>
    )
}