import React, { useState } from 'react';
import { Alert, Modal, StyleSheet, Text, View, Image, Appearance } from 'react-native';
import Colors from '../constants/Colors';
import {BlurView} from '@react-native-community/blur';
const modal = ({ visible, setModalVisible, desc, image, isString = true }: { visible: boolean, setModalVisible: any, desc: string, image: string, isString?: boolean }): JSX.Element => {

    return (
        <View style={styles.centeredView}>
            
            <Modal
                animationType="fade"
                transparent={true}
                visible={visible}
                statusBarTranslucent
                onRequestClose={() => {
                    setModalVisible(!visible)
                }}>
                    <BlurView 
                    reducedTransparencyFallbackColor="transparent"
                        blurType="light"
                        blurAmount={20}
                        style={styles.contentWrap}>
                <View style={styles.centeredView} onTouchEnd={() => {
                    setModalVisible(!visible)
                }}>
                    <View style={styles.modalView}>
                    
                        {isString ? <Image source={{ uri: image }} style={{ height: 300, width: 351, resizeMode: 'stretch', borderTopRightRadius: 20, borderTopLeftRadius: 20 }} />
                            : <Image source={require('./../assets/images/delivery.jpg')} style={{ height: 300, width: 351, resizeMode: 'stretch', borderTopRightRadius: 20, borderTopLeftRadius: 20 }} />}
                        
                        <Text style={styles.modalText}>{desc}</Text>

                    </View>
                </View>
                </BlurView >
            </Modal>
        </View>
    )
}

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalView: {
        margin: 20,
        backgroundColor: Appearance.getColorScheme() === 'dark' ? Colors.DEFAULT_BLACK : Colors.DEFAULT_WHITE,
        borderRadius: 21,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        justifyContent: 'center',
        alignSelf:'center',
        alignContent: 'center',
        verticalAlign:'middle',
    },
    button: {
        borderRadius: 10,
        padding: 10,
        elevation: 2,
        backgroundColor: Colors.DEFAULT
    },
    buttonOpen: {
        backgroundColor: Colors.DEFAULT_BLACK,
    },
    buttonClose: {
        backgroundColor: Colors.DEFAULT_RED,
        marginBottom: 5,
        zIndex: 1,
    },
    textStyle: {
        color: Appearance.getColorScheme() === 'dark' ? Colors.DEFAULT_WHITE : 'black',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    modalText: {
        paddingHorizontal: 10,
        textAlign: 'justify',
        color: Appearance.getColorScheme() === 'dark' ? Colors.DEFAULT_WHITE : 'black',
        fontFamily: 'Poppins-SemiBold',
        fontSize: 20
    },
    contentWrap: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf:'center',
        alignContent: 'center',
        verticalAlign:'middle'
    }
});

export default modal;