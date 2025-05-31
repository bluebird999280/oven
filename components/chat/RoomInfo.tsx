import { BEIGE, BLACK, BROWN } from '@constants/Colors';
import React from 'react';
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';

interface IProps {
    chatRoomInfo : {
        title : string,
        count : number,
        wholeNum: number
    } | undefined
}

export default function RoomInfo({ chatRoomInfo } : IProps) {
    return (
        <View style={styles.container}>
            <Text style={styles.roomName}>{chatRoomInfo?.title}</Text>
            <Text style={styles.pnum}>
                {chatRoomInfo?.count}명/{chatRoomInfo?.wholeNum}명
            </Text>
            <Text style={styles.payDate}>다음 결제일: 9월 8일</Text>
            <TouchableOpacity style={styles.changeDateButton}>
                <Text style={styles.buttonText}>결제일 수정하기</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: "100%",
        height: 100,
        backgroundColor: BROWN,
        alignItems: "center",
        justifyContent: "space-evenly",
        paddingVertical: 20,
        paddingHorizontal: 0
    },
    roomName: {
        fontSize: 27,
        fontWeight: 700,
        fontFamily: "kotra",
        color: BEIGE
    },
    payDate: {
        fontFamily: "kotra",
        fontSize: 17,
        color: BEIGE
    },
    changeDateButton: {
        borderWidth: 1,
        borderColor: BLACK,
        width: 150,
        height: 30,
        justifyContent: "center",
        alignItems: "center"
    },
    buttonText: {
        fontFamily: "kotra"
    },
    pnum: {
        marginLeft: "auto",
        marginRight: 20,
        fontFamily: "kotra",
        fontSize: 17,
        color: BEIGE
    }
})