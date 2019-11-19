import React from 'react';
import {Provider as PaperProvider, Button, Appbar} from 'react-native-paper';
import { StyleSheet, Text, View } from 'react-native';
import BottomNavigation from './compoments/BottomNavigation'
import {initDB} from "./storage/sqlite";
import AppNavigator from './StorageStackNavigator'

export default class App extends React.Component {
    constructor(props) {
        super(props);
        // initDB();
    }

    render() {
        return (
            <PaperProvider>
                <Appbar.Header>
                    <Appbar.Content
                        title="Locker"
                        subtitle="storage"
                    />

                </Appbar.Header>
                <BottomNavigation/>
            </PaperProvider>
        );
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
