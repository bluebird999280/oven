import React, { useEffect, useRef } from 'react';
import { Animated, Image, StyleSheet, View } from 'react-native';

const SplashLogo = () => {
    const translateY = useRef(new Animated.Value(1)).current;

    useEffect(() => {
        const moveAnimation = Animated.sequence([
            Animated.timing(translateY, {
                toValue: -20, // 위로 이동할 거리
                duration: 1500,
                useNativeDriver: true,
            }),
            Animated.timing(translateY, {
                toValue: 0, // 다시 원래 위치로 이동
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
                <Image style={styles.splashImage} source={require("@assets/img/oven_logo.png")} />
            </Animated.View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        justifyContent: "center",
        alignItems: "center",
    },
    splashImage: {
        width: 300,
        height: 150,
        objectFit: "contain",
    }
})

export default SplashLogo;