import React from 'react';
import { View, Image, StyleSheet, Text, Pressable, FlatList, Button } from 'react-native';
import { router } from "expo-router";
import { db, auth, storage,  listAll , app} from "../firebase/config";

import { useState,useEffect } from 'react';

import {
  getDocs,
  setDoc,
  addDoc,
  deleteDoc,
  collection,
  query,
  where,
  
  getDoc,
} from "firebase/firestore";


const photos = [
  { id: '1', source: require('../assets/photo1.jpg') },

  // { id: '2', source: require('../assets/photo2.jpg')  },
  { id: '2', source: require('../assets/photo3.jpg')  },
  { id: '3', source: require('../assets/photo1.jpg') },

  { id: '4', source: require('../assets/photo3.jpg')  },
  // { id: '5', source: require('../assets/photo2.jpg')  },

  // Add more photos as needed
];
export default function Containers() {
  const [category, setCategory] = useState([]);
  const [Picks, setPicks] = useState([]);


   
  useEffect(() => {
    getList();
  }, []);
  useEffect(() => {
    getPicks();
  }, []);
  const getList =async() => {
    const querySnapshot = await getDocs(collection(db, "Home_Screen"));
    const categoriesData = [];
    querySnapshot.forEach((doc) => {
      categoriesData.push(doc.data());
    });
    setCategory(categoriesData)
    querySnapshot.forEach((doc) => {
  console.log(doc.id, " => ", doc.data());
});

  };
  
  const getPicks =async() => {
    const querySnapshot = await getDocs(collection(db, "Picks"));
    const PicksData = [];
    querySnapshot.forEach((doc) => {
      PicksData.push(doc.data());
    });
    setPicks(PicksData)
    querySnapshot.forEach((doc) => {
  console.log(doc.id, " => ", doc.data());
});

  };

  const Pressed = (itemtitle) => {
    // router.replace({
    //     pathname: "/account/productsList",
    //     query: { itemtitle: itemtitle }
    // });
    
    // console.log(itemtitle);
  }
  const renderItem = ({ item }) => (
    <Image source={item.source} style={styles.image} />
  );

  return (
    <View style={styles.container}>
           <FlatList
        data={photos}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.photoFlatListContent}
        style={styles.flatList1}
      />
      <Text style={styles.title} >Top Picks For You :</Text>
  
      <FlatList
         data={Picks}
         style={styles.flatList2}
         horizontal
         showsHorizontalScrollIndicator={false}
         contentContainerStyle={styles.photoFlatListContent}
         renderItem={({item,index})=>(
          
               <View style={styles.row }>
            <View style={styles.item}>
            {/* () => router.replace("/account/product") */}
            <Pressable onPress={() =>router.replace(`account/product?title=${item.title}`)} style={styles.itemContainer}>
                <Image source={{ uri: item.image }} style={styles.image} />
                <Text style={styles.itemTextTitle}> {item.title}</Text>
              </Pressable>
              </View>
              </View>
          )}
          keyExtractor={(item, index) => index.toString()}

      />
    <Text style={styles.title}>Categories</Text>
      <FlatList
        data={category}
        style={styles.flatList}

        renderItem={({ item, index }) => (
            <View style={styles.item}>
            {/* () => router.replace("/account/product") */}
            <Pressable onPress={() =>router.replace(`account/productsList?title=${item.title}`)} style={styles.itemContainer}>
                <Image source={{ uri: item.image }} style={styles.image} />
                <Text style={styles.itemTextTitle}> {item.title}</Text>
              </Pressable>

          </View>
        )}
        keyExtractor={(item, index) => index.toString()}
        // contentContainerStyle={
        numColumns={2}
        
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 100,
    paddingHorizontal: 10,
    backgroundColor: '#f0f5f9',
marginTop:9,
  },
  butn:{
    backgroundColor:'#f0f5f9',
  },
  flatList:{
     margin:49,
  },
  title:{
    marginTop: 10,
    fontSize: 20,
    paddingHorizontal: 3,
    paddingVertical: 15,
    fontWeight: 'bold',
  },
  flatList1: {
    paddingTop:2,
    // bottom: 0,
    padding: 10,
  },
  flatList2: {
    marginBottomp:1,
    // paddingTop:2,
    bottom: 0,
    padding: 10,
  },
  itemContainer: {
    alignItems: 'center',
    marginBottom: 20,
    marginRight: 10,
    backgroundColor: '#fff',
    borderRadius: 10,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.4,
    shadowRadius: 3.84,
  },
  image: {
    width: 180,
    height: 180,
    borderRadius: 20,
  },

  itemTextTitle: {
    marginTop: 5,
    fontSize: 15,
    textAlign: 'center',
  },
  photoFlatListContent: {
    paddingHorizontal: 10,
    paddingBottom: 50,
  },
});
