import React from "react";
import Image from "next/image";
import SearchInput from "@/app/layouts/web/header/search/SearchInput";
import useViewStore from "@/app/store/view";

export default function TopNav(){
    const { setView } = useViewStore()
    return(
        <>
            <header className="top_nav">
                <div className="logo">
                    <button>
                        <Image src="/favicon.png" alt="Main Logo" width="60" height="60"/>
                    </button>
                    <span>Link</span>
                </div>
               <SearchInput/>
                <div className="function_list">
                    <ul>
                        <li>
                            <button className="upload_btn" onClick={()=>{setView('upload')}}>
                                <i className="fa-solid fa-plus"></i> 업로드
                            </button>
                        </li>
                        <li><button className="login_btn">로그인</button></li>
                        <li>
                            <button className="dots_btn"><i className="fa-solid fa-ellipsis-vertical "></i>
                                <div className="dots_list">
                                    <i className="up fa-solid fa-caret-up"></i>
                                    <ul>
                                        <li><i className="fa-solid fa-globe"></i>한국어</li>
                                        <li><i className="fa-solid fa-circle-question"></i>피드백 및 도움말</li>
                                    </ul>
                                </div>
                            </button>
                        </li>
                    </ul>
                </div>
            </header>
        </>
    )
}