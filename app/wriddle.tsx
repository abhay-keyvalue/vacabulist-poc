import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
} from "react-native";
import Toast from "react-native-toast-message";

const questions = [
  {
    question:
      "I am the invisible weight that makes a choice heavy, yet I am not seen on any scale. What determines my worth is not what you pay, but what you lose.",
    answer: "GUILT",
  },
  {
    question:
      "I am tall when I’m young, and I’m short when I’m old. What am I?",
    answer: "CANDLE",
  },
  // {
  //   question: "The more of me you take, the more you leave behind. What am I?",
  //   answer: "FOOTSTEP",
  // },
  // {
  //   question:
  //     "I speak without a mouth and hear without ears. I have no body, but I come alive with the wind.",
  //   answer: "ECHO",
  // },
  // { question: "What has to be broken before you can use it?", answer: "EGG" },
  // {
  //   question: "I can be cracked, made, told, and played. What am I?",
  //   answer: "JOKE",
  // },
  // {
  //   question: "The more you take, the more you leave behind. What am I?",
  //   answer: "FOOTSTEPS",
  // },
  // {
  //   question:
  //     "What comes once in a minute, twice in a moment, but never in a thousand years?",
  //   answer: "M",
  // },
  // { question: "I have hands but cannot clap. What am I?", answer: "CLOCK" },
  // {
  //   question:
  //     "I have keys but open no locks. I have a space but no room. You can enter, but you can’t go outside. What am I?",
  //   answer: "KEYBOARD",
  // },
];

const Wriddle = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [input, setInput] = useState("");
  const [message, setMessage] = useState("");
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);

  const handleLetterPress = (letter: string) => {
    if (input.length < questions[currentIndex].answer.length) {
      setInput(input + letter);
    }
  };

  const handleDelete = () => {
    setInput(input.slice(0, -1));
  };

  const handleGuess = () => {
    if (input.length !== questions[currentIndex].answer.length) {
      setMessage(
        `Enter a ${questions[currentIndex].answer.length}-letter word.`
      );
      return;
    }

    if (input.toUpperCase() === questions[currentIndex].answer) {
      Toast.show({ type: "success", text1: "Correct!", position: "bottom",  });
      setMessage("");
      setScore(score + 1);
      if (currentIndex + 1 < questions.length) {
        setTimeout(() => {
          setCurrentIndex(currentIndex + 1);
          setInput("");
        }, 500);
      } else {
        setShowResult(true);
      }
    } else {
      setMessage("Wrong answer! Try again.");
    }
  };

  if (showResult) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.container}>
          <Text style={styles.gameTitle}>Wriddle</Text>
          <Text style={styles.riddle}>Game Over!</Text>
          <Text style={styles.message}>
            Your Score: {score} / {questions.length}
          </Text>
          <Text style={styles.message}>
            {score >= questions.length / 2
              ? "Congratulations! You did well!"
              : "Better luck next time!"}
          </Text>
          <TouchableOpacity
            onPress={() => {
              setCurrentIndex(0);
              setInput("");
              setScore(0);
              setShowResult(false);
            }}
            style={styles.keySpecial}
          >
            <Text style={styles.keyText}>Play Again</Text>
          </TouchableOpacity>
        </View>
        <Toast />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.gameTitle}>Wriddle</Text>
        <View style={styles.progressBarContainer}>
          <View
            style={[
              styles.progressBar,
              { width: `${((currentIndex + 1) / questions.length) * 100}%` },
            ]}
          />
        </View>
        <Text style={styles.questionTracker}>
          Question {currentIndex + 1} / {questions.length}
        </Text>
        <Text style={styles.riddle}>{questions[currentIndex].question}</Text>
        <View style={styles.grid}>
          {[...Array(questions[currentIndex].answer.length)].map((_, i) => (
            <View key={i} style={styles.box}>
              <Text style={styles.letter}>{input[i] || ""}</Text>
            </View>
          ))}
        </View>
        <Text
          style={[
            styles.message,
            message === "Wrong answer! Try again." && styles.errorMessage,
          ]}
        >
          {message}
        </Text>
      </View>
      <View style={styles.keyboardContainer}>
        {["QWERTYUIOP", "ASDFGHJKL", "ZXCVBNM"].map((row, i) => (
          <View key={i} style={styles.row}>
            {row.split("").map((letter) => (
              <TouchableOpacity
                key={letter}
                onPress={() => handleLetterPress(letter)}
                style={styles.key}
              >
                <Text style={styles.keyText}>{letter}</Text>
              </TouchableOpacity>
            ))}
          </View>
        ))}
        <View style={styles.row}>
          <TouchableOpacity onPress={handleDelete} style={styles.keySpecial}>
            <Text style={styles.keyText}>⌫</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleGuess} style={styles.keySpecial}>
            <Text style={styles.keyText}>Enter</Text>
          </TouchableOpacity>
        </View>
      </View>
      <Toast />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: "#121212" },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    padding: 20,
  },
  gameTitle: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#00FF00",
    marginTop: 10,
  },
  riddle: {
    fontSize: 16,
    color: "#FFF",
    textAlign: "center",
    marginVertical: 20,
  },
  grid: {
    flexDirection: "row",
    marginBottom: 20,
  },
  box: {
    width: 40,
    height: 40,
    borderWidth: 2,
    borderColor: "#FFF",
    justifyContent: "center",
    alignItems: "center",
    margin: 5,
  },
  letter: {
    fontSize: 24,
    color: "#FFF",
  },
  progressBarContainer: {
    width: "80%",
    height: 10,
    backgroundColor: "#444",
    borderRadius: 5,
    marginVertical: 10,
  },
  progressBar: { height: "100%", backgroundColor: "#00FF00", borderRadius: 5 },
  questionTracker: { fontSize: 16, color: "#FFF", marginBottom: 10 },
  keyboardContainer: { alignItems: "center", paddingBottom: 20 },
  row: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 5,
    flexWrap: "wrap",
  },
  key: {
    width: 25,
    height: 25,
    backgroundColor: "#444",
    justifyContent: "center",
    alignItems: "center",
    margin: 4,
    borderRadius: 5,
  },
  keySpecial: {
    paddingHorizontal: 20,
    height: 25,
    backgroundColor: "#888",
    justifyContent: "center",
    alignItems: "center",
    margin: 5,
    borderRadius: 5,
  },
  keyText: {
    fontSize: 14,
    color: "#FFF",
  },
  message: {
    fontSize: 18,
    color: "#FFF",
    marginTop: 10,
  },
  errorMessage: {
    fontSize: 14,
    color: "red",
  }
});

export default Wriddle;
