import { configureStore } from '@reduxjs/toolkit';
import storyReducer from './storySlice';
import userReducer from './userSlice';
import musicReducer from './musicSlice';
import loadingReducer from './loadingSlice';
import errorReducer from './errorSlice';

const store = configureStore({
    reducer: {
        story: storyReducer,
        user: userReducer,
        music: musicReducer,
        loading: loadingReducer,
        error: errorReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
