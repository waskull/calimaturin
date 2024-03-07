import 'react-native-gesture-handler';
import React, { useEffect, useState } from 'react';
import { NavigationContainer } from "@react-navigation/native";
import Home from './src/screens/Home';
import Login from './src/screens/Login';
import Register from './src/screens/Register';
import Tabs from './src/screens/Tabs';
import Delivery from './src/screens/Delivery';
import Password from './src/screens/Password';
import { Icecream } from './src/interfaces/Icecream';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import axios from 'axios';
import { Provider } from 'react-redux';
import store from './Store';
import { useAppDispatch, useAppSelector } from './src/utils/hooks';
import { logout, setAuth } from './src/features/authSlice';
import { BASE_URL } from './src/constants/url';
import { TOKEN } from './src/constants/Storage';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Loader from './src/components/Loader';
import Toast, { BaseToast, ErrorToast } from 'react-native-toast-message';
import { Appearance, StyleSheet, Text, View } from 'react-native';
import Colors from './src/constants/Colors';

export type RootStackParamList = {
  home: undefined;
  login: undefined;
  register: undefined;
  tabs: undefined;
  password: undefined;
  product: Icecream;
}

const AuthStack = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const auth = useAppSelector((state) => state.auth);

  useEffect(() => {
    const authUser = async () => {
      setLoading(true);
      const token = await AsyncStorage?.getItem(TOKEN) || '';
      if (token) {
        try {
          axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
          const result = await axios.get(`${BASE_URL}/auth/me/`);
          dispatch(setAuth({
            authenticated: true,
            user: result.data,
            token: token
          }));
          setLoading(false);
        } catch (err) {
          setLoading(false);
          console.log("no se pudo setear el usuario: ", err);
          dispatch(logout());
        }
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

      }
      setLoading(false);
    }
    authUser();
  }, []);



  const Stack = createNativeStackNavigator<RootStackParamList>();
  return (
    <NavigationContainer>
      {loading ? <Loader></Loader> :
        <Stack.Navigator
          screenOptions={{
            headerShown: false
          }}>
          {auth?.authenticated ? (
            <>
              {auth?.user.roles?.includes('repartidor') ? (

                <Stack.Screen name="product" component={Delivery} />
              ) : (

                <Stack.Screen name="tabs" component={Tabs} />
              )

              }
            </>
          ) : (
            <>
              <Stack.Screen name="home" component={Home} />
              <Stack.Screen name="login" component={Login} />
              <Stack.Screen name="register" component={Register} />
              <Stack.Screen name="password" component={Password} />
            </>
          )}
        </Stack.Navigator>}
    </NavigationContainer>
  )
}

function App(): JSX.Element {


  return (
    <Provider store={store}>
      <AuthStack></AuthStack>
      <Toast config={toastConfig} />
    </Provider>
  )
}

export default App;

const toastConfig = {
  success: (props: any) => (
    <BaseToast
      {...props}
      style={{ borderLeftColor: Colors.DEFAULT_GREEN, backgroundColor: Appearance.getColorScheme() === 'dark' ? Colors.DEFAULT_WHITE : Colors.DEFAULT_WHITE }}
      contentContainerStyle={{ paddingHorizontal: 15 }}
      text1Style={{
        fontSize: 17,
        fontWeight: '600',
        color: Appearance.getColorScheme() === 'dark' ? Colors.DEFAULT_BLACK : Colors.DEFAULT_BLACK,
      }}
      text2Style={{
        fontSize: 15,
        fontWeight: '600',
        color: Appearance.getColorScheme() === 'dark' ? Colors.DEFAULT_BLACK : Colors.DEFAULT_GREY
      }}
    />
  ),
  error: (props: any) => (
    <ErrorToast
      {...props}
      style={{ borderLeftColor: 'red', backgroundColor: Appearance.getColorScheme() === 'dark' ? Colors.DEFAULT_WHITE : Colors.DEFAULT_WHITE }}
      text1Style={{
        fontSize: 17, fontWeight: '600',
        color: Appearance.getColorScheme() === 'dark' ? Colors.DEFAULT_BLACK : Colors.DEFAULT_BLACK
      }}
      text2Style={{
        fontSize: 15, fontWeight: '600',
        color: Appearance.getColorScheme() === 'dark' ? Colors.DEFAULT_BLACK : Colors.DEFAULT_GREY
      }}
    />
  ),

  caliToast: ({ text1, text2, danger, props }: { text1?: string, text2?: string, danger?: boolean, props: boolean }) => (
    <View style={danger ? styles.toastDanger : styles.toast}>
      <Text style={{
        color: Appearance.getColorScheme() === 'dark' ? Colors.DEFAULT_WHITE : Colors.DEFAULT_WHITE,
        fontSize: 20,
        fontFamily: 'Poppins-Bold',
        paddingTop: 5,
        paddingHorizontal: 10,
        marginLeft: 10
      }}>{text1}</Text>
      <Text style={{
        color: Appearance.getColorScheme() === 'dark' ? Colors.DARK_FOUR : Colors.DEFAULT_GREY,
        fontSize: 14,
        fontFamily: 'Poppins-SemiBold',
        marginLeft: 10,
        paddingHorizontal: 10
      }}>{text2}</Text>
    </View>
  )
};

const styles = StyleSheet.create({
  toast: {
    backgroundColor: Appearance.getColorScheme() == 'dark' ? Colors.DEFAULT : Colors.DEFAULT_BLACK,
    zIndex: 100,
    height: 85,
    width: '85%',
    alignSelf: 'center',
    borderColor: Colors.DEFAULT_GREEN,
    borderBottomWidth: 2,
    borderRightWidth: 2,
    borderRadius: 10,
    opacity: 0.95
  },
  toastDanger: {
    backgroundColor: Appearance.getColorScheme() == 'dark' ? Colors.DEFAULT : Colors.DEFAULT_BLACK,
    zIndex: 100,
    height: 85,
    width: '85%',
    alignSelf: 'center',
    borderColor: 'red',
    borderWidth: 2,
    borderRadius: 10,
  },

});