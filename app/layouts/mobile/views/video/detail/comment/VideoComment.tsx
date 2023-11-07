import React, {useState} from "react";
import Image from "next/image";
import CommentList from "@/app/layouts/mobile/views/video/detail/comment/CommentList";
import useUserStore from "@/app/store/user";
import useTokenStore from "@/app/store/token";

export default function VideoComment(props:{vidx:number, setOpenComment :Function,openComment:boolean, setRef:React.Ref<HTMLDivElement>, comments:VideoComments[]}){
    const [text, setText] = useState<string>('')
    const {status, setLoginFromOpen, info} = useUserStore()
    const {accessToken} = useTokenStore()

    const reply = () => {
        fetch(`/api/video/replyI?content=${text}&stringUidx=${props.vidx}&stringVidx=${info.id}`,{
        // fetch(`/api/video/replyI`,{
            method:"POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${accessToken}`,
            }})
            .then((response) => response.json())//읽어온 데이터를 json으로 변환
            .then((json) => {
                console.log(json)
            })
    }
    return (
        <div className={props.openComment?'video_comment open':'video_comment close'} ref={props.setRef}>
            <div className="comment_top">
                <div>

                </div>
                <div>
                    <span>{props?.comments?.length} comments</span>
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
                {
                    status?
                    <>
                        <div className="comment_avatar">
                            <Image src="/avatar.png" alt="man" width={40} height={40} style={{borderRadius:'25px'}}/>
                        </div>
                        <input type={"text"}
                               style={{width: '250px',height: '40px',paddingLeft: '10px',borderRadius: '10px',border: '1px solid black',marginRight:'20px',marginLeft:'20px'}}
                               placeholder={"입력"}
                               onChange={(e:React.ChangeEvent<HTMLInputElement>)=>{setText(e.target.value)}}
                        />
                        <button style={{
                            width: '40px',
                            height: '40px',
                            border: '1px solid black',
                            borderRadius: '10px'}}
                                onClick={()=>{reply()}}
                        >등록</button>
                        {/*<InputEmoji*/}
                        {/*    value={text}*/}
                        {/*    onChange={setText}*/}
                        {/*    cleanOnEnter*/}
                        {/*    placeholder="Type a message"*/}
                        {/*/>*/}
                    </>
                    :
                    <>
                        <div className="comment_need_login"
                            onClick={()=>setLoginFromOpen(true)}>
                            <span>로그인 필요</span>
                        </div>
                    </>
                }
            </div>
        </div>
    )
}
