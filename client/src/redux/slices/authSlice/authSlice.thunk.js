import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { SERVER_API, SUB_API } from "../../../utils/serverApiConfig";
import { handleErrorMsg, handleSuccessMsg } from "../../../utils/toast";


// SIGNUP
export const signup = createAsyncThunk(
    "auth/signup",
    async (data, { rejectWithValue }) => {
        try {
            const res = await axios.post(`${SERVER_API}${SUB_API.AUTH.SIGNUP}`, data, { withCredentials: true });
            console.log(res?.data)
            return res?.data; // must contain user object
        } catch (err) {
            return rejectWithValue(err?.response?.data?.msg || err.message);
        }
    }
);

// SIGNIN
export const signin = createAsyncThunk(
    "auth/signin",
    async (data, { rejectWithValue }) => {
        try {
            const res = await axios.post(`${SERVER_API}${SUB_API.AUTH.SIGNIN}`, data, { withCredentials: true });
            return res?.data;
        } catch (err) {

            return rejectWithValue(err?.response?.data?.msg || err.message);
        }
    }
);

// FETCH CURRENT USER
export const fetchCurrentUser = createAsyncThunk(
    "auth/fetchCurrentUser",
    async (_, { rejectWithValue }) => {
        try {
            const res = await axios.get(`${SERVER_API}${SUB_API.AUTH.CURRENT_USER}`, { withCredentials: true });
            return res?.data;
        } catch (err) {
            return rejectWithValue(err?.response?.data?.msg || err.message);
        }
    }
);