import {createAsyncThunk} from "@reduxjs/toolkit"

import { setFirstName, setLastName} from "./profilSlice"
import { setServerMsg} from "./registerSlice"


const baseUrl = "http://localhost:5000/"

export const userRegister = createAsyncThunk (
    'user/login',
    async ({name, email, password }, thunkAPI) => {
      const {rejectWithValue, dispatch} = thunkAPI
        try{
           await fetch(baseUrl + '/register', {
                name: name,
                email: email, 
                password: password
              })
              .then((response) => {
                if (response.status === 200){
                  dispatch(setServerMsg(response.data.message)) 
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
                email: email, 
                password: password
              })
              .then((response) => {
                if (response.status === 200){
                  sessionStorage.setItem("user", response.data.body.token)
                  dispatch(setServerMsg(response.data.message)) 
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


export const userInfos = createAsyncThunk (
  'user/infos',
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
              dispatch(setFirstName(responseBody.firstName))
              dispatch(setLastName(responseBody.lastName))
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
  'user/infos',
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