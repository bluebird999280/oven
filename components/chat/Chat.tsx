import { ORANGE, WHITE } from '@constants/Colors';
import globalState from '@states';
import { useAtom } from 'jotai';
import React from 'react';
import {
    StyleSheet,
    Text,
    View,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

interface IProps {
    chatList: {
        senderNickname: string,
        sendTime : Date,
        content : string,
    }[]
}
export default function Chat({ chatList }: IProps) {
    const [nickname] = useAtom(globalState.nickname);

    return (
        <>
            {chatList?.map((chat, index) => (
                <View key={index}>
                    {chat.senderNickname === nickname ? (
                        <View style={styles.container}>
                            <View style={styles.row}>
                                <Text style={styles.timeText}>{chat.sendTime.toString()}</Text>
                                <View style={styles.textView}>
                                    <Text style={styles.messageText}>{chat.content}</Text>
                                </View>
                            </View>
                        </View>
                    ) : (
                        <View style={{...styles.container, marginLeft : 0}}>
                            <View style={styles.user}>
                                <Icon style={styles.userImage} name="person" size={20} />
                                <Text style={styles.userName}>{chat.senderNickname}</Text>
                            </View>
                            <View style={styles.row}>
                                <View style={{...styles.textView, backgroundColor : WHITE}} >
                                    <Text style={styles.messageText}>{chat.content}</Text>
                                </View>
                                <Text style={styles.timeText}>{chat.sendTime.toString()}</Text>
                            </View>
                        </View>
                    )}
                </View>
            ))}
        </>
    );
};

const styles = StyleSheet.create({
    container : {
        marginLeft : "auto",
        padding : 10
    },
    user : {
        marginVertical : 0,
        marginHorizontal : 20
    },
    userImage : {
        marginRight : 10
    },
    userName : {
        fontFamily : "kotra",
        fontSize : 20,
    },
    row : {
        flexDirection : "row",
        alignItems : "center",
    },
    textView : {
        backgroundColor : ORANGE,
        borderRadius : 10,
        padding : 15,
        marginVertical : 5,
        marginHorizontal : 10,
    },
    messageText : {
        fontFamily : "kotra",
        color : "black"
    },
    timeText : {
        marginVertical : 0,
        marginHorizontal : 5,
        fontFamily : "kotra"
    }
})