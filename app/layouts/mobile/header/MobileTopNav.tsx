'use client'
import styles from "./MobileTopNav.module.scss"
import React, {useState} from "react";
import MobileSideNav from "@/app/layouts/mobile/side/MobileSideNav";

export default function MobileTopNav(){
    const [sideOpen, setSideOpen] = useState(false);

    return(
        <>
            <header className={styles.m_header_nav}>
                <button className={styles.hamburger_btn} onClick={()=>{setSideOpen(true)}}>
                    <i className="fa-solid fa-bars"></i>
                </button>
                <ul className={styles.function_list}>
                    {/*<li>*/}
                    {/*    <button  onClick={()=> {setCurState('follow')}}*/}
                    {/*         className={`${styles.link_btn} ${curState === 'follow' ? styles.active: ''}`}*/}
                    {/*    >링크*/}
                    {/*    </button>*/}
                    {/*</li>*/}
                    {/*<li>*/}
                    {/*    <button onClick={()=> {setCurState('recommend')}}*/}
                    {/*            className={`${styles.recommend_btn} ${curState === 'recommend' ? styles.active: ''}`}*/}
                    {/*    >추천*/}
                    {/*    </button>*/}
                    {/*</li>*/}
                </ul>

                <button>
                    <i className="fa-solid fa-magnifying-glass"></i>
                </button>
            </header>
            <MobileSideNav sideOpen={sideOpen} setSideOpen={setSideOpen}/>

        </>
    )
}