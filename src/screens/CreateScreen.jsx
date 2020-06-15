import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, TextInput, Image, Button, ScrollView, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { AppHeaderIcon } from '../components/AppHeaderIcon';
import { THEME } from '../theme';
import { useDispatch } from 'react-redux';
import { addPost } from '../store/actions/post';
import { PhotoPicker } from '../components/PhotoPicker';

export const CreateScreen = ({ navigation }) => {
    const [text, setText] = useState('');
    const dispatch = useDispatch();
    const pickRef = useRef();

    const createPost = () => {
        const post = {
            date: new Date().toJSON(),
            text: text,
            img: pickRef.current,
            booked: false
        }
        dispatch(addPost(post));
        navigation.navigate('Main');
    }

    const handlerPick = (uri) => {
        pickRef.current = uri;
    }

    return (
        <ScrollView>
            <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
                <View style={styles.wrapper}>
                    <Text style={styles.title}>Create New Post</Text>
                    <TextInput
                        style={styles.textarea}
                        placeholder='Enter text'
                        value={text}
                        onChangeText={setText}
                        multiline
                    />
                    <PhotoPicker onPick={handlerPick}/>
                    {/* <Image
                        style={styles.image}
                        source={{ uri: img }} /> */}
                    <Button title='Create Post' color={THEME.MAIN_COLOR} onPress={createPost} disabled={!text} />
                </View>
            </TouchableWithoutFeedback>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    wrapper: {
        padding: 10
    },
    title: {
        fontSize: 20,
        textAlign: 'center',
        marginBottom: 10
    },
    textarea: {
        padding: 10,
        marginBottom: 10
    },
    image: {
        width: '100%',
        height: 200,
        marginBottom: 10
    }
});

CreateScreen.navigationOptions = ({ navigation }) => ({
    headerTitle: 'Create Post',
    headerLeft: (
        <HeaderButtons HeaderButtonComponent={AppHeaderIcon}>
            <Item title="Toggle Drawer" iconName='ios-menu' onPress={() => navigation.toggleDrawer()} />
        </HeaderButtons>
    ),
});