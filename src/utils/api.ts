import axios from "axios";
import { BASE_URL } from "../constants/url";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { TOKEN } from "../constants/Storage";
import yyyymmdd from '../constants/General';

export const register = async (email:string, password:string,birthdate:Date,firstname:string,lastname:string,cedula:string,phone:string) => {
    try{

        await axios.post(`${BASE_URL}/user/register`, {email,password,cedula,birthdate:yyyymmdd(birthdate),firstname,lastname,phone});
        return {error:false, msg:`Usuario ${firstname} ${lastname} creado`}
    }
    catch(e:any){
        console.log("error: ",e.response?.data?.message );
        if(e.response?.data?.message){
            return {error:true, msg: e.response?.data?.message}
        }
        return {error:true, msg: e.message}
    }
}

export const Logout = async () => {
    try{
        const token = await AsyncStorage.setItem(TOKEN, '');
    }
    catch(e){
        console.log("error :",e);
    }
}

export const updatePassword = async (email:string) => {
    try{
        await axios.post(`${BASE_URL}/user/register`, {email});
        return {error:false, msg:`Correo enviado a ${email}`}
    }
    catch(e:any){
        console.log("error: ",e.response?.data?.message );
        if(e.response?.data?.message){
            return {error:true, msg: e.response?.data?.message}
        }
        return {error:true, msg: e.message}
    }
}

export const recoveryPassword:any = async (email:string) => {
    try{
        await axios.post(`${BASE_URL}/auth/resetpassword`, {email});
        return {error:false, msg:`Correo enviado a ${email}`}
    }
    catch(e:any){
        console.log("error: ",e.response?.data?.message );
        if(e.response?.data?.message){
            return {error:true, msg: e.response?.data?.message}
        }
        return {error:true, msg: e.message}
    }
}

export const resetPassword:any = async (code:string,password:string,email:string) => {
    try{
        await axios.post(`${BASE_URL}/auth/repass`, {code,password,email});
        return {error:false, msg:`Tu contraseña ha sido cambiada`}
    }
    catch(e:any){
        console.log("error: ",e.response?.data?.message );
        if(e.response?.data?.message){
            return {error:true, msg: e.response?.data?.message}
        }
        return {error:true, msg: e?.message}
    }
}