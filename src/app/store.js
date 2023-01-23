import { configureStore, createStore } from '@reduxjs/toolkit';
import blogReducer from '../features/post/blogSlice';
import userReducer from '../features/user/userSlice';
import accountReducer from '../features/account/accountSlice';
import topicReducer from '../features/topic/topicSlice';
import bloggerReducer from '../features/user/bloggerSlice';
import commentSlice from '../features/comment/commentSlice';

const initialState = {};

export default configureStore({
    reducer: {
        blog: blogReducer,
        user: userReducer,
        account: accountReducer,
        topic: topicReducer,
        blogger: bloggerReducer,
        comment: commentSlice,
    },
    preloadedState: initialState,
});
