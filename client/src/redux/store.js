import{configureStore}from "@reduxjs/toolkit"
import signupSlice from "./slice/auth/signupSlice"
const store =  new configureStore({
    reducer: {
        [signupSlice.name]: signupSlice.reducer

    }

})

export default store