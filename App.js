import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Line from './Line';
import Keyboard from './Keyboard';

const WORDS = [
  // only 5 letter words
  'SPICE',
  'SHOUT',
  'FAIRY',
  'BUNNY',
  'CLOWN',
  'DUCKS',
  'EAGLE',
  'FALCO',
];

const WORD_LENGTH = 5;

export default function App() {
  const [solution, setSolution] = useState('');
  const [guesses, setGuesses] = useState(Array(6).fill(''));

  useEffect(() => {
    setSolution(WORDS[Math.floor(Math.random() * WORDS.length)]);
  }, []);

  useEffect(() => {
    console.log("guesses: ", guesses);
  }, [guesses]);

  return (
    <View style={styles.container}>
      <View style={styles.guessBox}>
        {
          guesses.map((guess, index) => {
            return <Line guess={guess} key={index} solution={solution} />
          })
        }
      </View>
      <Keyboard setGuesses={setGuesses} guesses={guesses}/>
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
});