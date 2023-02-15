import React, { useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { StyleSheet, View } from 'react-native';
import PushNotification from "react-native-push-notification";
import Lottie from 'lottie-react-native';

const Splash = () => {
    const navigation = useNavigation();

    useEffect(() => {
        createChannels();
    }, [])

    const createChannels = () => {
        PushNotification.createChannel(
            {
                channelId: "test-channel",
                channelName: "Test Channel"
            }
        )
    }

    const myAnimation = () => {
        return (
            <Lottie
                source={require('../../Notification.json')}
                autoPlay
                loop={false}
                speed={1}
                onAnimationFinish={() => {
                    navigation.navigate("Home");
                }}
            />
        );
    };

    return (
        <View style={styles.background}>
            {myAnimation()}
        </View>
    )
}

const styles = StyleSheet.create({
    background: {
        flex: 1
    },
})

export default Splash;