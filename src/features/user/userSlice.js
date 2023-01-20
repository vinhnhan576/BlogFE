import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import Axios from 'axios';
import serverUrl from '../common';

const userUrl = 'api/user';

export const getUserByUsernameAsync = createAsyncThunk(
    'api/user/getUserByUsernameAsync',
    async ({ username }) => {
        const response = await Axios.get(
            `${serverUrl}${userUrl}/get-user-by-username?username=${username}`
        );
        const tasks = response.data;
        return { tasks };
    }
);

export const updateUserAsync = createAsyncThunk('', async ({ id, userReq }) => {
    const formData = new FormData();
    userReq.name && formData.append('name', userReq.name);
    userReq.alias && formData.append('alias', userReq.alias);
    userReq.gender && formData.append('gender', userReq.gender);
    userReq.date && formData.append('date', userReq.date);
    userReq.tel && formData.append('tel', userReq.tel);
    userReq.job && formData.append('job', userReq.job);
    userReq.address && formData.append('address', userReq.address);
    userReq.email && formData.append('email', userReq.email);
    userReq.profilepic && formData.append('profilepic', userReq.profilepic);
    userReq.upperpic && formData.append('upperpic', userReq.upperpic);
    userReq.lowerpic && formData.append('lowerpic', userReq.lowerpic);
    console.log(userReq.profilepic);
    const response = await Axios.put(
        `${serverUrl}${userUrl}/update-user?id=${id}`,
        formData
    );
    const tasks = response.data;
    return { tasks };
});

export const userSlice = createSlice({
    name: 'user',
    initialState: {
        user: null,
    },
    reducers: {},
    extraReducers: {
        [getUserByUsernameAsync.fulfilled]: (state, action) => {
            console.log('get user by username successfully');
            // state.user = action.payload.tasks;
            return action.payload.tasks.result;
        },
    },
});

export const {} = userSlice.actions;

export const selectUser = (state) => state.user.user;

export default userSlice.reducer;
