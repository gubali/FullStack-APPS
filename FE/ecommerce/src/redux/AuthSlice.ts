import { createSlice } from '@reduxjs/toolkit';
let saveUser = null;
try {
    const rawUser = localStorage.getItem('username');
    saveUser = rawUser ? JSON.parse(rawUser) : null;
} catch (error) {
    console.warn("Could not parse saved user from localStorage:", error);
    saveUser = null;
}

const initialState = {
    user: saveUser,
    isLoggedIn: !!saveUser,
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        login: (state, action) => {
            state.user = action.payload;
            state.isLoggedIn = true;
            localStorage.setItem('username', JSON.stringify(action.payload));
        },
        logout: (state) => {
            state.user = null;
            state.isLoggedIn = false;
            localStorage.removeItem('username');
        },
    },
});

export const { login, logout } = userSlice.actions;
export default userSlice.reducer;
