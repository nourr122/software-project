import { router, useLocalSearchParams } from 'expo-router';
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Pressable, Image, TouchableOpacity } from 'react-native';
import { db, auth, storage, app } from "../firebase/config";
import {
  getDocs,
  collection,
  query,
  where,
} from "firebase/firestore";
import Review from '../app/account/review';
import { FontAwesome } from '@expo/vector-icons';
import AddToCart from './AddToCart';
import Navbarr from '../homeScreen/Navbarr';


const Product = () => {

  const { title } = useLocalSearchParams();
  const [usertitle] = useState(title);
  const [cate, setCategory] = useState([]);
  const [cart, setCart] = useState([]);

  const [count, setCount] = useState(0);

  const increment = () => {
    setCount(count + 1);
  };

  const decrement = () => {
    setCount(count - 1);
  };

  useEffect(() => {
    const getList = async () => {
      const categoriesData = [];
      const q = query(collection(db, "product"), where("title", "==", usertitle));
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        categoriesData.push(doc.data());
      });
      setCategory(categoriesData);
    }
    getList();
  }, [usertitle]);


  return (
    <View style={styles.container}>

      <View >
        {cate.map((item, index) => (
          <View style={styles.item} key={index}>
            <Pressable style={styles.backButton} onPress={() => router.replace(`/account/productsList?title=${item.category}`)}>
              {/* <Text style={styles.backButtonText}>Back</Text> */}
              <Image source={require('../assets/left-arrow.png')} style={{ width: 50, height: 50 }} />
            </Pressable>
            <View style={styles.itemContainer}>
              <Image source={{ uri: item.image }} style={styles.image} />
              <View style={{ flexDirection: 'row' }}>
                <Text style={styles.itemTextTitle}> {item.title}</Text>
                <Text style={styles.itemTextTitle}> </Text>
              </View>
              <Text style={{ fontWeight: 'bold', fontSize: 20 }}> {item.price} EGP</Text>
              <Review title={item.title} />
            </View>
            <View style={styles.itemContainer}>

            </View>
            <View style={{ flexDirection: 'row' }}>
              <TouchableOpacity style={styles.button} onPress={() => AddToCart(item, cart, setCart, item.quantity)}>
                <Text style={{  fontSize: 20 }}>Add to cart</Text>
                <FontAwesome name='cart-plus' style={styles.buttonIcon} />
              </TouchableOpacity>

            </View>


          </View>
        ))}
      </View>
      <View>
        <View>

        </View>

      </View>
     

      <Navbarr />
    
    </View>
     
    // </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    margin: 20,
    //backgroundColor: 'rgba(0,0,0,0.2)',

  },
  container: {
    flex: 1,
    paddingTop: 40,
    paddingBottom: 20,
    paddingHorizontal: 10,
   
    // backgroundColor: '#f9f9f9',

  },
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  item: {
    // width: '48%', 
    marginBottom: 20,
  },
  itemContainer: {
    //flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
    padding: 10,
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 50,
  },
  itemTextTitle: {
    flexDirection: 'row',
    fontSize: 20,
    textAlign: 'center',
  },
  button: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#e1dfba',
    padding: 20,
    marginTop: 10,
    // margin: 50,
    width: "100%",
    borderRadius: 20
  },
  buttonIcon: {
    fontSize: 30,
    marginHorizontal: 10

  }
});

export default Product;
