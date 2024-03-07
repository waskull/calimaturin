import React, { Fragment, useState } from 'react';
import { Alert, Appearance, ScrollView, StyleSheet, Text, TouchableHighlight } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Colors from '../constants/Colors';
import AppInput from '../components/AppInput';
import { View } from 'react-native';
import Header from '../components/Header';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import MaterialIconCommunity from 'react-native-vector-icons/MaterialCommunityIcons';
import { recoveryPassword, resetPassword } from '../utils/api';
import CustomButton from '../components/CustomButton';
import { validate } from '../constants/Validators';

const Password = ({ navigation }: { navigation: any }): JSX.Element => {
  const [email, setEmail] = useState<string>('');
  const [email2, setEmail2] = useState<string>('');
  const [code, setCode] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [password2, setPassword2] = useState<string>('');
  const [send, setSend] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Appearance.getColorScheme() === 'dark' ? Colors.DEFAULT_BLACK : Colors.DEFAULT_WHITE }}>
      <ScrollView>
        <Header title='' navigation={navigation}></Header>
        {!send && <Fragment>
          <View style={{
            marginTop: 40,
            marginBottom: 20,
            marginHorizontal: 20,
            flex: 1,
          }}>
            <Text style={{
              color: Appearance.getColorScheme() === 'dark' ? Colors.DEFAULT_WHITE : Colors.DEFAULT_BLACK,
              fontSize: 35, fontFamily: 'Poppins-SemiBold',
              marginBottom: 20,
              textAlign: 'center',
            }}>
              Ingrese su correo
            </Text>

            <View
              style={{
                flexDirection: 'row',
                paddingBottom: 8,
                marginBottom: 25,
              }}>
              <Entypo
                name="email"
                size={20}
                color="black"
                style={style.textinputIcon}
              />
              <AppInput placeholder='Correo' value={email} onChangeText={setEmail}></AppInput>
            </View>

          </View>
          <View style={{
            marginHorizontal: 20,
            alignSelf: 'center',
            justifyContent: 'space-between'
          }}>
            <TouchableHighlight style={style.btn} disabled={email.length < 5 ||
              !validate(email) ||
              loading
            } onPress={async () => {
              setLoading(true);
              setEmail('');
              // if (!validate(email)) {
              //   Alert.alert("Correo inválido", "Por favor introduce un correo válido");
              //   setSend(false); return;
              // }
              const res = await recoveryPassword(email);
              setLoading(false);
              if (res.error) {
                Alert.alert("Error", res.msg); setSend(false); return;
              }
              else {
                setSend(true); setEmail2(email);
                Alert.alert("Correo de recuperación de clave enviado", res.msg);
              }
            }}>
              <Text style={{ fontSize: 20, color: Colors.DEFAULT_WHITE, fontFamily: 'Poppins-SemiBold' }}>Resetear Contraseña</Text>

            </TouchableHighlight>
            {/* {send && <View>
            <Text style={{
              color: Appearance.getColorScheme() === 'dark' ? Colors.DEFAULT_WHITE : Colors.DEFAULT_BLACK,
              fontFamily: 'Poppins-Bold',
              fontSize: 20,
              marginTop: 10,
              paddingHorizontal: 20,
              textAlign: 'justify'
            }}>Se ha enviado un correo electronico a tu correo {email2} con una nueva clave
            </Text>

          </View>
          } */}

          </View>
        </Fragment>}

        {email2 && (
          <View style={{ paddingHorizontal: 20 }}>
            <Text style={{
              color: Appearance.getColorScheme() === 'dark' ? Colors.DEFAULT_WHITE : Colors.DEFAULT_BLACK,
              fontFamily: 'Poppins-Bold',
              fontSize: 24,
              textAlign: 'justify'
            }}>Introduce el codigo que recibiste y la nueva contraseña
            </Text>
            <View
              style={{
                flexDirection: 'row',
                paddingBottom: 8,
              }}>
              <MaterialIcon
                name="abc"
                size={20}
                color={Colors.DEFAULT_BLACK}
                style={style.textinputIcon}
              />
              <AppInput placeholder='Codigo' maxLength={10} value={code} onChangeText={setCode}></AppInput>
            </View>
            <View
              style={{
                flexDirection: 'row',
                paddingBottom: 8,
              }}>
              <MaterialIconCommunity
                name="form-textbox-password"
                size={20}
                color={Colors.DEFAULT_BLACK}
                style={style.textinputIcon}
              />
              <AppInput placeholder='Nueva Contraseña' secureTextEntry={true} value={password} onChangeText={setPassword}></AppInput>
            </View>
            <View
              style={{
                flexDirection: 'row',
                paddingBottom: 8,
              }}>
              <MaterialIconCommunity
                name="form-textbox-password"
                size={20}
                color={Colors.DEFAULT_BLACK}
                style={style.textinputIcon}
              />
              <AppInput secureTextEntry={true} placeholder='Confirmar nueva contraseña' value={password2} onChangeText={setPassword2}></AppInput>
            </View>
            {/* <Text style={{color:'red', fontSize:16}}>{Math.random().toString(36).substring(2,10)}</Text> */}
            {password !== password2 && <Text style={{ color: 'red', fontSize: 16 }}>Las contraseñas no coinciden</Text>}
            {password.length < 4 && <Text style={{ color: 'red', fontSize: 16 }}>La contraseña es muy corta</Text>}
            <CustomButton label={'Actualizar Contraseña'} disable={password !== password2 || code.length < 6 || password.length < 4} onPress={async () => {
              console.log(code, password, email2);
              const res = await resetPassword(code, password, email2);
              if (res?.error) {
                Alert.alert("Error", res.msg); return;
              }
              else {
                Alert.alert("Clave reiniciada", res.msg);
                setSend(false);
                setCode('');
                setEmail('');
                setEmail2('');
                setPassword('');
                setPassword2('');
                navigation.navigate('login');
              }

            }}></CustomButton>
          </View>
        )}
      </ScrollView>
    </SafeAreaView >
  )
}

const style = StyleSheet.create({
  btn: {
    width: 340,
    height: 80,
    backgroundColor: Colors.DEFAULT,
    borderRadius: 5,
    fontFamily: 'Poppins-Bold',
    flexDirection: 'row',
    justifyContent: 'center',
    alignContent: 'center',
    marginBottom: 20,
    marginHorizontal: 10,
    textAlign: 'center',
    alignItems: 'center',
  },
  textinputIcon: {
    position: 'absolute',
    zIndex: 1,
    top: 14,
    paddingRight: 10,
    marginLeft: 5,
  },
});

export default Password;
