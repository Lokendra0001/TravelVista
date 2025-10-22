import { createSlice } from "@reduxjs/toolkit";
import { logoutUser } from "./authSlice.thunk"


const authSlice = createSlice({
    name: "auth",
    initialState: {
        user: null,
        role: null,
        loading: false,
    },
    extraReducers: (builder) => {


        builder.addCase(logoutUser.fulfilled, (state) => {
            state.loading = false;
            state.user = null;
            state.role = null;
        })


        // PENDING
        builder.addMatcher(
            (action) => action.type.endsWith("/pending"),
            (state) => {
                state.loading = true;
                // preserve the existing user
                state.user = state?.user;
            }
        );

        // FULFILLED
        builder.addMatcher(
            (action) => action.type.endsWith("/fulfilled"),
            (state, action) => {
                if (action.type === "auth/logoutUser/fulfilled") return; // 👈 skip logout due to show the sigin if this not then user be like {} means no empty that's why we want user = null
                state.user = { ...state.user, ...action.payload.user };
                state.role = action.payload.user?.role;
                state.loading = false;
            }
        );


        // REJECTED
        builder.addMatcher(
            (action) => action.type.endsWith("/rejected"),
            (state) => { state.loading = false; }
        );
    },
});

export default authSlice.reducer;
