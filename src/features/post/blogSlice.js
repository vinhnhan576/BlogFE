import { createSlice, createAsyncThunk, nanoid } from '@reduxjs/toolkit';
import Axios from 'axios';
import serverUrl from '../common';

const blogUrl = 'api/blog';

export const getAllBlogsByUserIDAsync = createAsyncThunk(
    'blogs/getAllBlogsByUserIDAsync',
    async (userID) => {
        const response = await Axios.get(
            `${serverUrl}${blogUrl}?userID=${userID}`
        );
        const tasks = response.data;
        return { tasks };
    }
);

export const getBlogBySlugAsync = createAsyncThunk(
    'blog/getBlogBySlugAsync',
    async (slug) => {
        const response = await Axios.get(
            `${serverUrl}${blogUrl}/get-blog-by-slug?slug=${slug}`
        );
        const tasks = response.data;
        return { tasks };
    }
);

export const createNewBlogAsync = createAsyncThunk(
    'blog/createNewBlogAsync',
    async ({ blogReqData }) => {
        const formData = new FormData();
        formData.append('title', blogReqData.title)
        formData.append('coverImg', blogReqData.coverImg)
        formData.append('topicID', blogReqData.topicID)
        formData.append('slug', blogReqData.slug)
        formData.append('content', blogReqData.content);
        formData.append('quote', blogReqData.quote);
        formData.append('date', blogReqData.date);
        formData.append('location', blogReqData.date);
        const response = await Axios.post(serverUrl + blogUrl, formData);
        const tasks = response.data;
        return { tasks };
    }
);

export const updateBlogAsync = createAsyncThunk(
    'blog/updateBlogAsync',
    async ({ blogReqData }) => {
        const id = blogReqData.id;
        const response = await Axios.put(
            `${serverUrl}${blogUrl}/${id}`,
            blogReqData
        );
        const tasks = response.data;
        return { tasks };
    }
);

export const deleteBlogAsync = createAsyncThunk(
    'blog/deleteBlogAsync',
    async (id) => {
        const response = await Axios.delete(`${serverUrl}${blogUrl}/${id}`);
        window.location.reload(false);
        const tasks = response.data;
        return { tasks };
    }
);

const blogSlice = createSlice({
    name: 'blog',
    initialState: [],
    reducers: {},
    extraReducers: {
        [getAllBlogsByUserIDAsync.fulfilled]: (state, action) => {
            console.log('fetching blogs by userID successfully');
            return action.payload.tasks.result;
        },
        [getBlogBySlugAsync.fulfilled]: (state, action) => {
            console.log('fetching blog by slug successfully');
            return action.payload.tasks.result;
        },
        [createNewBlogAsync.fulfilled]: (state, action) => {
            console.log('added new blog successfully');
            return action.payload.tasks.result;
        },
        [updateBlogAsync.fulfilled]: (state, action) => {
            console.log('updated blog successfully');
            return action.payload.tasks.result;
        },
    },
});
export const {} = blogSlice.actions;

export const selectPost = (state) => state.blog.blog;

export default blogSlice.reducer;
