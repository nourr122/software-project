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
import{ db, auth } from "../firebase/config";
import { getAuth, createUserWithEmailAndPassword } from "../firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore"; 

const Register = () => {
    const [userName, setUserName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
  

  const handlePress = async () => {
    try {
        const credentials = await register(userName, email, password);
       // console.log('credentials', credentials);
        router.navigate(`/home`);
        addUsers();
        const user = credentials.user;
    } catch (error) {
        if(error.message.includes('auth/missing-email')) 
         setError("Missing Email!");
        else if(error.message.includes('auth/invalid-email'))
         setError("Invalid Email!");
        else
         setError("Email already exists!");
        console.log('error', JSON.stringify(error));
       
        
    }
  };
  const addUsers = async () => {
    await setDoc(doc(db, "users", auth.currentUser.uid), {
      name: userName,
      email: email,
    });
  }
 

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Name"
        value={userName}
        onChangeText={setUserName}
        style={{ borderWidth: 1, padding: 10, marginBottom: 10 }}
      />
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
      <Pressable style = {styles.btn }  onPress={handlePress} >
      <Text style={{ flexDirection: "row", color: "white", fontSize: 15}}>Register</Text>
        </Pressable>
        <Text style = {{fontSize: 15, flexDirection: "row", marginTop: 10}}>Already have an account?</Text>
      <Pressable style={styles.btn} onPress={()=>router.replace("/account/login")}>
        <Text style={{ flexDirection: "row", color: "white", fontSize: 15}}>Login</Text>
      </Pressable>
      <Pressable onPress={()=>router.replace("/account/forgotpass")}>
        <Text style={{ marginTop: 10 }}>Forgot Password</Text>
      </Pressable>
      {/* <Text>{error.code}</Text> */}
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
    color: 'red'
  },
  btn: {
    marginTop: 10,
    padding: 10,
    backgroundColor: "#378ff2",
    alignItems: "center",
    justifyContent: "center",
    color: "white",
    
  }
});

export default Register;