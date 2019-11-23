import {useState, useEffect} from 'react';
import * as React from 'react';
import {List, Divider} from 'react-native-paper';
import {
    FlatList,
    View,
    Dimensions,
} from 'react-native';

export default function ThingList(props) {
    const debugArray = [];
    const winHeight = Dimensions.get('window').height;

    for (let i = 0; i < 10; i++) {
        debugArray.push({
            icon: 'camera',
            text: 'Thing' + i,
        });
    }

    const [thingList, setThingList] = useState(debugArray);
    return (
        <FlatList
            data={thingList}
            renderItem={({item}) => (
                <View>
                    <List.Item title={item.text} onPress={() => console.log(item.text)}/>
                    <Divider/>
                </View>
            )}
            keyExtractor={item => item.id}
        />
    );
}
