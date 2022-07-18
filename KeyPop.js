import { useEffect, useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import * as Haptics from 'expo-haptics';

const WORDS = require('./assets/words.json');

export default function KeyPop({ letter, setLetter, letterState, setSubmitted, submitted, guesses, wasSubmitted, setWasSubmitted }) {
    const [pressed, setPressed] = useState(false);
    const [canSubmit, setCanSubmit] = useState(false);
    function animate() {
        setPressed(true);
        setTimeout(() => {
            setPressed(false);
        }, 5);
    }

    
    function getLastGuess() {
        let lastGuessWithoutSpaces = "";
        for (let j = guesses.length - 1; j >= 0; j--) {
            // current is guesses[j] without the spaces
            let current = guesses[j].replace(/\s/g, "");
            if (current != "") {
                lastGuessWithoutSpaces = current;
                break;
            }
        }
        return lastGuessWithoutSpaces;
    }
    
    function letterInCurrentGuess(letter){
        let currentGuess = getLastGuess();
        console.log("currentGuess: " + currentGuess);
        for (let i = 0; i < currentGuess.length; i++) {
            if (currentGuess[i] == letter) {
                return true;
            }
        }
        return false;
    }

    function computeKeyFont(letter) {
        if (letter == "⌫" || letter == "ENTER") {
            return { color: "black" }
        }
        if (submitted[letter]["correct"] || submitted[letter]["present"] || submitted[letter]["incorrect"]) {
            if (letterState[letter] === "correct" || letterState[letter] === "incorrect" || letterState[letter] === "present") {
                return { color: "white" };
            }
        }
        return { color: "black" };
    }

    function computeKeyBackgroundColor(letter) {
        if (letter == "⌫" || letter == "ENTER") {
            return { backgroundColor: "white" };
        }
        if (submitted[letter]["correct"] && letterState[letter] === "correct") {
            return { backgroundColor: "#3eaa42" };
        }
        else if (submitted[letter]["incorrect"] && letterState[letter] === "incorrect") {
            return { backgroundColor: "#8e8e8e" };
        }
        else if (submitted[letter]["present"] && letterState[letter] === "present") {
            return { backgroundColor: "#cd8729" };
        }

        else {
            if (submitted[letter]["correct"]) {
                return { backgroundColor: "#3eaa42" };
            }
            else if (submitted[letter]["incorrect"]) {
                return { backgroundColor: "#8e8e8e" };
            }
            else if (submitted[letter]["present"]) {
                return { backgroundColor: "#cd8729" };
            }
        }
    }

    function count(guesses, lastGuess) {
        let count = 0;
        for (let i = 0; i < guesses.length; i++) {
            let current = guesses[i].replace(/\s/g, "");
            if (current == lastGuess) {
                count++;
            }
        }
        return count;
    }

    useEffect(() => {
        let lastGuess = getLastGuess().replace(/\s/g, "");
        console.log("lastGuess: " + lastGuess);
        let cnt = count(guesses, lastGuess);
        if (lastGuess.length == 5 && WORDS.includes(lastGuess) && (cnt == 0 || cnt == 1)) {
            setCanSubmit(true);
        }
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
                        let toSubmitPresent = [];
                        let toSubmitCorrect = [];
                        let toSubmitIncorrect = [];
                        for (let i = 0; i < keys.length; i++) {
                            switch (values[i]) {
                                case "present":
                                    if(letterInCurrentGuess(keys[i])){
                                        toSubmitPresent.push(keys[i]);
                                    }
                                    break;
                                case "correct":
                                    if(letterInCurrentGuess(keys[i])){
                                        toSubmitCorrect.push(keys[i]);
                                    }
                                    break;
                                case "incorrect":
                                    if(letterInCurrentGuess(keys[i])){
                                        toSubmitIncorrect.push(keys[i]);
                                    }
                                    break;

                                default:
                                    break;
                            }
                        }
                        // setSubmitted({
                        //     ...submitted,
                        //     ...toSubmit.reduce((obj, key) => {
                        //         obj[key] = true;
                        //         return obj;
                        //     }, {})
                        // })
                        // submitted will be a json with the following structure : "A" : [correct : false, incorrect : false, present : false] ...
                        setSubmitted({
                            ...submitted,
                            ...toSubmitPresent.reduce((obj, key) => {
                                obj[key] = {
                                    correct: false,
                                    incorrect: false,
                                    present: true,
                                }
                                return obj;
                            }, {}),
                            ...toSubmitCorrect.reduce((obj, key) => {
                                obj[key] = {
                                    correct: true,
                                    incorrect: false,
                                    present: false,
                                }
                                return obj;
                            }, {}),
                            ...toSubmitIncorrect.reduce((obj, key) => {
                                obj[key] = {
                                    correct: false,
                                    incorrect: true,
                                    present: false,
                                }
                                return obj;
                            }, {}),
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
                        computeKeyBackgroundColor(letter),
                        computeKeyFont(letter),
                        // ((letter != "⌫" && letter != "ENTER") && submitted[letter]["correct"] || submitted[letter]["present"] || submitted[letter]["incorrect"]) && (letterState[letter] === "correct" || letterState[letter] === "incorrect" || letterState[letter] === "present") ? { color: "white" } : { color: "black" }
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