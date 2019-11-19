import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import {createMaterialBottomTabNavigator} from "react-navigation-material-bottom-tabs";

import StorageRoute from './compoments/StorageCompoment'
import AddCat from "./compoments/AddCat";
import {Text} from "react-native-paper";
import * as React from "react";

const MyRoute = () => <Text>Albums</Text>;


const StorageStackNavigator = createStackNavigator({
    storage: StorageRoute,
    addcat: AddCat
}, {
    initialRouteName: 'storage',
    headerMode: 'none',
});

export default createAppContainer(StorageStackNavigator);
