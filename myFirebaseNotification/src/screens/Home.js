import React, { useEffect } from 'react';
import {
    SafeAreaView,
    StyleSheet,
    Text,
    View,
    Button,
    BackHandler
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import PushNotification from "react-native-push-notification";

const Home = () => {
    const navigation = useNavigation();

    const ExitApp = () => {
        BackHandler.exitApp();
    };

    function handleExitButton() {
        ExitApp();
        return true;
    }

    useEffect(() => {
        BackHandler.addEventListener('hardwareBackPress', handleExitButton);
        return () => {
            BackHandler.removeEventListener(
                'hardwareBackPress',
                handleExitButton,
            );
        };
    }, []);

    const HandleNowNotification = () => {

        //delete all notification
        PushNotification.cancelAllLocalNotifications();

        //now notification
        PushNotification.localNotification({
            channelId: "test-channel",
            title: "Now Notification ",
            message: "nowNotification..",
            bigText: "nowNotification nowNotification nowNotification",
            color: "black",
        });
    }

    const HandleScheduleNotification = () => {
        //wait notification (alarm)
        PushNotification.localNotificationSchedule({
            channelId: "test-channel",
            title: "Schedule Notification ",
            message: "scheduleNotification..",
            bigText: "scheduleNotification scheduleNotification scheduleNotification",
            color: "black",
            date: new Date(Date.now() + 20 * 1000),
            allowWhileIdle: true,
        });
    }

    return (
        <SafeAreaView style={styles.background}>
            <View>
                <View style={styles.card}>
                    <Text style={styles.text}>
                        click for push notification!
                    </Text>
                    <Button title="on press" onPress={() => { HandleNowNotification() }} />
                </View>
                <View style={styles.card}>
                    <Text style={styles.text}>
                        click for schedule notification! 
                    </Text>
                    <Button title="on press" onPress={() => { HandleScheduleNotification() }} />
                </View>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    background: {
        flex: 1
    },
    card: {
        width: '100%',
        height: '50%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    text: {
        fontWeight: 'bold',
        fontSize: 20,
        color: 'black',
        margin: 5
    }
});

export default Home;