import { BEIGE } from "@constants/Colors";
import React, { useEffect, useRef } from 'react';
import { Animated, Image, StyleSheet, View } from 'react-native';

export default function SplashLayout() {
    const translateY = useRef(new Animated.Value(1)).current;

    useEffect(() => {
        const moveAnimation = Animated.sequence([
            Animated.timing(translateY, {
                toValue: -30,
                duration: 1500,
                useNativeDriver: true,
            }),
            Animated.timing(translateY, {
                toValue: 0,
                duration: 1500,
                useNativeDriver: true,
            }),
        ]);
        Animated.loop(moveAnimation).start();

        return () => moveAnimation.stop();
    }, [translateY]);

    return (
        <View style={styles.container}>
            <Animated.View
                style={{
                    transform: [{ translateY }],
                }}
            >
                <Image style={styles.splashImage} source={require('@assets/img/oven_logo.png')} />
            </Animated.View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: BEIGE
    },
    splashImage: {
        width: 300,
        height: 200,
        objectFit: "contain"
    }
})
