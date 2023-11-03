import styles from "./MobileUpload.module.scss"
import {motion} from "framer-motion"
import useViewStore from "@/app/store/view";
import Image from "next/image";
import {ChangeEvent, useState} from "react";

export default function MobileUpload(){
    const { setView } = useViewStore()
    const [imageUrl, setImageUrl] = useState<string>('');

    const uploadImage = (e:any) => {
        let target: any = e.target
        let files: any = e.target.files[0]

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
                    <i className="fa-solid fa-arrow-left"></i>
                </div>
                <div>
                    <span>게시</span>
                </div>
                <div></div>
            </div>

            <div className={styles.upload_main}>

                <div  className={styles.upload_detail}>
                    <div style={{paddingBottom:'15px'}}>
                        <div style={{display:"flex"}}>
                            <div>
                                <input className={styles.title_input} type="text" placeholder={"제목"}/>
                                <textarea className={styles.contents_input} placeholder={"내용"}/>
                            </div>
                            <div className={styles.upload_thumb_wrap}>
                                <label htmlFor="thumb">
                                    <div className={styles.upload_thumb}>
                                        {
                                            imageUrl===''?
                                                <i className="fa-regular fa-image">
                                                    <div style={{display:"flex", justifyContent:"center",alignContent:"center"}}>
                                                        <span>썸네일 업로드</span>
                                                    </div>
                                                </i>
                                                :
                                                <Image src={imageUrl} width={90} height={110}  alt="Thumbnail" />
                                        }
                                    </div>
                                </label>
                                <input  accept="image/*" type="file" name="thumb" id="thumb" style={{display:"none"}} onChange={(e)=>{uploadImage(e)}}/>
                            </div>
                        </div>

                        <div className={styles.contents_btn}>
                            {/*<button>#해시태그</button>*/}
                            <label htmlFor="file">
                                <div className={styles.upload_video}><i className="fa-solid fa-video"></i> 동영상 업로드</div>
                            </label>
                            <input type="file" name="file" style={{display:"none"}} id="file"  accept="video/*" />
                        </div>
                    </div>
                    <ul className={styles.upload_sub}>
                       <li>
                           <div>
                               <i className="fa-solid fa-unlock"></i>
                               이 동영상을 시청할 수 있는 사람
                           </div>
                       </li>

                       <li>
                           <div>
                               <i className="fa-solid fa-globe"></i>
                               번역 언어
                               <label className={styles.toggleControl}>
                                   <input type="checkbox" />
                                   <span className={styles.control

                                   }></span>
                               </label>
                           </div>
                       </li>

                       <li>
                           <div>
                               <i className="fa-solid fa-unlock"></i>
                               댓글 허용
                               <label className={styles.toggleControl}>
                                   <input type="checkbox"  />
                                   <span className={styles.control

                                   }></span>
                               </label>
                           </div>
                       </li>

                       <li>
                           <div>
                               <i className="fa-solid fa-share"></i>
                               공유 허용
                               <label className={styles.toggleControl}>
                                   <input type="checkbox" />
                                   <span className={styles.control

                                   }></span>
                               </label>
                           </div>
                       </li>

                    </ul>
                </div>
            </div>
        </motion.div>
    )
}