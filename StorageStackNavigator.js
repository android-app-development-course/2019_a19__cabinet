import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import * as React from "react";

import StorageRoute from './compoments/StorageCompoment'
import AddCat from "./compoments/AddCat";
import AddThing from "./compoments/AddThing";
import ThingList from "./compoments/ThingList";
import ShowDetails from "./compoments/ShowDetails";



const StorageStackNavigator = createStackNavigator({
    storage: StorageRoute,
    addcat: AddCat,
    addthing: AddThing,
    thinglist: ThingList,
    thingdetails: ShowDetails,
}, {
    initialRouteName: 'storage',
    headerMode: 'none',
});

export default createAppContainer(StorageStackNavigator);
