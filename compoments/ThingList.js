import {useState, useEffect} from 'react';
import * as React from 'react';
import {List, Divider} from 'react-native-paper';
import {
    FlatList,
    View,
    Dimensions,
} from 'react-native';
import {getThingByCat} from '../storage/sqlite'

export default function ThingList(props) {
    const {cat_id} = props.navigation.state.params;

    const debugArray = [];
    const winHeight = Dimensions.get('window').height;

    for (let i = 0; i < 10; i++) {
        debugArray.push({
            icon: 'camera',
            text: 'Thing' + i,
            id: i,
        });
    }

    const [thingList, setThingList] = useState(debugArray);

    getThingByCat(cat_id).then(res => {
        const data = res.rows._array.map(item => {
            return {
                text: item.thing_name,
                id: item.thing_id,
            }
        });
        setThingList(data)
    });

    return (
        <View>
            {thingList &&
            <FlatList
                data={thingList}
                renderItem={({item}) => (
                    <View key={item.id}>
                        <List.Item title={item.text} onPress={() => console.log(item.text)}/>
                        <Divider/>
                    </View>
                )}
                keyExtractor={item => {
                    return item.id.toString()
                }}
            />
            }
        </View>
    );
}
