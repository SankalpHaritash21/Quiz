import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Link } from "expo-router";
import { FontAwesome } from "@expo/vector-icons";

export default function Page() {
  return (
    <View style={styles.container}>
      <FontAwesome name="question-circle" size={60} color="#4CAF50" />
      <Text style={styles.title}>Welcome to QuizApp</Text>
      <View style={styles.buttonContainer}>
        <Link href="./auth/register" asChild>
          <TouchableOpacity style={styles.registerButton}>
            <Text style={styles.linkText}>Register</Text>
          </TouchableOpacity>
        </Link>
        <Link href="./auth/login" asChild>
          <TouchableOpacity style={styles.loginButton}>
            <Text style={styles.linkText}>Login</Text>
          </TouchableOpacity>
        </Link>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f0f4f8",
    padding: 16,
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#4CAF50",
    marginTop: 10,
    marginBottom: 40,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "80%",
    marginTop: 20,
  },
  registerButton: {
    flex: 1,
    backgroundColor: "#2196F3",
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: "center",
    marginHorizontal: 8,
  },
  loginButton: {
    flex: 1,
    backgroundColor: "#FF6F61",
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: "center",
    marginHorizontal: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  linkText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});
