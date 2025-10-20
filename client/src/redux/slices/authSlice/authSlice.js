import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name: "auth",
    initialState: {
        user: null,
        role: null,
        loading: false,
    },
    extraReducers: (builder) => {
        // PENDING
        builder.addMatcher(
            (action) => action.type.endsWith("/pending"),
            (state) => { state.loading = true; }
        );

        // FULFILLED
        builder.addMatcher(
            (action) => action.type.endsWith("/fulfilled"),
            (state, action) => {
                state.user = action.payload.user;
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
