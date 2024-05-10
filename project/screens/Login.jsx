
import React, { useState, useEffect } from "react";
import { View, TextInput, Button, Text, Pressable, StyleSheet } from "react-native";
import { router } from "expo-router";
import { login } from "../firebase/auth";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
// import adminHome from "../Components/adminHome";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const handleLogin = async () => {
    try {
        const credentials =  await login(email, password);
        console.log('credentials', credentials);
        if (email.includes('@admin')) {
          // Navigate to the admin section
          router.navigate(`account/AdminHome`);
        } else {
          // Navigate to the regular user section
          router.navigate(`/home`);
        }    

    } catch (error) {
      if(error.message.includes('auth/missing-password')) 
      setError("Missing Password!");
     else if(error.message.includes('auth/invalid-email') || error.message.includes("auth/invalid-credential") )
      setError("Invalid Email or Password!");
      else {
        // Handle other errors
        console.error('Login Error:', error);
        setError("An unexpected error occurred. Please try again later.");
    }
        console.log('error', JSON.stringify(error));
        
    }
  }
  

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome Back!</Text>
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={styles.input}
      />
      <Button title="Login" onPress={handleLogin} color="#a1583e" />
      <Pressable onPress={() => router.replace("/account/register")}>
        <Text style={styles.link}>Create an account</Text>
      </Pressable>
      <Pressable onPress={() => router.replace("/account/forgotpass")}>
        <Text style={styles.link}>Forgot Password?</Text>
      </Pressable>
      {error ? <Text style={styles.error}>{error}</Text> : null}
    </View>
  );
};

 const styles = StyleSheet.create({

 });

 export default Login;
