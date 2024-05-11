import { FlatList, StyleSheet, Text, TextInput, View, ActivityIndicator, Pressable, TouchableOpacity, Image } from "react-native";
import React, { useEffect, useState } from "react";
import { router } from "expo-router";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db, auth } from "../firebase/config";
import { Login } from "../firebase/auth";
import { getAuth, signOut } from "firebase/auth";
import AsyncStorage from '@react-native-async-storage/async-storage'
import * as ImagePicker from 'expo-image-picker';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from "../firebase/config";
import Navbarr from '../homeScreen/Navbarr'




const UserData = () => {
  //  const [isLoading, setLoading] = useState(true);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [image, setImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);


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
  useEffect(() => {
    const loadStoredImage = async () => {
      try {
        const storedImage = await AsyncStorage.getItem('profileImage');
        if (storedImage !== null) {
          setImage(storedImage);
        }
      } catch (error) {
        console.error('Error loading stored image:', error);
      }
    };

    loadStoredImage();
  }, []);

  const pickImage = async () => {
    setIsLoading(true);
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
      if (!result.cancelled) {
        const uploadURL = await uploadImageAsync(result.assets[0].uri);
        setImage(uploadURL);
        await AsyncStorage.setItem('profileImage', uploadURL);
      }
    } catch (error) {
      console.error('Error picking image:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const uploadImageAsync = async (uri) => {
    let blob;
    try {
      blob = await new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.onload = function () {
          resolve(xhr.response);
        };
        xhr.onerror = function (e) {
          console.log(e);
          reject(new TypeError("Network request failed"));
        };
        xhr.responseType = "blob";
        xhr.open("GET", uri, true);
        xhr.send(null);
      });
    } catch (error) {
      console.error('Error creating blob:', error);
      throw error;
    }

    if (!blob) {
      console.error('Blob is null or undefined');
      return;
    }

    try {
      const storageRef = ref(storage, `images/image-${Date.now()}`);
      await uploadBytes(storageRef, blob);
      return await getDownloadURL(storageRef);
    } catch (error) {
      console.error(`Error uploading image: ${error}`);
      throw error;
    }
    
  }
  const handleBack = () => {
    router.replace('/home');
   //router.back();
  };
  return (
    <View style={styles.container}>
      
      <View style={styles.header}>
      <Pressable style={styles.backButton} onPress={handleBack}>
        {/* <Text style={styles.backButtonText}>Back</Text> */}
        <Image source={require('../assets/left-arrow.png')} style={{width:50, height: 50}} />
      </Pressable>
        <View style={styles.titlecont}><Text style={styles.title}>Profile Page</Text></View>
        
        <View style={styles.photocont}>
          {image && <Image source={{ uri: image }} style={styles.image} />}
        </View>
      </View>
      <TouchableOpacity style={styles.button} onPress={pickImage}>
        <Text style={styles.text}>Upload your photo!</Text>
      </TouchableOpacity>
      <View style={styles.info}>
        <Text style={styles.title2}>Name: {name}</Text>
        <Text style={styles.title2}>Email: {email}</Text>
      </View>
      <View style={styles.buttonsContainer}>
        <TouchableOpacity style={styles.buttonn} onPress={handleSignOut}>
          <Text style={styles.text}>Log Out</Text>
        </TouchableOpacity>
      </View>
      <Navbarr />
    </View>
  );

};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    margin: 50
  },
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: 'gray',
    alignItems: 'center',
    //justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold'
  },
  titlecont: {
    flexDirection: 'row',
    padding: 10,
    marginBottom: 20,
  //  backgroundColor: "lightgray",
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    width: "50%"
  },
  photocont: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    // marginTop: 50
  },
  image: {
    flexDirection: 'row',
    borderRadius: 250,
    width: 90,
    height: 90,
  },
  button: {
    alignItems: 'center',
   // backgroundColor: 'lightgray',
   // padding: 15,
    borderRadius: 25,
   // marginTop: 20,
    width: "50%",
  },
  text: {
    fontSize: 20,
  },
  info: {
    padding: 25,
    margin: 20,
    backgroundColor: "lightgray",
    borderRadius: 25,
    width: "70%",
  },
  title2: {
    margin: 5,
    fontSize: 15
  },
  buttonsContainer: {
    flexDirection: "row"
  },
  buttonn: {
    backgroundColor: "lightgray",
    margin: 10,
    padding: 20,
    borderRadius: 25,
  },
});


export default UserData;
