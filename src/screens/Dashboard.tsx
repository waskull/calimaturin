import React, { useEffect, useRef, useState } from 'react';
import { ToastAndroid, RefreshControl, Dimensions, Image, ScrollView, Text, TouchableHighlight, TouchableOpacity, View, Alert, ActivityIndicator, StyleSheet, Button, Appearance, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Colors from '../constants/Colors';
import Feather from 'react-native-vector-icons/Feather';
import { sliderData } from '../top';
import ListItem from '../components/ListItem';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import axios from 'axios';
import { IIcescream } from '../interfaces';
import Loader from '../components/Loader';
import { useAppDispatch, useAppSelector } from './../utils/hooks';
import { addItem, resetCart } from './../features/cartSlice';
import { logout } from '../features/authSlice';
import { BASE_URL } from '../constants/url';
import { Logout } from '../utils/api';
import AppInput from '../components/AppInput';
import CustomCarousel from '../components/Carousel';
// import { BlurView } from '@react-native-community/blur';
interface Item {
  title: string;
  image: string;
}
const Dashboard = ({ navigation }: { navigation: any }) => {
  const width = Dimensions.get('window').width;
  const [ice, setIce] = useState<IIcescream[]>([])
  const dispatch = useAppDispatch();
  const cart = useAppSelector((state) => state.cart.items);
  const authUser = useAppSelector((state) => state.auth.user);
  const [searchInput, setSearchInput] = useState("");
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const filterArray = () => {
    return ice.filter(item => {
      if (searchInput === "") {
        return item;
      } else if (item.name.toLowerCase().includes(searchInput.toLowerCase())) {
        return item;
      }
    });
  }

  const onImagePress = (item: Item) => {
    console.log('onImagePress', item);
  }

  const loadData = async () => {

    if (!ice.length) setLoading(true);
    try {
      const res = await axios.get(`${BASE_URL}/inventory`);
      setIce(res.data);
      setLoading(false);
      console.log("ice: ", ice);
    } catch (e) {
      setLoading(false);
      console.log(e);
    }
  }

  const checkCart = (id: number): boolean => {
    const check = ice.find(item => item.id === id);
    if (check) return true;
    return false;
  }


  useEffect(() => {
    loadData();
    const interval = setInterval(async () => {
      await loadData();
    }, 300000);

    return () => {
      clearInterval(interval);
    };

  }, []);

  return (

    <SafeAreaView style={{ flex: 1, backgroundColor: Appearance.getColorScheme() === 'dark' ? Colors.DEFAULT_BLACK : Colors.DEFAULT_WHITE }}>
      <StatusBar barStyle={Appearance.getColorScheme() == 'dark' ? 'light-content' : 'dark-content'} backgroundColor={Appearance.getColorScheme() == 'dark' ? Colors.DEFAULT_BLACK : Colors.DEFAULT_WHITE}></StatusBar>

      <ScrollView style={{ padding: 20 }} refreshControl={<RefreshControl refreshing={refreshing}
        onRefresh={loadData} />}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>

          <Text style={{ fontFamily: 'Poppins-Bold', fontSize: 24, color: Colors.DEFAULT, flexDirection: 'row' }}>Bienvenido</Text>

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
                    dispatch(resetCart());
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
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 5 }}>

          {authUser?.firstname ? (<><Text style={{ fontSize: 24, color: Appearance.getColorScheme() === 'dark' ? Colors.DEFAULT_YELLOW : Colors.DEFAULT_BLACK, fontFamily: 'Poppins-Bold' }}>{authUser?.firstname} {authUser?.lastname}</Text>

          </>
          )
            : (<Text style={{ fontSize: 16, color: Colors.DEFAULT_BLACK, fontWeight: 'bold', fontFamily: 'Poppins-Bold' }}> USERNAME </Text>)
          }


        </View>

        <View style={
          {
            flexDirection: 'row',
            borderColor: Colors.DEFAULT,
            borderRadius: 8,
          }
        }>
          <Feather name='search' size={20} color='grey' style={{ position: 'absolute', zIndex: 1, top: 14, paddingRight: 10, marginLeft: 5, }}></Feather>
          <AppInput onChangeText={setSearchInput} placeholder='Buscar helado' value={searchInput} ></AppInput>
        </View>

        <View
          style={{
            marginVertical: 10,
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <Text style={{ fontSize: 18, fontFamily: 'Poppins-SemiBold', color: Colors.DEFAULT }} >
            ¡Productos mas vendidos!
          </Text>
        </View>

        <View style={{ flex: 1, marginBottom: 10 }}>
          <CustomCarousel data={sliderData}></CustomCarousel>


        </View>
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false}>
          <View style={{ flexDirection: 'row' }}>
            {Categories.map(category => <View key={category.key}>
              <TouchableHighlight underlayColor={Colors.DEFAULT_BLACK} style={Styles.Button} onPress={() => setSearchInput(category.value)}>
                <Text style={Styles.Text}>{category.text}</Text>
              </TouchableHighlight>
            </View>
            )}

          </View>
        </ScrollView>
        {loading && <ActivityIndicator size={'large'} color={Colors.DEFAULT} />}
        {setIce?.length > 0 ?
          <View style={{ paddingBottom: 15, marginTop: 5 }}>
            {filterArray().map(item => (
              <ListItem
                key={item.id}
                image={item.image}
                price={item.price}
                name={item.name}
                lowstock={item.lowstock}
                desc={item.desc}
                wholesale_price={item.wholesale_price}
                onPress={() => {
                  dispatch(addItem(item));
                  if (!cart?.find((cartItem) => cartItem.id === item.id)) {
                    ToastAndroid.showWithGravity(`Se agrego ${item.name} al carrito`, ToastAndroid.SHORT, ToastAndroid.CENTER);
                  } else {
                    ToastAndroid.showWithGravity(
                      'Este producto ya fue agregado al carrito',
                      ToastAndroid.LONG,
                      ToastAndroid.CENTER,
                    );
                  }
                }
                }
              />

            ))}
          </View>
          : (<View>
            <Text style={{ fontSize: 24, color: Appearance.getColorScheme() === 'dark' ? Colors.DEFAULT_WHITE : Colors.DEFAULT_BLACK, fontWeight: 'bold', fontFamily: 'Poppins-Bold', paddingHorizontal: 5, alignSelf: 'center' }}>Aún no han registrado ningun helado en el sistema.</Text>
          </View>)}

      </ScrollView>

    </SafeAreaView>
  )
}


