interface VideoInfo {
    id:number,
    userId:string,
    userName:string,
    description:string,
    url:string,
    thumb:string,
    date:Date,
    hashtags:string[],
    title:string,
    likes:number,
    isLikes:boolean,
    comments:VideoComments[],
};

interface VideoComments {
    id: number,
    userId:string,
    userName:string,
    contents: string,
    date: Date,
    likes: number,
    isLikes: boolean,
    isUnlikes: boolean,
}