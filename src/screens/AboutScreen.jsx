import React from 'react';
import {View, Text, StyleSheet } from 'react-native';
import { HeaderButtons , Item} from 'react-navigation-header-buttons';

import { AppHeaderIcon } from '../components/AppHeaderIcon';

export const AboutScreen = () => {
    return (
        <View style={styles.center}>
            <Text>About Screen</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    center: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    }
});

AboutScreen.navigationOptions = ({navigation}) => ({
    headerTitle: 'About',
    headerLeft: (
        <HeaderButtons HeaderButtonComponent={AppHeaderIcon}>
            <Item title="Toggle Drawer" iconName='ios-menu' onPress={() => navigation.toggleDrawer() } />
        </HeaderButtons>
    ),
});