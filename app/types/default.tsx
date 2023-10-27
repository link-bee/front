interface VideoInfo {
    description:string,
    sources:string[],
    subtitle:string,
    thumb:string,
    title:string,
    comments:VideoComments[],
};

interface VideoComments {
    user: string,
    contents: string,
    date: string,
    likes: number,
    isLikes: boolean,
    isUnlikes: boolean,
}