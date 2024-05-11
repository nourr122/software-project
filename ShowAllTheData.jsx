import { Text, View, StyleSheet, TextInput, Pressable, Button ,FlatList,Image} from 'react-native'
import NewHeader from '../homeScreen/NewHeader'
import { updateDataByTitle} from '../firebase/data'
import Navbarr from '../homeScreen/Navbarr';
import { db, auth, storage,  listAll , app} from "../firebase/config";
import { useState,useEffect } from 'react';

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
  } from "firebase/firestore";




const ShowData = () => {
    const [category, setCategory] = useState([]);

  const getList =async() => {
    const categoriesData = [];
    const q = query(collection(db, "product"));

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
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
    
  console.log(getList());
  return (
    <View  style={styles.container}>
         <NewHeader />
      

      <FlatList
        data={category}
        renderItem={({ item, index }) => (
          <View style={styles.row }>
            <View style={styles.item}>
            <Pressable onPress={() =>router.replace(`/account/product?title=${item.title}`)} style={styles.itemContainer}>
                <Image source={{ uri: item.image }} style={styles.image} />
                <Text style={styles.itemTextTitle}> {item.title}</Text>
              </Pressable>
            </View>
          </View>
        )}
        keyExtractor={(item, index) => index.toString()}
        // contentContainerStyle={styles.flatListContent}
        numColumns={2}
      />
      <Navbarr />
    </View>
  );
};
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
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        margin: 10,
        width: '40%',
        borderRadius: 10,
        alignItems: 'center'
      },
      button: {
        margin: 10,
        backgroundColor: '#9ad1aa',
        padding: 10,
        width: "30%",
        alignItems:'center',
        borderRadius: 20
      },
      title: {
        fontSize: 20,
        fontWeight: 'bold',
        margin: 10
      },itemContainer: {
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
        width: 150,
        height: 150,
        borderRadius: 20,
      },
      title: {
        marginTop: 5,
        fontSize: 16,
        textAlign: 'center',
      },
  }); 

export default ShowData;
