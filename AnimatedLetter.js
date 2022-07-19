import { useEffect, useState } from 'react';
import { StyleSheet, Animated } from 'react-native';

export default function AnimatedLetter({ 
    index, 
    letter, 
    letterState, 
    setLetterState, 
    readyToFlip, 
    color, 
    letterStateValue, 
    won, 
    gameOver
 }) {
    // Component that renders a letter capable of vertical flipping

    const [flip, setFlip] = useState(new Animated.Value(0));
    const [hasFlipped, setHasFlipped] = useState(false);
    const [duration, setDuration] = useState(410);
    const [progress, setProgress] = useState(0);
    const [localColor, setLocalColor] = useState("");

    useEffect(() => {
        if(won || gameOver) {
            setLocalColor("#8e8e8e");
        }
    }, [won, gameOver]);

    useEffect(() => {
        if(letterStateValue === "incorrect"){
            setLetterState({
                ...letterState,
                [letter]: "incorrect"
            });
        }

        if (letterStateValue === "correct") {
            setLetterState({
                ...letterState,
                [letter]: "correct"
            });
        }
        else if (letterStateValue === "present") {
            setLetterState({
                ...letterState,
                [letter]: "present"
            });
        }
    }, [letter]);

    useEffect(() => {
        if (readyToFlip) {
            setHasFlipped(true);
            setTimeout(() => {
                setTimeout(() => {
                    setLocalColor(color);
                }, duration * 0.5);
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
    }, [readyToFlip]);

    return (
        <Animated.View style={[styles.container, styles.item, {
            backgroundColor: localColor == "" ? "#8e8e8e" : localColor,
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
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
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