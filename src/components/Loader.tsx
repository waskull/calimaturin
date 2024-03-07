import { Animated, Easing, StyleSheet, Text, View } from "react-native";
import Colors from "../constants/Colors";
import { useEffect, useState } from "react";
import { Appearance } from 'react-native';

const Loader = (): JSX.Element => {
  function StartImageRotate() {
    rotateValue.setValue(0);

    Animated.timing(rotateValue, {
      toValue: 1,
      duration: 3000,
      easing: Easing.linear,
      useNativeDriver: true
    }).start(() => StartImageRotate());
  }
  const [rotateValue, setRotateValue] = useState(new Animated.Value(0));
  useEffect(() => {
    StartImageRotate();
  }, []);
  const RotateData = rotateValue.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });
  return (
    <View style={styles.container}>
      {/* <ActivityIndicator size="large" color={Colors.DEFAULT} /> */}

      <View style={{
      }}>
        <Animated.Image style={{
          height: 90,
          width: 100,
          transform: [{ rotate: RotateData }],
        }} source={require("../assets/images/react.png")
        }></Animated.Image>
      </View>

      <Text style={Appearance.getColorScheme() === 'dark' ? styles.itemTextDark : styles.itemText}>Cargando...</Text>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
    zIndex: 1,
    color: 'black',
    padding: 10,
  },
  itemText: {
    color: Colors.DEFAULT_BLACK,
    fontSize: 24,
    marginTop: 10,
    fontFamily: 'Roboto-Bold',
  },
  itemTextDark: {
    color: Colors.DEFAULT_WHITE,
    fontSize: 24,
    marginTop: 10,
    fontFamily: 'Roboto-Bold',
  },
});
export default Loader;