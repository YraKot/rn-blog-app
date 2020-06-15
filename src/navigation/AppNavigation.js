import React from 'react';
import { Platform } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { createDrawerNavigator } from 'react-navigation-drawer';

import { MainScreen } from '../screens/MainScreen';
import { PostScreen } from '../screens/PostScreen';
import { AboutScreen } from '../screens/AboutScreen';
import { CreateScreen } from '../screens/CreateScreen';
import { BookmarkedScreen } from '../screens/BookmarkedScreen';
import { THEME } from '../theme';

const PostNavigator = createStackNavigator({
    Main: MainScreen,
    Post: {
        screen: PostScreen,
    }
}, {
    initialRouteName: 'Main',
    defaultNavigationOptions: {
        headerStyle: {
            backgroundColor: Platform.OS === 'android' ? THEME.MAIN_COLOR : '#fff'
        },
        headerTintColor: Platform.OS === 'android' ? '#fff' : THEME.MAIN_COLOR
    }
});

const AboutNavigator = createStackNavigator({
    About: {
        screen: AboutScreen
    },
}, {
    defaultNavigationOptions: {
        headerStyle: {
            backgroundColor: Platform.OS === 'android' ? THEME.MAIN_COLOR : '#fff'
        },
        headerTintColor: Platform.OS === 'android' ? '#fff' : THEME.MAIN_COLOR
    }
});

const CreateNavigator = createStackNavigator({
    Create: CreateScreen
}, {
    defaultNavigationOptions: {
        headerStyle: {
            backgroundColor: Platform.OS === 'android' ? THEME.MAIN_COLOR : '#fff'
        },
        headerTintColor: Platform.OS === 'android' ? '#fff' : THEME.MAIN_COLOR
    }
})

const BookedNavigator = createStackNavigator({
    Booked: BookmarkedScreen,
    Post: PostScreen,
}, {
    defaultNavigationOptions: {
        headerStyle: {
            backgroundColor: Platform.OS === 'android' ? THEME.MAIN_COLOR : '#fff'
        },
        headerTintColor: Platform.OS === 'android' ? '#fff' : THEME.MAIN_COLOR
    }
});

const bottomTabsConfig = {
    Post: {
        screen: PostNavigator,
        navigationOptions: {
            tabBarLabel: 'All',
            tabBarIcon: info => <Ionicons name="ios-albums" size={25} color={info.tintColor} />
        }
    },
    Booked: {
        screen: BookedNavigator,
        navigationOptions: {
            tabBarLabel: 'Bookmark',
            tabBarIcon: info => <Ionicons name="ios-star" size={25} color={info.tintColor} />
        }
    }
};

const BottomNavigator = Platform.OS === 'ios' ? createBottomTabNavigator(
    bottomTabsConfig, {
    tabBarOptions: {
        activeTintColor: THEME.MAIN_COLOR
    }
}) : createMaterialBottomTabNavigator(
    bottomTabsConfig,
    {
        activeTintColor: '#fff',
        barStyle: {
            backgroundColor: THEME.MAIN_COLOR
        }
    }
);

const MainNavigtor = createDrawerNavigator({
    PostTabs: {
        screen: BottomNavigator,
        navigationOptions: {
            drawerLabel: 'Home'
        }
    },
    About: {
        screen: AboutNavigator,
        navigationOptions: {
            drawerLabel: 'About App'
        }
    },
    Create: {
        screen: CreateNavigator,
        navigationOptions: {
            drawerLabel: 'Create Post'
        }
    }
}, {
    contentOptions: {
        activeTintColor: THEME.MAIN_COLOR,
        // labelStyle: {
        //     fontFamily: 'open-bold'
        // }
    }
});

// export const AppNavigation = createAppContainer(BottomNavigator);
export const AppNavigation = createAppContainer(MainNavigtor);

