import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function Line({ guess, solution }) {
    // save guess as guess plus spaces to obtain a string of length WORD_LENGTH
    let guessFilled = guess
    if (guess.length < solution.length) {
        guessFilled = guess + " ".repeat(solution.length - guess.length);
    }
    return (
        <View style={styles.line}>
            {guessFilled.split('').map((letter, index) => {
                const isLetterInSolution = solution.includes(letter);
                return (
                    <Text key={index} style={letter === solution[index] ? styles.correct : isLetterInSolution ? styles.presentLetter : styles.incorrect}>
                        {letter}
                    </Text>
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
    correct: {
        flex: 1,
        color: 'black',
        backgroundColor: '#0f0',
        borderColor: '#000',
        padding: 20,
        borderWidth: 1,
        textAlign: 'center',
    },
    incorrect: {
        flex: 1,
        color: 'white',
        backgroundColor: 'lightgrey',
        borderColor: '#000',
        padding: 20,
        borderWidth: 1,
        textAlign: 'center',
    },
    presentLetter: {
        flex: 1,
        color: 'black',
        backgroundColor: 'yellow',
        borderColor: '#000',
        padding: 20,
        borderWidth: 1,
        textAlign: 'center',
    },
})