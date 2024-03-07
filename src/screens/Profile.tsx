import React, { useEffect, useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  Alert,
  ToastAndroid,
  StyleSheet,
  Appearance,
  Text,
  TouchableOpacity
} from 'react-native';

import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AntDesign from 'react-native-vector-icons/AntDesign'
import Entypo from 'react-native-vector-icons/Entypo';
import CustomButton from './../components/CustomButton';
import axios from 'axios';
import Header from '../components/Header';
import AppInput, { DisabledInput } from '../components/AppInput';
import { useAppDispatch, useAppSelector } from './../utils/hooks';
import { BASE_URL } from '../constants/url';
import { setUser } from '../features/authSlice';
import Colors from '../constants/Colors';
import DatePicker from 'react-native-date-picker';
import yyyymmdd from '../constants/General';
import moment from 'moment';

const Profile = ({ navigation }: { navigation: any }) => {
  const authUser = useAppSelector((state) => state.auth.user);
  const [firstname, setFirstname] = useState(authUser?.firstname || '');
  const [lastname, setLastname] = useState(authUser?.lastname || '');
  const [birthdate, setBirthdate] = useState<Date>(moment(authUser?.birthdate).toDate());
  const [open, setOpen] = useState(false)
  const [cedula, setCedula] = useState(authUser?.cedula || '');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');
  const [email, setEmail] = useState(authUser?.email || '');
  const [phone, setPhone] = useState(authUser?.phone || '');
  const [error, setError] = useState([]);
  const [loading, setLoading] = useState<boolean>(false);
  const dispatch = useAppDispatch();

  const updateProfile = async () => {
    setLoading(true);
    try {
      setError([]);
      const result = await axios.patch(`${BASE_URL}/user/profile`, { firstname, lastname, cedula, password, birthdate: yyyymmdd(birthdate), phone });

      await dispatch(setUser({
        firstname: firstname,
        lastname: lastname,
        birthdate: yyyymmdd(birthdate),
        cedula: cedula,
        phone: phone,
      }));
      setPassword('');
      setPassword2('');
      setLoading(false);
      ToastAndroid.showWithGravity(
        'Datos Actualizados',
        ToastAndroid.LONG,
        ToastAndroid.CENTER,
      );
      navigation.jumpTo('Dashboard');
    }

    catch (e: any) {
      setLoading(false);
      console.log("error: ", e.response?.data?.message);
      if (e.response?.data?.message) {
        Alert.alert(e.response?.data?.message);
      }
      console.log(e);
    }
  }

  return (
    <SafeAreaView style={{ flex: 1, justifyContent: 'center', backgroundColor: Appearance.getColorScheme() === 'dark' ? Colors.DEFAULT_BLACK : Colors.DEFAULT_WHITE }}>
      <Header navigation={navigation} title="Editar perfil"></Header>

      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{ paddingHorizontal: 25 }}>

        <View
          style={{
            flexDirection: 'row',
            borderBottomColor: '#ccc',
            borderBottomWidth: 1,
            paddingBottom: 8,
            marginBottom: 25,

          }}>
          <Entypo
            name="user"
            size={20}
            color="#666"
            style={styles.icon}
          />
          <AppInput placeholder='Nombre' value={firstname} onChangeText={setFirstname} maxLength={40}></AppInput>

        </View>

        <View
          style={styles.view}>
          <Entypo
            name="user"
            size={20}
            color="#666"
            style={styles.icon}
          />
          <AppInput placeholder='Apellido' value={lastname} onChangeText={setLastname} maxLength={40}></AppInput>
        </View>

        <View
          style={styles.view}>
          <Entypo
            name="email"
            size={20}
            color="#666"
            style={styles.icon}
          />
          <DisabledInput placeholder='Correo' editable={false} underlineColorAndroid='transparent' value={email}></DisabledInput>
        </View>

        <View
          style={styles.view}>
          <MaterialCommunityIcons
            name="form-textbox-password"
            size={20}
            color="#666"
            style={styles.icon}
          />
          <AppInput placeholder='Contraseña' value={password} secureTextEntry={true} maxLength={40} onChangeText={setPassword}></AppInput>
        </View>
        <View
          style={styles.view}>
          <MaterialCommunityIcons
            name="form-textbox-password"
            size={20}
            color="#666"
            style={styles.icon}
          />
          <AppInput placeholder='Confirmar contraseña' value={password2} secureTextEntry={true} maxLength={40} onChangeText={setPassword2}></AppInput>
        </View>
        <View
          style={styles.view}>
          <AntDesign
            name="idcard"
            size={20}
            color="#666"
            style={styles.icon}
          />
          <AppInput placeholder='Cedula' value={cedula} keyboardType='number-pad' maxLength={10} onChangeText={setCedula}></AppInput>
        </View>

        <Text style={{
          fontSize: 14,
          color: Appearance.getColorScheme() === 'dark' ? Colors.DEFAULT_WHITE : Colors.DEFAULT_BLACK,
          fontFamily: 'Poppins-SemiBold',
          marginBottom: 2
        }}>
          Fecha de nacimiento: {moment(birthdate).format('YYYY-MM-DD').toString()}
        </Text>
        <View

          style={[{
            flexDirection: 'row',

          }, styles.view]}>
          <Ionicons
            name="calendar-number"
            size={20}
            color={Appearance.getColorScheme() === 'dark' ? Colors.DEFAULT_GREY : "#666"}
            style={[{
              verticalAlign: 'middle',
              zIndex: 1,
              
              paddingRight: 1,
              marginLeft: 5,
            }]}
          />
          <DatePicker
            modal
            open={open}
            date={birthdate}
            locale='es-VE'
            mode="date"
            title="Selecciona tu fecha de nacimiento"
            confirmText='Confirmar'
            cancelText='Cancelar'
            onConfirm={(birthdate) => {
              setOpen(false)
              setBirthdate(birthdate)
            }}
            onCancel={() => {
              setOpen(false)
            }}
          />
          <TouchableOpacity style={{ flex: 1 }} activeOpacity={0.8} onPress={() => {
            setOpen(true);
          }}>
            <View style={styles.btnContainer}>
              <Text style={styles.title}>Cambiar fecha de nacimiento</Text>
            </View>
          </TouchableOpacity>
          {/* <DatePicker date={birthdate} onDateChange={setBirthdate} locale="es-VE" mode="date" fadeToColor={Appearance.getColorScheme() === 'dark' ? Colors.DEFAULT_BLACK : Colors.DEFAULT_WHITE} /> */}
        </View>

        <View
          style={styles.view}>
          <AntDesign
            name="phone"
            size={20}
            color="#666"
            style={styles.icon}
          />
          <AppInput placeholder='Telefono' value={phone} keyboardType='number-pad' maxLength={15} onChangeText={setPhone}></AppInput>

        </View>


        {password !== password2 && <Text style={{
          color: 'red', fontSize: 16, fontFamily: 'Poppins-Medium'
        }}>Las contraseñas no son iguales</Text>}



        <CustomButton label={'Actualizar perfil'} disable={
          password.length < 4 ||
          firstname.length < 3 ||
          lastname.length < 3 ||
          birthdate.toString().length < 9 ||
          cedula.length < 7 ||
          phone.length < 6 ||
          password != password2 ||
          loading
        } onPress={() => { updateProfile(); }} />

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            marginBottom: 30,
          }}>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  view: {
    flexDirection: 'row',
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
    paddingBottom: 8,
    marginBottom: 25,
  },
  icon: {
    position: 'absolute',
    zIndex: 1,
    top: 14,
    paddingRight: 10,
    marginLeft: 5,
  },
  title: { color: Colors.DEFAULT_WHITE, fontSize: 14, fontFamily: 'Poppins-Medium' },
  btnContainer: {
    backgroundColor: Colors.DEFAULT,
    padding: 5,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    alignContent: 'center',

  },
});

export default Profile;