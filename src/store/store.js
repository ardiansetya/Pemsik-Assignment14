import { configureStore } from "@reduxjs/toolkit";
import { mhsSlice } from "./mhsSlice";


export const store = configureStore({
    reducer: {
        mhs: mhsSlice.reducer
    },
    devTools: true,
});

