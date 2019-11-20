import {useState, useEffect} from 'react';
import * as React from 'react';
import {Button, Portal, Dialog, Paragraph} from 'react-native-paper';
import {ScrollView, StyleSheet, View, Dimensions, TouchableWithoutFeedback} from 'react-native';
import chunk from "../utils/chunck";
import ActionButton from "react-native-action-button";
import Icon from 'react-native-vector-icons/Ionicons';
import {getAllCat, deleteCat} from "../storage/sqlite";


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

const strings = {
    DeleteCat: 'Delete category',
    confirm: 'Confirm',
}

export default function (props) {
    const debugArray = [];
    const winHeight = Dimensions.get('window').height;
    // for (let i = 0; i < 10; i++) {
    //     debugArray.push({
    //         icon: 'camera',
    //         text: '药品'
    //     })
    // }
    const [catergries, setCatergries] = useState(debugArray);
    const [dialogVisble, setDialogVisble] = useState(false);
    const [readyDel, setReadyDel] = useState({});

    const handleCameraClick = getAllCat().then(res => {
        console.log(res)
    });

    const delCat = () => {
        deleteCat(readyDel.id);
        const idx = catergries.indexOf(readyDel);
        idx >= 0 && catergries.splice(idx, 1);
        setDialogVisble(false);
    };

    useEffect(() => {
        getAllCat().then(res => {
            res && setCatergries(res.rows._array.map(i => {
                return {icon: i.cat_icon, text: i.cat_name, id: i.cat_id}
            }));
        })
    });
    return (
        <View>
            <Portal>
                <Dialog
                    visible={dialogVisble}
                    onDismiss={() => setDialogVisble(false)}>
                    <Dialog.Title>
                        {strings.DeleteCat + ' ' + readyDel.text}
                    </Dialog.Title>
                    <Dialog.Content>
                        <Paragraph>This is simple dialog</Paragraph>
                    </Dialog.Content>
                    <Dialog.Actions>
                        <Button
                            onPress={() => delCat()}
                        >{strings.confirm}</Button>
                    </Dialog.Actions>
                </Dialog>
            </Portal>
            <ScrollView style={{minHeight: winHeight - 160}}>
                {
                    chunk(catergries, 3).map((row, index) => (
                        <View key={'btn-group' + index} style={mainStyle.buttonRow}>
                            {
                                row.map((item, index) => (
                                    <TouchableWithoutFeedback key={index}
                                                              onLongPress={() => {
                                                                  setReadyDel(item);
                                                                  setDialogVisble(true);
                                                              }}
                                                              onPress={() => console.log(item.text)}>
                                        <Button icon={item.icon}
                                                mode="contained"
                                                contentStyle={[buttonStyle]}
                                                compact={true}>{item.text}</Button>
                                    </TouchableWithoutFeedback>
                                ))
                            }
                        </View>
                    ))
                }
                <View style={{height: 150, flex: 1}}/>
            </ScrollView>
            <ActionButton offsetY={30} buttonColor="rgba(231,76,60,1)">
                <ActionButton.Item onPress={() => handleCameraClick}>
                    <Icon name="md-camera" style={actionButtonIconStyle.item}/>
                </ActionButton.Item>
                <ActionButton.Item onPress={() => props.navigation.navigate('addcat')}>
                    <Icon name="md-create" style={actionButtonIconStyle.item}/>
                </ActionButton.Item>
            </ActionButton>
        </View>

    );

}
