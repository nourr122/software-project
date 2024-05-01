import { FlatList, ScrollView,StyleSheet, Text, Image,TextInput, View,  ActivityIndicator, Dimensions, Pressable } from "react-native";
import React, { useEffect, useState } from "react";
//import { doc, collection,getDoc, setDoc, hasMediaLibraryPermissionGranted } from "firebase/firestore";
import { db, auth, storage,  listAll , app} from "../firebase/config";
import "firebase/storage"
import{ list} from "../firebase/config";
//import { getStorage, ref, listAll } from "firebase/storage";
//import { getStorage } from "firebase/storage";
import firestore from 'firebase/firestore';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getDownloadURL, getStorage, ref } from "firebase/storage";
import {
  getDocs,
  doc,
  setDoc,
  addDoc,
  deleteDoc,
  collection,
  query,
  where,
  onSnapshot,
  getDoc,
} from "firebase/firestore";



export default function Snacks() {
    const [title, setTitle] = useState('');
   const [imageURL, setImageURL] = useState('');
   const DATA = [];
   const [category, setCategory] = useState([]);

   const pressed = () => {
      console.log("presseedddd")
   }



  const getList =async() => {
    const querySnapshot = await getDocs(collection(db, "snacks"));
    const categoriesData = [];
    querySnapshot.forEach((doc) => {
      categoriesData.push(doc.data());
    });
    setCategory(categoriesData)
    querySnapshot.forEach((doc) => {
  // doc.data() is never undefined for query doc snapshots
  console.log(doc.id, " => ", doc.data());
 // setCategory[category => [...category, doc.data()]]
});

  }

  useEffect(() => {
    getList();
  }, []);


   
  
   
  
   

  return (
   // <View>
      <View style={styles.header}>
         <Text style={styles.title}>Snacks</Text>
      <View style={styles.top1}>
   
    <FlatList
        data={category}
        renderItem={({ item, index }) => (
          <View >
            <View style={styles.item}>
            <Pressable onPress={pressed} style={styles.itemContainer}>
              <Image source={{ uri: item.image }} style={styles.image} />
              <Text > {item.title}</Text>
              <Text style={styles.price}> {item.Price} EGP</Text>
              </Pressable>
            </View>
          </View>
        )}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={styles.flatListContent}
        numColumns={2}
    
      />
       
      </View>
      
    </View>
  )
}
 
const styles = StyleSheet.create({
  flatListContent: {
    paddingHorizontal: 10,
    paddingBottom: 10,
  },
  itemContainer: {
    flex: 1,
    alignItems: 'center',
    marginBottom: 20,
    marginRight: 10,
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
  },
      header: {
        flex: 1,
        margin: 5,
        padding: 10,
        width: "100%",
      },
      top1: {
        flex: 1,
        flexDirection:"row",
        justifyContent:"center",
        alignContent: "center",
        margin: 5,
        padding: 50,
       // backgroundColor: "yellow",
        width: "100%",
      },
      title: {
        fontSize:60,
       // fontStyle: "bold",

      },
      price: {
        flex: 1,
      //  fontSize:30,
      //  fontStyle: "bold",
        alignItems: "center",
        justifyContent:"center",
      },
      list: {
        flex: 1,
        flexDirection:"row",
        margin: 5,
        // padding: 15,
       // backgroundColor: "yellow",
        width: "100%",
      },
      image: {
        flex: 1,
        width: 200, 
        height: 200,
        marginTop: 10 
      },
 })
