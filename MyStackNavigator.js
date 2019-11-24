import * as React from "react";
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';

import MyCompomnet from "./compoments/MyCompomnet";


const StorageStackNavigator = createStackNavigator({
    my: MyCompomnet,
}, {
    initialRouteName: 'my',
    headerMode: 'none',
});

export default createAppContainer(StorageStackNavigator);
