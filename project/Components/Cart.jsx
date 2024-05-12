import React, { useCallback, useState, useEffect } from "react";
import { FlatList, StyleSheet, Text, TextInput, View, ActivityIndicator, Alert, Pressable, TouchableOpacity, Image, Button, TouchableOpacityBase } from "react-native";
import { router, useFocusEffect } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { FontAwesome } from '@expo/vector-icons'; 
import {
  getDocs,
  doc,
  setDoc,
  addDoc,
  deleteDoc,
  updateDoc,
  collection,
  query,
  where,
  onSnapshot,
  getDoc,
  documentId,
  uuid
} from "firebase/firestore";
import { db } from "../firebase/config";
import Navbarr from "../homeScreen/Navbarr";



export default function Cart({item}) {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [originalData, setOriginalData] = useState([]);
  const [category, setCategory] = useState([]);
  const [cart, setCart] = useState([]);



  const getList = async () => {
    const categoriesData = [];

    const q = query(collection(db, "cart"), where("quantity", "==", 1));
    

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
       categoriesData.push({ id: doc.id, ...doc.data() });
    });
    setCart(categoriesData)

     querySnapshot.forEach((doc) => {
       console.log(doc.id, " => ", doc.data());
      
      
    });
  }

  useEffect(() => {
     getList();
  }, []);
  const handleBack = () => {
    router.replace('/home');
  };

  const deleteFromCart =  async (productId) => {
    try {
      await deleteDoc(doc(db, "cart", productId));
      console.log("Document successfully deleted!", productId);
      setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
      const updatedCategory = await removeItemFromAsyncStorage(productId);
      setCategory(updatedCategory)
     // getList();
    } catch (error) {
      console.error("Error removing document: ", error);
    }
  };
  const removeItemFromAsyncStorage = async (productId) => {
    try {
      // Get the current AsyncStorage data
      const currentData = await AsyncStorage.getItem("cart");
      if (currentData !== null) {
        let parsedData = JSON.parse(currentData);
        // Filter out the deleted item
        parsedData = parsedData.filter((item) => item.id !== productId);
        await AsyncStorage.setItem("cart", JSON.stringify(parsedData));
        console.log("Item removed from AsyncStorage:", productId);
        return parsedData; // Return the updated data
      }
    } catch (error) {
      console.error("Error removing item from AsyncStorage:", error);
    }
    return []; 
  };
  
  

  const incrementQuantity = async (productId) => {
    const updatedCart = cart.map((item) => {
      if (item.id === productId) {
        return { ...item, quantity: item.quantity + 1 };
      }
      return item;
    });
    setCart(updatedCart);
    try {
      const cartDocRef = doc(db, "cart", productId);
      await updateDoc(cartDocRef, { quantity: updatedCart.find((item) => item.id === productId).quantity });
      console.log("Quantity updated in cart document");
    } catch (error) {
      console.error("Error updating quantity in cart document: ", error);
    }
  };
  



  const decrementQuantity = (productId) => {
    const updatedCart = cart.map((item) => {
      if (item.id === productId && item.quantity > 1) {
        return { ...item, quantity: item.quantity - 1 };
      }
      return item;
    });
    setCart(updatedCart);
  };
    
  return (
    <View>
   <View style={styles.header}>
       <Pressable style={styles.backButton} onPress={handleBack}>
        {/* <Text style={styles.backButtonText}>Back</Text> */}
        <Image source={require('../assets/left-arrow.png')} style={{width:50, height: 50}} />
      </Pressable>
      </View>
    <View style={styles.container}>
    <FlatList
      data={cart}
      renderItem={({ item }) => (
        <View style={styles.item}>
          <View style={styles.itemContainer}>
            <Image source={{ uri: item.image }} style={styles.image} />
            <View>
              <Text>{item.title}</Text>
              <Text>{item.price} EGP</Text>
             
            </View>
            <View style={styles.buttonsContainer}>
              <TouchableOpacity onPress={() => decrementQuantity(item.id)}>
                <FontAwesome name='minus' style={styles.buttonIcon} />
              </TouchableOpacity>
                <Text style = {{fontSize: 20}}> {item.quantity} </Text>
              <TouchableOpacity onPress={() => incrementQuantity(item.id)}>
                <FontAwesome name='plus' style={styles.buttonIcon} />
              </TouchableOpacity>
            </View>
            <TouchableOpacity style={styles.btn} onPress={() => deleteFromCart(item.id)}>
              <Text >Remove</Text>
            </TouchableOpacity>
          </View>
        </View>
        
      )}
      keyExtractor={(item) => item.id}
    />
  
     </View>
  {/* <Navbarr /> */}

   </View>
  
);
 }

const styles = StyleSheet.create({
    header: {
    marginTop: 20,
    backgroundColor: 'rgba(0,0,0,0.2)',

    },
container: {
  marginTop: 70,
 // backgroundColor: 'rgba(0,0,0,0.2)',
  marginHorizontal: 20,
},
item: {
  marginTop: 10,
},
  itemContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    padding: 10,
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
image: {
  width: 100,
  height: 100,
  marginRight: 10,
},
buttonsContainer: {
  flexDirection: 'row',
 // fontSize: 20,
  alignItems: 'center',
  marginLeft: 'auto',
  //marginLeft: 20,
},
buttonIcon: {
  fontSize: 20,
  marginHorizontal: 5,

},
  backButton: {
    position: 'absolute',
    top: 10,
    left: 10,
    zIndex: 1,
   // backgroundColor: 'rgba(0,0,0,0.2)',
    padding: 10,
    borderRadius: 5,
  },
    btn: {
    // flex:1,
   // flexDirection:"row",
    color: "white",
    fontSize: 15,
    fontWeight: "bold",
    // paddingVertical: 10,
    // paddingHorizontal: 10,
    padding: 5,
     borderRadius: 5,
    backgroundColor: "#e1dfba",
  },
});
 
