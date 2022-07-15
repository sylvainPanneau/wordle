import { View, StyleSheet, Text, TouchableOpacity, Button, Pressable, TouchableHighlight, TouchableNativeFeedback } from "react-native";
import { useState, useEffect } from "react";
import React from "react";
import KeyPop from "./KeyPop";
const WORD_LENGTH = 5;

export default function Keyboard({ setGuesses, guesses, letterState, setSubmitted, submitted }) {
    const [letter, setLetter] = useState('');
    const [__index, setIndex] = useState(0);
    const [guess, setGuess] = useState('');
    const [wasSubmitted, setWasSubmitted] = useState(false);
    const row1 = "AZERTYUIOP";
    const row2 = "QSDFGHJKLM";
    const row3 = "WXCVBN⌫";

    function isFirstGuess(guess) {
        return guesses[0] === guess;
    }

    useEffect(() => {
        if (!isFirstGuess(guess) && guess.length >= 3) setWasSubmitted(false);
    }, [guess]);

    useEffect(() => {
        if (letter == "⌫") {
            // replace last letter encoutered in guesses with empty string
            for (let i = 0; i < guesses.length; i++) {
                let guess_without_spaces = guesses[i].replace(/\s/g, "");
                if (guesses[i].length > 0) {
                    let guess_i = guesses[i].replace(/\s/g, "");
                    let updatedGuess = "";
                    for (let j = 0; j < guess_i.length - 1; j++) {
                        updatedGuess += guess_i[j];
                    }
                    setGuesses(guesses.slice(0, i).concat([updatedGuess]).concat(guesses.slice(i + 1)));
                    setLetter("");
                    return;
                }
            }
        }
        else if (letter.length === 1) {
            for (let i = 0; i < guesses.length; i++) {
                let guess_without_spaces = "";
                for (let j = 0; j < guesses[i].length; j++) {
                    if (guesses[i][j] != " ") {
                        guess_without_spaces += guesses[i][j];
                    }
                }
                setGuess(guess_without_spaces + letter);

                // TRYING TO GET THE LAST GUESS (AKA THE WORD WE WRITE ON THE CURRENT LINE) 
                // AND SEE IF IT IS OF LENGTH 5 AND !WASSUBMITTED, THEN WE BREAK (WE DON'T ADD A LETTER TO NEXT LINE)

                // THE PROBLEM : I can't manage to get the last guess properly... It always returns the previous guess 
                // so of course, the condition at line 64 evaluates to true because we have length 5...

                let lastGuessWithoutSpaces = "";
                for (let j = guesses.length - 1; j >= 0; j--) {
                    lastGuessWithoutSpaces = guesses[j].replace(/\s/g, "");
                }

                console.log("lastGuessWithoutSpaces: " + lastGuessWithoutSpaces);

                if (lastGuessWithoutSpaces.length === WORD_LENGTH && !wasSubmitted) break;
                if (guess_without_spaces.length < WORD_LENGTH) {
                    const updated_guess = guess_without_spaces + letter + " ".repeat(WORD_LENGTH - guess_without_spaces.length - 1);
                    setGuesses(guesses.map((guess, index) => {
                        if (index === i) {
                            return updated_guess;
                        }
                        return guess;
                    }));
                    setLetter('');
                    return;
                }
            }
        }
    }, [letter]);

    return (
        <View style={styles.keyboard}>
            <View style={styles.row}>
                {row1.split('').map((letter, index) => {
                    return (
                        <KeyPop
                            letter={letter}
                            setLetter={setLetter}
                            letterState={letterState}
                            submitted={submitted}
                            guesses={guesses}
                            wasSubmitted={wasSubmitted}
                            setWasSubmitted={setWasSubmitted}
                            key={index}
                            color={
                                letterState[letter] == 'correct' ? "#3eaa42" :
                                    letterState[letter] == 'incorrect' ? "#8e8e8e" :
                                        letterState[letter] == 'present' ? "#cd8729" : null
                            }
                        />
                    )
                })}
            </View>
            <View style={styles.row}>
                {row2.split('').map((letter, index) => {
                    return (
                        <KeyPop
                            letter={letter}
                            setLetter={setLetter}
                            letterState={letterState}
                            submitted={submitted}
                            guesses={guesses}
                            wasSubmitted={wasSubmitted}
                            setWasSubmitted={setWasSubmitted}
                            key={index}
                            color={
                                letterState[letter] == 'correct' ? "#3eaa42" :
                                    letterState[letter] == 'incorrect' ? "#8e8e8e" :
                                        letterState[letter] == 'present' ? "#cd8729" : null
                            }
                        />
                    )
                })}
            </View>
            <View style={styles.row}>
                {row3.split('').map((letter, index) => {
                    return (
                        <KeyPop
                            letter={letter}
                            setLetter={setLetter}
                            letterState={letterState}
                            submitted={submitted}
                            wasSubmitted={wasSubmitted}
                            setWasSubmitted={setWasSubmitted}
                            guesses={guesses}
                            key={index}
                            color={
                                letterState[letter] === 'correct' ? "#3eaa42" :
                                    letterState[letter] == 'incorrect' ? "#8e8e8e" :
                                        letterState[letter] == 'present' ? "#cd8729" : null
                            }
                        />
                    )
                })}
            </View>
            <KeyPop
                letter="ENTER"
                setLetter={setLetter}
                letterState={letterState}
                setSubmitted={setSubmitted}
                guesses={guesses}
                submitted={submitted}
                wasSubmitted={wasSubmitted}
                setWasSubmitted={setWasSubmitted}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    keyboard: {
        flexDirection: 'column',
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'center',
    },
    enterButton: {
        marginTop: 10,
        marginBottom: 5,
        justifyContent: 'center',
        alignItems: 'center',
    },
    enterText: {
        fontSize: 20,
        textAlign: 'center',
    },
});