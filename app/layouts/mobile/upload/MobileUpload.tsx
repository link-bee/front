import styles from "./MobileUpload.module.scss"
import {motion} from "framer-motion"
import useViewStore from "@/app/store/view";

export default function MobileUpload(){
    const { setView } = useViewStore()
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

            </div>
        </motion.div>
    )
}