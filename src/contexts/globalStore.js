import { configureStore, createSlice } from "@reduxjs/toolkit";
import Colors from '../styles/palette'

const globalSlice = createSlice({
    name: "global",
    initialState: { value: Colors.lightSeaGreenColor },
    reducers: {
        updateGlobalValue: (state, action) => {
            state.value = action.payload;
        },
    },
});

export const { updateGlobalValue } = globalSlice.actions;

export const store = configureStore({
    reducer: {
        global: globalSlice.reducer,
    },
});
