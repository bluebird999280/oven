import ChatBoard from '@components/chat/ChatBoard';
import ChatInput from '@components/chat/ChatInput';
import RoomInfo from '@components/chat/RoomInfo';
import SplashScreen from '@components/layout/SplashLayout';
import { BEIGE } from '@constants/Colors';
import useSocket from '@hooks/useSocket';
import globalState from '@states';
import { useLocalSearchParams } from 'expo-router/build/hooks';
import { useAtom } from 'jotai';
import React, { useState } from 'react';
import { Alert, Dimensions, NativeSyntheticEvent, SafeAreaView, StyleSheet, TextInputSubmitEditingEventData, View } from 'react-native';

type chatType = {
    content: any;
    sendTime: any;
    senderUsername: any;
    senderNickname: any;
}

type chatRoomInfoType = {
    title: string,
    count: number,
    wholeNum: number
} | undefined


export default function ChatRoomScreen() {
    const { roomId } = useLocalSearchParams<{ roomId: string }>()
    const [userId] = useAtom(globalState.userId)
    const [chat, setChat] = useState('');
    const [chatList, setChatList] = useState<chatType[]>([]);
    const [showSplash, setShowSplash] = useState(true);
    const [chatRoomInfo, setChatRoomInfo] = useState<chatRoomInfoType>(undefined);

    const client = useSocket(roomId, setChatList);

    const handleMessage = (message: string) => {
       console.log(message)
    };

    const sendMessage = (e: NativeSyntheticEvent<TextInputSubmitEditingEventData>) => {
        if (e.nativeEvent.text === "" || client === undefined || !client.connected) {
            Alert.alert("메세지를 보내는데 실패하였습니다.")
            return;
        }

        client?.publish({
            destination: `/pub/chatrooms/${roomId}/message`,
            body: JSON.stringify({
                userId: userId,
                content: chat,
            }),
        });
        setChat('');
    }

    return (
        <>
            {showSplash ? (
                <SplashScreen />
            ) : (
                <SafeAreaView>
                    <View style={styles.container}>
                        <RoomInfo chatRoomInfo={chatRoomInfo} />
                        <ChatBoard chatList={chatList} />
                        <ChatInput
                            value={chat}
                            onChangeText={handleMessage}
                            onPress={sendMessage}
                        />
                    </View>
                </SafeAreaView>
            )}
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        width: Dimensions.get("window").width,
        height: Dimensions.get("window").height,
        alignItems: "center",
        backgroundColor: BEIGE
    }
})

