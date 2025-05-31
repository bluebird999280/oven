import MovieSelection from '@components/auth/MovieSelection';
import { BEIGE, BROWN, DARKRED, RED } from '@constants/Colors';
import globalState from '@states';
import { useAtom } from 'jotai';
import React from 'react';
import {
    Modal,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';

export default function AuthModal() {
    const [isModalOpened, setIsModalOpened] = useAtom(globalState.isModal);
    const [selectedWork, setSelectedWork] = useAtom(globalState.selectedWork);
    const isButtonDisabled = selectedWork.length >= 10;

    return (
        <Modal animationType="fade" style={styles.container}>
            <View style={styles.background}>
                <View style={styles.wrapper}>
                    <Text style={styles.title}>관심 작품 선택하기</Text>
                    <Text style={styles.title}>10개의 작품을 선택하세요</Text>
                    <View style={styles.movieContainer}>
                        <MovieSelection />
                    </View>
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity onPress={() => setIsModalOpened(false)}>
                            <Text style={styles.close}>뒤로가기</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => { }}
                            activeOpacity={isButtonDisabled ? 1 : 0.7}
                        >
                            <Text
                                style={{
                                    ...styles.submit,
                                    fontSize: isButtonDisabled ? 25 : 20,
                                    color: isButtonDisabled ? DARKRED : "gray"
                                }}
                                disabled={isButtonDisabled}
                            >
                                회원가입
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        width: "100%",
        height: "100%"
    },
    background: {
        width: "100%",
        height: "100%",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: BEIGE,
    },
    wrapper: {
        width: "90%",
        height: 760,
        margin: 20,
        padding: 20,
        borderRadius: 20,
        alignItems: "center",
        position: "relative",
        backgroundColor: 'white',

        shadowColor: '#ffffff',
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 5,
    },
    title: {
        fontSize: 30,
        marginTop: 20,
        fontWeight: 700,
        fontFamily: 'chab',
        color: BROWN,
    },
    subTitle: {
        fontSize: 20,
        marginTop: 5,
        fontWeight: 700,
        fontFamily: 'kotra',
        color: RED,
    },
    close: {
        fontSize: 20,
        fontWeight: 700,
        color: BROWN,
        fontFamily: 'kotra',
        justifyContent: "center",
        alignItems: "center",
    },
    submit: {
        fontSize: 20,
        fontWeight: 700,
        fontFamily: 'kotra',
    },
    movieContainer: {
        justifyContent: "center",
        width: "100%",
        height: 600,
        alignItems: "center",
    },
    buttonContainer: {
        flexDirection: "row",
        justifyContent: "space-around",
        width: "100%",
        height: 40,
        alignItems: "center",
        backgroundColor: "white",
    }
})