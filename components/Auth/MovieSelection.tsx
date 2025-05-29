import { BEIGE, RED } from '@constants/Colors';
import globalState from '@states';
import { useAtom } from 'jotai';
import React, { useState } from 'react';
import {
    ActivityIndicator,
    FlatList,
    Image,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';

export default function MovieSelection() {
    const [isLoading, setIsLoading] = useState(false);
    const [, setLastWorkId] = useAtom(globalState.lastWorkId);
    const [selectedWork, setSelectedWork] = useAtom(globalState.selectedWork);
    const [, setIsModalOpened] = useAtom(globalState.isSignupModal);
    const [workList, setWorkList] = useAtom(globalState.authWork);
    const [selectedPosters, setSelectedPosters] = useState<number[]>([]);

    const onEndReached = () => {
        if (!isLoading) { 
            setIsLoading(true);
            // getWorksAPI();
            setIsLoading(false);
        }
    };

    const handleMoviePress = (workId: number) => {
        if (selectedWork.includes(workId)) {
            setSelectedWork((prevSelectedWork) =>
                prevSelectedWork.filter((id) => id !== workId)
            );
        } else {
            setSelectedWork((prevSelectedWork) => [...prevSelectedWork, workId]);
        }
    };

    const isSelected = (workId: number) => selectedPosters.includes(workId);

    return (
        <View style={styles.searchResultBox}>
            <FlatList
                data={workList}
                numColumns={3}
                showsVerticalScrollIndicator={false}
                keyExtractor={(item) => item.workId.toString()}

                renderItem={({ item }) => {
                    const isPosterSelected = selectedWork.includes(item.workId);
                    return (
                        <TouchableOpacity style={styles.movie} onPress={() => handleMoviePress(item.workId)}>
                            <Image
                                src={item.poster}
                                style={{
                                    ...styles.moviePoster,
                                    ...(isPosterSelected ? { borderWidth: 3, borderColor: RED, opacity: 0.3 } : { borderWidth: 1, borderColor: "transparent", opacity: 1 })
                                }}
                            />

                            <Text style={styles.movieTitle} numberOfLines={2}>{item.title}</Text>
                        </TouchableOpacity>
                    );
                }}
                onEndReached={onEndReached}
                onEndReachedThreshold={0.1}
                disableVirtualization={false}
                ListFooterComponent={isLoading ? <ActivityIndicator size="large" /> : <></>}
            ></FlatList>
        </View>
    );
};

const styles = StyleSheet.create({
    searchResultBox: {
        width: "100%",
        paddingHorizontal: 10,
        paddingVertical: 0,
        alignItems: "center",
        height: 600
    },
    movie: {
        width: 100,
        margin: 5,
        height: 180,
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "center"
    },
    moviePoster: {
        backgroundColor: BEIGE,
        width: 100,
        height: 150,
        borderRadius: 20,
    },
    movieTitle: {
        fontSize: 12,
        marginTop: 5,
        textAlign: "center",
        fontWeight: 700,
        fontFamily: "kotra"
    }
})