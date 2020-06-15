import React from 'react';
import { View, Text, StyleSheet, Button, FlatList } from 'react-native';
import { Post } from './Post';

export const PostList = ({ data = [], onOpen }) => {
    if (!data.length) {
        return <View style={styles.wrapper}>
            <Text style={styles.noItems}>You don't have any posts.</Text>
        </View>
    }
    return (
        <View style={styles.wrapper}>
            <FlatList
                keyExtractor={post => post.id.toString()}
                renderItem={({ item }) => {
                    return <Post post={item} onOpen={onOpen} />
                }}
                data={data}
            />
        </View>
    )
};


const styles = StyleSheet.create({
    wrapper: {
        padding: 10
    },
    noItems: {
        textAlign: 'center',
        marginVertical: 10,
        fontSize: 18
    }
});