'use client'
import React, {useEffect, useState} from "react";
import MobileSideNav from "@/app/layouts/mobile/side/MobileSideNav";

export default function MobileTopNav(){
    const [sideOpen, setSideOpen] = useState(false);
    const [curState, setCurState] = useState<string>()

    useEffect(() => {
        setCurState('recommend')
    }, []);
    return(
        <>
            <header className="m_header_nav">
                <button className="hamburger_btn" onClick={()=>{setSideOpen(true)}}>
                    <i className="fa-solid fa-bars"></i>
                </button>
                <ul className="function_list">
                    <li>
                        <button  onClick={()=> {setCurState('follow')}}
                             className={"follow_btn" + (curState === 'follow' ? ' active' : '')}>팔로잉
                        </button>
                    </li>
                    <li>
                        <button onClick={()=> {setCurState('recommend')}}
                            className={"recommend_btn" + (curState === 'recommend' ? ' active' : '')}>추천
                        </button>
                    </li>
                </ul>

                <button className="search_btn">
                    <i className="fa-solid fa-magnifying-glass"></i>
                </button>
            </header>
            <MobileSideNav sideOpen={sideOpen} setSideOpen={setSideOpen}/>

        </>
    )
}