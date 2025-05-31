import Logo from '@components/common/Logo';
import { BEIGE } from '@constants/Colors';
import { StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
interface IProps {
    children : React.ReactElement
}

export default function MainLayout({ children } : IProps)  {
    return (
        <SafeAreaView style={styles.background}>
            <Logo />
            <View style={styles.children}>{children}</View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    background: {
        backgroundColor: BEIGE,
        width: "100%",
        height: "100%",
    },
    children: {
        width: "100%",
        alignItems: "center"
    }
})
