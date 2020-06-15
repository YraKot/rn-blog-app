import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { HeaderButtons , Item} from 'react-navigation-header-buttons';

import { AppHeaderIcon } from '../components/AppHeaderIcon';
import { PostList } from '../components/PostList';
import { loadPosts } from '../store/actions/post';

export const BookmarkedScreen = (props) => {
    const dispatch = useDispatch();
    const bookedPosts = useSelector(state => state.post.bookedPosts);

    const openPostHandler = (post) => {
        props.navigation.navigate('Post', {
            postId: post.id,
            date: post.date,
            booked: post.booked
        })
    }

    // useEffect(() => {
    //     dispatch(loadPosts());
    // }, []);

    return <PostList data={bookedPosts} onOpen={openPostHandler} />
};

BookmarkedScreen.navigationOptions = ({navigation}) => ({
    headerTitle: 'My Bookmarked',
    headerLeft: (
        <HeaderButtons HeaderButtonComponent={AppHeaderIcon}>
            <Item title="Toggle Drawer" iconName='ios-menu' onPress={() => navigation.toggleDrawer() } />
        </HeaderButtons>
    ),
});