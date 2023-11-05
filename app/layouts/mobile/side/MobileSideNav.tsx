import React, {useEffect, useRef, useState} from "react";
import styles from "./MobileSideNav.module.scss"
import useUserStore from "@/app/store/user";
import useViewStore from "@/app/store/view";

type sideOpenProps = {
    sideOpen: Boolean;
    setSideOpen : Function;
};

export default function MobileSideNav(props:sideOpenProps){
    const { setLoginFromOpen, status, LogOut } = useUserStore()
    const { setView } = useViewStore()

    const changeView = (view:string) => {
        if(status || view === 'home'){
            setView(view);
        }else{
            setLoginFromOpen(true)
        }
    }
    
    const sideBarRef = useRef<HTMLDivElement>(null);

    const onClickOutside = (event: Event) => {
        if (!sideBarRef.current?.contains(event.target as Node)) {
            return props.setSideOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener('click', onClickOutside, true);
        return () => {
            document.removeEventListener('click', onClickOutside, true);
        };
    });


    return (
        <div className={`${styles.m_side_bar} ${props.sideOpen ? styles.open : styles.close}`} ref={sideBarRef}>
            <div className={styles.side_bar_main}>
                <div className={styles.side_logo}>
                    <button className={styles.hamburger_btn} onClick={()=>{props.setSideOpen(false)}}>
                        <i className="fa-solid fa-bars"></i>
                    </button>
                    Link
                </div>

                <div className={styles.function_list}>
                    <ul>
                        <li>
                            <button className={styles.home_btn} onClick={()=>changeView('home')}>
                                <i className="fa-solid fa-house" ></i>
                                홈
                            </button>
                        </li>
                        <li>
                            <button className={styles.link_btn}>
                                <i className="fa-solid fa-link"></i>
                                링크
                            </button>
                        </li>

                    </ul>
                </div>

                {
                    status?
                    <button className={styles.login_btn} onClick={()=>LogOut()}>
                        로그아웃
                    </button>
                        :
                    <button className={styles.login_btn} onClick={()=>setLoginFromOpen(true)}>
                        로그인
                    </button>
                }
            </div>

            <div className={styles.side_bar_info}>
                <span className={styles.info_title}>
                    회사
                </span>
                <ul>
                    <li><button>정보</button></li>
                    <li><button>뉴스룸</button></li>
                    <li><button>연락처</button></li>
                    <li><button>커리어</button></li>
                </ul>
            </div>
        </div>
    )
}