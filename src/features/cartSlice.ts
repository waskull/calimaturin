import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ItemCart, User, Item as IItem, IIcescream } from "../interfaces";
import AsyncStorage from '@react-native-async-storage/async-storage';

const initialState: ItemCart = {
    items: [],
    pay_code: [],
    paymentMethod: '',
}

const loadLocalStorage = () => {
    return AsyncStorage.getItem('cart');
}

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addItem: (state, action: PayloadAction<IIcescream>) => {
            const isItemInCart = state.items?.find((cartItem) => cartItem.id === action.payload.id);

            if (isItemInCart) {
                state.items =
                    state.items?.map((cartItem) =>
                        cartItem.id === action.payload.id
                            ? { ...cartItem, quantity: cartItem.quantity + 1 }
                            : cartItem

                    );

            } else {
                state.items = ([...state.items!, { ...action.payload, quantity: 1 }]);
            }

        },
        increment: (state, action: PayloadAction<IIcescream>) => {
            const isItemInCart = state.items?.find((cartItem) => cartItem.id === action.payload.id);
            if (isItemInCart) {
                state.items?.forEach((item) => {
                    if (item.id === action.payload.id) {
                        item.quantity = item.quantity+1;
                    }
                });
            }
        },
        deleteItem: (state, action: PayloadAction<IIcescream>) => {
            state.items = state.items?.filter((cartItem) => cartItem.id !== action.payload.id);
        },
        decrementItem: (state, action: PayloadAction<IIcescream>) => {

            const isItemInCart = state.items?.find((cartItem) => cartItem.id === action.payload.id);
            if (isItemInCart) {
                state.items?.forEach((item) => {
                    if (item.id === action.payload.id && item.quantity > 1) {
                        item.quantity = item.quantity-1;
                    }
                });
            }

        },
        resetCart: (state) => {
            state.items = [];
            state.pay_code = [];
            state.paymentMethod = '';
        },
        saveCart: (state) => {
            AsyncStorage.setItem('cart', JSON.stringify(state));
        },
    },
});

export const { addItem, deleteItem, resetCart, decrementItem, saveCart, increment } = cartSlice.actions;
export default cartSlice;