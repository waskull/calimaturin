import React, { useState, useEffect } from 'react';
import { SafeAreaView, StyleSheet, View, Text, Image, TextInput, ToastAndroid, Alert, Clipboard, TouchableHighlight, FlatList, Button, ScrollView, TouchableOpacity, Appearance, StatusBar } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Info from 'react-native-vector-icons/Ionicons';
import Colors from '../constants/Colors';
import { useAppSelector, useAppDispatch } from '../utils/hooks';
import { decrementItem, deleteItem, resetCart, increment } from './../features/cartSlice';
import { Picker } from '@react-native-picker/picker';
import { Method } from '../utils/Enum';
import { BASE_URL } from '../constants/url';
import axios from 'axios';
import { Sale, ItemSale } from '../interfaces/Sale';
import Header from '../components/Header';
import { InputText } from '../components/AppInput';
import MaterialIcons from 'react-native-vector-icons/FontAwesome6';
import Toast from 'react-native-toast-message';
import CustomButton from '../components/CustomButton';
import Modal from '../components/Modal';
import CopyIcon from 'react-native-vector-icons/Feather';

const Cart = ({ navigation }: any) => {
  const [code, setCode] = useState<string>('');
  const cart = useAppSelector((state) => state.cart.items);
  const [method, setMethod] = useState(Method.Cash);
  const [address, setAddress] = useState<string>('');
  const dispatch = useAppDispatch();
  const [subtotal, setsubTotal] = useState(0);
  const [Total, setTotal] = useState(0);
  const [visible, setModalVisible] = useState(false);


  const getTotal = () => {
    let deliveryCost: number = 0;
    let total: number = 0;
    const asd: number = Number(cart?.reduce((acc, item) => acc + item.quantity * item.price, 0));
    console.log(asd);
    setsubTotal(asd);
    console.log(subtotal);

    if (asd >= 10) {
      setTotal(Number(cart?.reduce((acc, item) => acc + item.quantity * (item.wholesale_price), 0)));
    }
    else {
      setTotal(Number(cart?.reduce((acc, item) => acc + (item.quantity * (item.price)), 0)));
    }
  }

  useEffect(() => {
    getTotal();
    console.log(cart);
    console.log(subtotal);
  }, [cart])

  const sendPetition = async (sale: Sale) => {
    try {
      const result = await axios.post(`${BASE_URL}/sale/`, sale);
      Toast.show({
        type: 'success',
        text1: 'Pedido Realizado',
        text2: 'El pedido se realizo con esto',
        position: 'bottom'
      });
      dispatch(resetCart());
      setAddress('');
      setCode('');

      navigation.jumpTo('Pagos');
    } catch (e: any) {
      if (e?.response?.data) Alert.alert('Error', e?.response?.data?.message);
      else Alert.alert('Ocurrio un error inesperado', 'D:')
    }
  }

  const CartCard = ({ item }: any) => {

    return (

      <View style={style.cartCard}>

        <Image source={{ uri: `${BASE_URL}${item?.image}` }} style={{ height: 80, width: 80, resizeMode: 'contain' }} />
        <View
          style={{
            flex: 1,
            marginLeft: 10,
            paddingHorizontal: 1
          }}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <Text style={{ fontFamily: 'Poppins-Bold', fontSize: 16, color: Colors.DEFAULT_BLACK, alignSelf: 'flex-start', flexShrink: 2 }}>{item?.name}</Text>
            <TouchableHighlight activeOpacity={0.8} style={{ position: 'relative', bottom: 0, alignSelf: 'baseline', }} onPress={() => {
              Alert.alert('AVISO', '¿Deseas eliminar este producto del carrito?', [
                {
                  text: 'Cancelar',
                  onPress: () => console.log('cancelado'),
                  style: 'cancel',
                },
                {
                  text: 'Eliminar', onPress: () => {

                    dispatch(deleteItem(item));
                    ToastAndroid.showWithGravity(
                      'Producto eliminado del carrito',
                      ToastAndroid.SHORT,
                      ToastAndroid.CENTER,
                    );
                  }
                },
              ]);
            }}>
              <MaterialIcons
                name="xmark"
                size={25}
                color="red"

                style={{}}
              />
            </TouchableHighlight>
          </View>
          <Modal desc={"Información precios"} visible={visible} setModalVisible={setModalVisible} image={`./../assets/images/delivery.jpg`} isString={false} ></Modal>

          <View style={{ flexDirection: 'row', marginBottom: 5 }}>
            <Text
              numberOfLines={1}
              style={{
                color: 'black',
                fontFamily: 'Poppins-Bold',
                fontSize: 13,
                textTransform: 'uppercase',
                borderRadius: 5,
                paddingHorizontal: 3,
                backgroundColor: Colors.DEFAULT_GREY
              }}>
              Detal: {item.price}$
            </Text>
            <Text
              numberOfLines={1}
              style={{
                marginLeft: 5,
                color: 'black',
                fontFamily: 'Poppins-Bold',
                fontSize: 13,
                textTransform: 'uppercase',
                borderRadius: 5,
                paddingHorizontal: 3,
                backgroundColor: Colors.DEFAULT_GREY
              }}>
              Mayor: {item.wholesale_price}$
            </Text>
          </View>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <TouchableHighlight style={style.miniBtn} underlayColor={Colors.DEFAULT_BLACK} activeOpacity={0.8} onPress={() => { dispatch(decrementItem(item)); }}>
              <Icon name="remove" size={30} color={Colors.DEFAULT_WHITE} />
            </TouchableHighlight>
            <Text style={{ fontWeight: 'bold', fontSize: 22, color: Colors.DEFAULT_BLACK, paddingLeft: 15, marginHorizontal: 1 }}>{item?.quantity}</Text>
            <TouchableHighlight style={style.miniBtn} underlayColor={Colors.DEFAULT_BLACK} activeOpacity={0.8} onPress={() => { dispatch(increment(item)); }}>
              <Icon name="add" size={30} color={Colors.DEFAULT_WHITE} />
            </TouchableHighlight>
            <View style={{ bottom: 20, justifyContent: 'flex-end' }}>
              {subtotal >= 10 ? (
                <Text style={{ fontWeight: 'bold', fontSize: 22, color: Colors.DEFAULT_BLACK, bottom: -15, paddingLeft: 5 }}>{(item?.quantity * item?.wholesale_price).toFixed(2)}$</Text>
              ) : (
                <Text style={{ fontWeight: 'bold', fontSize: 22, color: Colors.DEFAULT_BLACK, bottom: -15, paddingLeft: 5 }}>{(item?.quantity * item?.price).toFixed(2)}$</Text>
              )}
            </View>
          </View>
        </View>



      </View>

    );
  };

  return (
    <SafeAreaView style={{ backgroundColor: Appearance.getColorScheme() === 'dark' ? Colors.DEFAULT_BLACK : Colors.DEFAULT_WHITE, flex: 1 }}>
      <StatusBar barStyle={Appearance.getColorScheme() == 'dark' ? 'light-content' : 'dark-content'} backgroundColor={Appearance.getColorScheme() == 'dark' ? Colors.DEFAULT_BLACK : Colors.DEFAULT_WHITE}></StatusBar>
      <ScrollView>
        <Header title='Carrito' navigation={navigation}></Header>

        {cart?.length! > 0 ? (
          <View>
            <View style={{ paddingBottom: 10 }}>
              {cart?.map((item) => (
                <CartCard key={item.id} item={item} />
              )
              )}
            </View>

            <Text style={{ fontSize: 18, fontFamily: 'Poppins-SemiBold', color: Appearance.getColorScheme() === 'dark' ? Colors.DEFAULT_WHITE : Colors.DEFAULT_BLACK, marginLeft: 12 }}>Seleccione método de pago</Text>

            <Picker
              selectedValue={method}

              mode="dropdown"
              style={{
                backgroundColor: Appearance.getColorScheme() === 'dark' ? Colors.DEFAULT_GREY : Colors.SECONDARY_GREY,
                borderColor: Appearance.getColorScheme() === 'dark' ? Colors.DEFAULT_GREY : Colors.DEFAULT_BLACK,
                color: Colors.DARK_ONE,
                marginHorizontal: 10,
                fontFamily: 'Poppins-SemiBold',
                marginBottom: 12,
                borderRadius: 20,
                borderWidth: 2,
              }}

              dropdownIconColor={Colors.DEFAULT_BLACK}
              onValueChange={(value, index) =>
                setMethod(value)
              }>
              <Picker.Item label="Efectivo" value={Method.Cash} />
              <Picker.Item label="Pago Móvil" value={Method.Mobile} />
              <Picker.Item label="Transferencia" value={Method.Transfer} />
            </Picker>
            {method !== Method.Cash &&
              <View>
                <Text style={{
                  fontFamily: 'Poppins-SemiBold',
                  fontSize: 16,
                  color: Appearance.getColorScheme() === 'dark' ? Colors.DEFAULT_WHITE : Colors.DEFAULT_BLACK,
                  marginLeft: 10
                }}>Datos de pago:
                </Text>
              </View>
            }
            {method === Method.Mobile && <View>



              <View style={{ flex: 1 }}>
                <Text style={Appearance.getColorScheme() === 'dark' ? style.Text2Dark : style.Text2}>Número de pago móvil:
                  <Text style={style.Text}> 04249053765</Text>
                  <TouchableHighlight onPress={(() => {
                    Clipboard.setString('04249053765')
                  })} activeOpacity={0.9} underlayColor={Colors.DEFAULT_GREY}>
                    <CopyIcon
                      name="copy"
                      size={20}
                      color={Appearance.getColorScheme() === 'dark' ? 'red' : Colors.SECONDARY_RED}

                      style={{ fontWeight: 'bold', marginHorizontal: 5 }}
                    />
                  </TouchableHighlight>
                </Text>
              </View>

              <Text style={Appearance.getColorScheme() === 'dark' ? style.Text2Dark : style.Text2}>Cédula:
                <Text style={style.Text}> 22618265</Text>
                <TouchableHighlight onPress={(() => {
                  Clipboard.setString('22618265')
                })} activeOpacity={0.9} underlayColor={Colors.DEFAULT_GREY}>
                  <CopyIcon
                    name="copy"
                    size={20}
                    color={Appearance.getColorScheme() === 'dark' ? 'red' : Colors.SECONDARY_RED}

                    style={{ fontWeight: 'bold', marginHorizontal: 5 }}
                  />
                </TouchableHighlight>
              </Text>
              <Text style={{
                color: Appearance.getColorScheme() === 'dark' ? Colors.DEFAULT_WHITE : Colors.DARK_ONE,
                marginHorizontal: 20,
                fontFamily: 'Poppins-SemiBold',
              }}>Banco:
                <Text style={{
                  color: Appearance.getColorScheme() === 'dark' ? 'red' : Colors.DEFAULT_RED,
                  marginHorizontal: 20,
                  fontFamily: 'Poppins-SemiBold',
                }}> Banco de Venezuela
                </Text>
              </Text>
              <InputText placeholder='Últimos 4 dígitos' keyboardType='number-pad' value={code} onChangeText={setCode} maxLength={4}></InputText>
            </View>
            }



            {method === Method.Transfer &&
              <View style={{ flex: 1 }}>
                <Text style={Appearance.getColorScheme() === 'dark' ? style.Text2Dark : style.Text2}>Cuenta:
                  <Text style={{
                    color: Colors.DEFAULT,
                    fontFamily: 'Poppins-SemiBold',
                  }}> 01020614610000170972
                  </Text>
                  <TouchableHighlight activeOpacity={0.9} underlayColor={Colors.DEFAULT_GREY} onPress={() => { Clipboard.setString('01020614610000170972') }}>
                    <CopyIcon
                      name="copy"
                      size={20}
                      color={Appearance.getColorScheme() === 'dark' ? 'red' : Colors.SECONDARY_RED}

                      style={{ fontWeight: 'bold', marginHorizontal: 5 }}
                    />
                  </TouchableHighlight>
                </Text>
                <Text style={Appearance.getColorScheme() === 'dark' ? style.Text2Dark : style.Text2}>Cédula:
                  <Text style={style.Text}> 22618265</Text>
                  <TouchableHighlight style={{ marginHorizontal: 20 }} onPress={(() => {
                    Clipboard.setString('22618265')
                  })} activeOpacity={0.9} underlayColor={Colors.DEFAULT_GREY}>
                    <CopyIcon
                      name="copy"
                      size={20}
                      color={Appearance.getColorScheme() === 'dark' ? 'red' : Colors.SECONDARY_RED}

                      style={{ fontWeight: 'bold', marginHorizontal: 5 }}
                    />
                  </TouchableHighlight>
                </Text>
                <Text style={{
                  color: Appearance.getColorScheme() === 'dark' ? Colors.DEFAULT_WHITE : Colors.DARK_ONE,
                  marginHorizontal: 20,
                  fontFamily: 'Poppins-SemiBold',
                }}>Banco:
                  <Text style={{
                    color: Appearance.getColorScheme() === 'dark' ? 'red' : Colors.DEFAULT_RED,
                    marginHorizontal: 20,
                    fontFamily: 'Poppins-SemiBold',
                  }}> Banco de Venezuela
                  </Text>
                </Text>

                <InputText placeholder='Últimos 4 dígitos' value={code} keyboardType='number-pad' onChangeText={setCode} maxLength={4}></InputText>
              </View>
            }
            <InputText placeholder='Dirección de destino' value={address} keyboardType='ascii-capable' onChangeText={setAddress} maxLength={200}></InputText>
            <View style={{ marginHorizontal: 15 }}>
              {subtotal >= 10 ? (
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'flex-end',
                    marginTop: 15,
                  }}>
                  <TouchableHighlight activeOpacity={0.8} underlayColor={Colors.DEFAULT_GREY} style={{ marginRight: 3 }} onPress={() => {
                    setModalVisible(true);
                  }}>
                    <Info
                      name="information-circle"
                      size={28}
                      color={Colors.DEFAULT}

                      style={{}}
                    />
                  </TouchableHighlight>
                  <Text style={{ fontSize: 18, fontFamily: 'Poppins-Bold', color: Appearance.getColorScheme() === 'dark' ? Colors.DEFAULT_WHITE : Colors.DEFAULT_BLACK, marginRight: 3 }}>
                    Precio al
                  </Text>
                  <Text style={{ paddingHorizontal: 5, textAlign: 'center', fontSize: 18, fontFamily: 'Poppins-Bold', color: Colors.DEFAULT_WHITE, backgroundColor: 'red', borderRadius: 8 }}>
                    Mayor:
                  </Text>
                </View>
              ) : (
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'flex-end',
                    marginTop: 15,
                  }}>
                  <TouchableHighlight underlayColor={Colors.DEFAULT_GREY} activeOpacity={0.8} style={{ paddingHorizontal: 5 }} onPress={() => {
                    setModalVisible(true);
                  }}>
                    <Info
                      name="information-circle"
                      size={28}
                      color={Colors.DEFAULT}

                      style={{}}
                    />
                  </TouchableHighlight>
                  <Text style={{ fontSize: 18, fontFamily: 'Poppins-Bold', color: Appearance.getColorScheme() === 'dark' ? Colors.DEFAULT_WHITE : Colors.DEFAULT_BLACK, marginRight: 3 }}>
                    Precio al
                  </Text>
                  <Text style={{ paddingHorizontal: 5, textAlign: 'center', fontSize: 18, fontFamily: 'Poppins-Bold', color: Colors.DEFAULT_WHITE, backgroundColor: 'red', borderRadius: 8 }}>
                    Detal:
                  </Text>
                </View>
              )}
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  marginTop: 15,
                }}>
                <Text style={{ fontSize: 18, fontFamily: 'Poppins-SemiBold', color: Appearance.getColorScheme() === 'dark' ? Colors.DEFAULT_WHITE : Colors.DEFAULT_BLACK }}>
                  Precio Sub-Total:
                </Text>
                <Text style={{ fontSize: 20, color: Appearance.getColorScheme() === 'dark' ? Colors.DEFAULT_WHITE : Colors.DEFAULT_BLACK, fontFamily: 'Poppins-Bold' }}>{(Total).toFixed(2)}$</Text>

              </View>

              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  marginBottom: 0,
                }}>
                <Text style={{ fontSize: 18, fontFamily: 'Poppins-SemiBold', color: Appearance.getColorScheme() === 'dark' ? Colors.DEFAULT_WHITE : Colors.DEFAULT_BLACK }}>
                  Delivery:
                </Text>
                {Total >= 60 ? (
                  <Text style={{ fontSize: 20, color: Appearance.getColorScheme() === 'dark' ? Colors.DEFAULT_WHITE : Colors.DEFAULT_BLACK, fontFamily: 'Poppins-Bold' }}>0.00$</Text>
                ) : Total >= 30 ? (
                  <Text style={{ fontSize: 20, color: Appearance.getColorScheme() === 'dark' ? Colors.DEFAULT_WHITE : Colors.DEFAULT_BLACK, fontFamily: 'Poppins-Bold' }}>2.00$</Text>
                ) : (
                  <Text style={{ fontSize: 20, color: Appearance.getColorScheme() === 'dark' ? Colors.DEFAULT_WHITE : Colors.DEFAULT_BLACK, fontFamily: 'Poppins-Bold' }}>4.00$</Text>
                )}
              </View>

              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  marginBottom: 15,
                }}>
                <Text style={{ fontSize: 18, fontFamily: 'Poppins-SemiBold', color: Appearance.getColorScheme() === 'dark' ? Colors.DEFAULT_WHITE : Colors.DEFAULT_BLACK }}>
                  Precio Total:
                </Text>
                {Total >= 60 ? (
                  <Text style={{ fontSize: 20, color: Appearance.getColorScheme() === 'dark' ? Colors.DEFAULT_WHITE : Colors.DEFAULT_BLACK, fontFamily: 'Poppins-Bold' }}>{(Total).toFixed(2)}$</Text>
                ) : Total >= 30 ? (
                  <Text style={{ fontSize: 20, color: Appearance.getColorScheme() === 'dark' ? Colors.DEFAULT_WHITE : Colors.DEFAULT_BLACK, fontFamily: 'Poppins-Bold' }}>{(Total + 2).toFixed(2)}$</Text>
                ) : (
                  <Text style={{ fontSize: 20, color: Appearance.getColorScheme() === 'dark' ? Colors.DEFAULT_WHITE : Colors.DEFAULT_BLACK, fontFamily: 'Poppins-Bold' }}>{(Total + 4).toFixed(2)}$</Text>
                )}
              </View>
            </View>

            <View style={{
              marginHorizontal: 30, alignSelf: 'center', flexDirection: 'row',
              justifyContent: 'space-between',
            }}>

              <TouchableHighlight style={(code.length !== 4 && method !== Method.Cash) || (method !== Method.Cash && !Number.isInteger(Number(code))) || address.length < 2 ? style.disabledButton : style.actionBtn}
                activeOpacity={0.8} disabled={address?.length < 2 || (method !== Method.Cash && code?.length !== 4) || (method !== Method.Cash && !Number.isInteger(Number(code)))}
                onPress={() => {

                  if (cart!?.length < 1) { Alert.alert('Selecciona un producto', 'debes de agregar al menos un producto al carrito antes de realizar el pedido'); return; }
                  let pay_code: string[] = [code];
                  const icecreams: ItemSale[] = [];
                  cart?.forEach(e => {
                    icecreams.push({ id: e.id, quantity: e.quantity });
                  });

                  sendPetition({
                    items: icecreams,
                    pay_code: pay_code,
                    paymentMethod: method,
                    address: address
                  });
                }}>
                <Text style={{ fontSize: 23, color: Colors.DEFAULT_WHITE, fontFamily: 'Poppins-SemiBold' }}>Realizar Pedido</Text>
              </TouchableHighlight>
            </View>
          </View>
        ) : (
          <View style={{ alignContent: 'center', flex: 1, alignItems: 'center' }}>
            <Text style={{ color: 'grey', fontFamily: 'Poppins-Bold', fontSize: 24 }}>Aun no has agregado ningún producto D:</Text>
            <CustomButton label='Ir al Dashboard' disable={false} onPress={() => { navigation.jumpTo('Dashboard'); }}></CustomButton>
          </View>
        )}

      </ScrollView>
    </SafeAreaView>
  );
};

