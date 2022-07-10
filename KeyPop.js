import { useEffect, useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import * as Haptics from 'expo-haptics';

export default function KeyPop({ letter, setLetter, color, letterState }) {
    const [pressed, setPressed] = useState(false);
    function animate() {
        setPressed(true);
        setTimeout(() => {
            setPressed(false);
        }, 5);
    }
    useEffect(() => {
        console.log("color : " + color);
    }, []);

    return (
        <View style={styles.keyPop}>
            <TouchableOpacity style={styles.letterContainer}
                onPressIn={() => { setPressed(true); Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light); }}
                onPressOut={() => { setPressed(false); setLetter(letter); }}
                onPress={() => { animate(); Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light); }}
                activeOpacity={1}
            >
                {
                    pressed && (
                        <View style={styles.offSetletterContainer}>
                            <Text style={styles.offSetletter}>{letter}</Text>
                        </View>
                    )
                }
                <Text style={
                    [
                        styles.letter,
                        { backgroundColor: color },
                        letterState[letter] === "correct" || letterState[letter] === "incorrect" || letterState[letter] === "present" ? { color: "white" } : { color: "black" }
                    ]
                }>
                    {letter}
                </Text>
            </TouchableOpacity>
        </View>

    )

}

const styles = StyleSheet.create({
    keyPop: {
        backgroundColor: '#fff',
        borderColor: '#000',
    },
    letterContainer: {
        flexDirection: 'column',
        justifyContent: 'center',
        padding: 5,
    },
    letter: {
        fontSize: 20,
        textAlign: 'center',
        borderRadius: 5,
        padding: 5,
    },
    offSetletter: {
        fontSize: 25,
        borderRadius: 10,
        textAlign: 'center',
    },
    offSetletterContainer: {
        width: 40,
        position: 'absolute',
        bottom: 10,
        paddingBottom: 50,
        paddingTop: 5,
        backgroundColor: "#f2f2f2",
        zIndex: 1,
    },
})