import { BEIGE, BROWN, ORANGE, WHITE } from '@constants/Colors';
import React from 'react';
import {
    Dimensions,
    InputAccessoryView,
    StyleSheet,
    TextInput,
    View
} from 'react-native';
import { Icon } from 'react-native-vector-icons/Icon';

interface IProps {
    value: string,
    onChangeText: (text: string) => void,
    onPress: () => void
}

export default function ChatInput({ value, onChangeText, onPress }: IProps) {
    return (
        <View style={styles.container}>
            <InputAccessoryView style={{ flexDirection: 'row' }}>
                <TextInput
                    style={styles.messageInput}
                    value={value}
                    onChangeText={onChangeText}
                    onSubmitEditing={onPress}
                />
                <Icon
                    size={30}
                    name="paper-plane-outline"
                    style={styles.sendButton}
                    color={ORANGE}
                    onPress={onPress}
                />
            </InputAccessoryView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: Dimensions.get("window").width,
        backgroundColor: BEIGE,
        justifyContent: "center",
        alignItems: "center"
    },
    messageInput: {
        width: Dimensions.get("window").width,
        height: 50,
        borderWidth: 3,
        borderColor: BROWN,
        backgroundColor: WHITE,
        fontSize: 18,
        borderRadius: 20,
        fontFamily: "kotra",
        paddingVertical: 0,
        paddingHorizontal: 15,
        justifyContent: "center",
        alignItems: "center"
    },
    sendButton: {
        width: 50,
        height: 50,
        padding: 5,
        marginLeft: 5,
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        backgroundColor: 'pink'
    }
})