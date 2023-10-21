'use client'
import React, {useEffect, useRef, useState} from "react";

export default function SearchInput(){
    const [isFocus, setIsFocus] = useState<boolean>(false);
    const inputRef = useRef<HTMLInputElement>(null)


    return(
        <div className="search">
            <input type={"search"} placeholder="검색"
                   onFocus={()=>{setIsFocus(true)}}
                   onBlur={()=>{setIsFocus(false)}}
            />
            <span className="split"></span>
            <button>
                <i className="fa-solid fa-magnifying-glass fa-xl"></i>
            </button>

            {
                isFocus?
                <div className="search_list">
                    <span>모든 결과 보기</span>
                </div>
                    :
                null
            }
        </div>
    )
}