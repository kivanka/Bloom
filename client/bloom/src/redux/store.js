import { configureStore } from '@reduxjs/toolkit';
import { authReducer } from './slices/auth';
import { productReducer } from './slices/product';
import { categoriesReducer } from './slices/categories';
import { ordersReducer } from './slices/order';
import { reviewReducer } from './slices/review';
import cartReducer from './slices/cart';

const store = configureStore({
    reducer: {
        auth: authReducer,
        products: productReducer,
        categories: categoriesReducer,
        orders: ordersReducer,
        cart: cartReducer,
        reviews: reviewReducer,
    }
});

export default store;