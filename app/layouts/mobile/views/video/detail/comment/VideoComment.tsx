import React, {useEffect, useRef, useState} from "react";
import InputEmoji from "react-input-emoji";
import Image from "next/image";
import CommentList from "@/app/layouts/mobile/views/video/detail/comment/CommentList";

export default function VideoComment(props:{setOpenComment :Function,openComment:boolean, setRef:React.Ref<HTMLDivElement>, comments:object[]}){
    const emojiRef = useRef<HTMLButtonElement>(null);
    const [text, setText] = useState<string>('')
    const [picker, setPicker] = useState<any>(null)
    const inputRef = useRef()

    const [testComment, setTestComment] = useState<VideoComments[]>([])

    useEffect(() => {
        var obj = [{
            user : '김덕배',
            contents : '안녕하세요안녕하세요안녕하세요안녕하세요안녕하',
            date : '9-12',
            likes : 325,
            isLikes: true,
            isUnlikes : false,
        },{
            user : '김덕배1',
            contents : '안녕하세요안녕하세요안녕하세요안녕하세요안녕하',
            date : '9-12',
            likes : 325,
            isLikes: false,
            isUnlikes : false,
        },{
            user : '김덕배',
            contents : '안녕하세요안녕하세요안녕하세요안녕하세요안녕하',
            date : '9-12',
            likes : 325,
            isLikes: true,
            isUnlikes : false,
        },{
            user : '김덕배2',
            contents : '안녕하세요안녕하세요안녕하세요안녕하세요안녕하',
            date : '9-12',
            likes : 325,
            isLikes: false,
            isUnlikes : true,
        },{
            user : '김덕배2',
            contents : '안녕하세요안녕하세요안녕하세요안녕하세요안녕하',
            date : '9-12',
            likes : 325,
            isLikes: false,
            isUnlikes : true,
        },{
            user : '김덕배3',
            contents : '안녕하세요안녕하세요안녕하세요안녕하세요안녕하',
            date : '9-12',
            likes : 325,
            isLikes: false,
            isUnlikes : false,
        }]
        setTestComment(obj)
    }, []);


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
                <CommentList comments={testComment}/>
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
