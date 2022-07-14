import React, { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import AnimatedLetter from './AnimatedLetter';

export default function Line({ guess, solution, setLetterState, letterState }) {
    function computeLetterStateValue(letter, index){
        if(letter == solution[index]) return "correct";
        else if(solution.includes(letter)) return "present";
        else return "incorrect";
    }
    // save guess as guess plus spaces to obtain a string of length WORD_LENGTH
    let guessFilled = guess
    if (guess.length < solution.length) {
        guessFilled = guess + " ".repeat(solution.length - guess.length);
    }
    return (
        <View style={styles.line}>
            {guessFilled.split('').map((letter, index) => {
                const isLetterInSolution = solution.includes(letter);
                let guess_without_spaces = guess.replace(/\s/g, "");
                return (
                    <AnimatedLetter
                        key={index}
                        index={index}
                        letter={letter}
                        letterState={letterState}
                        letterStateValue={computeLetterStateValue(letter, index)}
                        setLetterState={setLetterState}
                        readyToFlip={guess_without_spaces.length === solution.length}
                        color={letter == solution[index] ? "#3eaa42" : isLetterInSolution ? "#cd8729" : "#8e8e8e"}
                    >
                    </AnimatedLetter>
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