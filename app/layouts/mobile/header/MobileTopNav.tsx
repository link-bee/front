'use client'
import React, {useEffect, useState} from "react";
import SideNav from "@/app/layouts/mobile/side/SideNav";

export default function TopNav(){
    const [sideOpen, setSideOpen] = useState(false);
    const [curState, setCurState] = useState<string>()

    return(
        <>
            <header>
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
            <SideNav sideOpen={sideOpen} setSideOpen={setSideOpen}/>

        </>
    )
}