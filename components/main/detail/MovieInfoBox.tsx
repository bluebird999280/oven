import { getWorkDetailApi, putHeartedApi } from '@apis/work';
import SplashLayout from '@components/layout/SplashLayout';
import { BROWN, RED, WHITE } from '@constants/Colors';
import { FontAwesome } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import globalState from '@states';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useAtom } from 'jotai';
import React, { useEffect, useState } from 'react';
import {
    Alert,
    Dimensions,
    Image,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';

export default function MovieInfoBox() {
    const router = useRouter();
    const [token, setToken] = useState('');
    const [isStared, setIsStared] = useState(false);
    const [isHearted, setIsHearted] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [rating, setRating] = useAtom(globalState.rating);
    const [detailMovie, setDetailMovie] = useAtom(globalState.detailMovie);
    const [clickedMovie, setClickedMovie] = useAtom(globalState.clickedWork);
    const [isModalOpened, setIsModalOpened] = useAtom(globalState.isModal);
    const [isSummaryLoading, setIsSummaryLoading] = useAtom(globalState.isSummaryLoading);

    const { workId } = useLocalSearchParams<{ workId: string }>();

    useEffect(() => {
        async function getAccessToken() {
            try {
                const accessToken = await AsyncStorage.getItem("accessToken");
                if (accessToken === null || accessToken === "") return router.navigate("/auth/LoginScreen");

                setIsSummaryLoading(true);
                setClickedMovie(workId);
                setToken(accessToken);

                const { liked, rating } = await getWorkDetailApi(accessToken, workId);
                setIsHearted(liked);
                setIsStared(rating === null ? true : false)
                setIsSummaryLoading(false);
            } catch (e) {
                Alert.alert("Error");
            }
        }
    }, [workId])

    const pressLikedButton = async () => {
        const like = false;

        try {
            const isSuccess = await putHeartedApi(token, workId, like);
            if (isSuccess) setIsHearted(like);
        } catch (e) {
            if (typeof e === "string") {
                setErrorMessage(e);
            } else {
                setErrorMessage("알 수 없는 오류가 발생했습니다.");
            }
        }
    } 

    return (
        <>
            {isSummaryLoading ? (
                <SplashLayout />
            ) : (
                <View style={styles.container}>
                    <View style={styles.titleContainer}>
                        <Text style={styles.title}>{detailMovie?.titleKr || detailMovie?.titleEng || ''}</Text>
                    </View>
                    <Image style={styles.moviePoster} src={detailMovie?.poster || null} />
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity style={styles.columns} onPress={() => setIsModalOpened(true)}>
                            {isStared ? (
                                <FontAwesome style={styles.ratingButton} name="star" size={34} />
                            ) : (
                                <FontAwesome style={styles.ratingButton} name="star-o" size={34} />
                            )}
                            <Text style={styles.whiteText}>평가하기</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.columns} onPress={pressLikedButton}>
                            {isHearted ? (
                                <FontAwesome style={styles.heartButton} name="heart" size={34} />
                            ) : (
                                <FontAwesome style={styles.heartButton} name="heart-o" size={34} />
                            )}
                            <Text style={styles.whiteText}>찜하기</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.row}>
                        <View style={styles.textContainer}>
                            <Text style={styles.tab}>
                                장르:{' '}
                                {detailMovie && detailMovie.genre ? detailMovie.genre : ''}
                            </Text>
                            <Text style={styles.tab}>
                                출연:{' '}
                                {detailMovie && detailMovie.actor ? detailMovie.actor : ''}
                            </Text>
                            <Text style={styles.tab}>
                                감독:{' '}
                                {detailMovie && detailMovie.director
                                    ? detailMovie.director
                                    : ''}
                            </Text>
                            <Text style={styles.tab}>
                                OTT:{' '}
                                {(detailMovie &&
                                    detailMovie.providerList
                                        ?.map((provider) => provider.name)
                                        .join(', ')) ||
                                    ''}
                            </Text>
                        </View>
                    </View>
                </View>
            )}
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: "center",
        width: "80%"
    },
    titleContainer: {
        backgroundColor: WHITE,
        borderRadius: 20,
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        marginVertical: 20,
        marginHorizontal: 0,
        minWidth: Dimensions.get("window").width - 100
    },
    moviePoster: {
        backgroundColor: WHITE,
        width: Dimensions.get("window").width - 100,
        minWidth: 100,
        height: 300,
        position: "relative",
        borderRadius: 20,
        objectFit: "contain",
        marginBottom: 10
    },
    textContainer: {
        minHeight: 130,
        backgroundColor: WHITE,
        borderRadius: 20,
        paddingVertical: 10,
        paddingHorizontal: 20,
        width: Dimensions.get("window").width - 50
    },
    title: {
        fontSize: 26,
        color: BROWN,
        fontWeight: 700,
        fontFamily: "kotra"
    },
    tab: {
        fontSize: 18,
        marginVertical: 5,
        marginHorizontal: 0,
        color: BROWN,
        fontWeight: 500,
        fontFamily: "kotra"
    },
    buttonContainer: {
        flexDirection: "row",
        marginVertical: 10,
        marginHorizontal: 0
    },
    ratingButton: {
        padding: 5,
        color: BROWN,
    },
    heartButton: {
        padding: 5,
        color: RED,
    },
    row: {
        flexDirection: "row",
        alignItems: "center",
        marginVertical: 10,
        marginHorizontal: 0
    },
    columns: {
        flexDirection: "column",
        alignItems: "center",
        marginVertical: 0,
        marginHorizontal: 7,
        backgroundColor: WHITE,
        paddingVertical: 10,
        paddingHorizontal: 25,
        borderRadius: 20
    },
    whiteText: {
        color: BROWN,
        fontWeight: 700,
        fontFamily: "kotra"
    }
})
