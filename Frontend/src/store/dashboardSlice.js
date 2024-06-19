import { createSlice } from '@reduxjs/toolkit'
const initialState = {
    user: { name: 'john' },
    isDarkTheme: false,
    showSidebar: false
}

const dashBoardSlice = createSlice({
    name: 'dashboard',
    initialState,
    reducers: {
        toggleDarkTheme: () => {

        },
        toggleSidebar: () => {

        },
        setUser: () => {

        }
    }
})


//create an action creator thunk which fetches the current user from backend, make it return an async function 