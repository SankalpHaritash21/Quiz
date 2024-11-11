import React, { useState } from "react";
import { View, TextInput, Button, Text, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { login } from "../(services)/api/api";
import { LoginScreenProps } from "../../type";
import { Link } from "expo-router";

const LoginScreen: React.FC<LoginScreenProps> = ({ navigation }) => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");

  const handleLogin = async () => {
    try {
      const { data } = await login(email, password);
      await AsyncStorage.setItem("token", data.token);
      navigation.navigate("Home");
    } catch (err) {
      setError("Invalid credentials");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome Back!</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        onChangeText={setEmail}
        value={email}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        onChangeText={setPassword}
        value={password}
      />
      {error ? <Text style={styles.errorText}>{error}</Text> : null}
      <Button title="Login" onPress={handleLogin} color="#4CAF50" />
      <View style={styles.registerContainer}>
        <Text style={styles.registerText}>Don't have an account?</Text>
        <Link href={"/auth/login"}>
          <Button
            title="Register"
            onPress={() => console.log("Register")}
            color="#2196F3"
          />
        </Link>
      </View>
      <View style={styles.registerContainer}>
        <Link href={"/Quiz/Quiz"}>Quiz</Link>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#f8f9fa",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#333",
  },
  input: {
    width: "100%",
    padding: 15,
    marginBottom: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ddd",
    backgroundColor: "#fff",
  },
  errorText: {
    color: "red",
    marginBottom: 15,
  },
  registerContainer: {
    marginTop: 20,
    flexDirection: "row",
    alignItems: "center",
  },
  registerText: {
    marginRight: 8,
    color: "#666",
  },
});

export default LoginScreen;
