import styles from "./MobileUpload.module.scss"
import {motion} from "framer-motion"
import useViewStore from "@/app/store/view";
import Image from "next/image";
import React, {useEffect, useState} from "react";
import useUserStore from "@/app/store/user";
import useTokenStore from "@/app/store/token";
import useEditStore from "@/app/store/edit";

export default function MobileUpload(){
    const { info} = useUserStore()
    const { accessToken } = useTokenStore()
    const {editFlag, editInfo} = useEditStore()
    const [title, setTitle] = useState<string>('')
    const [content, setContent] = useState<string>('')
    const [hashTag, setHashTag] = useState<string>('')
    const [video, setVideo] = useState<any>();
    const [image, setImage] = useState<any>();
    const [makeFileName, setMakeFileName] = useState<any>();
    const [originVideoPath, setOriginVideoPath] = useState<any>();
    const [pictureSaveName, setPictureSaveName] = useState<any>();
    const [videoUrl, setVideoUrl] = useState<any>(null);
    const [thumbUrl, setThumbUrl] = useState<any>(null);
    const [originIdx, setOriginIdx] = useState<any>(null);
    const [lang,setLang] = useState<string>('Korean')

    useEffect(() => {
        if(editFlag){
            let info = JSON.parse(JSON.stringify(editInfo))

            setOriginIdx(info.idx)
            setTitle(info.title)
            setContent(info.description)
            setHashTag(info.hashTag)
            setMakeFileName(info.makeFileName)
            setOriginVideoPath(info.originVideoPath)
            setPictureSaveName(info.pictureSaveName)
            setVideoUrl(info.customUrl)
            setThumbUrl(info.customThumbUrl)
        }
    }, []);

    const uploadVideo = (e:any) => {
        let files: any = e.target.files[0]
        setVideo(files)
    }

    const post = () =>{
        const form = new FormData();
        form.append("title", title);
        form.append("hashTag", hashTag);
        form.append("content", "");
        form.append("description", content);
        form.append("changeLanguage", lang);
        form.append("stringIdx", String(info.id));
        form.append("uname", String(info.username))

        if(originIdx){
            form.append("stringvIdx", originIdx);
            form.append("makeFileName", makeFileName);
            form.append("originVideoPath", originVideoPath);
            form.append("pictureSaveName", pictureSaveName);

            if(video && image){
                form.append("vFile", video, "video");
                form.append("pFile", image, "image");
                form.delete("makeFileName");
                form.delete("originVideoPath");
                form.delete("pictureSaveName");
            }else if(video) {
                form.append("vFile", video, "video");
                form.delete("originVideoPath");
            }else if(image) {
                form.append("pFile", image, "image");
                form.delete("pictureSaveName");
            }
        }else{
            form.append("vFile", video, "video");
            form.append("pFile", image, "image");
        }

        fetch('/api/video/upload',{
            body: form,
            method:"POST",
            headers: {
                // "Content-Type": "multipart/form-data",
                Authorization: `Bearer ${accessToken}`,
                // 'Content-Type': 'application/x-www-form-urlencoded',
            }})
            .then(() => {
                alert('업로드 되었습니다.')
                // location.reload()
            })
            .catch((err) => {console.log(err)});
    }

    const { setView } = useViewStore()
    const [imageUrl, setImageUrl] = useState<string>('');

    const uploadImage = (e:any) => {
        let files: any = e.target.files[0]
        setImage(files)

        var reader = new FileReader();
        reader.onload = function(event:any) {
            setImageUrl(String(event.target.result));
        };
        reader.readAsDataURL(files);
    }

    return(
        <motion.div
            exit={{ opacity:0 }}
            initial={{ opacity:0 }}
            animate={{ opacity:1 }}
            className={styles.upload_wrap}>
            <div className={styles.upload_top}>
                <div onClick={()=>{setView('home')}}>
                    <button>
                        <i className="fa-solid fa-arrow-left"></i>
                    </button>
                </div>
                <div>
                    <span>게시</span>
                </div>
                <div></div>
            </div>

            <div className={styles.upload_main}>

                <div className={styles.upload_video_section}>
                    {
                        (video||videoUrl)&&
                        <video width={'80%'} height={'80%'} src={videoUrl?videoUrl:URL.createObjectURL(video)} controls autoPlay />
                    }
                    <div className={styles.contents_btn}>
                        {/*<button>#해시태그</button>*/}
                        <label htmlFor="file">
                            <div className={styles.upload_video}><i className="fa-solid fa-video"></i> 동영상 업로드</div>
                        </label>
                        <input type="file" name="file" style={{display:"none"}} id="file"  accept="video/*"  onChange={(e)=>{uploadVideo(e)}}/>
                    </div>
                </div>

                <div  className={styles.upload_detail}>
                    <div style={{paddingBottom:'15px', height:'250px'}}>
                        <div style={{display:"flex"}}>
                            <div>
                                <input className={styles.title_input} value={title} type="text" placeholder={"제목"} onChange={(e:React.ChangeEvent<HTMLInputElement>)=>setTitle(e.target.value)}/>
                                <textarea className={styles.contents_input} value={content} placeholder={"내용"}  onChange={(e:React.ChangeEvent<HTMLTextAreaElement>)=>setContent(e.target.value)}/>
                                <input className={styles.title_input} value={hashTag} type="text" placeholder={"해쉬태그"} onChange={(e:React.ChangeEvent<HTMLInputElement>)=>setHashTag(e.target.value)}/>
                                <div style={{justifyContent:"space-between",display:"flex",alignItems:"center"}}>

                                    <div>
                                        <input
                                            id="Korean"
                                            value={lang}
                                            name="platform"
                                            type="radio"
                                            onChange={()=>setLang("Korean")}
                                        />
                                        Korean
                                        <input
                                            id="English"
                                            value={lang}
                                            name="platform"
                                            type="radio"
                                            onChange={()=>setLang("English")}
                                        />
                                        English
                                    </div>
                                </div>
                            </div>
                            <div className={styles.upload_thumb_wrap}>
                                <label htmlFor="thumb">
                                    <div className={styles.upload_thumb}>
                                        {
                                            (imageUrl==='' && !thumbUrl)?
                                                <i className="fa-regular fa-image">
                                                    <div style={{display:"flex", justifyContent:"center",alignContent:"center"}}>
                                                        <span>썸네일 업로드</span>
                                                    </div>
                                                </i>
                                                :
                                                <Image src={thumbUrl?thumbUrl:imageUrl} width={90} height={110}  alt="Thumbnail" />
                                        }
                                    </div>
                                </label>
                                <input  accept="image/*" type="file" name="thumb" id="thumb" style={{display:"none"}} onChange={(e)=>{uploadImage(e)}}/>
                            </div>
                        </div>
                    </div>
                    <button onClick={()=>post()} disabled={((!video || !image) && (!thumbUrl || !videoUrl))}>업로드</button>
                </div>
            </div>
        </motion.div>
    )
}