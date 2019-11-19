import * as React from 'react';
import {BottomNavigation, Text} from 'react-native-paper';


// const StorageRoute = () => <Text>Storage</Text>;
import Icon from 'react-native-vector-icons/Ionicons';
import StorageStackNavigator from "../StorageStackNavigator";

const MyRoute = () => <Text>Albums</Text>;


export default class MyComponent extends React.Component {
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
        my: MyRoute,
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
