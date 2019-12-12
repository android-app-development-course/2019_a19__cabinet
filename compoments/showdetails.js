import * as React from 'react'
import {Image, StyleSheet, View, Dimensions} from 'react-native';
import {Button} from "react-native-paper";
import {getPhotoById} from "../storage/sqlite";
import Text from "react-native-web/dist/exports/Text";

export default function showdetails(props) {
    const winWidth = Dimensions.get('window').width;
    const winHeight = Dimensions.get('window').height;

    const {thing_id} = props.navigation.state.params;
    const {thingList,setThingList} = useState('')

    getPhotoById(thing_id).then(res => {
        const data = res.rows._array.map(item => {
            return {
                text: item.thing_name,
                id: item.thing_id,
                photo:item.thing_photo,
                remark:item.thing_remark,
            }
        });
        setThingList(data)
    });

    const handleDelete = ()=>{

    };

    return(
        <View style={styles.container}>
            <Image style={styles.ImageStyle} source={item.photo}/>
            <Text style={styles.TextStyle}>{item.name}</Text>
            <Text style={styles.TextStyle}>{item.remark}</Text>

            <View>
                <Button mode='contained' style={[styles.button]} title={strings.change} color={'#666'}
                        onPress={() => props.navigation.goBack()}>
                    {strings.change}
                </Button>

                <Button mode='contained' style={[styles.button]} title={strings.delete}
                        onPress={handleConfirm}
                        disabled={selected === '' || catname.length <= 0}>
                    {strings.delete}
                </Button>
            </View>
        </View>
    )

    const styles = StyleSheet.create({
        container:{
            flex:1,
            justifyContent:'center',
            alignItems:'center'
        },
        ImageStyle:{
            width:winWidth - 30,
            height:winHeight / 2
        },
        button: {
            color: 'black'
        },
        TextStyle:{
            color: 'blue'
        }
    });

    const strings = {
        delete:"Delete",
        change:"Change",
    };
}