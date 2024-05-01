import { router } from "expo-router";
import React, { useState, useEffect } from "react";
import {
  View,
  TextInput,
  Button,
  Text,
  Pressable,
  StyleSheet,
} from "react-native";
import { login } from "../firebase/auth";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import{ db, auth } from "../firebase/config";
import {  signInWithEmailAndPassword } from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");


  // useEffect(() => {
  //   // console.log("auth().currentUser", auth.currentUser);
  //   const unsub = onAuthStateChanged(auth, 
  //     (user) => {
  //       if(user){
  //         AsyncStorage.setItem("user", JSON.stringify(user));
  //         router.replace("/home");
  //       }
  //       else{
  //         AsyncStorage.removeItem("user");
  //         router.replace("/account/login");
  //       }
  //       // setUser(user)
  //     });

  //   return () => {
  //     unsub();
  //   };
  // }, []);

  const handleLogin = async () => {
    try {
        const credentials =  await login(email, password);
        console.log('credentials', credentials);
        router.navigate(`/home`);
      const user = credentials.user;

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
  };
  


  
  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        style={{ borderWidth: 1, padding: 10, marginBottom: 10 }}
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={{ borderWidth: 1, padding: 10, marginBottom: 10 }}
      />
      <Pressable style={styles.btn} onPress={handleLogin} >
      <Text style={{ flexDirection: "row", color: "white", fontSize: 15}}>Login</Text>
        </Pressable>
      <Pressable style={styles.btn} onPress={()=>router.replace("/account/register")}>
      <Text style={{ flexDirection: "row", color: "white", fontSize: 15}}>Register</Text>
      </Pressable>
      <Pressable onPress={()=>router.replace("/account/forgotpass")}>
        <Text style={{ marginTop: 10 }}>Forgot Password</Text>
      </Pressable>
      <Text style={styles.err}>{error}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    margin: 15,
  },
  err: {
    marginTop: 10,
    color: 'red',
    fontSize: 20
  },
  btn: {
    marginTop: 10,
    padding: 10,
    backgroundColor: "#378ff2",
    alignItems: "center",
    justifyContent: "center",
    color: "white"
  }
});

export default Login;