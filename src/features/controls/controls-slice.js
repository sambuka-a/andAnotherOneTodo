import { createSlice } from "@reduxjs/toolkit";

const controlSlice = createSlice({
    name: '@@control',
    initialState: 'all',
    reducers: {
        setControls: (_, action) => {
            return action.payload
        }
    }
})

export const {setControls} = controlSlice.actions;

export const controlReducer = controlSlice.reducer;