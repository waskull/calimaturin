import React, { Fragment, useEffect, useState } from 'react'
import { BASE_URL } from '../constants/url';
import { Logout } from '../utils/api';
import { logout } from '../features/authSlice';
import { useAppDispatch, useAppSelector } from './../utils/hooks';
import { ToastAndroid, ScrollView, Text, Linking, TouchableOpacity, View, Alert, SafeAreaView, StyleSheet, Appearance, RefreshControl, StatusBar, ActivityIndicator } from 'react-native';
import axios from 'axios';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Feather from 'react-native-vector-icons/Feather';
import Colors from '../constants/Colors';
import { statusEnum } from '../utils/Enum';
// import { BlurView } from '@react-native-community/blur';
const Delivery = ({ navigation }: { navigation: any }) => {
  const authUser = useAppSelector((state) => state.auth.user);
  const [delivery, setDelivery] = useState<any[]>([]);
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const dispatch = useAppDispatch();

  const loadData = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${BASE_URL}/sale/delivery`);
      setDelivery(res.data);
      setLoading(false);
      console.log("delivery: ", delivery);
    } catch (err) {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadData();
    const interval = setInterval(async () => {
      await loadData();
    }, 20000);
    return () => {
      clearInterval(interval);
    };
  }, []);
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle={Appearance.getColorScheme() == 'dark' ? 'light-content' : 'dark-content'} backgroundColor={Appearance.getColorScheme() == 'dark' ? Colors.DEFAULT_BLACK : Colors.DEFAULT_WHITE}></StatusBar>
      <ScrollView showsVerticalScrollIndicator={false} style={{ padding: 2 }}  refreshControl={<RefreshControl refreshing={refreshing}
        onRefresh={loadData} />}>

        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <Text style={{ fontFamily: 'Poppins-Bold', fontSize: 30, color: Colors.DEFAULT, flexDirection: 'row' }}>Bienvenido</Text>
          <TouchableOpacity style={{ marginTop: 10 }} onPress={() => {
            try {
              Alert.alert('AVISO', '¿Deseas cerrar sesión?', [
                {
                  text: 'Cancelar',
                  onPress: () => console.log('cancelado'),
                  style: 'cancel',
                },
                {
                  text: 'Cerrar Sesión', onPress: async () => {
                    dispatch(logout());
                    await Logout();
                    ToastAndroid.showWithGravity(
                      'Sesión Cerrada',
                      ToastAndroid.SHORT,
                      ToastAndroid.CENTER,
                    );
                    navigation.navigate('home')
                  }
                },
              ]);

            }
            catch {
              ToastAndroid.showWithGravity(
                'Error en el cierre de sesión',
                ToastAndroid.LONG,
                ToastAndroid.CENTER,
              );
            }
          }
          }>
            <MaterialIcons
              name="logout"
              size={30}
              color="red"

              style={{ fontWeight: 'bold', marginRight: 5 }}
            />
          </TouchableOpacity>
        </View>
        <View style={{ marginBottom: 5 }}>

          {authUser?.firstname ? (<>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 1 }}>
              <Text style={{ fontSize: 24, color: Appearance.getColorScheme() === 'dark' ? Colors.DEFAULT_YELLOW : Colors.DEFAULT_BLACK, fontFamily: 'Poppins-Bold' }}>{authUser?.firstname} {authUser?.lastname}</Text>
              <Text style={{ fontSize: 18, color: Appearance.getColorScheme() === 'dark' ? 'red' : Colors.DEFAULT_RED, fontFamily: 'Poppins-Bold' }}>{authUser?.roles?.toString().toUpperCase()}</Text>
            </View>
          </>
          )
            : (
              <>
                <Text style={{ fontSize: 24, color: Appearance.getColorScheme() === 'dark' ? Colors.DEFAULT_WHITE : Colors.DEFAULT_BLACK, fontWeight: 'bold', fontFamily: 'Poppins-Bold' }}> USERNAME </Text>
                <Text style={{ fontSize: 16, color: Appearance.getColorScheme() === 'dark' ? Colors.DEFAULT_WHITE : Colors.DEFAULT_BLACK, fontWeight: 'bold', fontFamily: 'Poppins-Bold' }}> ROL </Text>
              </>
            )
          }
        </View>



        <View style={{  }}>

          {loading && <View>
            <ActivityIndicator color={Colors.DEFAULT} size="large"></ActivityIndicator>
          </View>
          }
          <View style={{  }}>
            {delivery?.length > 0 ?
              <View>
                <View>
                  <Text style={{ fontSize: 16, color: Appearance.getColorScheme() === 'dark' ? Colors.DEFAULT_WHITE : Colors.DEFAULT_BLACK, fontFamily: 'Poppins-Bold', marginLeft: 12 }}> Pedidos por entregar</Text>
                </View>
                {delivery.map((item => (
                   <View style={styles.cartCard} key={item.id}>

                          <View style={{ justifyContent: 'space-between', flexDirection: 'row' }}>
                            <Text style={{ fontWeight: 'bold', marginLeft: 5, fontSize: 20, color: Colors.DEFAULT_WHITE, fontFamily: 'Poppins-Bold', paddingRight: 10 }}>Código de pedido: #{item.id}</Text>
                            <TouchableOpacity style={{ marginTop: 5 }} onPress={() => {
                              const phone = item.user.phone;
                              const phoneNumber = `tel:${phone}`;
                              if (phone) { Linking.openURL(phoneNumber); }
                            }
                            }>
                              <Feather
                                name="phone-call"
                                size={20}
                                color={Colors.DEFAULT_YELLOW}
     
                                style={{ fontWeight: 'bold', marginRight: 0 }}
                              />
                            </TouchableOpacity>
                            <TouchableOpacity style={{ marginTop: 5 }} onPress={() => {
     
                              try {
                                Alert.alert('ALERTA', '¿Deseas confirmar la entrega de este pedido?', [
                                  {
                                    text: 'Cancelar',
                                    onPress: () => console.log('cancelado'),
                                    style: 'cancel',
                                  },
                                  {
                                    text: 'Confirmar Entrega', onPress: async () => {
                                      console.log(item);
                                      const res = await axios.patch(`${BASE_URL}/sale/complete/${item.id}`);
                                      await loadData();
                                      ToastAndroid.showWithGravity(
                                        'Pedido eliminado',
                                        ToastAndroid.LONG,
                                        ToastAndroid.CENTER,
                                      );
                                    }
                                  },
                                ]);
     
                              }
                              catch (e) {
                                Alert.alert('Error al eliminar el item');
                                console.log(e);
                              }
                            }
                            }>
                              <MaterialCommunityIcons
                                name="truck-delivery"
                                size={20}
                                color={Colors.DEFAULT_YELLOW}
     
                                style={{ fontWeight: 'bold', marginRight: 5 }}
                              />
                            </TouchableOpacity>
     
     
                          </View>
                          <View >
                            {item.sale_items.map(({ id, item, quantity }: any) =>
     
                              <Text style={{ fontSize: 17, marginLeft: 10, fontFamily: 'Poppins-SemiBold', color: Colors.DEFAULT_WHITE }} key={id}>• {item.name} x {quantity}</Text>
     
                            )}</View>
                          <View>
                            <View style={{ flexDirection: 'row', flex: 1 }}>
                              <Text style={{ fontSize: 15, marginLeft: 5, fontFamily: 'Poppins-SemiBold', color: Colors.DEFAULT_WHITE }}>ESTADO:</Text>
                              <Text style={{ fontSize: 16, marginLeft: 3, paddingRight: 60, fontFamily: 'Poppins-SemiBold', color: item.status === statusEnum.INCOMPLETE ? 'orange' : item?.status === statusEnum.WAITING ? 'cyan' : item.status === statusEnum.COMPLETED ? Colors.DEFAULT_GREEN : Colors.DEFAULT_RED, textTransform: 'uppercase' }}>{item.status}</Text>
                            </View>
                            <View style={{ flexDirection: 'row', flex: 1 }}>
                              <Text style={{ marginTop: 2, fontSize: 14, marginLeft: 5, fontFamily: 'Poppins-SemiBold', color: Colors.DEFAULT_WHITE }}>Cliente:</Text>
                              <Text style={{ fontSize: 16, marginLeft: 4, fontFamily: 'Poppins-Bold', color: Colors.DEFAULT_WHITE, paddingRight: 75 }}>{item?.user?.firstname} {item?.user?.lastname}</Text>
                            </View>
                            <View style={{ flexDirection: 'row', flex: 1 }}>
                              <Text style={{ marginTop: 2, fontSize: 14, marginLeft: 5, fontFamily: 'Poppins-SemiBold', color: Colors.DEFAULT_WHITE }}>Dirección:</Text>
                              <Text style={{ fontSize: 16, marginLeft: 4, fontFamily: 'Poppins-Bold', color: Colors.DEFAULT_WHITE, paddingRight: 75 }}>{item?.address}</Text>
                            </View>
                            <View style={{ flexDirection: 'row', flex: 1 }}>
                              <Text style={{ marginTop: 5, fontSize: 14, marginLeft: 5, fontFamily: 'Poppins-SemiBold', color: Colors.DEFAULT_WHITE }}>Método de pago: {item?.paymentMethod}</Text>
                            </View>
                            <View style={{ flexDirection: 'row', flex: 1, justifyContent: 'space-between' }}>
                              <Text style={{ marginTop: 5, fontSize: 20, marginLeft: 5, fontFamily: 'Poppins-SemiBold', color: Colors.DEFAULT_WHITE }}>Total:</Text>
                              <Text style={{ fontSize: 25, marginLeft: 10, fontFamily: 'Poppins-Bold', color: Colors.DEFAULT_WHITE }}>{item?.total}$</Text>
                            </View>
                          </View>
                        </View>
                )))}
                <View style={{
                  paddingBottom: 10
                }}></View>
              </View>

                
              : (
                <Text style={{ fontSize: 24, color: Appearance.getColorScheme() === 'dark' ? Colors.DEFAULT_WHITE : Colors.DEFAULT_BLACK, fontWeight: 'bold', fontFamily: 'Poppins-Bold', paddingHorizontal: 5, alignSelf: 'center' }}>No tienes pedidos por entregar.</Text>
              )
            }
          </View>



        </View>

      </ScrollView>

    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    fontFamily: 'Poppins-Medium',
    padding: 10,
    backgroundColor: Appearance.getColorScheme() === 'dark' ? Colors.DEFAULT_BLACK : Colors.DEFAULT_WHITE
  },

  item: {
    backgroundColor: Colors.DEFAULT_YELLOW,
    padding: 20,
    marginVertical: 8,
    color: 'black',
    marginHorizontal: 8,
  },
  header: {
    paddingVertical: 20,
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 20,
  },
  title: {
    fontSize: 18,
  },
  cartCard: {
    height: 'auto',
    elevation: 7,
    borderRadius: 10,
    backgroundColor: Appearance.getColorScheme() === 'dark' ? Colors.SECONDARY_BLACK : Colors.DEFAULT_BLACK,
    marginBottom: 16,
    marginHorizontal: 10,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: Appearance.getColorScheme() === 'dark' ? Colors.SECONDARY_BLACK : Colors.DEFAULT_BLACK,
  },
  contentWrap: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
});

export default Delivery