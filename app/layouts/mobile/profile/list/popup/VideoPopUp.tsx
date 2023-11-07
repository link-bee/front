import React from "react";
import styles from "./VideoPopup.module.scss";
import useTokenStore from "@/app/store/token";
import useEditStore from "@/app/store/edit";
import useViewStore from "@/app/store/view";

export default function  VideoPopup(props:{video:VideoInfo, videoId:number,videoUrl:string, onClose:Function }){
    const { accessToken } = useTokenStore()
    const { setView } =useViewStore();
    const { setEditInfo , setEditFlag } = useEditStore()

    const deleteVideo = () => {
        fetch(`/api/video/delete?idx=${props.videoId}`,{
            method:"POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${accessToken}`,
            }})
            .then(() => {
                location.reload()
            })
    }

    return (
        <div className={styles.video_popup_wrap}>
            <div className={styles.video_popup}>
                <div className={styles.video_container}>
                    <video width={250} height={450} src={props.videoUrl} controls autoPlay />
                    <div className={styles.video_btn_list}>
                        <button className={styles.close_btn} onClick={()=>props.onClose()}>
                            <i className="fa-solid fa-x"></i>
                        </button>
                        <button className={styles.edit_btn} onClick={()=>{
                            setEditFlag(true)
                            setEditInfo(props.video)
                            setView('upload')
                        }}>
                            <i className="fa-solid fa-pen-to-square"></i>
                        </button>
                        <button className={styles.delete_btn} onClick={()=> {
                                if (!confirm('삭제하시면 복구할수 없습니다. \n 정말로 삭제하시겠습니까??')) {
                                    return false;
                                }
                            deleteVideo()
                            }}>
                            <i className="fa-solid fa-trash"></i>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};