import React from 'react';
import { StyleSheet, TextInput } from 'react-native';

type propsType = {
    placeholder: string,
    value: string,
    secureTextEntry: boolean,
    onChangeText: (text: string) => void
}

export default function Input({ placeholder, value, onChangeText, secureTextEntry }: propsType) {
    return (
        <TextInput
                style={styles.textInput}
                placeholder={placeholder}
                maxLength={50}
                autoCapitalize="none"
                autoCorrect={false}
                returnKeyType="done"
                value={value}
                onChangeText={onChangeText}
                secureTextEntry={secureTextEntry}
                placeholderTextColor="gray"
            />

    )
}

const styles = StyleSheet.create({
    textInput: {
        backgroundColor: "white",
        width: "100%",
        height: 50,
        boxSizing: "border-box",
        marginVertical: 10,
        marginHorizontal: 0,
        paddingVertical: 0,
        paddingHorizontal: 30,
        borderRadius: 20,
        color: "black",
        fontSize: 20,
        fontWeight: 600,
        fontFamily: "kotra",
        flexShrink : 1
    }
})
