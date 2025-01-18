import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    currentUser: null
}

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUserDetails: (state, action) => {
            state.currentUser = action.payload
        }
    }
})

export {userSlice}

export const {setUserDetails} = userSlice.actions

export default userSlice.reducer