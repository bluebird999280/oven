import React, { useRef, useState } from 'react';
import {
    Dimensions,
    NativeScrollEvent,
    NativeSyntheticEvent,
    ScrollView,
    StyleSheet,
    View
} from 'react-native';
import Chat from './Chat';

interface IProps {
    chatList: {
        content: any;
        sendTime: any;
        senderUsername: any;
        senderNickname: any;
    }[]
}

export default function ChatBoard({ chatList }: IProps) {
    const chatScrollRef = useRef<ScrollView | null>(null);
    const chatContentRef = useRef<View | null>(null);
    const [totalChatHeight, setTotalChatHeight] = useState(0);

    const onScrollChat = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
        if (e?.nativeEvent.contentOffset.y == 0) {
            setTotalChatHeight(e.nativeEvent.contentSize.height);
        }
    };

    const onChangeChatSize = (contentWidth: number, contentHeight: number) => {
        chatContentRef.current?.measure((x, y, width, height) => {
            chatScrollRef.current?.scrollTo({
                x: 0,
                y: height - totalChatHeight,
                animated: false,
            });
        });
    };

    return (
        <View>
            <ScrollView
                ref={chatScrollRef}
                style={styles.wrapper}
                onScroll={onScrollChat}
                onContentSizeChange={onChangeChatSize}
                scrollEventThrottle={36}
                automaticallyAdjustKeyboardInsets={true}
            >
                <View ref={chatContentRef}>
                    <Chat chatList={chatList} />
                </View>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    wrapper: {
        width: "100%",
        height: Dimensions.get("window").height - 300
    }
})
