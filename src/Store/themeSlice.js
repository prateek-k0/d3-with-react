import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    darkMode: true
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