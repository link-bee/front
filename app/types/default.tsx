interface VideoInfo {
    idx:number,
    uidx:string,
    uname:string,
    description:string,
    url:string,
    thumb:string,
    date:Date,
    hashTag:string,
    title:string,
    likes:number,
    isLikes:boolean,
    comments:VideoComments[],
    customUrl:string,
    pictureSaveName:string,
    customThumbUrl:string,
}

interface VideoComments {
    idx: number,
    userId:string,
    userName:string,
    content: string,
    uploadDate: string,
    likes: number,
    unLikes: boolean,
    midx:number,
    vidx:number

}
