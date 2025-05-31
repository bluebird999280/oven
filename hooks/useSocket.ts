import AsyncStorage from "@react-native-async-storage/async-storage";
import * as StompJs from "@stomp/stompjs";
import { useEffect, useRef } from "react";

type chatType = {
    content: any;
    sendTime: any;
    senderUsername: any;
    senderNickname: any;
}

export default function useSocket(roomId : string, setChatList : React.Dispatch<React.SetStateAction<chatType[]>>) {
    const client = useRef<StompJs.Client | undefined>(undefined);

    useEffect(() => {
        async function connect() {
            const accessToken = await AsyncStorage.getItem("accessToken");
            if(!!accessToken) return;

            client.current = new StompJs.Client({
                brokerURL: "wss//localhost:8082",
                connectHeaders: {
                    ContentType: "application/json",
                    Authorization: `Bearer ${accessToken}`
                },
                debug: (str) => console.log(`[DEBUG] ${str}`),
                onConnect: () => {
                    client.current?.subscribe(`/sub/chatrooms/${roomId}/message`, (message) => {
                        const messageBody = JSON.parse(message.body);
                        const { content, sendTime, senderUsername, senderNickname } = messageBody;

                        if (content === "") return;
                        const newChat = {
                            content,
                            sendTime,
                            senderUsername,
                            senderNickname,
                        };
                        setChatList((prevChatList) => [...prevChatList, newChat]);
                    })
                },
            })
            client.current?.activate();
        }
        connect();

        return () => {
            client.current?.deactivate();
        }
    }, [roomId, AsyncStorage])

    return client.current;
};