import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import * as React from "react";

import StorageRoute from './compoments/StorageCompoment'
import AddCat from "./compoments/AddCat";
import AddThing from "./compoments/AddThing";
import ThingList from "./compoments/ThingList";
import showdetails from "./compoments/showdetails";



const StorageStackNavigator = createStackNavigator({
    storage: StorageRoute,
    addcat: AddCat,
    addthing: AddThing,
    thinglist: ThingList,
    thingdetails: showdetails,
}, {
    initialRouteName: 'storage',
    headerMode: 'none',
});

export default createAppContainer(StorageStackNavigator);
