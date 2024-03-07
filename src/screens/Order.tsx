import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Alert, Appearance, FlatList, Image, RefreshControl, StatusBar, StyleSheet, Text, ToastAndroid, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Colors from '../constants/Colors';
import { TouchableOpacity } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { statusEnum } from '../utils/Enum';
import Header from '../components/Header';
import { BASE_URL } from '../constants/url';
import CustomButton from '../components/CustomButton';
import { OrderItem } from '../components/OrderItem';
// import { BlurView } from '@react-native-community/blur';

const Order = ({ navigation, orders }: any): JSX.Element => {
  const [sales, setSales] = useState<any[]>([]);
  const [refreshing, setRefreshing] = useState(false);
  const loadData = async () => {
    setRefreshing(true);
    try {
      const res = await axios.get(`${BASE_URL}/sale/client`);
      setRefreshing(false);
      setSales(res.data);
    }
    catch (err) {
      setRefreshing(false);
      console.log(err);
    }
  }
  useEffect(() => {
    loadData();
    const interval = setInterval(async () => {
      await loadData();
    }, 30000);

    return () => {
      clearInterval(interval);
    };

  }, []);
  return (
    <SafeAreaView style={styles.container}>
      {/* <StatusBar translucent={true} barStyle={Appearance.getColorScheme() == 'dark' ? 'light-content' : 'dark-content'} backgroundColor={Appearance.getColorScheme() == 'dark' ? Colors.DEFAULT_BLACK : 'transparent'}></StatusBar>
      {Appearance.getColorScheme() == 'light' && <>
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
      <Header title='Pedidos' navigation={navigation}></Header>
      <View style={{ paddingBottom: 80 }}>


        <FlatList
          data={sales}
          ListHeaderComponent={
            <View>
              {sales.length === 0 &&
                <View style={{ alignContent: 'center', flex: 1, alignItems: 'center' }}>
                  <Text style={{ color: 'grey', fontFamily: 'Poppins-Bold', fontSize: 24 }}>Aun no has hecho ningún pedido D:</Text>
                  <CustomButton label='Ir al Dashboard' disable={false} onPress={() => { navigation.jumpTo('Dashboard'); }}></CustomButton>
                </View>
              }
            </View>
          }
          renderItem={({ item }) =>
          
            <OrderItem item={item} loadData={loadData}></OrderItem>
          }
          keyExtractor={item => item.id}
          refreshControl={<RefreshControl refreshing={refreshing}
            onRefresh={loadData} />}
        />
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    fontFamily: 'Poppins-Medium',
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
    elevation: 6,
    borderRadius: 10,
    backgroundColor: Appearance.getColorScheme() === 'dark' ? Colors.SECONDARY_BLACK : Colors.DEFAULT_BLACK,
    marginBottom: 10,
    marginHorizontal: 10,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: Appearance.getColorScheme() === 'dark' ? Colors.SECONDARY_BLACK : Colors.DEFAULT_BLACK,
  },
});


export default Order;
