
import { router, useLocalSearchParams } from 'expo-router';
import {route,params,navigation} from "expo-router"
import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, Image, Pressable , TouchableOpacity, Alert} from 'react-native';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { db, auth, storage, app} from "../firebase/config";
import { FontAwesome } from '@expo/vector-icons'; 
import cart from "../assets/cart.png";
import {
  getDocs,
  setDoc,
  addDoc,
  deleteDoc,
  doc,
  collection,
  query,
  where,
  onSnapshot,
  getDoc,
} from "firebase/firestore";
import AddToCart from './AddToCart';
import Navbarr from '../homeScreen/Navbarr';
import NewHeader from '../homeScreen/NewHeader';



const ProductsList = () => {
  
   const {title} = useLocalSearchParams();
   const [usertitle]=useState(title);
   const [category, setCategory] = useState([]);
   const [cart, setCart] = useState([]);


  const getList = async () => {
    const categoriesData = [];

    const q = query(collection(db, "product"), where("category", "==", usertitle));

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
     // categoriesData.push({ id: doc.id, ...doc.data() });
     categoriesData.push(doc.data());

     
    });
    setCategory(categoriesData)
     querySnapshot.forEach((doc) => {
       console.log(doc.id, " => ", doc.data()); 
    });
  }

  useEffect(() => {
     getList();
  }, []);
  
  
  const handleBack = () => {
    router.replace('/home');
   //router.back();
  };
 
  
  
 
  return (
    <View>
    <View style={styles.header}>
    <Pressable style={styles.backButton} onPress={handleBack}>
        {/* <Text style={styles.backButtonText}>Back</Text> */}
        <Image source={require('../assets/left-arrow.png')} style={{width:50, height: 50}} />
      </Pressable>
      {/* <Text style={{fontSize: 17, fontWeight: 'bold', paddingHorizontal: 190,paddingVertical:2,}}> {title}</Text> */}

    </View>
   

    <View style={styles.container}>
        <FlatList
        data={category}
        renderItem={({ item, index }) => (
          <View style={styles.row }>
            <View>
            <Pressable onPress={() => router.replace(`account/product?title=${item.title}`)} style={styles.itemContainer}>
               <TouchableOpacity style={styles.btn} onPress={() => AddToCart(item, cart, setCart, item.quantity)}>   
                    {/* <Image source='cart.png'/> */}
                     <Image source={require('../assets/cart.png')} style={{width:50, height: 50}} />
                  </TouchableOpacity>
               
                <Image source={{ uri: item.image}} style={styles.image} />
                <Text style={styles.itemTextTitle}> {item.title}</Text>
                {/* <Text > {item.price} EGP</Text> */}
               

              </Pressable>
            </View>
          </View>
        )}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={styles.flatListContent}
        numColumns={2}
      />
    </View>
    <Navbarr/>


    </View>
    // {/* </View> */}
  );
};
const styles = StyleSheet.create({
  header: {
   // flexDirection:'row',
   marginBottom: 14,
   marginVertical: 5,
    //backgroundColor: 'rgba(0,0,0,0.2)',

  },
 
  // title: {
  //   fontSize: 50,
  //   fontWeight: 'bold',
  //   color: 'red'
  // },
  container: {
  //  flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    // marginTop: 10,
    paddingTop: 10,
    // paddingBottom: 20,
    paddingHorizontal: 10,
  },
  // container2:{
  //  height:9,
  // },
  itemContainer: {
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
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 20,
  },
  title: {
    marginTop: 5,
    fontSize: 16,
    textAlign: 'center',
  },
  backButton: {
    position: 'absolute',
    // top: 10,
    left: 1,
    zIndex: 1,
    //backgroundColor: 'rgba(0,0,0,0.2)',
    padding: 10,
    borderRadius: 5,
  },
  btn: {
    
    marginTop: 10,
    width: "90%"
  }
});
export default ProductsList;

