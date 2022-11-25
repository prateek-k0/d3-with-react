import { configureStore } from "@reduxjs/toolkit";
import sidebarSliceReducer from "./sidebarSlice";
import themeSliceReducer from "./themeSlice";

export const storeConfig = configureStore({
    reducer : {
        sidebar: sidebarSliceReducer,
        theme: themeSliceReducer
    }
});