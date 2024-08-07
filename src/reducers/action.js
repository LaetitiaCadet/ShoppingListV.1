import {createAsyncThunk} from "@reduxjs/toolkit"
import { useNavigate } from "react-router-dom"
import { setName } from "./profilSlice"
import { setServerMsg} from "./registerSlice"


const baseUrl = "http://localhost:5000"


export const userRegister = createAsyncThunk (
    'user/register',
    async ({name, email, password }, thunkAPI) => {
      const {rejectWithValue, dispatch} = thunkAPI
        try{
           await fetch(baseUrl + '/register', {
              method: "POST",
              headers:{
                  'Accept': 'application/json',
                  "Content-Type": "application/json",   
              },
              body: JSON.stringify({
                name: name,
                email: email, 
                password: password
              }),

            })
            .then((response) => {
              if (response.status === 200){
                console.log(response)
                dispatch(setServerMsg(response.message))
                return response.data  
              }
            })
        } catch (error){
          if (error.response) { 
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
            dispatch(setServerMsg(error.response.data.message)) 
            return rejectWithValue(error.response.data.message)
          }
        }
    }
)

export const userLogin = createAsyncThunk (
    'user/login',
    async ({email, password }, thunkAPI) => {
      const {rejectWithValue, dispatch} = thunkAPI
        try{
           await fetch(baseUrl + '/login', {
                method: "POST",
                headers:{
                    'Accept': 'application/json',
                    "Content-Type": "application/json",   
                },
                body: JSON.stringify({
                  email: email, 
                  password: password
                }),
              })
              .then(response => response.json())
              .then(data => {
                const userData = data
                if (userData.status === 200){
                  sessionStorage.setItem("user", userData.token)
                  dispatch(setServerMsg(userData.message))
                }
                return userData
              })  

        } catch (error){
          if (error.response) { 
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
            dispatch(setServerMsg(error.response.data.message)) 
            return rejectWithValue(error.response.data.message)
          }
        }
    }
)


export const userInfos = createAsyncThunk (
  'user/profil',
  async ({token}, thunkAPI) => {
      const {dispatch, rejectWithValue} = thunkAPI
      try{
         await fetch(baseUrl + '/profil', {}, {
          headers: {
            'Authorization': 'Bearer' + token
          }
            })
            .then((response) => {
              const responseBody = response.data.body
              dispatch(setName(responseBody.name))
              return response.data
            })
      } catch (error){
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
          console.log("Error", error.response.data)
          return rejectWithValue(error.response.data.message)
      }
  }

)

// update user infos Firstname and Lastname
export const updateUserInfos = createAsyncThunk (
  'user/profil',
  async ({name, token}, thunkAPI) => {
      const {rejectWithValue} = thunkAPI
      try{
         await fetch(baseUrl + '/profil',
         { 
            name: name, 
         },{
          headers: {
            'Authorization': 'Bearer' + token
          }
         })
          .then((response) => {
              return response.data
          })
      } catch (error){
          console.log("Error", error.response.data)
          console.log("Error Unauthorized", error.response.data.message)
          return rejectWithValue(error.response.data.message)
      }
  }

)