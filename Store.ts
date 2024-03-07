import {configureStore} from '@reduxjs/toolkit';
import cartSlice from './src/features/cartSlice';
import authSlice from './src/features/authSlice';

const store = configureStore({
    reducer: {
        cart: cartSlice.reducer,
        auth: authSlice.reducer
    }
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export default store;