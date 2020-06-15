import React, { useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { View, Text, StyleSheet, Image, Button, ScrollView, Alert } from 'react-native';
import { HeaderButtons , Item} from 'react-navigation-header-buttons';

import { AppHeaderIcon } from '../components/AppHeaderIcon';
import { toogleBooked, removePost } from '../store/actions/post';
import { THEME } from '../theme';

export const PostScreen = ({ navigation }) => {
    const dispatch = useDispatch();
    const postId = navigation.getParam('postId');
    const booked = useSelector(state => state.post.bookedPosts.some(post => post.id === postId));

    const post = useSelector(state => state.post.allPosts.find(post => post.id === postId) );

    const bookedHandler = useCallback(() => {
        dispatch(toogleBooked(post))
    }, [dispatch, post]);

    useEffect(() => {
        navigation.setParams({
            booked: booked
        })
    }, [booked]);

    useEffect(() => {
        navigation.setParams({
            toggleHandler: bookedHandler
        })
    }, [bookedHandler]);

    const rermoveHandler = () => {
        Alert.alert(
            'Delete post',
            'Do you want delete post?',
            [
                {
                    text: 'Cancel',
                    style: 'cancel',
                },
                { 
                    text: 'Delete', 
                    style: "destructive", 
                    onPress: () => {
                        navigation.navigate('Main');
                        dispatch(removePost(postId));
                    } 
                },
            ],
            { cancelable: false }
        );
    }

    if(!post) {
        return null;
    }

    return (
        <ScrollView >
            <Image source={{ uri: post.img }} style={styles.image} />
            <View style={styles.textWrp}>
                <Text style={styles.title}>{post.text}</Text>
            </View>

            <Button title='delete' color={THEME.DANGER_COLOR} onPress={rermoveHandler} />
        </ScrollView>
    )
};

PostScreen.navigationOptions = ({ navigation }) => {
    // headerTitle: 'Post',
    // defaultNavigationOptions: {
    //     headerStyle: {
    //         backgroundColor: Platform.OS === 'android' ? THEME.MAIN_COLOR : '#fff'
    //     },
    //     headerTintColor:  Platform.OS === 'android' ? '#fff' : THEME.MAIN_COLOR
    // }
    const postId = navigation.getParam('postId');
    const date = navigation.getParam('date');
    const booked = navigation.getParam('booked');
    const toggleHandler = navigation.getParam('toggleHandler');
    const iconName = booked ? 'ios-star' : 'ios-star-outline';
    return {
        headerTitle: `post ${new Date(date).toLocaleDateString()}`,
        headerRight: (
            <HeaderButtons HeaderButtonComponent={AppHeaderIcon}>
                <Item title="Toggle Drawer" iconName={iconName} onPress={toggleHandler} />
            </HeaderButtons>
        ),
    }
}

const styles = StyleSheet.create({
    image: {
        width: '100%',
        height: 200
    },
    textWrp: {
        padding: 10
    },
    title: {
        fontFamily: 'open-regular'
    }
});