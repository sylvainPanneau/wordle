import { useEffect, useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import * as Haptics from 'expo-haptics';

const WORDS = require('./assets/words.json');

export default function KeyPop({ letter, setLetter, color, letterState, setSubmitted, submitted, guesses, wasSubmitted, setWasSubmitted }) {
    const [pressed, setPressed] = useState(false);
    const [canSubmit, setCanSubmit] = useState(false);
    function animate() {
        setPressed(true);
        setTimeout(() => {
            setPressed(false);
        }, 5);
    }

    function getLastGuess(){
        for (let i = 0; i < guesses.length; i++) {
            if (guesses[i] != " ") {
                return guesses[i];
            }
        }
    }

    useEffect(() => {
        let lastGuess = getLastGuess().replace(/\s/g, "");
        // if lastGuess.length === 5 and lastGuess is in WORDS, then can submit
        if (lastGuess.length == 5 && WORDS.includes(lastGuess)) setCanSubmit(true);
        else {
            setCanSubmit(false);
        }
    }, [guesses]);



    return (
        <View style={styles.keyPop}>
            <TouchableOpacity style={styles.letterContainer}
                onPressIn={() => { setPressed(true); Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light); }}
                onPressOut={() => {
                    setPressed(false);
                    if (letter == "ENTER" && canSubmit) {
                        setWasSubmitted(true);
                        console.log("ENTER PRESSED");
                        let keys = Object.keys(letterState);
                        let values = Object.values(letterState);
                        let toSubmit = [];
                        for (let i = 0; i < keys.length; i++) {
                            if (values[i] == "present" || values[i] == "incorrect" || values[i] == "correct") {
                                toSubmit.push(keys[i]);
                            }
                        }
                        console.log("toSubmit: " + toSubmit);
                        setSubmitted({
                            ...submitted,
                            ...toSubmit.reduce((obj, key) => {
                                obj[key] = true;
                                return obj;
                            }, {})
                        })
                        setLetter("");
                    }
                    else {
                        setLetter(letter);
                    }
                }}
                onPress={() => { animate(); Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light); }}
                activeOpacity={1}
            >
                {
                    (pressed && letter != "ENTER") && (
                        <View style={styles.offSetletterContainer}>
                            <Text style={styles.offSetletter}>{letter}</Text>
                        </View>
                    )
                }
                <Text style={
                    [
                        styles.letter,
                        { backgroundColor: submitted[letter] ? color : "white" },
                        submitted[letter] && (letterState[letter] === "correct" || letterState[letter] === "incorrect" || letterState[letter] === "present") ? { color: "white" } : { color: "black" }
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