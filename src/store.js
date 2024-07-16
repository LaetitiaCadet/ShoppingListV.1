import { combineReducers, configureStore } from '@reduxjs/toolkit'
// import { persistReducer, persistStore } from 'redux-persist'
// import  storage from 'redux-persist/lib/storage' 
import  loginSlice  from "./reducers/loginSlice"
import  profilSlice from "./reducers/profilSlice"
import  registerSlice from "./reducers/registerSlice"
import { thunk } from 'redux-thunk'


// const persistConfig = {
//     key: 'root',
//     storage,
//     // blacklist:['user'],
// }

const rootReducer = combineReducers({
    userRegister: registerSlice.reducer,
    userLogin: loginSlice.reducer,
    userLogged: profilSlice.reducer,
})

// const persistedReducer = persistReducer(persistConfig,rootReducer)

const store = configureStore ({   
    reducer: rootReducer,
    middleware:  (getDefaultMiddleware) => {
        return [thunk] 
    }
    
})

// export const persistor = persistStore(store)

export default store