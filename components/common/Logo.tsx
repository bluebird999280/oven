import { RED } from '@constants/Colors';
import { StyleSheet, Text } from 'react-native';

export default function Logo() {
    return (
        <Text style={styels.container}>
            Oven
        </Text>
    )
}

const styels = StyleSheet.create({
    container: {
        fontWeight: 800,
        fontSize: 50,
        marginLeft: 20,
        fontFamily: "chab",
        color: RED,
        paddingBottom: 10
    }
})
