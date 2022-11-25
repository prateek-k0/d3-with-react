import { createSlice, createSelector } from '@reduxjs/toolkit'

const initialState = {
    open: false
};

const sidebarSlice = createSlice({
    name: 'sidebar',
    initialState,
    reducers: {
        toggleOrSetSidebar: (state, action) => ({ ...state, open: action?.payload || !state.open }),
    }
});

export const { toggleOrSetSidebar } = sidebarSlice.actions;

export const getSidebarStatus = createSelector(
    [
        (state) => state.sidebar
    ],
    (sidebar) => sidebar.open
);

export default sidebarSlice.reducer;