import {useState, useEffect} from 'react';
import * as React from 'react';
import {List, Divider, Avatar, Portal, Dialog, Paragraph, Button} from 'react-native-paper';
import {
    StyleSheet,
    FlatList,
    View,
    Text,
    Linking,
} from 'react-native';

import {expo} from '../app.json';

const {version} = expo;

const avatarStyle = StyleSheet.create({
    center: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: 30
    }
});

const strings = {
    openSourceAt: 'Open source at',
    setting: 'Setting',
    author: 'Author',
    accountInformation: 'Account Information',
    version: 'Version',
    about: 'About',

};

export default function ThingList(props) {
    const [dialogVisibe, setDialogVisibe] = useState(false);
    const [dialogTitle, setdialogTitle] = useState('');
    const [dialogContent, setDialogContent] = useState('');
    const github_repo_link = 'https://github.com/android-app-development-course/2019_a19__cabinet';
    const handlePressAuthor = () => {
        setdialogTitle('Author');
        setDialogContent(
            <Text>
                {strings.openSourceAt}{'\n'}
                <Text style={{color: 'blue'}}
                      onPress={() => Linking.openURL(github_repo_link)}>{github_repo_link}
                </Text>
            </Text>
        );
        setDialogVisibe(true);
    };

    return (
        <View>
            <Portal>
                <Dialog
                    visible={dialogVisibe}
                    onDismiss={() => setDialogVisibe(false)}>
                    <Dialog.Title>{dialogTitle}</Dialog.Title>
                    <Dialog.Content>
                        <Paragraph>{dialogContent}</Paragraph>
                    </Dialog.Content>
                    <Dialog.Actions>
                        <Button onPress={() => setDialogVisibe(false)}>Done</Button>
                    </Dialog.Actions>
                </Dialog>
            </Portal>
            <View style={avatarStyle.center}>
                <Avatar.Image size={100} source={require('../assets/avatar.png')}/>
            </View>
            <Divider/>
            <List.Section>
                <List.Subheader>{strings.setting}</List.Subheader>
                <List.Item
                    title={strings.accountInformation}
                    left={() => <List.Icon color="#000" icon="apps"/>}
                />
            </List.Section>
            <List.Subheader>{strings.about}</List.Subheader>
            <List.Item
                title={strings.version}
                left={() => <List.Icon color="#000" icon="git"/>}
            />
            <List.Item
                title={strings.author}
                description={version}
                left={() => <List.Icon color="#000" icon="account-supervisor"/>}
                onPress={() => handlePressAuthor()}
            />
            <List.Section>

            </List.Section>
        </View>
    );
}
