import {
  Appearance,
  StyleSheet,
  TextInput,
  TextInputProps,
  View,
} from "react-native";
import React, { useState } from "react";
import Colors from "../constants/Colors";

const AppInput: React.FC<TextInputProps> = ({ ...otherProps }) => {
  const [focused, setFocused] = useState<boolean>(false);
  return (
    <TextInput style={[styles.textinput,
    focused && {
      borderWidth: 3,
      borderColor: Colors.DEFAULT,
      shadowOffset: { width: 4, height: 10, },
      shadowColor: Colors.DARK_TWO,
      shadowOpacity: 0.2,
      shadowRadius: 10
    }]}
      selectionColor='black'
      editable={otherProps.editable}
      onChangeText={otherProps.onChangeText}
      value={otherProps.value}
      placeholder={otherProps.placeholder}
      placeholderTextColor='#6c757d'
      autoFocus={otherProps.autoFocus}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
      keyboardType={otherProps.keyboardType} 
      secureTextEntry={otherProps.secureTextEntry}
      maxLength={otherProps.maxLength}
    ></TextInput>
  )
};

export const DisabledInput: React.FC<TextInputProps> = ({ ...otherProps }) => {
  const [focused, setFocused] = useState<boolean>(false);
  return (
    <TextInput style={[styles.disabledInput,
    focused && {
      borderWidth: 3,
      borderColor: Colors.DEFAULT,
      shadowOffset: { width: 4, height: 10, },
      shadowColor: Colors.DARK_TWO,
      shadowOpacity: 0.2,
      shadowRadius: 10
    }]}
      selectionColor='black'
      editable={otherProps.editable}
      onChangeText={otherProps.onChangeText}
      value={otherProps.value}
      placeholder={otherProps.placeholder}
      placeholderTextColor='#6c757d'
      autoFocus={otherProps.autoFocus}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
      keyboardType={otherProps.keyboardType} 
      secureTextEntry={otherProps.secureTextEntry}
      maxLength={otherProps.maxLength}
    ></TextInput>
  )
};

export const InputText: React.FC<TextInputProps> = ({...otherProps}) => {
  const [focused, setFocused] = useState<boolean>(false);
 return (
  <TextInput style={[styles.InputText,
    focused && {
      borderWidth: 3,
      borderColor: Colors.DEFAULT,
      shadowOffset: { width: 4, height: 10, },
      shadowColor: Colors.DARK_TWO,
      shadowOpacity: 0.2,
      shadowRadius: 10
    }]}
      selectionColor='black'
      onChangeText={otherProps.onChangeText}
      value={otherProps.value}
      placeholder={otherProps.placeholder}
      placeholderTextColor='#6c757d'
      autoFocus={otherProps.autoFocus}
      editable = {otherProps.editable}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
      keyboardType={otherProps.keyboardType} 
      secureTextEntry={otherProps.secureTextEntry}
      maxLength={otherProps.maxLength}
    ></TextInput>
 )
}

export default AppInput;

const styles = StyleSheet.create({
  textinput: {
    flex: 1,
    paddingVertical: 0,
    color: Colors.DARK_ONE,
    fontFamily: 'Poppins-Medium',
    borderRadius: 10,
    backgroundColor: Appearance.getColorScheme() === 'dark' ? Colors.SECONDARY_GREY : '#dee2e6' ,
    paddingLeft: 30,
    paddingRight: 10,
    height: 50,
  },
  disabledInput: {
    flex: 1,
    paddingVertical: 0,
    color: Colors.DARK_ONE,
    fontFamily: 'Poppins-Medium',
    borderRadius: 10,
    backgroundColor: Appearance.getColorScheme() === 'dark' ? Colors.DARK_FIVE : Colors.INACTIVE_GREY ,
    paddingLeft: 30,
    paddingRight: 10,
    height: 50,
  },
  InputText: {
    marginHorizontal:10,
    paddingVertical: 0,
    color: Colors.DARK_ONE,
    fontFamily: 'Poppins-Medium',
    borderRadius: 10,
    backgroundColor: '#dee2e6',
    paddingLeft: 30,
    paddingRight: 10,
    height: 50,
    marginBottom:10
  },
  textinputIcon: {
    position: 'absolute',
    zIndex: 1,
    top: 15,
    paddingRight: 10,
    marginLeft: 5,
  },
});