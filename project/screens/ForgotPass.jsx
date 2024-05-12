import { router } from "expo-router";
import React, { useState } from "react";
import {
  View,
  TextInput,
  Button,
  Text,
  Pressable,
  StyleSheet,
} from "react-native";
import { resetPassword } from "../firebase/auth";

const ForgotPass = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const handlePress = async () => {
    try {
      await resetPassword(email);
      router.replace("/account/login");
    } catch (error) {
      if (error.message.includes("auth/missing-email")) setError("Please enter your email");
      else if (error.message.includes("auth/invalid-email")) setError("Invalid email format");
      else setError("An error occurred. Please try again later.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Forgot Password?</Text>
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <Button title="Reset" onPress={handlePress} color="#a1583e" />
      <Pressable onPress={() => router.replace("/account/login")}>
        <Text style={styles.link}>Back to Login</Text>
      </Pressable>
      <Text style={styles.error}>{error}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#714433",
  },
  input: {
    height: 40,
    width: "100%",
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  link: {
    marginTop: 10,
    color: "#a1583e",
    textDecorationLine: "underline",
  },
  error: {
    marginTop: 10,
    color: "#FF0000",
  },
});

export default ForgotPass;
