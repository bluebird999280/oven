import { checkUsernameApi, registerApi } from '@apis/auth';
import AuthButton from '@components/Auth/AuthButton';
import Input from '@components/Auth/Input';
import { BEIGE, BROWN, ORANGE, RED, WHITE } from '@constants/Colors';
import globalState from "@states";
import { useRouter } from 'expo-router';
import { useAtom } from 'jotai';
import { useCallback, useState } from 'react';
import {
    Alert,
    Image,
    SafeAreaView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';

export default function RegisterScreen() {
    const router = useRouter();
    const [name, setName] = useState("");
    const [id, setId] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirm, setPasswordConfirm] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [isDupChecked, setIsDupChecked] = useState(false);

    const [isModalOpened, setIsModalOpened] = useAtom(globalState.isModal);
    const [workList, setWorkList] = useAtom(globalState.authWork);
    const [lastWorkId, setLastWorkId] = useAtom(globalState.lastWorkId);

    const handleChangeName = (name: string) => {
        setName(name);
    };

    const handleChangeId = (id: string) => {
        setId(id);
    };

    const handleChangePassword = (password: string) => {
        setPassword(password);
    };

    const handleChangePasswordConfirm = (passwordConfirm: string) => {
        setPasswordConfirm(passwordConfirm);
    };

    const checkUsername = async () => {
        if (id === "") {
            setErrorMessage("아이디를 입력해주세요.");
            return;
        }

        try {
            await checkUsernameApi(id);
        } catch(e) {
            setErrorMessage(e as string);
        } finally {
            Alert.alert("아이디 중복 확인", `${id} 아이디를 사용하실 수 없습니다.`)
        }
    }

    const register = useCallback(async () => {
        if (name === "") {
            setErrorMessage("이름을 입력해주세요.");
            return;
        }

        if (id === "") {
            setErrorMessage("아이디를 입력해주세요.");
            return;
        }

        if (password === "") {
            setErrorMessage("비밀번호를 입력해주세요.");
            return;
        }

        if (passwordConfirm === "") {
            setErrorMessage("비밀번호 확인을 입력해주세요.");
            return;
        }

        try {
            const { accessToken, refreshToken, nickname, userId } = await registerApi(name, id, password, passwordConfirm);

            setErrorMessage("");
            setName("");
            setId("");
            setPassword("");
            setPasswordConfirm("");
            router.navigate("/LoginScreen");
        } catch (e) {
            setErrorMessage(e as string);
        }
    }, [name, id, password, passwordConfirm, router]);

    return (
        <SafeAreaView style={styles.container}>
            <Image style={styles.ovenLogo} source={require("@assets/img/oven_logo.png")} />
            <Text style={styles.title}>회원가입</Text>
            <Input
                placeholder="이름"
                value={name}
                onChangeText={handleChangeName}
                secureTextEntry={false}
            />
            <View style={styles.idInputWrapper}>
                <Input
                    placeholder="아이디"
                    value={id}
                    onChangeText={handleChangeId}
                    secureTextEntry={false}
                />
                <TouchableOpacity style={styles.checkDuplicationButton} onPress={checkUsername}>
                    <Text style={styles.duplicationText}>중복 체크</Text>
                </TouchableOpacity>
            </View>
            <Input
                placeholder="비밀번호"
                value={password}
                onChangeText={handleChangePassword}
                secureTextEntry={true}
            />
            <Input
                placeholder="비밀번호 확인"
                value={passwordConfirm}
                onChangeText={handleChangePasswordConfirm}
                secureTextEntry={true}
            />
            {!!errorMessage &&
                (<View>
                    <Text style={styles.errorMessageText}>{errorMessage}</Text>
                </View>)
            }
            <AuthButton text="회원가입하기" onPress={register} />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: BEIGE,
        paddingHorizontal: 20
    },
    title: {
        color: BROWN,
        fontSize: 40,
        fontWeight: 800,
        marginVertical: 20,
        marginHorizontal: 0,
        fontFamily: 'chab',
    },
    ovenLogo: {
        width: 250,
        height: 100,
        objectFit: "contain"
    },
    idInputWrapper: {
        width: "100%",
        display: "flex",
        alignItems: "center",
        flexDirection: "row",
        gap: 10
    },
    checkDuplicationButton: {
        width: "20%",
        height: 50,
        flexShrink: 1,
        borderRadius: 15,
        backgroundColor: ORANGE,
        justifyContent: "center",
        alignItems: "center",
    },
    duplicationText: {
        color: WHITE,
        fontFamily: "kotra",
        fontSize: 16
    },
    errorMessageText: {
        color: RED,
        fontSize: 13,
        fontFamily: "kotra"
    }
})