import React from "react";
import styles from "./VideoPopup.module.scss";

export default function  VideoPopup(props:{ videoUrl:string, onClose:Function }){
    return (
        <div className={styles.video_popup_wrap}>
            <div className={styles.video_popup}>
                <div className={styles.video_container}>
                    <video width={250} height={450} src={props.videoUrl} controls autoPlay />
                    <div className={styles.video_btn_list}>
                        <button className={styles.close_btn} onClick={()=>props.onClose()}>
                            <i className="fa-solid fa-x"></i>
                        </button>
                        <button className={styles.edit_btn}>
                            <i className="fa-solid fa-pen-to-square"></i>
                        </button>
                        <button className={styles.delete_btn}>
                            <i className="fa-solid fa-trash"></i>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};