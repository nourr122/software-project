import { FlatList, StyleSheet, Text, TextInput, View, ActivityIndicator, Pressable } from "react-native";
import React, { useEffect, useState } from "react";
import { router } from "expo-router";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db, auth } from "../firebase/config";
import { Login } from "../firebase/auth";
import { getAuth, signOut } from "firebase/auth";
import AsyncStorage from '@react-native-async-storage/async-storage'


const UserData = () => {
  //  const [isLoading, setLoading] = useState(true);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const getUserData = async () => {

    const docRef = doc(db, "users", auth.currentUser.uid);
    const docSnap = await getDoc(docRef);
    if (auth.currentUser.uid != null) {
      if (docSnap.exists()) {
        console.log("Document data:", docSnap.data());
        const data = docSnap.data();
        setName(data.name);
        setEmail(data.email);
      } else {
        console.log("No such document!");
      }
    }
  }

  useEffect(() => {
    getUserData();
  }, []);


  const handleSignOut = () => {
    const auth = getAuth();
    signOut(auth).then(() => {
      router.replace("/account/login")
    }).catch((error) => {

    });
  }
  const update = async () => {
    const washingtonRef = doc(db, "users", auth.currentUser.uid);

    // Set the "capital" field of the city 'DC'
    await updateDoc(washingtonRef, {
      capital: true
    });
  }
  return (
    <View style={styles.top}>
      <Text style={styles.title}> {name} </Text>
      <Text style={styles.list} >Email Address: {email} </Text>
      <Pressable style={styles.list}>
        <Text style={{ fontSize: 20 }}>Favorites</Text>
      </Pressable>
      <Pressable onPress={handleSignOut} style={styles.btn}>
        <Text style={{color: "white"}}>Log Out</Text>
      </Pressable>

    </View>
  );

};

const styles = StyleSheet.create({
  top: {
    flex: 1,
    margin: 10,
    padding: 10,
    marginHorizontal: 16,
    width: "100%",
    alignItems: "center"
  },
  title: {
    margin: 10,
    fontStyle: "bold",
    fontSize: 40,
  },
  top1: {
    flex: 0.1,
    margin: 5,
    padding: 15,
    backgroundColor: "yellow",
    width: "100%",
  },
  input: {
    flex: 1,
    backgroundColor: "white",
    fontSize: 32,
  },
  btn: {
    backgroundColor: "#378ff2",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
    marginRight: 350,
    padding: 15,
    fontSize: 20,
  },
  list: {
    //  flex: 1,
    margin: 5,

    flexDirection: "row",
    alignContent: "flex-start",
    padding: 20,
    fontSize: 20,
    borderBottomWidth: 1,
    borderBottomColor: "black",
    // backgroundColor: "yellow",
    width: "100%",
  },
  sideBySide: {
    flex: 1,
    flexDirection: "row",
    // backgroundColor: "white",
    // justifyContent: "center",
    // alignContent:"center",
    // alignItems: "center",
    justifyContent: "space-between",
    // flexWrap: "wrap"
  },
});

export default UserData;