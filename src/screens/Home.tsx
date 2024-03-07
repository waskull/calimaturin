import { Animated, Appearance, Easing, Image, ImageBackground, StatusBar, TouchableOpacity } from 'react-native';
import { SafeAreaView, StyleSheet, Text, View, } from 'react-native';
import Colors from '../constants/Colors';
import { windowWidth } from '../utils/Display';


const Home = ({ navigation }: { navigation: any }) => {

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.DEFAULT_WHITE }}>
      <StatusBar barStyle={Appearance.getColorScheme() == 'dark' ? 'light-content' : 'dark-content'} translucent backgroundColor="transparent" hidden={true}></StatusBar>
      <ImageBackground source={require('../assets/images/background.jpg')} resizeMode='cover' style={{ flex: 1 }}>
        <View style={{ height: 320 }}>

          {/* <Image
          style={{
            width: windowWidth / 1.3,
            resizeMode: 'contain',
            top: -230,
            alignSelf: 'center'
          }}
          source={require('../assets/images/isologo.jpg')}
        /> */}
        </View>
        <View style={style.textContainer}>
          <View>
            {/* <Text style={{ fontSize: 32, color: Colors.DEFAULT_RED, textAlign: 'center', fontFamily: 'Poppins-Bold', }}>
            Helados CALI
          </Text> */}
            <Text
              style={{
                marginTop: 20,
                fontSize: 18,
                fontFamily: 'Poppins-SemiBold',
                textAlign: 'center',
                color: Colors.DEFAULT_YELLOW,
                marginBottom: 10,
                textShadowColor: 'black',
                textShadowOffset: { width: -1, height: 0 },
                textShadowRadius: 10,
              }}>
              Alegrando Corazones
            </Text>

            {/* <View style={{
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'white',
            alignSelf: 'center'
          }}>
            <Text style={{ fontSize: 14, fontFamily: 'Poppins-Bold', color: Colors.DEFAULT_BLACK }}>Hecho con</Text>
            <Animated.Image style={{
              height: 90,
              width: 100,
              transform: [{ rotate: RotateData }],
            }} source={require("../assets/images/react.png")
            }></Animated.Image>
            <Text style={{ fontSize: 14, fontFamily: 'Poppins-Bold', color: Colors.DEFAULT_BLACK, marginTop: 5 }}>React Native</Text>
          </View> */}



          </View>

          <TouchableOpacity activeOpacity={0.8} onPress={() => {
            navigation.navigate('login');
          }}>
            <View style={style.btnContainer}>
              <Text style={style.title}>Iniciemos</Text>
            </View>
          </TouchableOpacity>


        </View></ImageBackground>
    </SafeAreaView >
  );
};

export default Home;

const style = StyleSheet.create({
  textContainer: {
    flex: 1,
    paddingHorizontal: 50,
    justifyContent: 'flex-end',
    paddingBottom: 40,
  },
  indicatorContainer: {
    height: 50,
    flex: 1,
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
  },
  currentIndicator: {
    height: 12,
    width: 30,
    borderRadius: 10,
    backgroundColor: Colors.DEFAULT,
    marginHorizontal: 5,
  },
  indicator: {
    height: 12,
    width: 12,
    borderRadius: 6,
    backgroundColor: Colors.DEFAULT,
    marginHorizontal: 5,
  },
  title: { color: Colors.DEFAULT_WHITE, fontSize: 23, fontFamily: 'Poppins-Bold' },
  btnContainer: {
    backgroundColor: Colors.DEFAULT_RED,
    padding: 20,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
});