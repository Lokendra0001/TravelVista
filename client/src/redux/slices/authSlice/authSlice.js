import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { SERVER_API, SUB_API } from "../../../utils/serverApiConfig";

export const updateUserDetail = createAsyncThunk(
    "auth/updateUserDetail",
    async (data, { rejectWithValue }) => {
        try {
            const res = await axios.post(`${SERVER_API}${SUB_API.AUTH.UPDATE_USER_DETAIL}`, data, { withCredentials: true });
            return res?.data; // must contain user object
        } catch (err) {
            return rejectWithValue(err?.response?.data?.msg || err.message);
        }
    }
);


export const logoutUser = createAsyncThunk(
    "auth/logoutUser",
    async (_, { rejectWithValue }) => {
        try {
            const res = await axios.get(`${SERVER_API}${SUB_API.AUTH.LOGOUT_USER}`, { withCredentials: true });
            return res?.data; // must contain user object
        } catch (err) {
            return rejectWithValue(err?.response?.data?.msg || err.message);
        }
    }
);



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
                if (action.type === "auth/logoutUser/fulfilled") return; // 👈 skip logout
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
