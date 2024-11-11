import React, { useState } from "react";
import {
  View,
  TextInput,
  Button,
  Text,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { register } from "../(services)/api/api";
import { RegisterScreenProps } from "../../type";
import { Link, useNavigation } from "expo-router";

const RegisterScreen: React.FC<RegisterScreenProps> = () => {
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const navigation = useNavigation();

  const handleRegister = async () => {
    try {
      await register(username, email, password);
    } catch (err) {
      setError("Error registering user. Please try again.");
      console.error("Error registering user", err);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create an Account</Text>
      <TextInput
        style={styles.input}
        placeholder="Username"
        onChangeText={setUsername}
        value={username}
      />
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
      <TouchableOpacity style={styles.registerButton} onPress={handleRegister}>
        <Text style={styles.registerButtonText}>Register</Text>
      </TouchableOpacity>
      <View style={styles.loginRedirect}>
        <Text style={styles.loginText}>Already have an account?</Text>
        <TouchableOpacity onPress={() => console.log("Login")}>
          <Text style={styles.loginLink}>
            <Link href={"/auth/login"}>Login</Link>
          </Text>
        </TouchableOpacity>
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
    backgroundColor: "#f2f2f2",
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 24,
    color: "#333",
  },
  input: {
    width: "90%",
    padding: 14,
    marginVertical: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ccc",
    backgroundColor: "#fff",
  },
  errorText: {
    color: "red",
    marginBottom: 15,
  },
  registerButton: {
    width: "90%",
    paddingVertical: 14,
    backgroundColor: "#4CAF50",
    borderRadius: 8,
    alignItems: "center",
    marginVertical: 16,
  },
  registerButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  loginRedirect: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 16,
  },
  loginText: {
    color: "#666",
    fontSize: 16,
  },
  loginLink: {
    color: "#2196F3",
    fontWeight: "bold",
    fontSize: 16,
    marginLeft: 5,
  },
});

export default RegisterScreen;
