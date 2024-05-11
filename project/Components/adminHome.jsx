import React, { useState, useEffect } from 'react'
import { Text, View, StyleSheet, TextInput, Pressable, Button, TouchableOpacity } from 'react-native'
import { router } from 'expo-router';
import NewHeader from '../homeScreen/NewHeader'
import Containers from '../homeScreen/Containers'
import { deleteData, editData, subscribe , getData} from '../firebase/data'
import handleAddData from './handleAddData'
import EditData from './EditData';
import * as ImagePicker from 'expo-image-picker';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from "../firebase/config";
import AsyncStorage from '@react-native-async-storage/async-storage';
import AdminNavbar from '../homeScreen/AdminNavbar'
export default function adminHome() {
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState('');
  const [quantity, setQuantity] = useState('');
  const [category, setCategory] = useState('');
  const [deleted, setDeleted] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  

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

  return (
    <View style={styles.container}>
      <NewHeader />
      {/* <Containers /> */}
      <AdminNavbar/>
      <Text style={styles.title}>Enter new data fields</Text>
      <View style={{ flexDirection: 'row' }}>
        <TextInput
          style={styles.input}
          placeholder="Product's title"
          value={title}
          onChangeText={setTitle}
        />
        <TextInput
          style={styles.input}
          placeholder="Product's price"
          value={price}
          onChangeText={setPrice}
          keyboardType="numeric"
        />
      </View>
      <View style={{ flexDirection: 'row' }}>
        <TextInput
        style={styles.input}
        placeholder="Product's category"
        value={category}
        onChangeText={setCategory}
      />
        <TextInput
          style={styles.input}
          placeholder="Product's default quantity "
          value={quantity}
          onChangeText={setQuantity}
          keyboardType="numeric"
        />
      </View>
     
       <TouchableOpacity onPress={pickImage}>
          <Text style={{fontSize: 15,  borderBottomWidth: 1, borderBottomColor: '#ccc', margin : 10}}>Upload product's photo</Text>
        </TouchableOpacity>
      <Pressable style={styles.button} onPress={() => handleAddData(title, price, quantity, image, category, setCategory, setImage, setPrice, setQuantity, setTitle)} >
        <Text>Add Data</Text>
      </Pressable>
    <Text style={styles.title}>Enter title of data</Text>
      <TextInput
        style={styles.input}
        placeholder="Product's title to delete "
        value={deleted}
        onChangeText={setDeleted}
      />
      <Pressable style={styles.button} onPress={() => deleteData(deleted)} >
        <Text>Delete Data</Text>
      </Pressable>
     
       <Pressable style={styles.button} onPress={() => router.replace('account/editData')} >
        <Text>Go To Update Data</Text>
      </Pressable>
      <Pressable style={styles.button} onPress={() => router.replace('account/showAllTheData')} >
        <Text>Show all Data</Text>
      </Pressable>
    </View>



  );


}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 30,
    //  margin: 30,
    paddingTop: 20,
    //  paddingHorizontal: 10,
    backgroundColor: '#fff',
    alignItems:'center',
    //justifyContent:'center'
  },
  input: {
    borderBottomWidth: 1, 
    borderBottomColor: '#ccc', 
    paddingBottom: 10, 
    borderTopLeftRadius: 0, 
    borderTopRightRadius: 0, 
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    marginHorizontal: 20, // Set bottom border radius
    marginVertical: 10
    
  },
  button: {
    margin: 10,
    backgroundColor: '#9ad1aa',
    padding: 10,
    width: "40%",
    alignItems:'center',
    borderRadius: 20
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    margin: 10
  }
}); 