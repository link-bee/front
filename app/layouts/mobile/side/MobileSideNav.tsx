import React, {useEffect, useRef, useState} from "react";

type sideOpenProps = {
    sideOpen: Boolean;
    setSideOpen : Function;
};

export default function MobileSideNav(props:sideOpenProps){
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
        <div className={'m_side_bar' + (props.sideOpen ? ' open' : ' close')} ref={sideBarRef}>
            <div className="side_bar_main">
                <div className="side_logo">
                    <button className="hamburger_btn" onClick={()=>{props.setSideOpen(false)}}>
                        <i className="fa-solid fa-bars"></i>
                    </button>
                    Link
                </div>

                <div className="function_list">
                    <ul>
                        <li>
                            <button className="follow_btn active">
                                <i className="fa-solid fa-house" ></i>
                                추천
                            </button>
                        </li>
                        <li>
                            <button className="recommend_btn">
                                <i className="fa-solid fa-user-group" style={{color: "#000000"}}></i>
                                팔로잉
                            </button>
                        </li>

                    </ul>
                </div>

                <button className="login_btn">
                    로그인
                </button>
            </div>

            <div className="side_bar_info">
                <span className="info_title">
                    회사
                </span>
                <ul className="info_list">
                    <li><button>정보</button></li>
                    <li><button>뉴스룸</button></li>
                    <li><button>연락처</button></li>
                    <li><button>커리어</button></li>
                </ul>
            </div>
        </div>
    )
}