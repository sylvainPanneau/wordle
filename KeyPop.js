import { useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import * as Haptics from 'expo-haptics';

export default function KeyPop({ letter, setLetter }) {
    const [pressed, setPressed] = useState(false);
    function animate() {
        setPressed(true);
        setTimeout(() => {
            setPressed(false);
        }, 20);
    }

    return (
        <View style={styles.keyPop}>
            <TouchableOpacity style={styles.letterContainer}
                onPressIn={() => { setPressed(true); Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light); }}
                onPressOut={() => { setPressed(false); setLetter(letter); }}
                onPress={() => { animate(); Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light); }}
                activeOpacity={1}
            >
                {
                    pressed && (
                        <View style={styles.offSetletterContainer}>
                            <Text style={styles.offSetletter}>{letter}</Text>
                        </View>
                    )
                }
                <Text style={styles.letter}>{letter}</Text>
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
        padding: 10,
    },
    letter: {
        fontSize: 20,
        borderRadius: 10,
        textAlign: 'center',
        margin: 0.7,
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