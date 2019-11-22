import {useState} from 'react';
import * as React from 'react';
import {List, Button, TextInput, Divider} from 'react-native-paper';
import {StyleSheet, View, Image, Text, Dimensions} from 'react-native';

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
};

export default function AddThing(props) {
    const {image} = props.navigation.state.params;
    if (!image) props.navigation.goBack();
    console.log(image)
    const winWidth = Math.floor(Dimensions.get('window').width);
    const winHeight = Math.floor(Dimensions.get('window').height);
    const imgHeight = Math.floor((winWidth / image.width) * image.height);
    // const uri = "file:///data/user/0/host.exp.exponent/cache/ExperienceData/%2540anonymous%252Flocker-8f9a55b4-f9f7-4178-9f0e-795f30e0c5c5/ImagePicker/403845e3-184b-4fc0-a923-d21f058c7cec.jpg";
    // console.log(uri)

    const [thingName, setThingName] = useState('');
    const [remark, setRemark] = useState('');

    const handleConfirm = () => {

    };

    return (
        <View>
            <Image source={{uri: image.uri}} style={{width: winWidth, height: imgHeight}}/>
            <View style={{minHeight: winHeight - imgHeight - 245, justifyContent: 'space-between'}}>
                <View>
                    <Divider/>
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
                            disabled={thingName === '' /*|| catname.length <= 0 */}>
                        {strings.confirm}
                    </Button>
                </View>
            </View>
        </View>
    );
}
