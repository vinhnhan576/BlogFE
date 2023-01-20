import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import Axios from 'axios';
import setAuthToken from '../../setAuthToken';
import serverUrl from '../common';

const accountUrl = 'api/account';

export const setCurrentUser = (decoded) => {
    return {
        payload: decoded,
    };
};

export const authenticateUserAsync = createAsyncThunk(
    'auth/authenticateUserAsync',
    async (user) => {
        const response = await Axios.post(serverUrl + 'auth/login', user);
        const tasks = response.data;
        return { tasks };
    }
);

export const createNewAccountAsync = createAsyncThunk(
    'api/user/createNewAccountAsync',
    async ({ account }) => {
        const response = await Axios.post(serverUrl + accountUrl, account);
        const tasks = response.data;
        return { tasks };
    }
);

export const accountSlice = createSlice({
    name: 'account',
    initialState: {
        account: null,
    },
    reducers: {
        // login: (state, action) => {
        // 	const data = {
        // 		username: action.payload.username,
        // 		password: action.payload.password,
        // 	};
        // 	Axios.post("http://localhost:5000/auth", { data })
        // 		.then((res) => {
        // 			if (res) {
        // 				state.account = action.payload;
        // 				console.log(state.account);
        // 			} else state.account = null;
        // 		})
        // 		.catch((error) => {
        // 			console.log(error);
        // 		});
        // },
        logout: (state) => {
            state.account = null;
        },
    },
    extraReducers: {
        [authenticateUserAsync.fulfilled]: (state, action) => {
            console.log('Authenticated user successfully');
            const { token } = action.payload.tasks;
            localStorage.setItem('jwtToken', token);
            setAuthToken(token);
            if (action.payload.tasks)
                state.account = action.payload.tasks.account;
            else state.account = null;
        },
        [createNewAccountAsync.fulfilled]: (state, action) => {
            console.log('Created new account successfully');
            return action.payload.tasks.result;
        },
    },
});

export const { logout } = accountSlice.actions;

export const selectAccount = (state) => state.account.account;

export default accountSlice.reducer;
