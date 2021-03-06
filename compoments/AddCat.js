import {Component, useState} from 'react';
import * as React from 'react';
import {Text, Appbar, Button, TextInput, Divider} from 'react-native-paper';
import {ScrollView, StyleSheet, View, Dimensions, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import chunck from "../utils/chunck";
import Constants from 'expo-constants';
import {getAllCat, insert_cat, deleteCat} from "../storage/sqlite";

const styles = StyleSheet.create({
    divider: {
        marginTop: 5,
        shadowColor: '#666',
    },
    button: {
        color: 'black'
    }
});

const buttonHeight = (Dimensions.get('window').width / 3) - 20;
const buttonWidth = (Dimensions.get('window').width / 3) - 40;

const iconStyles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        // alignItems: 'space-between',
        flex: 1,
    },
    each: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        alignContent: 'center',
        width: buttonWidth,
        height: buttonHeight,
    }
});

const icons = ['store', 'airplane', 'beer', 'bike', 'calendar', 'coffee', 'hammer',
    'flashlight', 'headset', 'paw', 'medical-bag', 'compass', 'printer', 'rocket', 'flower-tulip',
    'school', 'trash-can', 'trophy', 'wallet', 'walk', 'umbrella'
];

const strings = {
    InputCatNamePlaceHolder: "Input cat name",
    inputCatNameLabel: "CatName",
    goBack: 'Go back',
    confirm: 'Confirm',
};

export default function AddCat(props) {
    const [selected, setSelected] = useState('');
    const [catname, setCatName] = useState('');
    const selectedColor = (props.theme && props.theme.primary) || '#6200ee';

    const handleConfirm = () => {
        insert_cat(catname, selected, function (err) {
            console.log(err)
        }, function () {
            console.log('succss');
        });
        props.navigation.goBack();
    };

    return (
        <View>
            <ScrollView style={{height: buttonHeight * 4}}>
                {
                    chunck(icons, 3).map((row, rowNum) => (
                        <View style={iconStyles.row} key={'btn-row-' + rowNum}>
                            {
                                row.map((icon, colNum) => (
                                    <TouchableOpacity key={icon}
                                                      style={[iconStyles.each, selected === icon ? {backgroundColor: selectedColor} : {}]}
                                                      onPress={
                                                          () => {
                                                              setSelected(icon)
                                                          }
                                                      }>
                                        <Icon size={48} name={icon} color={selected === icon ? 'white' : 'black'}/>
                                    </TouchableOpacity>
                                ))
                            }
                        </View>
                    ))
                }
            </ScrollView>
            <Divider style={styles.divider}/>
            <TextInput
                label={strings.inputCatNameLabel}
                placeholder={strings.InputCatNamePlaceHolder}
                value={catname}
                onChangeText={(text) => setCatName(text)}
            />
            <View style={{flexDirection: 'row', justifyContent: 'space-around', marginTop: 10}}>
                <Button mode='contained' style={[styles.button]} title={strings.goBack} color={'#666'}
                        onPress={() => props.navigation.goBack()}>
                    {strings.goBack}
                </Button>
                <Button mode='contained' style={[styles.button]} title={strings.goBack}
                        onPress={handleConfirm}
                        disabled={selected === '' || catname.length <= 0}>
                    {strings.confirm}
                </Button>
            </View>
            <View style={{height: Constants.statusBarHeight * 2}}/>
        </View>
    )
}
