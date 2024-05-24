import {configureStore} from '@reduxjs/toolkit';
import episodeReducer from './slices/episodeSlice';
import characterReducer from './slices/characterSlice';

const store = configureStore({
  reducer: {
    episodes: episodeReducer,
    characters: characterReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      thunk: true,
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
