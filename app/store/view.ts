import {create} from "zustand";

type View = {
    curView : string,
    setView : Function,
}
const usePageStore = create<View>((set)=>({
    curView: 'home' ,
    setView : (page:string)=> set({curView: page}),
}))

export default usePageStore