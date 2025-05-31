import DashedVerticalLine from '@components/css/DashedVerticalLine';
import { BROWN } from '@constants/Colors';
import globalState from '@states';
import { useAtom } from 'jotai';
import { Image, StyleSheet, Text, View } from 'react-native';

interface IProps {
    index: number,
    title: string,
    wholeNum: number,
    count: number,
    providerId: number,
    max: boolean
}

export default function ChatRoomButton({ index, title, wholeNum, count, providerId, max }: IProps) {
    const [clickedOtt, setClickedOtt] = useAtom(globalState.clickedOtt);

    const otts = [
        {
            ottid: 1,
            src: require('@assets/img/Netflix.png'),
        },
        {
            ottid: 2,
            src: require('@assets/img/Tving.png'),
        },
        {
            ottid: 3,
            src: require('@assets/img/Wavve.png'),
        },
        {
            ottid: 4,
            src: require('@assets/img/DisneyPlus.jpeg'),
        },
        {
            ottid: 5,
            src: require('@assets/img/CoupangPlay.png'),
        },
        {
            ottid: 6,
            src: require('@assets/img/Watcha.png'),
        },
        {
            ottid: 7,
            src: require('@assets/img/AppleTv.png'),
        },
    ];

    const findOtt = otts.find((item) => item.ottid === providerId); // clickedOtt로 바꾸기

    return (
        //추가 작업: max면 비활성화 처리하기 - 구독목록에서만 ....
        <View key={index} style={{
            ...styles.container,
            opacity: max ? 0.3 : 1,
        }}
        >
            <View style={styles.ottView}>
                <Image style={styles.ottLogo} source={findOtt?.src} />
            </View>

            <DashedVerticalLine />

            <View style={styles.column}>
                <Text style={styles.roomName}>{title}</Text>
                <Text style={styles.leftNum}>
                    {count}명/{wholeNum}명
                </Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: "90%",
        height: 90,
        backgroundColor: "white",
        borderRadius: 20,
        flexDirection: "row",
        flex: 1
    },
    ottView: {
        width: "30%",
        height: "100%",
        justifyContent: "center",
        alignItems: "center",
    },
    ottLogo: {
        width: 50,
        height: 50,
        borderRadius: 15
    },
    column: {
        flexDirection: "column",
        width: "60%",
        justifyContent: "center",
        alignItems: "center"
    },
    roomName: {
        fontWeight: 800,
        fontSize: 23,
        fontFamily: "kotra",
        color: BROWN
    },
    leftNum: {
        fontFamily: "kotra",
        marginTop: 10,
        color: BROWN,
        fontSize: 16
    }
})