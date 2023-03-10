import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import Axios from 'axios';
import authHeader from '../common/authHeader';
import serverUrl from '../common/common';

const userUrl = 'api/user';

export const getBloggerByAliasAsync = createAsyncThunk(
    'api/user/getBloggerByAliasAsync',
    async (alias) => {
        const response = await Axios.get(
            `${serverUrl}${userUrl}/get-user-by-alias?alias=${alias}`,
            { headers: authHeader() }
        );
        const tasks = response.data;
        return { tasks };
    }
);

export const getBloggerByUserID = createAsyncThunk('', async (userID) => {
    const response = await Axios.get(
        `${serverUrl}${userUrl}/get-user-by-id?userID=${userID}`,
        { headers: authHeader() }
    );
    const tasks = response.data;
    return tasks;
});

export const bloggerSlice = createSlice({
    name: 'blogger',
    initialState: {
        blogger: null,
    },
    reducers: {},
    extraReducers: {
        [getBloggerByAliasAsync.fulfilled]: (state, action) => {
            console.log('get blogger by alias successfully');
            // state.user = action.payload.tasks;
            return action.payload.tasks.result;
        },
        [getBloggerByUserID.fulfilled]: (state, action) => {
            console.log(action.payload.tasks);
        },
    },
});

export const {} = bloggerSlice.actions;

export const selectBlogger = (state) => state.blogger;

export default bloggerSlice.reducer;
