import React, { useEffect, useState } from 'react';
import Order from './Order';
import Dashboard from './Dashboard';
import Cart from './Cart';
import Profile from './Profile';
import Feather from 'react-native-vector-icons/Feather';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Colors from '../constants/Colors';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';
import { useAppSelector } from '../utils/hooks';
import { Appearance, SafeAreaView, Text } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { BASE_URL } from '../constants/url';
import axios from 'axios';

const Tab = createMaterialTopTabNavigator();
const Tabs = (): JSX.Element => {
  const cart = useAppSelector((state) => state.cart.items);
  const [sales, setSales] = useState<any[]>([]);

  const loadData = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/sale/client`);
      setSales(res.data);
    }
    catch (err) {
      console.log(err);
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

    
      <Tab.Navigator tabBarPosition='bottom' screenOptions={{
        tabBarActiveTintColor: Colors.DEFAULT_YELLOW,
        tabBarInactiveTintColor: '#fff',
        tabBarStyle: {
          backgroundColor: Appearance.getColorScheme() === 'dark' ? Colors.SECONDARY_BLACK : Colors.DEFAULT_BLACK,
          borderRadius:16,
          right:16,
          left:16,
          bottom:16,
          height:60,
        },
        tabBarPressColor: Colors.DEFAULT,
        tabBarIndicatorStyle:{
          backgroundColor:Colors.DEFAULT_YELLOW
        },
        tabBarShowLabel: false,
        swipeEnabled:true,
      }}>
        <Tab.Screen name="Dashboard" component={Dashboard}
          options={({ route }) => ({
            tabBarStyle: {
              display: getTabBarVisibility(route),
              optimizationsEnabled:true,
              backgroundColor: Appearance.getColorScheme() === 'dark' ? Colors.DEFAULT_BLACK : Colors.DEFAULT_BLACK, tabBarBadge: 4,

            },
            tabBarIcon: ({ color, focused }) => (

              <Feather size={25} name='home' color={color} />
            ),
          })}

        />
        <Tab.Screen name="Carrito" component={Cart}
          options={{
            
            tabBarStyle: {
              backgroundColor: Colors.DEFAULT_BLACK,
            },
            tabBarBadge: () => {
              return (
                <Text style={{
                  fontSize: 18, 
                  fontFamily:'Poppins-Medium',
                  color: Colors.DEFAULT_WHITE, 
                  backgroundColor: Colors.DEFAULT_RED, 
                  borderRadius: 10, 
                  width: 20,
                  height: 30,
                  padding: 0,
                  right: 20,
                  bottom:5,
                  textAlign:'center'
                }}>{cart?.length}
                </Text>)
            },
            tabBarIcon: ({ color, focused }) => (
              <Feather size={25} name='shopping-bag' color={color} />
            )
          }} />
        <Tab.Screen name="Pagos" component={Order} options={{
          tabBarStyle: {

            backgroundColor: Colors.DEFAULT_BLACK,

          },
          tabBarIcon: ({ color, focused }) => (
            <MaterialIcons size={25} name='request-page' color={color} />
          )
        }} />
        <Tab.Screen name="Perfil" component={Profile} options={{
          tabBarStyle: {
            backgroundColor: Colors.DEFAULT_BLACK,
          },
          tabBarIcon: ({ color, focused }) => (
            <MaterialIcons size={25} name='group' color={color} />
          )
        }} />

      </Tab.Navigator>
  )

}

const getTabBarVisibility = (route: any) => {
  const routeName = getFocusedRouteNameFromRoute(route);
  // console.log(route);
  if (routeName == 'Carrito') {
    return 'none';
  }
  return 'flex';
};

export default Tabs;
