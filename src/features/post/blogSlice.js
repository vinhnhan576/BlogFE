import { createSlice, createAsyncThunk, nanoid } from '@reduxjs/toolkit';
import Axios from 'axios';
import authHeader from '../common/authHeader';
import serverUrl from '../common/common';

const blogUrl = 'api/blog';

export const getAllBlogsByUserIDAsync = createAsyncThunk(
    'blogs/getAllBlogsByUserIDAsync',
    async (userID) => {
        const response = await Axios.get(
            `${serverUrl}${blogUrl}?userID=${userID}`,
            { headers: authHeader() }
        );
        const tasks = response.data;
        return { tasks };
    }
);

export const getBlogBySlugAsync = createAsyncThunk(
    'blog/getBlogBySlugAsync',
    async (slug) => {
        const response = await Axios.get(
            `${serverUrl}${blogUrl}/get-blog-by-slug?slug=${slug}`,
            { headers: authHeader() }
        );
        const tasks = response.data;
        return { tasks };
    }
);

export const createNewBlogAsync = createAsyncThunk(
    'blog/createNewBlogAsync',
    async ({ blogReqData }) => {
        const formData = new FormData();
        formData.append('title', blogReqData.title);
        formData.append('coverImg', blogReqData.coverImg);
        formData.append('topicID', blogReqData.topicID);
        formData.append('slug', blogReqData.slug);
        formData.append('content', blogReqData.content);
        formData.append('quote', blogReqData.quote);
        formData.append('date', blogReqData.date);
        formData.append('location', blogReqData.location);
        formData.append('published', blogReqData.published);
        formData.append('signature', blogReqData.signature);
        const response = await Axios.post(serverUrl + blogUrl, formData, {
            headers: authHeader(),
        });
        const tasks = response.data;
        return { tasks };
    }
);

export const updateBlogAsync = createAsyncThunk(
    'blog/updateBlogAsync',
    async ({ blogReqData }) => {
        const id = blogReqData._id;
        const formData = new FormData();
        console.log(id);
        blogReqData.title && formData.append('title', blogReqData.title);
        blogReqData.coverImg &&
            formData.append('coverImg', blogReqData.coverImg);
        blogReqData.topicID && formData.append('topicID', blogReqData.topicID);
        blogReqData.slug && formData.append('slug', blogReqData.slug);
        blogReqData.content && formData.append('content', blogReqData.content);
        blogReqData.quote && formData.append('quote', blogReqData.quote);
        blogReqData.date && formData.append('date', blogReqData.date);
        blogReqData.location &&
            formData.append('location', blogReqData.location);
        formData.append('published', blogReqData.published);
        blogReqData.signature &&
            formData.append('signature', blogReqData.signature);
        const response = await Axios.put(
            `${serverUrl}${blogUrl}/${id}`,
            formData,
            { headers: authHeader() }
        );
        const tasks = response.data;
        return { tasks };
    }
);

export const deleteBlogAsync = createAsyncThunk(
    'blog/deleteBlogAsync',
    async (id) => {
        const response = await Axios.delete(`${serverUrl}${blogUrl}/${id}`, {
            headers: authHeader(),
        });
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
