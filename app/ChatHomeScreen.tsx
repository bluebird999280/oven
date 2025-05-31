import { BROWN } from '@constants/Colors';
import { useIsFocused } from '@react-navigation/native';
import globalState from '@states';
import axios from 'axios';
import { useAtom } from 'jotai';
import React, { useEffect, useState } from 'react';
import { Alert, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import ChatRoomButton from '../../components/Chat/ChatHomeScreen/ChatRoomButton';
import MainLayout from '../../components/Layout/MainLayout';

type myChatRoomsType = {
    chatroomId : number, 
    title : string, 
    max : number
    count : number, 
    wholeNum : number,
    providerId : number,
}[]

const ChatHomeScreen = () => {
    const [myChatRooms, setMyChatRooms] = useState<myChatRoomsType>([]);
    const [isLogin, setIsLogin] = useAtom(globalState.isLogin);
    const isFocused = useIsFocused();

    useEffect(() => {
        AsyncStorage.getItem('accessToken')
            .then((value) => {
                getMyChatRoomsAPI(value);
            })
            .catch((error) => {
                console.log('Error getting access token:', error);
            });
    }, [isFocused]);

    const getMyChatRoomsAPI = async (accessToken) => {
        await axios
            .get(`${baseURL}/chatrooms/my`, {
                headers: {
                    'Content-Type': `application/json`,
                    Authorization: `Bearer ${accessToken}`,
                },
            })
            .then((response) => {
                setMyChatRooms(response.data.data);
            })
            .catch(function (error) {
                Alert.alert('로그인이 만료되었습니다. 다시 로그인하세요.');
                setIsLogin(false);
            });
    };

    return (
        <MainLayout>
            <ScrollView style={styles.scroller}>
                <Text style={styles.subTitle}>내가 참여 중인 구독방</Text>
                <View style={styles.chatRoomListContainer} >
                    {!!myChatRooms
                        && myChatRooms.map(
                            ({ chatroomId, title, wholeNum, count, providerId, max }) => (
                                <TouchableOpacity
                                    style={styles.touchable}
                                    onPress={() =>
                                        navigation.navigate('ChatRoomScreen', { chatroomId })
                                    }
                                >
                                    <ChatRoomButton
                                        index={chatroomId}
                                        title={title}
                                        wholeNum={wholeNum}
                                        count={count}
                                        providerId={providerId}
                                        max={max}
                                    />
                                </TouchableOpacity>
                            )
                        )
                    }
                </View>
            </ScrollView>
        </MainLayout>
    );
};

const styles = StyleSheet.create({
    touchable: {
        width: "100%",
        alignItems: "center",
        height: 90,
        marginVertical: 5,
        marginHorizontal: 0
    },
    scroller: {
        width: "100%"
    },
    chatRoomListContainer: {
        width: "100%",
        marginTop: 10,
        height: 1000
    },
    subTitle: {
        marginRight: "auto",
        marginLeft: 20,
        fontSize: 26,
        fontWeight: 500,
        marginTop: 8,
        color: BROWN,
        fontFamily: "chan"
    }
});
