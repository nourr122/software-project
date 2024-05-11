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

import { register } from "../firebase/auth";
import { db, auth } from "../firebase/config";
import { doc, setDoc, getDoc } from "firebase/firestore";

const Register = () => {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handlePress = async () => {
    try {
      await register(userName, email, password);
      if (email.includes('@admin')) {
        // Navigate to the admin section
        router.navigate(`account/AdminHome`);

      } else {
        // Navigate to the regular user section
        router.navigate(`/home`);
      } addUsers();
      const user = credentials.user;
    } catch (error) {
      if (error.message.includes("auth/missing-email")) setError("Missing Email");
      else if (error.message.includes("auth/weak-password")) setError("Weak Password!");
      else if (error.message.includes("auth/invalid-email")) setError("Invalid Email");

      else setError("Email already exists");
      console.log('error', JSON.stringify(error));
    }
  };

  const addUsers = async () => {
    await setDoc(doc(db, "users", auth.currentUser.uid), {
      name: userName,
      email: email,
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to Local Grocer !</Text>
      <TextInput
        placeholder="Name"
        value={userName}
        onChangeText={setUserName}
        style={styles.input}
      />
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={styles.input}
      />
      <Button title="Register" onPress={handlePress} color="#a1583e" />
      <Pressable onPress={() => router.replace("/account/login")}>
        <Text style={styles.link}>Login</Text>
      </Pressable>
      <Pressable onPress={() => router.replace("/account/forgotpass")}>
        <Text style={styles.link}>Forgot Password</Text>
      </Pressable>
      <Text style={styles.error}>{error}</Text>
    </View>
  );
};

const styles = StyleSheet.create({

});

export default Register;
