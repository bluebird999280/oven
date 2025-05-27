import { useNavigation } from '@react-navigation/native';
import {
    Button,
    SafeAreaView,
    StyleSheet,
    Text,
} from 'react-native';

import AuthButton from '@components/Auth/AuthButton';
import Input from '@components/Auth/Input';
import SplashLogo from '@components/Layout/SplashLogo';
import { BEIGE, BROWN, ORANGE } from '@constants/Colors';
import { useState } from 'react';

export default function LoginScreen() {
    const navigation = useNavigation();
    const [isLogin, setIsLogin] = useState("");
    const [user, setUser] = useState("");
    const [userid, setUserid] = useState("");
    const [id, setId] = useState('');
    const [password, setPassword] = useState('');

    const HandleChangeId = (id: string) => {
        setId(id);
    };
    const HandleChangePassword = (password: string) => {
        setPassword(password);
    };
    const pressButton = () => {
        // navigation.navigate("Register")
    };
    const login = () => {
        alert("로그인")
    }

    return (
        <SafeAreaView style={styles.container}>
            <SplashLogo />
            <Text style={styles.Title}>로그인</Text>
            <Input placeholder="아이디" value={id} onChangeText={HandleChangeId} secureTextEntry={false} />
            <Input
                placeholder="비밀번호"
                value={password}
                onChangeText={HandleChangePassword}
                secureTextEntry={true}
            />
            <AuthButton text="로그인" onPress={login} />
            <Button
                title="회원가입"
                onPress={pressButton}
            />
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
