import React from 'react';
import { StyleSheet, View } from 'react-native';
import AnimatedLetter from './AnimatedLetter';

export default function Line({
    guess,
    solution,
    setLetterState,
    letterState,
    submitted,
    gameOVer,
    won,
    guesses
}) {
    function computeLetterStateValue(letter, index) {
        if (letter == solution[index]) return "correct";
        else if (solution.includes(letter)) return "present";
        else return "incorrect";
    }
    function computeColorAnimatedLetter(letter, index) {
        if (letter == solution[index]) return "#3eaa42";
        else if (solution.includes(letter)) return "#cd8729";
        else return "#8e8e8e";
    }
    // save guess as guess plus spaces to obtain a string of length WORD_LENGTH
    let guessFilled = guess
    if (guess.length < solution.length) {
        guessFilled = guess + " ".repeat(solution.length - guess.length);
    }

    function count(word) {
        let count = 0;
        for (let i = 0; i < guesses.length; i++) {
            let current = guesses[i].replace(/\s/g, "");
            if (current == word) {
                count++;
            }
        }
        return count;
    }

    function readyToFlip(guess) {
        // return true if all letters in guess have their submitted[letter] value set to true
        try {
            let _count = count(guess);
            if (!(_count == 0 || _count == 1)) { return false; }
            for (let i = 0; i < guess.length; i++) {
                if (!(submitted[guess[i]]["correct"] || submitted[guess[i]]["present"] || submitted[guess[i]]["incorrect"])) {
                    return false;
                }
            }
            return true;
        }
        catch (err) {
            console.log("failed on guess " + guess);
            return false;
        }
    }

    return (
        <View style={styles.line}>
            {guessFilled.split('').map((letter, index) => {
                let guess_without_spaces = guess.replace(/\s/g, "");
                return (
                    <AnimatedLetter
                        key={index}
                        index={index}
                        letter={letter}
                        letterState={letterState}
                        letterStateValue={computeLetterStateValue(letter, index)}
                        setLetterState={setLetterState}
                        readyToFlip={readyToFlip(guessFilled) && guess_without_spaces.length == solution.length}
                        color={computeColorAnimatedLetter(letter, index)}
                        won={won}
                        gameOver={gameOVer}
                    />
                )
            })}
        </View>
    );
}

const styles = StyleSheet.create({
    empty: {
        flex: 1,
        color: '#fff',
        backgroundColor: 'white',
        borderWidth: 1,
        margin: 5,
        padding: 10,
    },
    line: {
        flexDirection: 'row',
        justifyContent: 'center',
        borderColor: '#000',
        backgroundColor: '#fff',
        margin: 2,
    },
    letter: {
        margin: 2,
        fontWeight: 'bold',
        fontSize: 30,
        padding: 10,
        borderRadius: 6,
    },
    correct: {
        flex: 1,
        color: 'white',
        backgroundColor: '#3eaa42',
        borderColor: '#000',
        padding: 20,
        textAlign: 'center',
    },
    incorrect: {
        flex: 1,
        color: 'white',
        backgroundColor: '#8e8e8e',
        borderColor: '#000',
        padding: 20,
        textAlign: 'center',
    },
    presentLetter: {
        flex: 1,
        color: 'white',
        backgroundColor: '#cd8729',
        borderColor: '#000',
        padding: 20,
        textAlign: 'center',
    },
})