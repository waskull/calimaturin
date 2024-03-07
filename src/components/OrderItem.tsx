import React, { useState } from 'react';
import { Alert, Appearance, StyleSheet, Text, ToastAndroid, TouchableOpacity, View } from 'react-native';
import { statusEnum } from '../utils/Enum';
import Colors from '../constants/Colors';
import axios from 'axios';
import { BASE_URL } from '../constants/url';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { CollapsableContainer } from './CollapsableContainer';


export const OrderItem = ({ item, loadData }: { item: any, loadData: any }) => {
    const [expanded, setExpanded] = useState(false);
    return (
        <View style={styles.cartCard}>
            <TouchableOpacity activeOpacity={1} onPress={() => {
                setExpanded(!expanded);
            }}>
                <View style={{ justifyContent: 'space-between', flexDirection: 'row' }}>
                    <Text style={{ fontWeight: 'bold', marginLeft: 5, fontSize: 20, color: Colors.DEFAULT_WHITE, fontFamily: 'Poppins-Bold' }}>Código de pedido: #{item.id}</Text>
                    {item.status === statusEnum.INCOMPLETE &&
                        <TouchableOpacity style={{ marginTop: 5 }} onPress={() => {

                            try {
                                Alert.alert('AVISO', '¿Deseas cancelar este pedido?', [
                                    {
                                        text: 'Cancelar',
                                        onPress: () => console.log('cancelado'),
                                        style: 'cancel',
                                    },
                                    {
                                        text: 'Confirmar', onPress: async () => {
                                            console.log(item);
                                            const res = await axios.patch(`${BASE_URL}/sale/cancel/${item.id}`);
                                            await loadData();
                                            ToastAndroid.showWithGravity(
                                                'Pedido eliminado',
                                                ToastAndroid.LONG,
                                                ToastAndroid.CENTER,
                                            );
                                        }
                                    },
                                ]);

                            }
                            catch (e) {
                                Alert.alert('Error al eliminar el item');
                                console.log(e);
                            }
                        }
                        }>
                            <MaterialIcons
                                name="delete"
                                size={20}
                                color="red"

                                style={{ fontWeight: 'bold', marginRight: 5 }}
                            />
                        </TouchableOpacity>
                    }

                </View>
                <View >
                    {item?.sale_items.map(({ id, item, quantity }: any) =>

                        <Text style={{ fontSize: 17, marginLeft: 10, fontFamily: 'Poppins-SemiBold', color: Colors.DEFAULT_WHITE }} key={id}>• {item.name} x {quantity}</Text>

                    )}</View>
                <View>
                    <View style={{ flexDirection: 'row', flex: 1 }}>
                        <Text style={{ fontSize: 15, marginLeft: 5, fontFamily: 'Poppins-SemiBold', color: Colors.DEFAULT_WHITE }}>ESTADO:</Text>
                        <Text style={{ fontSize: 16, marginLeft: 3, paddingRight: 60, fontFamily: 'Poppins-SemiBold', color: item.status === statusEnum.INCOMPLETE ? 'orange' : item?.status === statusEnum.WAITING ? 'cyan' : item?.status === statusEnum.COMPLETED ? Colors.DEFAULT_GREEN : Colors.DEFAULT_RED, textTransform: 'uppercase' }}>{item?.status}</Text>
                    </View>
                    <View style={{ flexDirection: 'row', flex: 1, justifyContent: 'space-between' }}>
                        <Text style={{ marginTop: 5, fontSize: 20, marginLeft: 5, fontFamily: 'Poppins-SemiBold', color: Colors.DEFAULT_WHITE }}>Total:</Text>
                        <Text style={{ fontSize: 25, marginLeft: 10, fontFamily: 'Poppins-Bold', color: Colors.DEFAULT_WHITE }}>{item?.total}$</Text>
                    </View>
                    {!expanded && item?.lowstock && statusEnum.INCOMPLETE === item?.status && <View style={{ flexDirection: 'row' }}>
                        <Text numberOfLines={1} style={{ fontSize: 11, marginLeft: 5, fontFamily: 'Poppins-SemiBold', color: Colors.DEFAULT_WHITE }}>Nota: </Text>
                        <Text numberOfLines={1} style={{ fontSize: 11, marginLeft: 3,textAlign: 'justify', marginRight: 35, marginBottom: 1, fontFamily: 'Poppins-SemiBold', color: Appearance.getColorScheme() === 'dark' ? Colors.DEFAULT_RED : Colors.DEFAULT_RED }}>Debido al bajo inventario de ciertos productos seleccionados, el pedido tardara mas tiempo en ser procesado</Text>
                    </View>}
                    <CollapsableContainer expanded={expanded}>
                        {item?.lowstock && expanded && statusEnum.INCOMPLETE === item?.status &&
                            <View style={{ flexDirection: 'row', flex: 1 }}>
                                <Text style={{ fontSize: 11, marginLeft: 5, fontFamily: 'Poppins-SemiBold', color: Colors.DEFAULT_WHITE }}>Nota:</Text>
                                <Text style={{ fontSize: 11, marginLeft: 3, marginRight: 35, marginBottom: 1, fontFamily: 'Poppins-SemiBold', color: Appearance.getColorScheme() === 'dark' ? Colors.DEFAULT_RED : Colors.DEFAULT_RED }}>Debido al bajo inventario de ciertos productos seleccionados, el pedido tardara mas tiempo en ser procesado.</Text>
                            </View>
                        }
                    </CollapsableContainer>

                    {/* {item?.lowstock && statusEnum.INCOMPLETE === item?.status &&
                  <View style={{ flexDirection: 'row', flex: 1 }}>
                    <Text style={{ fontSize: 11, marginLeft: 5, fontFamily: 'Poppins-SemiBold', color: Colors.DEFAULT_WHITE }}>Nota:</Text>
                    <Text style={{ fontSize: 11, marginLeft: 3, paddingRight: 30, marginBottom: 1, fontFamily: 'Poppins-SemiBold', color: Appearance.getColorScheme() === 'dark' ? Colors.DEFAULT_RED : Colors.DEFAULT_RED }}>Debido al bajo inventario de ciertos productos seleccionados, el pedido tardara mas tiempo en ser procesado</Text>
                  </View>
                } */}
                </View>
            </TouchableOpacity>
        </View>
    );

};

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
        marginBottom: 16,
        marginHorizontal: 15,
        paddingHorizontal: 10,
        borderWidth: 1,
        borderColor: Appearance.getColorScheme() === 'dark' ? Colors.SECONDARY_BLACK : Colors.DEFAULT_BLACK,
    },
});