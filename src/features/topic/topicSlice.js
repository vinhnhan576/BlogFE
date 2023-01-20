import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import Axios from 'axios';
import serverUrl from '../common';

const topicUrl = 'api/topic';

export const getAllTopicsByUserIDAsync = createAsyncThunk(
    'topic/getAllTopicsByUserIDAsync',
    async (userID) => {
        const response = await Axios.get(
            `${serverUrl}${topicUrl}?userID=${userID}`
        );
        const tasks = response.data;
        return { tasks };
    }
);

export const getAllTopicBySlugAsync = createAsyncThunk(
    'topic/getAllTopicBySlugAsync',
    async (slug) => {
        const response = await Axios.get(
            `${serverUrl}${topicUrl}/get-topic-by-slug?slug=${slug}`
        );
        const tasks = response.data;
        return { tasks };
    }
);

export const createNewTopic = createAsyncThunk(
    'topic/createNewTopic',
    async ({ topic }) => {
        console.log(topic);
        const response = await Axios.post(serverUrl + topicUrl, topic);
        const tasks = response.data;
        return { tasks };
    }
);

const topicSlice = createSlice({
    name: 'topic',
    initialState: [],
    reducers: {},
    extraReducers: {
        [getAllTopicsByUserIDAsync.fulfilled]: (state, action) => {
            console.log('fetching topics successfully');
            return action.payload.tasks.result;
        },
        [createNewTopic.fulfilled]: (state, action) => {
            console.log('create new topic successfully');
            return action.payload.tasks.result;
        },
    },
});
export const {} = topicSlice.actions;
export default topicSlice.reducer;
