import { View, TextInput, Image, StyleSheet, Text, TouchableOpacity } from 'react-native';
import React from 'react';
import CameraRoll from '../images/cameraroll.png';
import { Colors } from '../utils/Colors';
import * as ImagePicker from 'expo-image-picker';
import { useContext } from 'react';
import { MyUserContext } from "../App";
import VectorIcon from '../utils/VectorIcon';

const PostStatus = () => {
    const [user, dispatch] = useContext(MyUserContext);

    const openImagePicker = async () => {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

        if (status !== 'granted') {
            console.log('Permission not granted');
            return;
        }

        const options = {
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsMultipleSelection: true,
        };

        const result = await ImagePicker.launchImageLibraryAsync(options);

        if (result.cancelled) {
            console.log('User cancelled image picker');
        } else {
            const selectedImages = result.assets;
            // Xử lý các ảnh đã chọn ở đây
        }
    };

    return (
        <View style={styles.wrapper}>
            <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Posts</Text>
            <View style={styles.container}>
                <Image source={{ uri: user.avatar }} style={styles.profileStyle} />
                <View style={styles.inputBox}>
                    <Text style={styles.inputStyle}>Post a status, {user.firstname}?</Text>
                </View>
                <TouchableOpacity onPress={openImagePicker}>
                    <Image source={CameraRoll} style={styles.cameraRoll} />
                </TouchableOpacity>
            </View>
            <View style={styles.container}>
                <TouchableOpacity style={styles.postOption}>
                    <VectorIcon
                        name="images"
                        type="Ionicons"
                        size={20}>
                    </VectorIcon>
                    <Text style={styles.postOptionLabel}>Photo</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.postOption}>
                    <VectorIcon
                        name="location"
                        type="Ionicons"
                        size={20}
                    >
                    </VectorIcon>
                    <Text style={styles.postOptionLabel}>Check In</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.postOption}>
                    <VectorIcon
                        name="flag"
                        type="Ionicons"
                        size={20}
                    >
                    </VectorIcon>
                    <Text style={styles.postOptionLabel}>Life Event</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    wrapper: {
        padding: 10
    },
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 10,
        alignItems: 'center',
    },
    profileStyle: {
        height: 40,
        width: 40,
        borderRadius: 50,
    },
    inputBox: {
        borderWidth: 1,
        borderColor: Colors.borderGrey,
        borderRadius: 30,
        paddingHorizontal: 20,
        width: '70%',
        paddingVertical: 8,
    },
    inputStyle: {
        fontSize: 16,
        color: Colors.grey,
    },
    postOption: {
        flexDirection: 'row',
        padding: 10,
        alignItems: 'center',
    },
    postOptionLabel: {
        marginLeft: 5
    }
});

export default PostStatus;