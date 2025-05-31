import {
    Pressable,
    SafeAreaView,
    StyleSheet,
    Text,
    View
} from 'react-native';

import { loginApi } from '@apis/auth';
import AuthButton from '@components/auth/AuthButton';
import Input from '@components/auth/Input';
import SplashLogo from '@components/layout/SplashLogo';
import { BEIGE, BROWN, RED, WHITE } from '@constants/Colors';
import AsyncStorage from '@react-native-async-storage/async-storage';
import globalState from "@states";
import { Link } from 'expo-router';
import { useAtom } from 'jotai';
import { useCallback, useState } from 'react';

export default function LoginScreen() {
    const [, setIsLogin] = useAtom(globalState.isLogin);
    const [, setNickname] = useAtom(globalState.nickname);
    const [, setUserId] = useAtom(globalState.userId);

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState("");

    const handleChangeUsername = (username: string) => {
        setUsername(username);
    };
    const handleChangePassword = (password: string) => {
        setPassword(password);
    };
    const login = useCallback(async () => {
        if (username === "") {
            setErrorMessage("아이디를 입력해주세요.");
            return;
        }

        if (password === "") {
            setErrorMessage("비밀번호를 입력해주세요.");
            return;
        }

        try {
            const { accessToken, refreshToken, nickname, userId } = await loginApi(username, password);

            setErrorMessage("");
            setUsername("");
            setPassword("");
            setIsLogin(true);
            setUserId(userId);
            setNickname(nickname);
            await AsyncStorage.setItem("accessToken", accessToken);
            await AsyncStorage.setItem("refreshToken", refreshToken);
        } catch (e) {
            console.log(e)
            setErrorMessage(e as string);
        }
    }, [username, password]);

    return (
        <SafeAreaView style={styles.container}>
            <SplashLogo />
            <Text style={styles.title}>로그인</Text>
            <Input placeholder="아이디" value={username} onChangeText={handleChangeUsername} secureTextEntry={false} />
            <Input
                placeholder="비밀번호"
                value={password}
                onChangeText={handleChangePassword}
                secureTextEntry={true}
            />
            {!!errorMessage &&
                (<View>
                    <Text style={styles.errorMessageText}>{errorMessage}</Text>
                </View>)
            }
            <AuthButton text="로그인" onPress={login} />
            <Link href="/RegisterScreen" asChild>
                <Pressable style={styles.button}>
                    <Text style={styles.text}>회원가입 하기</Text>
                </Pressable>
            </Link>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: BEIGE,
        paddingHorizontal: 20,
    },
    title: {
        color: BROWN,
        fontSize: 40,
        fontWeight: 500,
        marginVertical: 20,
        marginHorizontal: 0,
        fontFamily: 'chab',
    },
    button: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 4,
        backgroundColor: WHITE
    },
    text: {
        color: "black",
        fontSize: 15,
        fontWeight: 600,
        fontFamily: "kotra"
    },
    errorMessageText: {
        color: RED,
        fontSize: 13,
        fontFamily: "kotra"
    }
})