export default Dashboard;

const Styles = StyleSheet.create({
  Button: {
    marginHorizontal: 5,
    backgroundColor: Colors.DEFAULT,
    paddingVertical: 3, borderRadius: 10,
    paddingHorizontal: 10, marginBottom: 5,
    borderColor: Colors.DEFAULT_BLACK,
  },
  Text: {
    fontFamily: 'Poppins-SemiBold',
    color: 'white',
  }
});

interface Category {
  value: string;
  text: string;
  key: number;
}

const Categories: Category[] = [
  { value: '', text: 'Todos', key: 0 },
  { value: 'Polet', text: 'Poleta', key: 1 },
  { value: 'Super Cono', text: 'Super Cono', key: 2 },
  { value: 'Choco Mío', text: 'Choco Mío', key: 3 },
  { value: 'Maxi Sandwich', text: 'Maxi Sandwich', key: 4 },
  { value: 'Tinita', text: 'Tinita', key: 5 },
  { value: 'Rollo', text: 'Rollo', key: 6 },
  { value: 'Fres ', text: 'Fres', key: 7 },
  { value: 'Casero', text: 'Casero', key: 8 },
  { value: 'Helado 1L', text: 'Helado 1L', key: 9 },
  { value: 'Helado 4.7L', text: 'Helado 4.7L', key: 10 }
];