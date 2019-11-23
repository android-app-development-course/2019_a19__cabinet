import {useState} from 'react';
import * as React from 'react';
import {List, Button, TextInput, Divider, Dialog, Paragraph, Portal} from 'react-native-paper';
import {StyleSheet, View, Image, Text, Dimensions, Platform, ToastAndroid, BackHandler} from 'react-native';
import {Dropdown} from 'react-native-material-dropdown-v2';
import {getAllCat, insertThing} from "../storage/sqlite";

const styles = StyleSheet.create({
    divider: {
        marginTop: 5,
        shadowColor: '#666',
    },
    button: {
        color: 'black'
    }
});

const strings = {
    name: 'Name',
    namePlaceHolder: 'Input the name of thing',
    remark: 'Remark',
    remarkPlaceHolder: 'Input the remark of thing',
    confirm: 'Confirm',
    goBack: 'Go Back',
    chooseCat: 'Choose the catergry',
    insertErr: 'DataBase insert error',
};

export default function AddThing(props) {
    const {image} = props.navigation.state.params;
    if (!image) props.navigation.goBack();
    const winWidth = Math.floor(Dimensions.get('window').width);
    const winHeight = Math.floor(Dimensions.get('window').height);
    const imgHeight = Math.floor((winWidth / image.width) * image.height);

    const [thingName, setThingName] = useState('');
    const [remark, setRemark] = useState('');
    const [catergries, setCatergries] = useState([]);
    const [selectedCatId, setSelectedCatId] = useState(-1);
    const [dialogVisibe, setDialogVisible] = useState(false);

    const handleConfirm = () => {
        insertThing(thingName, image, selectedCatId, remark).then(res => {
            console.log(`INSERT ${thingName}, ${image}, ${selectedCatId}, ${remark}`);
            props.navigation.goBack();
        }).catch(err => {
            if (Platform.OS == 'android') {
                ToastAndroid.show(strings.insertErr, ToastAndroid.SHORT);
            }
        });
    };

    getAllCat().then(res => {
        const data = res.rows._array.map(item => {
            item.value = item.cat_name;
            return item;
        });
        setCatergries(data);
    });

    return (
        <View>
            <Portal>
                <Dialog
                    visible={dialogVisibe}
                    onDismiss={() => setDialogVisible(false)}>
                    <Dialog.Content>
                        {catergries.map((item, idx) => (
                            <View key={item.cat_id}>
                                <Button
                                    onPress={() => {
                                        setSelectedCatId(item.cat_id);
                                        setDialogVisible(false);
                                    }}
                                >{item.cat_name}</Button>
                                {(idx !== catergries.length) && <Divider/>}
                            </View>
                        ))}
                    </Dialog.Content>
                </Dialog>
            </Portal>
            <Image source={{uri: image.uri}} style={{width: winWidth, height: imgHeight}}/>
            <View style={{minHeight: winHeight - imgHeight - 245, justifyContent: 'space-between'}}>
                <View>
                    <Divider/>
                    <Button
                        contentStyle={{height: 60}}
                        onPress={() => setDialogVisible(true)}
                    >{selectedCatId === -1 ?
                        strings.chooseCat :
                        catergries[catergries.findIndex((item) => (item.cat_id === selectedCatId))].cat_name
                    }</Button>
                    <TextInput
                        label={strings.name}
                        value={thingName}
                        placeholder={strings.namePlaceHolder}
                        onChangeText={text => setThingName(text)}
                    />
                    <TextInput
                        label={strings.remark}
                        value={remark}
                        placeholder={strings.remarkPlaceHolder}
                        onChangeText={text => setRemark(text)}
                    />
                </View>
                <View style={{flexDirection: 'row', justifyContent: 'space-around', marginTop: 10}}>
                    <Button mode='contained' style={[styles.button]} title={strings.goBack} color={'#666'}
                            onPress={() => props.navigation.goBack()}>
                        {strings.goBack}
                    </Button>
                    <Button mode='contained' style={[styles.button]} title={strings.goBack}
                            onPress={handleConfirm}
                            disabled={thingName === '' || selectedCatId === -1}>
                        {strings.confirm}
                    </Button>
                </View>
            </View>
        </View>
    );
}
