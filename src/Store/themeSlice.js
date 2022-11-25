import { createSlice, createSelector } from '@reduxjs/toolkit'

const initialState = {
    darkMode: false
}

const themeSlice = createSlice({
    name: 'theme',
    initialState,
    reducers: {
        toggleOrSetTheme: (state, action) => ({ ...state, darkMode: action?.payload || !state.darkMode }),
    }
});

export const { toggleOrSetTheme } = themeSlice.actions;


export default themeSlice.reducer;