import * as React from 'react';
import {BottomNavigation} from 'react-native-paper';
import StorageStackNavigator from "../StorageStackNavigator";
import MyStackNavigator from "../MyStackNavigator";


export default class BottomCompoment extends React.Component {
    state = {
        index: 0,
        routes: [
            {key: 'storage', title: 'Storage', icon: 'folder-multiple-outline'},
            {key: 'my', title: 'My', icon: 'account-multiple',},
        ],
    };

    _handleIndexChange = index => this.setState({index});

    _renderScene = BottomNavigation.SceneMap({
        storage: StorageStackNavigator,
        my: MyStackNavigator,
    });

    render() {
        return (
            <BottomNavigation
                navigationState={this.state}
                onIndexChange={this._handleIndexChange}
                renderScene={this._renderScene}
            />
        );
    }
}


// const TabNavigator = createMaterialBottomTabNavigator(
//     {
//         storage: {screen: StorageRoute},
//         my: MyRoute,
//         addcat: AddCat,
//     },
//     {
//         initialRoute: 'storage',
//         activeColor: '#f0edf6',
//         inactiveColor: '#3e2465',
//         barStyle: { backgroundColor: '#694fad' },
//     }
// );
//
// export default createAppContainer(TabNavigator);
