import {create} from "zustand";

type Edit = {
    editFlag : boolean,
    setEditFlag : Function,
    editInfo : object,
    setEditInfo:  Function,
}
const useEditStore = create<Edit>((set)=>({
    editFlag: false,
    setEditFlag : (editFlag:boolean)=> set({editFlag: editFlag}),
    editInfo : {},
    setEditInfo:  (editInfo:object)=>set({editInfo:editInfo}),
}))

export default useEditStore