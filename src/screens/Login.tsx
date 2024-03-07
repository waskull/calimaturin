import React, { useState } from 'react';
import { ActivityIndicator, Alert, Image, ImageBackground, StyleSheet, Text, Appearance, StatusBar, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  View,
  TouchableOpacity,
} from 'react-native';

import Entypo from 'react-native-vector-icons/Entypo';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import CustomButton from './../components/CustomButton';
import Colors from '../constants/Colors';
import AppInput from '../components/AppInput';
import { useAppDispatch } from '../utils/hooks';
import { BASE_URL } from '../constants/url';
import { TOKEN } from '../constants/Storage';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { setAuth } from '../features/authSlice';
import Toast from 'react-native-toast-message';
import Loader from '../components/Loader';
import { validate } from '../constants/Validators';
import { BlurView } from '@react-native-community/blur';

const Login = ({ navigation }: { navigation: any }): JSX.Element => {
  const [password, setPassword] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const onLogin = async () => {
    try {
      setLoading(true);
      
      const result = await axios.post(`${BASE_URL}/auth/login/`, { email, password });
      // console.log(result);
      await AsyncStorage.setItem(TOKEN, result.data.data.accessToken);
      axios.defaults.headers.common['Authorization'] = `Bearer ${result.data.data.accessToken}`;
      dispatch(setAuth({
        authenticated: true,
        token: result.data.data.accessToken,
        user: result.data.data.user
      }));
      setLoading(false);
      return { error: false, msg: `${result.data.data.user.firstname} ${result.data.data.user.lastname}` };
    }

    catch (e: any) {
      console.log("error: ", e.response?.data?.message);
      if (e.response?.data?.message) {
        console.log(e.response?.data?.message);
        setLoading(false);
        return { error: true, msg: e.response?.data?.message }
      }
      setLoading(false);
      return { error: true, msg: e.message }

    }
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Appearance.getColorScheme() === 'dark' ? Colors.DEFAULT_BLACK : Colors.DEFAULT_WHITE }}>
      <StatusBar hidden={false} barStyle={Appearance.getColorScheme() == 'dark' ? 'light-content' : 'dark-content'} backgroundColor={Appearance.getColorScheme() == 'dark' ? Colors.DEFAULT_BLACK : Colors.DEFAULT_WHITE}></StatusBar>
      {/* {Appearance.getColorScheme() == 'light' && <>
      <Image source={require('./../assets/images/background2.jpg')} style={{ resizeMode: 'cover',position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    right: 0,
    width: null,
    height: null,}} />
         <BlurView
        style={{position: 'absolute',
        left: 0,
        top: 0,
        bottom: 0,
        right: 0,}}
        blurType="xlight"
        blurAmount={10}
        blurRadius={10}
      />
      </>} */}
      
      <View style={{ paddingHorizontal: 25, alignContent: 'center' }}>
      
        <View style={{ alignItems: 'center', top: 20 }}>

          <Image source={require('./../assets/images/isologo.png')} style={{
            width: 260, height: 240,
          }}></Image>
        </View>
        {loading && <Loader></Loader>}
        <View style={{ flex: 1, alignContent: 'space-between', marginVertical: 30 }}>

        </View>
        <Text
          style={{
            fontFamily: 'Poppins-Bold',
            fontSize: 28,
            color: Appearance.getColorScheme() === 'dark' ? 'white' : '#333',
            marginBottom: 30,
            alignSelf: 'center',
            marginTop: 0
          }}>
          Inicio de Sesión
        </Text>

        <View
          style={{
            flexDirection: 'row',
            borderBottomColor: Colors.DEFAULT_BLACK,
            paddingBottom: 8,
            marginBottom: 25,
          }}>
          <Entypo
            name="email"
            size={20}
            color="black"
            style={styles.textinputIcon}
          />
          <AppInput placeholder='Correo' value={email} onChangeText={setEmail}  maxLength={35}></AppInput>
        </View>

        <View
          style={{
            flexDirection: 'row',
            borderBottomColor: Colors.DEFAULT_BLACK,
            borderBottomWidth: 1,
            paddingBottom: 8,
            marginBottom: 15,
          }}>
          <MaterialCommunityIcons
            name="form-textbox-password"
            size={20}
            color="black"
            style={styles.textinputIcon}
          />
          <AppInput placeholder='Clave' secureTextEntry={true} value={password} onChangeText={setPassword} maxLength={30}></AppInput>
        </View>

        <CustomButton label={"Iniciar Sesión"} disable={email.length < 5 || !validate(email) || password.length < 4 || loading} onPress={async () => {
          try {
            const result = await onLogin();
            console.log(result);
            if (result && result.error) {
              setLoading(false);
              Toast.show({
                type: 'error',
                text1: result.msg,
                text2: 'Error en el inicio de sesión',
                position: 'bottom'
              });
            }
            else if (result && result.error === false) {
              // ToastAndroid.showWithGravity(
              //   `Bienvenido ${result.msg}`,
              //   ToastAndroid.LONG,
              //   ToastAndroid.CENTER,
              // );
              setLoading(false);
              Toast.show({
                type: 'success',
                text1: `Bienvenido ${result.msg}`,
                text2: `Has iniciado sesión`,
                autoHide: true,
                position: 'bottom'
              });
            }
            else {
              // ToastAndroid.showWithGravity(
              //   'Error',
              //   ToastAndroid.LONG,
              //   ToastAndroid.CENTER,
              // );
              setLoading(false);
              Toast.show({
                type: 'error',
                text1: 'ERROR INESPERADO D:',
                position: 'bottom'
              });
              navigation.navigate('tabs');
            }
          } catch (error) {
            setLoading(false);
            Alert.alert('Ocurrio un error inesperado D:');
            console.log(error);
          }
        }}
        />





        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            marginBottom: 10,
          }}>
          <Text style={{ color: Appearance.getColorScheme() === 'dark' ? 'white' : Colors.DEFAULT_BLACK, fontFamily: 'Poppins-Medium' }}>¿Nuevo en la aplicación?</Text>
          <TouchableOpacity onPress={() => navigation.navigate('register')}>
            <Text style={{ color: Colors.DEFAULT, fontSize: 15, fontFamily: 'Poppins-SemiBold' }}> Registrate</Text>
          </TouchableOpacity>


        </View>

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            marginBottom: 20,
          }}>
          <Text style={{ color: Appearance.getColorScheme() === 'dark' ? 'white' : Colors.DEFAULT_BLACK, fontWeight: '400' }}>¿Olvidaste tu contraseña?</Text>
          <TouchableOpacity onPress={() => navigation.navigate('password')}>
            <Text style={{ color: Colors.DEFAULT, fontSize: 14, fontFamily: 'Poppins-SemiBold' }}> Recuperar Clave</Text>
          </TouchableOpacity>


        </View>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  textinputIcon: {
    position: 'absolute',
    zIndex: 1,
    top: 14,
    paddingRight: 10,
    marginLeft: 5,
  },
  
  img: {
    position: 'absolute',
    flex: 1,
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    height: Dimensions.get('window').height,
    width: Dimensions.get('window').width,
  },
  blurViewStyle: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    right: 0,
  },
});

export default Login;
