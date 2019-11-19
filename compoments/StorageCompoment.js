import {useState} from 'react';
import * as React from 'react';
import {Button} from 'react-native-paper';
import {ScrollView, StyleSheet, View} from 'react-native';
import chunk from "../utils/chunck";
import ActionButton from "react-native-action-button";
import Icon from 'react-native-vector-icons/Ionicons';


const no_roud_conner = StyleSheet.create({
    borderRadius: 0
});

const mainStyle = StyleSheet.create({
    buttonRow: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        // flexWrap: 'wrap',
        // flex: 1,
        alignItems: 'center',
        height: 120,
    },
    buttonEach: {
        // alignContent: 'center',
        // alignItems: 'center',
        // flexDirection: 'column',
        textAlign: 'center',
        // flexDirection: 'row',
        flex: 1,
        padding: 0,
        margin: 0,

    }
});

const buttonStyle = StyleSheet.create({
    width: 100,
    height: 70,
});

const actionButtonIconStyle = StyleSheet.create({
    item: {
        fontSize: 20,
        height: 22,
        color: 'white'
    }
});

export default function (props) {
    const [catergries, setCatergries] = useState([]);
    for (let i = 0; i < 10; i++) {
        catergries.push({
            icon: 'camera',
            text: '药品'
        })
    }
    return (
        <View>
            <ScrollView>
                {
                    chunk(catergries, 3).map((row, index) => (
                        <View key={'btn-group' + index} style={mainStyle.buttonRow}>
                            {
                                row.map((item, index) => (
                                    <View key={index}>
                                        <Button icon="camera" mode="contained" contentStyle={[buttonStyle]}
                                                compact={true} onPress={() => console.log(item.text)}>
                                            {item.text + index}
                                        </Button>
                                    </View>
                                ))
                            }
                        </View>
                    ))
                }
                <View style={{height: 150, flex: 1}}/>
            </ScrollView>
            <ActionButton offsetY={30} buttonColor="rgba(231,76,60,1)">
                <ActionButton.Item onPress={() => console.log(props)}>
                    <Icon name="md-camera" style={actionButtonIconStyle.item}/>
                </ActionButton.Item>
                <ActionButton.Item onPress={() => props.navigation.navigate('addcat')}>
                    <Icon name="md-create" style={actionButtonIconStyle.item}/>
                </ActionButton.Item>
            </ActionButton>
        </View>

    );

}
