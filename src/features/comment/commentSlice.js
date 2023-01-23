import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import Axios from 'axios';
import authHeader from '../common/authHeader';
import serverUrl from '../common/common';

const commentUrl = 'api/comment';

export const getAllCommentsByBlogAsync = createAsyncThunk(
    'comment/getAllCommentsByBlogAsync',
    async (blogID) => {
        const response = await Axios.get(
            `${serverUrl}${commentUrl}/get-blog-comments?blogID=${blogID}`,
            { headers: authHeader() }
        );
        const tasks = response.data;
        return { tasks };
    }
);

// export const getAllcommentBySlugAsync = createAsyncThunk(
//     'comment/getAllcommentBySlugAsync',
//     async (slug) => {
//         const response = await Axios.get(
//             `${serverUrl}${commentUrl}/get-comment-by-slug?slug=${slug}`,
//             { headers: authHeader() }
//         );
//         const tasks = response.data;
//         return { tasks };
//     }
// );

export const createNewComment = createAsyncThunk(
    'comment/createNewComment',
    async (comment) => {
        // console.log(comment)
        const response = await Axios.post(serverUrl + commentUrl + '/add-new-comment', comment, {
            headers: authHeader(),
        });
        const tasks = response.data;
        return { tasks };
    }
);

const commentSlice = createSlice({
    name: 'comment',
    initialState: [],
    reducers: {},
    extraReducers: {
        [getAllCommentsByBlogAsync.fulfilled]: (state, action) => {
            console.log('fetching comments successfully');
            return action.payload.tasks.result;
        },
        [createNewComment.fulfilled]: (state, action) => {
            console.log('add new comment successfully');
            // return action.payload.tasks.result;
        },
    },
});
export const {} = commentSlice.actions;
export default commentSlice.reducer;
