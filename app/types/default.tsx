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
}

interface VideoComments {
    idx: number,
    userId:string,
    userName:string,
    content: string,
    date: string,
    likes: number,
    unLikes: boolean,
    midx:number,
    vidx:number

}
