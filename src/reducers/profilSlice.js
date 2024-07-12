import {createSlice} from "@reduxjs/toolkit"

const profilSlice = createSlice({
    name:"profil",
    initialState: {
        lastName:"",
        name: "",
        isLogged: false, 
        modifyInfos: false
    },
    reducers: {
        //Profil
        setSame: (state, action) => {
            // {type: "profil/name", payload: "billy"}
            state.name = action.payload
        },
        setSubmitInfos: (state, action) => {
            state.modifyInfos = action.payload
        },        
        setLogged:(state, action) =>{
            state.isLogged = action.payload
        },
        
    },

})

export const {setFirstName, setLastName, setSubmitInfos, setLogged} = profilSlice.actions;
export default profilSlice