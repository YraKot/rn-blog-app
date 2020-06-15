import React, { useEffect } from 'react';
import {View, ActivityIndicator, StyleSheet} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { HeaderButtons , Item} from 'react-navigation-header-buttons';

import { AppHeaderIcon } from '../components/AppHeaderIcon';
import { PostList } from '../components/PostList';
import { loadPosts } from '../store/actions/post';
import { THEME } from '../theme';

export const MainScreen = (props) => {
    const dispatch = useDispatch();
    const allPosts = useSelector(state => state.post.allPosts);
    const loading = useSelector(state => state.post.loading);

    

    const openPostHandler = (post) => {
        props.navigation.navigate('Post', {
            postId: post.id,
            date: post.date,
            booked: post.booked
        })
    }

    useEffect(() => {
        dispatch(loadPosts());
    }, [dispatch])

    if(loading) {
        return (
            <View style={styles.center}>
                <ActivityIndicator color={THEME.MAIN_COLOR} />
            </View>
        )
    } else {
        return <PostList data={allPosts} onOpen={openPostHandler} />
    }
}


MainScreen.navigationOptions = ({navigation}) => ({
    headerTitle: 'My blog',
    headerRight: (
        <HeaderButtons HeaderButtonComponent={AppHeaderIcon}>
            <Item title="take a photo" iconName='ios-camera' onPress={() => navigation.push('Create') } />
        </HeaderButtons>
    ),
    headerLeft: (
        <HeaderButtons HeaderButtonComponent={AppHeaderIcon}>
            <Item title="Toggle Drawer" iconName='ios-menu' onPress={() => navigation.toggleDrawer() } />
        </HeaderButtons>
    ),
});

const styles = StyleSheet.create({
    center: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
});
