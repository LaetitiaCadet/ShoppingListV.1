import {createSlice} from "@reduxjs/toolkit"

const profilSlice = createSlice({
    name:"profil",
    initialState: {
        name: "",
        isLogged: false, 
        modifyInfos:false,
        userLists: [],
    },
    reducers: {
        //Profil
        setName: (state, action) => {
            // {type: "profil/name", payload: "billy"}
            state.name = action.payload
        },
        setSubmitInfos: (state, action) => {
            state.modifyInfos = action.payload
        },        
        setLogged:(state, action) =>{
            state.isLogged = action.payload
        },
        setUserList: (state, action) => {
            state.userLists = action.payload
        }
        
    },

})

export const {setName, setSubmitInfos, setLogged , setUserList} = profilSlice.actions;

export default profilSlice