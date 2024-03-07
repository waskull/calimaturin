import {StyleSheet, Text, TouchableHighlight, TouchableOpacity} from 'react-native';
import React from 'react';
import Colors from '../constants/Colors';

export type CButtom = {
    label: string;
    onPress: () => void;
    disable: boolean;
}

export default function CustomButton({label, onPress, disable=false}: CButtom) {
  return (
    <TouchableHighlight
    underlayColor={Colors.DEFAULT_BLACK}
      onPress={onPress}
      disabled={disable}
      style={styles.button}>
      {/* style={disable ? styles.buttonDisabled : styles.button}> */}
      <Text
        style={{
          textAlign: 'center',
          fontSize: 23,
          color: 'white',
          fontFamily: 'Poppins-SemiBold',
        }}>
        {label}
      </Text>
    </TouchableHighlight>
  );

}

const styles = StyleSheet.create({  
  button: {
    backgroundColor: Colors.DEFAULT,
    padding: 20,
    marginVertical:30,
    borderRadius: 10,
    marginBottom: 30,
    shadowColor: Colors.DEFAULT,
    shadowOffset:{
      width:0,
      height:15
    },
    shadowOpacity:0.3,
    shadowRadius:10
  },
  buttonDisabled: {
    backgroundColor: Colors.DEFAULT_GREY,
    padding: 20,
    marginVertical:30,
    borderRadius: 10,
    marginBottom: 30,
    shadowColor: Colors.DEFAULT,
    shadowOffset:{
      width:0,
      height:15
    },
    shadowOpacity:0.3,
    shadowRadius:10
  }
});