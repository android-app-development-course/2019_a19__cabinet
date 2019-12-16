import * as React from 'react'
import {useState} from 'react'
import {Image, StyleSheet, View, Dimensions} from 'react-native';
import {Button, Text} from "react-native-paper";
import {getPhotoById,deleteThing} from "../storage/sqlite";

export default function ShowDetails(props) {
    const winWidth = Dimensions.get('window').width;
    const winHeight = Dimensions.get('window').height;

    const {thing_id} = props.navigation.state.params;//接受上个页面传递过来的参数
    const [thingObj, setThingObj] = useState({});

    getPhotoById(thing_id).then(res => {
        const data = res.rows._array.map(item => {
            return {
                name: item.thing_name,
                photo:item.thing_photo,
                remark:item.thing_remark,
            }
        });
        setThingObj(data[0])
    });

    const handleDelete = ()=>{
        deleteThing(thing_id);
    };


    const styles = StyleSheet.create({
        container:{
            flex:1,
            // justifyContent:'center'
            alignItems:'center'
        },
        ImageStyle:{
            width:winWidth - 10,
            height:winHeight / 3
        },
        button: {
            marginTop:20,
            width:winWidth - 10,
            color: 'black'
        },
        TextStyle:{
            marginLeft:20,
            fontSize:25,
            color: 'blue'
        },
        Content:{
            width:winWidth,
            marginTop: 20
        }
    });

    const strings = {
        delete:'Delete',
        change:'Change',
        namePlaceHolder:'Input the name of thing',
        remarkPlaceHolder:'Input the remark of thing',
        updateErr:'update error',
    };

    return(
        <View style={styles.container}>
            <Image style={styles.ImageStyle} source={{uri: thingObj.photo}}/>
            <View style={styles.Content}>
                <Text style={styles.TextStyle}>{'Name：'+thingObj.name}</Text>
                <Text style={styles.TextStyle}>{'Remark：'+thingObj.remark}</Text>
            </View>
            <Button mode='contained' style={[styles.button]} title={strings.delete}
                    onPress={() => {handleDelete();props.navigation.goBack();}}>
                {strings.delete}
            </Button>
        </View>
    )
}