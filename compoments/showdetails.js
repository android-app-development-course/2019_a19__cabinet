import * as React from 'react'
import {useState} from 'react'
import {Image, StyleSheet, View, Dimensions} from 'react-native';
import {Button,Dialog} from "react-native-paper";
import {getPhotoById,deleteThing} from "../storage/sqlite";
import Text from "react-native-web/dist/exports/Text";

export default function showdetails(props) {
    const debugArray = [];
    const winWidth = Dimensions.get('window').width;
    const winHeight = Dimensions.get('window').height;

    const {thing_id} = props.navigation.state.params;
    const {thingList,setThingList} = useState('');
    const [readyDel, setReadyDel] = useState({});
    const [catergries, setCatergries] = useState([]);
    const [dialogVisible, setDialogVisible] = useState(false);

    getPhotoById(thing_id).then(res => {
        const data = res.row.array.map(item => {
            return {
                name: item.thing_name,
                photo:item.thing_photo,
                remark:item.thing_remark,
            }
        });
        setCatergries(data)
    });

    const handleDelete = ()=>{
        deleteThing(readyDel.id);
        const idx = catergries.indexOf(readyDel);
        idx >= 0 && catergries.splice(idx, 1);
        setDialogVisble(false);
    };

    const handleChange = ()=>{

    }

    return(
        <View style={styles.container}>
            <Image style={styles.ImageStyle} source={catergries.photo}/>
            <Text style={styles.TextStyle}>{catergries.name}</Text>
            <Text style={styles.TextStyle}>{catergries.remark}</Text>
            <Dialog visible={dialogVisible}
                    onDismiss={() => setDialogVisible(false)}>

            </Dialog>
            <View>
                <Button mode='contained' style={[styles.button]} title={strings.change}
                        onPress={() => handleChange}>
                    {strings.change}
                </Button>

                <Button mode='contained' style={[styles.button]} title={strings.delete}
                        onPress={() => handleDelete}>
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