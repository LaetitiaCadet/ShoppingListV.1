import {createSlice} from "@reduxjs/toolkit"
import { userRegister } from "./action"

const registerSlice = createSlice({
    name:"register",
    initialState: {
        name:"",
        email:"",
        password:"",
        isSubmit:false,

        loading:false,
        isError: false,
        isSuccess:false,
        errorMsg:"",
        serverMsg:""
    },
    reducers: {
        //register
        addName: (state, action) => {
            // {type: "user/addName", payload: "Paulo"}
            state.name = action.payload
        },
        addEmail: (state, action) => {
            // {type: "user/addEmail", payload: "email@mail.com"}
            state.email = action.payload
        },
        addPassword: (state, action) => {
            // {type: "user/addPassword", payload: "12345367"}
            state.password = action.payload
        },
        setSubmit: (state, action) => {
            // {type: "user/setSubmit", payload: "boolean"}
            state.isSubmit = action.payload
        },
        setToken: (state, action) => {
            state.token = action.payload  
        },
        setSuccess: (state, action) => {
            state.isSuccess = action.payload
        },
        setErrorMsg: (state, action) => {
            state.errorMsg = action.payload
        },
        setServerMsg: (state, action) => {
            state.serverMsg = action.payload
        }, 
        clearState:(state) => {
            state.isError =  false;
            state.isSuccess = false;
            return state;
        }
    },
    // extraReducers: {
    //     [userRegister.pending]: (state) => {
    //         state.isFetching = true;
    //     },
    //     [userRegister.fulfilled]: (state, action ) => {
    //         state.email = action.payload
    //         state.password = action.payload
    //         state.isSuccess = action.payload
    //         state.isFetching = false
    //         state.token = sessionStorage.getItem("user")
    //         state.errorMsg = ''
    //     },
    //     [userRegister.rejected]: (state, action) => {
    //         state.isSubmit = false
    //         state.isFetching = false
    //         state.isError = true;
    //         state.errorMsg = action.error.message
    //         state.serverMsg = action.payload
    //     }

    // }
    
})

/* Exporting the actions from the userSlice.actions object. */
export const {addName, addEmail, addPassword , setSubmit, setSuccess, clearState, setToken, setErrorMsg, setServerMsg} = registerSlice.actions;


export default registerSlice