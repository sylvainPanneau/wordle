import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import Line from './Line';
import Keyboard from './Keyboard';
import KeyPop from './KeyPop';

// import ./assets/words.json
const WORDS = require('./assets/words.json');
const LETTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const DURATION = 410;

export default function App() {
  const [solution, setSolution] = useState('');
  const [guesses, setGuesses] = useState(Array(6).fill(''));
  const [won, setWon] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  // submitted will be a json with the following structure : "A" : { "present" : true, "correct" : false, "incorrect" : false } etc.
  const [submitted, setSubmitted] = useState(LETTERS.split('').reduce((acc, letter) => {
    acc[letter] = {
      present: false,
      correct: false,
      incorrect: false
    };
    return acc;
  }
    , {}));

  // letterState is a json object that keeps track of the state of each letter. Initially, all letters are "unknown"
  const [letterState, setLetterState] = useState(LETTERS.split('').reduce((acc, letter) => {
    acc[letter] = 'unknown';
    return acc;
  }, {}));

  function playAgain() {
    setSolution(WORDS[Math.floor(Math.random() * WORDS.length)]);
    setGuesses(Array(6).fill(''));
    setWon(false);
    setGameOver(false);
    setLetterState(LETTERS.split('').reduce((acc, letter) => {
      acc[letter] = 'unknown';
      return acc;
    }, {}));
  }

  useEffect(() => {
    // select random word from WORDS
    const randomWord = WORDS[Math.floor(Math.random() * WORDS.length)];
    setSolution(randomWord);
  }, []);

  useEffect(() => {
    guesses.map((guess, index) => {
      if (guess == solution && solution != '') {
        setTimeout(() => {
          setWon(true);
        }, DURATION * 4);
      }
    })
    let guess_without_spaces = guesses[guesses.length - 1].replace(/\s/g, "");
    if (guess_without_spaces.length === 5) {
      if (guesses[guesses.length - 1] != solution) {
        setGameOver(true);
      }
    }
  }, [guesses]);

  return (
    <View style={styles.container}>
      {
        gameOver && (
          <View style={styles.endGame}>
            <Text style={[styles.endGameText, styles.gameOverText]}>Perdu bouffon {solution}</Text>
            <TouchableOpacity style={styles.playAgain} onPress={() => playAgain()}>
              <Text style={styles.playAgainText}>↺</Text>
            </TouchableOpacity>
          </View>
        )
      }
      {
        won && (
          <View style={styles.endGame}>
            <Text style={[styles.endGameText, styles.wonText]}>Bien ouej</Text>
            <TouchableOpacity style={styles.playAgain} onPress={() => playAgain()}>
              <Text style={styles.playAgainText}>↺</Text>
            </TouchableOpacity>
          </View>
        )
      }
      <View style={styles.guessBox}>
        {
          guesses.map((guess, index) => {
            return <Line guess={guess} key={index} solution={solution} setLetterState={setLetterState} letterState={letterState} setSubmitted={setSubmitted} submitted={submitted} guesses={guesses} />
          })
        }
      </View>
      <Keyboard setGuesses={setGuesses} guesses={guesses} letterState={letterState} setSubmitted={setSubmitted} submitted={submitted} />
      <StatusBar style="dark" hidden={true} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  guessBox: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
    padding: 20,
  },
  endGame: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
    backgroundColor: "white",
    opacity: 0.8,
  },
  endGameText: {
    fontSize: 50,
    fontWeight: 'bold',
    padding: 10,
    borderRadius: 10,
    textAlign: 'center',
  },
  gameOverText: {
    color: '#ff5a3e',
  },
  wonText: {
    color: '#1dcc2c',
  },
  playAgainText: {
    fontSize: 50,
    fontWeight: 'bold',
    color: "#04cccc",
  },
});