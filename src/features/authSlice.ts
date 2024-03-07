import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Auth, User } from "../interfaces";

const initialState: Auth = {
    authenticated: false,
    token: "",
    user: {
        email: "",
        password: "",
        firstname: "",
        lastname: "",
        roles: [],
        birthdate: "",
        cedula: "",
        phone: "",
        id: 0,
    }
}

interface partialUser{
    firstname: string,
    lastname: string,
    birthdate?: string;
    cedula: string,
    phone: string
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setAuth: (state, action: PayloadAction<Auth>) => {
            state.authenticated = action.payload.authenticated;
            state.token = action.payload.token;
            state.user = action.payload.user;
        },
        setUser: (state, action: PayloadAction<partialUser>) => {
            state.user.firstname = action.payload.firstname;
            state.user.lastname = action.payload.lastname;
            state.user.birthdate = action.payload.birthdate;
            state.user.cedula = action.payload.cedula;
            state.user.phone = action.payload.phone;
        },
        logout: (state) => {
            state.token = "";
            state.authenticated = false;
            state.user.email = "";
            state.user.password = "";
            state.user.firstname = "";
            state.user.lastname = "";
            state.user.roles = [];
            state.user.birthdate = "";
            state.user.cedula = "";
            state.user.phone = "";
            state.user.id = 0;
        },
    },
});

export const { setAuth, logout, setUser  } = authSlice.actions;
export default authSlice;