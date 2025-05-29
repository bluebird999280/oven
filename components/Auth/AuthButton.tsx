import { BEIGE, BROWN } from '@constants/Colors';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

type PropsType = {
    text: string,
    onPress: () => void
}

export default function AuthButton({ text, onPress }: PropsType) {
    return (
        <TouchableOpacity style={styles.button} onPress={onPress}>
            <Text style={styles.text}>{text}</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        height: 50,
        width: 300,
        backgroundColor: BROWN,
        borderRadius: 20,
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 20,
        marginTop: 20,
    },

    text: {
        color: BEIGE,
        fontSize: 18,
        fontWeight: 800,
        fontFamily: "kotra"
    }
})
