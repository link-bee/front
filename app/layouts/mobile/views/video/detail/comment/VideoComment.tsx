export default function VideoComment(props:{openComment:boolean, setRef:React.Ref<HTMLDivElement>}){
    return (
        <div className={props.openComment?'video_comment open':'video_comment close'} ref={props.setRef}>

        </div>
    )
}