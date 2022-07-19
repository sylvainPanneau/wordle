import { View, StyleSheet } from "react-native";
import { useState, useEffect } from "react";
import React from "react";
import KeyPop from "./KeyPop";
const WORD_LENGTH = 5;

export default function Keyboard({ 
    setGuesses, 
    guesses, 
    letterState, 
    setSubmitted, 
    submitted
 }) {
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
        if (!isFirstGuess(guess) && guess.length === 0) setWasSubmitted(true);
        if (!isFirstGuess(guess) && guess.length > 0) setWasSubmitted(false);
    }, [guess]);

    useEffect(() => {
        if (letter == "⌫" && !wasSubmitted) {
            // replace last letter encoutered in guesses with empty string
            let updated_guess = "";
            let i = 0;
            for (let i = guesses.length - 1; i >= 0; i--) {
                let current = guesses[i].replace(/\s/g, "");
                if (current != "") {
                    for (let j = 0; j < current.length - 1; j++) {
                        updated_guess += current[j];
                    }
                    break;
                }
            }
            let newGuesses = [...guesses];
            let indexToReplace = 0;
            for (let i = 0; i < newGuesses.length; i++) {
                // if newGuess[i] without its last letter == updated_guess indexToReplace = i
                if (newGuesses[i].replace(/\s/g, "").slice(0, -1) == updated_guess) {
                    indexToReplace = i;
                    break;
                }
            }
            newGuesses[indexToReplace] = updated_guess;
            if (newGuesses[indexToReplace].length >= 0) {
                setGuesses(newGuesses);
                setGuess(newGuesses[indexToReplace]);
                setLetter('');
            }
        }
        else if (letter.length === 1 && letter != "⌫") {
            for (let i = 0; i < guesses.length; i++) {
                let guess_without_spaces = "";
                for (let j = 0; j < guesses[i].length; j++) {
                    if (guesses[i][j] != " ") {
                        guess_without_spaces += guesses[i][j];
                    }
                }
                setGuess(guess_without_spaces + letter);
                
                let lastGuessWithoutSpaces = "";
                for (let j = guesses.length - 1; j >= 0; j--) {
                    // current is guesses[j] without the spaces
                    let current = guesses[j].replace(/\s/g, "");
                    if (current != "") {
                        lastGuessWithoutSpaces = current;
                        break;
                    }
                }

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