import React, { lazy, useState } from 'react';
import { View, Text, Image, TouchableOpacity, Appearance, StatusBar } from 'react-native';
import { windowWidth } from './../utils/Display';
import { Icecream } from '../interfaces/';
import Colors from '../constants/Colors';
import Icon from 'react-native-vector-icons/FontAwesome6';
import { BASE_URL } from '../constants/url';
import Modal from './Modal';
import { StyleSheet } from 'react-native';

export default function ListItem({ image, name, lowstock, price, onPress, desc, wholesale_price }: Icecream) {
  const [visible, setModalVisible] = useState(false);

  return (
    <View style={{
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 20,
    }}>
      <StatusBar hidden={visible} barStyle={Appearance.getColorScheme() == 'dark' ? 'light-content' : 'dark-content'} backgroundColor={Appearance.getColorScheme() == 'dark' ? Colors.DEFAULT_BLACK : Colors.DEFAULT_WHITE}></StatusBar>
      <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1 }}>
        <Modal desc={desc!} image={`${BASE_URL}${image}`} visible={visible} setModalVisible={setModalVisible}></Modal>
        <TouchableOpacity onPress={
          () => { setModalVisible(true); }
        }>
          <Image
            source={{ uri: `${BASE_URL}${image}` }}
            style={{ width: 60, height: 60, borderRadius: 10, marginRight: 8, resizeMode: 'stretch' }}
          />

        </TouchableOpacity>
        <View style={{ width: windowWidth - 150 }}>
          <Text
            style={{
              color: Appearance.getColorScheme() === 'dark' ? Colors.DEFAULT_WHITE : '#333',
              fontFamily: 'Poppins-Bold',
              fontSize: 17,
              paddingRight: 6
            }}>
            {name}
            
            
          </Text>
          {lowstock && <View style={{
              paddingLeft:1,
              top: -5
            }}>
              <Text style={{
                fontSize: 14,fontFamily: 'Poppins-SemiBold',margin:0, padding: 0, color: Appearance.getColorScheme() === 'dark' ? Colors.DEFAULT_RED : Colors.SECONDARY_RED
              }}>Pocas Unidades</Text>
            </View>
            }
          <View style={{ flexDirection: 'row' }}>
            <Text
              numberOfLines={1}
              style={price! < 10.00 ? style.textStyle : style.textStyleSmaller}>
              Detal: {price}$
            </Text>
            <Text
              numberOfLines={1}
              style={price! < 10.00 ? style.textStyle2 : style.textStyleSmaller2}>
              Mayor: {wholesale_price}$
            </Text>
          </View>
        </View>
      </View>

      <TouchableOpacity onPress={onPress} style={{
        backgroundColor: Colors.DEFAULT,
        padding: 10,
        borderRadius: 10,
      }}>
        {/* <Text style={{
          color: '#fff',
          textAlign: 'center',
          fontFamily: 'Poppins-SemiBold',
          fontSize: 14,
        }}>
          Al Carrito
        </Text> */}
        <Icon size={25} name='cart-plus' color={Colors.DEFAULT_WHITE} />
      </TouchableOpacity>
    </View>
  );
}

const style = StyleSheet.create({
  textStyle: {
    color: 'black',
    fontFamily: 'Poppins-Bold',
    fontSize: 13,
    textTransform: 'uppercase',
    borderRadius: 5,
    paddingHorizontal: 2,
    backgroundColor: Colors.DEFAULT_GREY
  },
  textStyle2: {
    color: 'black',
    fontFamily: 'Poppins-Bold',
    fontSize: 13,
    textTransform: 'uppercase',
    borderRadius: 5,
    paddingHorizontal: 2,
    backgroundColor: Colors.DEFAULT_GREY,
    marginLeft: 4,
  },
  textStyleSmaller: {
    color: 'black',
    fontFamily: 'Poppins-Bold',
    fontSize: 12,
    textTransform: 'uppercase',
    borderRadius: 5,
    paddingHorizontal: 2,
    backgroundColor: Colors.DEFAULT_GREY
  },
  textStyleSmaller2: {
    color: 'black',
    fontFamily: 'Poppins-Bold',
    fontSize: 12,
    textTransform: 'uppercase',
    borderRadius: 5,
    paddingHorizontal: 2,
    backgroundColor: Colors.DEFAULT_GREY,
    marginLeft: 4,
  }
});