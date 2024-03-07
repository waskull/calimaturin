import { Appearance, Button, Text, TouchableOpacity, View } from "react-native"
import Icon from 'react-native-vector-icons/MaterialIcons';
import Colors from "../constants/Colors";
import { TouchableHighlight } from "react-native-gesture-handler";

const Header = ({ title, navigation }: { title: string, navigation: any }): JSX.Element => {
    return (
        <View>
            <View style={{
                paddingVertical: 15,
                flexDirection: 'row',
                alignItems: 'center',
                marginHorizontal: 20,
            }}>
                <TouchableOpacity onPress={navigation.goBack}>
                <Icon name="arrow-back-ios" style={{ color: Appearance.getColorScheme() === 'dark' ? Colors.DEFAULT_GREY : Colors.DEFAULT_BLACK }} size={28}  />
                </TouchableOpacity>
                <Text style={{ fontSize: 24, color: Appearance.getColorScheme() === 'dark' ? 'red' : Colors.DEFAULT_RED, fontFamily: 'Poppins-Bold', marginTop: 4 }}>{title}</Text>
            </View>
        </View>
    )
}

export default Header;
