import Image from "next/image";
import React, {useEffect, useState} from "react";

export default function CommentList(props:{comments: VideoComments[] | null}){
    const [paginatedDetail, setPaginatedDetail] = useState<VideoComments[][]>()
    const [showPage, setShowPage] = useState<VideoComments[]>()
    const [loadPage, setLoadPage] = useState<number>(0);


    useEffect(() => {
        var paging = [];
        if(props.comments == null)
            return;

        if(props.comments?.length>10){
            var newArr = division([...props.comments],10)

            setShowPage(newArr[loadPage])
            setPaginatedDetail(newArr)
        }else{
            setShowPage([...props.comments])
        }
    }, [props.comments]);

    const showMore = () =>{
        if(showPage && paginatedDetail){
            setShowPage([...showPage,...paginatedDetail[loadPage+1]])
            setLoadPage(loadPage+1);
        }
    }

    const division = (arr:VideoComments[], n:number) => {
        const length = arr.length;
        const divide = Math.floor(length / n) + (Math.floor( length % n ) > 0 ? 1 : 0);

        const newArray = [];

        for (let i = 0; i < divide; i++) {
            // 배열 0부터 n개씩 잘라 새 배열에 넣기
            newArray.push(arr.splice(0, n));
        }

        return newArray;
    }

    return (
        <div className="comment_list">
            {
                showPage?
                    showPage?.map((comment,idx)=>{
                        return(
                            <div className="comment_detail" key={idx}>
                                <div className="comment_avatar">
                                    <Image src="/avatar.png" alt="man" width={40} height={40} style={{borderRadius:'25px'}}/>
                                </div>

                                <div className="comment_info">
                                    <span className="comment_user">
                                        {comment?.userName}
                                    </span>
                                    <span className="comment_contents">
                                        {comment?.content}
                                    </span>

                                    <div className="comment_btn_list">
                                        <span style={{paddingRight:'10px', width:'300px',textAlign: 'start'}}>
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
                                                comment.likes?
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
                                                   style={{color: comment.unLikes?"red":"white", fontSize:'16px',
                                                       textShadow:comment.unLikes?'':'0 0 3px black'}}></i>
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
            {
                paginatedDetail?
                (paginatedDetail?.length-1 > loadPage)?
                    <button onClick={()=>showMore()} style={{padding:'10px'}}>코멘트 불러오기 <i className="fa-solid fa-angle-down"></i></button>
                        :
                    null
                :
                null
            }
        </div>
    )
}