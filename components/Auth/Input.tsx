import React from 'react';
import { Dimensions, StyleSheet, TextInput } from 'react-native';

type propsType = {
    placeholder: string,
    value: string,
    secureTextEntry: boolean,
    onChangeText: (text : string) => void
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
        width: Dimensions.get('window').width - 60,
        height: 50,
        marginVertical: 10,
        marginHorizontal: 0,
        paddingVertical: 0,
        paddingHorizontal: 20,
        borderRadius: 20,
        color: "black",
        fontSize: 20,
        fontWeight: 600,
        fontFamily: "kotra",
    }
})
