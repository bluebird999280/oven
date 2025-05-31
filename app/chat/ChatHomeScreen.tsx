import { getMyChatRoomsApi } from '@apis/chat';
import ChatRoomButton from '@components/chat/ChatRoomButtom';
import MainLayout from '@components/layout/MainLayout';
import { BROWN } from '@constants/Colors';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useIsFocused } from '@react-navigation/native';
import globalState from '@states';
import { useRouter } from 'expo-router';
import { useAtom } from 'jotai';
import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

type myChatRoomsType = {
    chatroomId: number,
    title: string,
    max: boolean,
    count: number,
    wholeNum: number,
    providerId: number,
}

const exampleChatRoot = [
    {
        chatroomId: 1,
        title: "Test", wholeNum: 10, count: 2, providerId: 2, max: true
    }
]

export default function ChatHomeScreen() {
    const router = useRouter();
    const [errorMessage, setErrorMessage] = useState("");
    const [myChatRooms, setMyChatRooms] = useState<myChatRoomsType[]>(exampleChatRoot);
    const [isLogin, setIsLogin] = useAtom(globalState.isLogin);
    const isFocused = useIsFocused();

    useEffect(() => {
        async function getAccessToken() {
            try {
                const accessToken = await AsyncStorage.getItem("accessToken");
                if (accessToken === null) {
                    // router.navigate("/LoginScreen");
                    return;
                }

                const data = await getMyChatRoomsApi(accessToken);
                setMyChatRooms(data);
            } catch (e) {
                if (typeof e === "string") setErrorMessage(e as string);
                else setErrorMessage("알 수 없는 오류가 발생했습니다.");
            }
        }

        getAccessToken();
    }, [AsyncStorage, router])

    return (
        <MainLayout>
            <ScrollView style={styles.scroller}>
                <Text style={styles.subTitle}>내가 참여 중인 구독방</Text>
                <View style={styles.chatRoomListContainer} >
                    {myChatRooms.length > 0
                        ? myChatRooms.map(
                            ({ chatroomId, title, wholeNum, count, providerId, max }) => (
                                <TouchableOpacity
                                    style={styles.touchable}
                                >
                                    <ChatRoomButton
                                        index={chatroomId}
                                        title={title}
                                        wholeNum={wholeNum}
                                        count={count}
                                        providerId={providerId}
                                        max={false}
                                    />
                                </TouchableOpacity>
                            )
                        ) : <Text>{errorMessage}</Text>
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
