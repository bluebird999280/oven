import {
    Button,
    SafeAreaView,
    StyleSheet,
    Text,
} from 'react-native';

import { loginApi } from '@apis/login';
import AuthButton from '@components/Auth/AuthButton';
import Input from '@components/Auth/Input';
import SplashLogo from '@components/Layout/SplashLogo';
import { BEIGE, BROWN, ORANGE } from '@constants/Colors';
import globalState from "@states";
import { Link } from 'expo-router';
import { useAtom } from 'jotai';
import { useState } from 'react';

export default function RegisterScreen() {
    const [isLogin, setIsLogin] = useAtom(globalState.isLogin);
    const [nickname, setNickname] = useAtom(globalState.nickname);
    const [userId, setUserId] = useAtom(globalState.userId);

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState("");

    const HandleChangeUsername = (id: string) => {
        setUsername(id);
    };
    const HandleChangePassword = (password: string) => {
        setPassword(password);
    };

    const login = async () => {
        if (username !== "" && password !== "") {
            try {
                const { accessToken, refreshToken, nickname, userId } = await loginApi(username, password);

                setErrorMessage("");
                setUsername("");
                setPassword("");
                setUserId(userId);
                setNickname(nickname);

                localStorage.setItem("accessToken", accessToken);
                localStorage.setItem("refreshToken", refreshToken);
            } catch (e) {
                setErrorMessage(e as string);
            }
        }
    }

    return (
        <SafeAreaView style={styles.container}>
            <SplashLogo />
            <Text style={styles.Title}>로그인</Text>
            <Input placeholder="아이디" value={username} onChangeText={HandleChangeUsername} secureTextEntry={false} />
            <Input
                placeholder="비밀번호"
                value={password}
                onChangeText={HandleChangePassword}
                secureTextEntry={true}
            />
            <AuthButton text="로그인" onPress={login} />
            <Link href="/RegisteScreen">
                <Button
                    title="회원가입"
                    onPress={pressButton}
                />
            </Link>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: BEIGE
    },
    ovenText: {
        color: ORANGE,
        fontSize: 70,
        fontWeight: 800,
        marginVertical: 20,
        marginHorizontal: 0,
        fontFamily: "chab",
    },
    Title: {
        color: BROWN,
        fontSize: 40,
        fontWeight: 500,
        marginVertical: 20,
        marginHorizontal: 0,
        fontFamily: 'chab',
    },
    OvenLogo: {
        width: 100,
        height: 100
    }
})
