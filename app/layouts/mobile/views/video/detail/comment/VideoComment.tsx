import React, {useEffect, useRef, useState} from "react";
import InputEmoji from "react-input-emoji";
import Image from "next/image";
import CommentList from "@/app/layouts/mobile/views/video/detail/comment/CommentList";

export default function VideoComment(props:{setOpenComment :Function,openComment:boolean, setRef:React.Ref<HTMLDivElement>, comments:VideoComments[]}){
    const [text, setText] = useState<string>('')

    return (
        <div className={props.openComment?'video_comment open':'video_comment close'} ref={props.setRef}>
            <div className="comment_top">
                <div>

                </div>
                <div>
                    <span>1569 comments</span>
                </div>
                <div>
                    <button onClick={()=>{props.setOpenComment(false)}}>
                        <i className="fa-solid fa-x" style={{color:"black"}}></i>
                    </button>
                </div>
            </div>
            <div className="comment_list_wrap">
                <CommentList comments={props.comments}/>
            </div>
            <div className="comment_input">
                <div className="comment_avatar">
                    <Image src="/images/man.jpg" alt="man" width={40} height={40} style={{borderRadius:'25px'}}/>
                </div>
                    <InputEmoji
                    value={text}
                    onChange={setText}
                    cleanOnEnter
                    placeholder="Type a message"
                />
            </div>
        </div>
    )
}
