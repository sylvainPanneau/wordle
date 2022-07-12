import { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Animated, Platform } from 'react-native';

export default function AnimatedLetter({ index, letter, solution, letterState, letterStateValue, setLetterState, readyToFlip }) {
    // Component that renders a letter capable of vertical flipping

    const [flip, setFlip] = useState(new Animated.Value(0));
    const [hasFlipped, setHasFlipped] = useState(false);
    const [duration, setDuration] = useState(410);
    const [progress, setProgress] = useState(0);
    const [rotation, setRotation] = useState(new Animated.Value(0));
    const [localColor, setLocalColor] = useState("#8e8e8e");

    useEffect(() => {
        console.log("letterStateValue : " + letterStateValue);
        if (letterStateValue == "correct") {
            setLetterState({
                ...letterState,
                [letter]: "correct"
            });
        }
        else if (letterStateValue == "present") {
            setLetterState({
                ...letterState,
                [letter]: "present"
            });
        }
        else {
            setLetterState({
                ...letterState,
                [letter]: "incorrect"
            });
        }
    }, [letterStateValue]);

    useEffect(() => {
        if (hasFlipped) {
            setTimeout(() => {
                if (letterState[letter] == "correct") {
                    setLocalColor("#3eaa4");
                }
                else if (letterState[letter] == "present") {
                    setLocalColor("#cd8729");
                }
                else if (letterState[letter] == "incorrect") {
                    setLocalColor("#8e8e8e");
                }
            }, duration * 0.55 + index * 400);
        }
        setHasFlipped(false);
    }, [letterState, hasFlipped]);

    useEffect(() => {
        if (readyToFlip) {
            setTimeout(() => {
                Animated.timing(flip, {
                    toValue: 1,
                    duration: duration,
                    useNativeDriver: true,
                }).start(() => {
                    setFlip(new Animated.Value(0));
                    setProgress(0);
                });
            }, index * 400);
        }
        setHasFlipped(true);
    }, [readyToFlip]);

    return (
        <>
            <Animated.View style={[styles.container, styles.item, {
                backgroundColor: localColor,
                transform: [
                    { perspective: 1000 },
                    { rotateX: flip.interpolate({ inputRange: [0, 1], outputRange: ['180deg', '0deg'] }) },
                ]
            }]}>
                <Animated.Text style={[styles.letter, {
                    transform: [
                        { perspective: 1000 },
                        { rotateX: flip.interpolate({ inputRange: [0, 1], outputRange: ['180deg', '0deg'] }) },
                    ]
                }]}>
                    {letter}
                </Animated.Text>
            </Animated.View>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#8e8e8e",
    },
    item: {
        margin: 5,
        fontWeight: 'bold',
        padding: 7,
        borderRadius: 7,
    },
    letter: {
        margin: 2,
        fontWeight: 'bold',
        fontSize: 30,
        textAlign: 'center',
        color: 'white',
    },
});