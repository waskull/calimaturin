import React, { useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  ToastAndroid,
  StyleSheet,
  Appearance,
} from 'react-native';

import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AntDesign from 'react-native-vector-icons/AntDesign'
import Entypo from 'react-native-vector-icons/Entypo';
import CustomButton from './../components/CustomButton';
import Colors from '../constants/Colors';
import AppInput from '../components/AppInput';
import { register } from '../utils/api';
import Toast from 'react-native-toast-message';
import DatePicker from 'react-native-date-picker';
import { validate } from '../constants/Validators';
import moment from 'moment';

const Register = ({ navigation }: { navigation: any }) => {
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [birthdate, setBirthdate] = useState<Date>(moment('1990-10-01').toDate());
  const [cedula, setCedula] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [error, setError] = useState([]);
  const [loading, setLoading] = useState<boolean>(false);

  return (
    <SafeAreaView style={{ flex: 1, justifyContent: 'center',backgroundColor: Appearance.getColorScheme() === 'dark' ? Colors.DEFAULT_BLACK : Colors.DEFAULT_WHITE }}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{ paddingHorizontal: 25 }}>
        <View style={{ alignItems: 'center' }}>

        </View>

        <Text
          style={{
            fontFamily: 'Poppins-Bold',
            fontSize:28,
            color: Colors.DEFAULT,
            marginBottom: 30,
            alignSelf: 'center',
            marginTop:20
          }}>
          Registro
        </Text>
        <View
          style={{
            flexDirection: 'row',
            borderBottomColor: Colors.DARK_FIVE,
            borderBottomWidth: 1,
            paddingBottom: 8,
            marginBottom: 25,
          }}>
          <Entypo
            name="user"
            size={20}
            color="#666"
            style={styles.textinputIcon}
          />
          <AppInput placeholder='Nombre' value={firstname} onChangeText={setFirstname} maxLength={40}></AppInput>
        </View>

        <View
          style={{
            flexDirection: 'row',
            borderBottomColor: Colors.DARK_FIVE,
            borderBottomWidth: 1,
            paddingBottom: 8,
            marginBottom: 25,
          }}>
          <Entypo
            name="user"
            size={20}
            color="#666"
            style={styles.textinputIcon}
          />
          <AppInput placeholder='Apellido' value={lastname} onChangeText={setLastname} maxLength={40}></AppInput>
        </View>

        <View
          style={{
            flexDirection: 'row',
            borderBottomColor: Colors.DARK_FIVE,
            borderBottomWidth: 1,
            paddingBottom: 8,
            marginBottom: 25,
          }}>
          <Entypo
            name="email"
            size={20}
            color="#666"
            style={styles.textinputIcon}
          />
          <AppInput placeholder='Correo' value={email} onChangeText={setEmail} maxLength={40}></AppInput>
        </View>

        <View
          style={{
            flexDirection: 'row',
            borderBottomColor: Colors.DARK_FIVE,
            borderBottomWidth: 1,
            paddingBottom: 8,
            marginBottom: 25,
          }}>
          <MaterialCommunityIcons
            name="form-textbox-password"
            size={20}
            color="#666"
            style={styles.textinputIcon}
          />
          <AppInput placeholder='Contraseña' secureTextEntry value={password} onChangeText={setPassword} maxLength={40}></AppInput>
        </View>

        <View
          style={{
            flexDirection: 'row',
            borderBottomColor: Colors.DARK_FIVE,
            borderBottomWidth: 1,
            paddingBottom: 8,
            marginBottom: 25,
          }}>
          <MaterialCommunityIcons
            name="form-textbox-password"
            size={20}
            color="#666"
            style={styles.textinputIcon}
          />
          <AppInput placeholder='Confirmar contraseña' value={password2} secureTextEntry={true} maxLength={40} onChangeText={setPassword2}></AppInput>
        </View>

        <View
          style={{
            flexDirection: 'row',
            borderBottomColor: Colors.DARK_FIVE,
            borderBottomWidth: 1,
            paddingBottom: 8,
            marginBottom: 25,
          }}>
          <AntDesign
            name="idcard"
            size={20}
            color="#666"
            style={styles.textinputIcon}
          />
          <AppInput placeholder='Cedula' value={cedula} keyboardType='number-pad' maxLength={12} onChangeText={setCedula}></AppInput>
        </View>

        <Text style={{
          fontSize: 14,
          color: Appearance.getColorScheme() === 'dark' ? Colors.DEFAULT_WHITE : Colors.DEFAULT_BLACK,
          fontFamily: 'Poppins-SemiBold',
          marginBottom: 2
        }}>
          Seleccione su fecha de nacimiento:
        </Text>

        <View
          style={{
            flexDirection: 'row',
            borderBottomColor: Colors.DARK_FIVE,
            borderBottomWidth: 1,
            paddingBottom: 8,
            marginBottom: 25,
          }}>
          <Ionicons
            name="calendar-number"
            size={20}
            color={Appearance.getColorScheme() === 'dark' ? Colors.DEFAULT_GREY : "#666"}
            style={styles.textinputIcon}
          />
          <DatePicker date={birthdate} onDateChange={setBirthdate} locale="es-VE" fadeToColor={Appearance.getColorScheme() === 'dark' ? Colors.DEFAULT_BLACK : Colors.DEFAULT_WHITE} mode="date"/>
        </View>

        <View
          style={{
            flexDirection: 'row',
            borderBottomColor: Colors.DARK_FIVE,
            borderBottomWidth: 1,
            paddingBottom: 8,
            marginBottom: 25,
          }}>
          <AntDesign
            name="phone"
            size={20}
            color="#666"
            style={styles.textinputIcon}
          />
          <AppInput placeholder='Telefono' value={phone} keyboardType='number-pad' maxLength={15} onChangeText={setPhone}></AppInput>
        </View>
          {/* <Text style={{color:'white'}}>Resultado: {validate(email) ? 'true' : 'false'}</Text> */}
        {password !== password2 && <Text style={{
          color: 'red', fontSize: 16, fontFamily: 'Poppins-Medium'
        }}>Las contraseñas no son iguales</Text>}

        <CustomButton disable={ 
          password.length < 4 ||
          firstname.length < 3 ||
          lastname.length < 3 ||
          birthdate.toString().length < 9 ||
          cedula.length < 5 ||
          phone.length <6 ||
          password != password2 ||
          !validate(email) ||
          loading
        } label={'Registrarse'} onPress={async () => {
          
          setLoading(true);
          try {
            const result = await register(email, password,birthdate,firstname,lastname,cedula,phone);
            setLoading(false);
            if (result && result.error) {
              Toast.show({
                type: 'error',
                text1: 'Ha ocurrido un error',
                text2: result.msg,
                position: 'bottom'
              });
            }
            else if(result && result.error===false){
              ToastAndroid.showWithGravity(
                result.msg,
                ToastAndroid.LONG,
                ToastAndroid.CENTER,
              );
              navigation.navigate('login')
            }
            else {
              Toast.show({
                type: 'error',
                text1: 'Error',
                text2: result.msg,
                position: 'bottom'
              });
            }
          } catch (error) {
            Alert.alert('Ocurrio un error inesperado D:');
            console.log(error);
          }

        }} />


        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            marginBottom: 30,
          }}>
          <Text style={{ color: Appearance.getColorScheme() === 'dark' ? Colors.DEFAULT_WHITE : Colors.DEFAULT_BLACK,fontFamily: 'Poppins-Medium', fontSize:15 }}>¿Ya tienes una cuenta?</Text>
          <TouchableOpacity onPress={() => {
            navigation.navigate('login')
        }}>
            <Text style={{ color: Colors.DEFAULT,fontFamily: 'Poppins-SemiBold', fontSize:16 }}> Iniciar Sesión</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};


const styles = StyleSheet.create({
  textinputIcon: {
    position: 'absolute',
    zIndex: 1,
    top: 14,
    paddingRight: 10,
    marginLeft: 5,
  }
});

export default Register;