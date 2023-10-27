import Image from "next/image";
import React from "react";

export default function CommentList(props:{comments: VideoComments[] | null}){
    return (
        <div className="comment_list">
            {
                props.comments?
                    props.comments?.map((comment)=>{
                        return(
                            <div className="comment_detail">
                                <div className="comment_avatar">
                                    <Image src="/images/man.jpg" alt="man" width={40} height={40} style={{borderRadius:'25px'}}/>
                                </div>

                                <div className="comment_info">
                                    <span className="comment_user">
                                        {comment?.user}
                                    </span>
                                    <span className="comment_contents">
                                        {comment?.contents}
                                    </span>

                                    <div className="comment_btn_list">
                                        <span style={{paddingRight:'10px', width:'40px'}}>
                                            {comment?.date}
                                        </span>
                                        {/*<button className="comment_reply_btn">*/}
                                        {/*    Reply*/}
                                        {/*    <div className="comment_reply_list">*/}
                                        {/*        ㅎㅇ*/}
                                        {/*    </div>*/}
                                        {/*</button>*/}
                                        <div>
                                            {
                                                comment.isLikes?
                                                <button  style={{paddingRight:'15px'}}>
                                                    <i className="fa-solid fa-heart"
                                                       style={{color:"red", fontSize:'18px', paddingRight:'3px'}}></i>
                                                    {comment.likes}
                                                </button>
                                                :
                                                <button  style={{paddingRight:'15px'}}>
                                                    <i className="fa-regular fa-heart"
                                                       style={{color:"black", fontSize:'18px', paddingRight:'3px'}}></i>
                                                    {comment.likes}
                                                </button>

                                            }
                                            <button>
                                                <i className="fa-solid fa-heart-crack"
                                                   style={{color: comment.isUnlikes?"red":"white", fontSize:'16px',
                                                       textShadow:comment.isUnlikes?'':'0 0 3px black'}}></i>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    })
                :
                <div> 아직 코멘트가 없습니다. </div>

            }

        </div>
    )
}