const style = StyleSheet.create({
  title: { color: Colors.DEFAULT_WHITE, fontWeight: 'bold', fontSize: 18, alignSelf: 'center' },
  btnContainer: {
    backgroundColor: Colors.DEFAULT,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cartCard: {
    elevation: 15,
    borderRadius: 10,
    backgroundColor: Colors.DEFAULT_WHITE,
    marginBottom: 10,
    marginHorizontal: 10,
    paddingHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  miniBtn: {
    width: 40,
    height: 30,
    marginBottom: 5,
    backgroundColor: Colors.DEFAULT,
    borderRadius: 5,
    marginRight: -20,
    flexDirection: 'row',
    justifyContent: 'center',
    alignContent: 'center',
  },
  actionBtn: {
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
  disabledButton: {
    width: 340,
    height: 80,
    backgroundColor: Colors.DEFAULT_GREY,
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
  Text: {
    color: Colors.DEFAULT,
    marginHorizontal: 20,
    fontFamily: 'Poppins-SemiBold',
  },
  Text2: {
    color: Colors.DARK_ONE,
    marginHorizontal: 20,
    fontFamily: 'Poppins-SemiBold',
  },
  TextDark: {
    color: Colors.DEFAULT,
    marginHorizontal: 20,
    fontFamily: 'Poppins-SemiBold',
  },
  Text2Dark: {
    color: Colors.DEFAULT_WHITE,
    marginHorizontal: 20,
    fontFamily: 'Poppins-SemiBold',
  }
});

export default Cart;
