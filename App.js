import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import Line from './Line';
import Keyboard from './Keyboard';

const WORDS = [
  'SPICE',
  'SHOUT',
  'FAIRY',
  'BUNNY',
  'CLOWN',
  'DUCKS',
  'EAGLE',
  'FALCO',
];

export default function App() {
  const [solution, setSolution] = useState('');
  const [guesses, setGuesses] = useState(Array(6).fill(''));
  const [won, setWon] = useState(false);
  const [gameOver, setGameOver] = useState(false);

  useEffect(() => {
    setSolution(WORDS[Math.floor(Math.random() * WORDS.length)]);
  }, []);

  useEffect(() => {
    guesses.map((guess, index) => {
      if (guess == solution && solution != '') {
        setWon(true);
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
            <Text style={[styles.endGameText, styles.gameOverText]}>Perdu bouffon</Text>
            <TouchableOpacity style={styles.playAgain} onPress={
              () => {
                setSolution(WORDS[Math.floor(Math.random() * WORDS.length)]);
                setGuesses(Array(6).fill(''));
                setWon(false);
                setGameOver(false);
              }
            }>
              <Text style={styles.playAgainText}>↺</Text>
            </TouchableOpacity>
          </View>
        )
      }
      {
        won && (
          <View style={styles.endGame}>
            <Text style={[styles.endGameText, styles.wonText]}>Bien ouej</Text>
            <TouchableOpacity style={styles.playAgain} onPress={
              () => {
                setSolution(WORDS[Math.floor(Math.random() * WORDS.length)]);
                setGuesses(Array(6).fill(''));
                setWon(false);
                setGameOver(false);
              }
            }>
              <Text style={styles.playAgainText}>↺</Text>
            </TouchableOpacity>
          </View>
        )
      }
      <View style={styles.guessBox}>
        {
          guesses.map((guess, index) => {
            return <Line guess={guess} key={index} solution={solution} />
          })
        }
      </View>
      <Keyboard setGuesses={setGuesses} guesses={guesses} />
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
    // center of the screen
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