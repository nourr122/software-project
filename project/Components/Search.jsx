import { Button, FlatList, StyleSheet, Text, TextInput, View, Pressable, Image } from "react-native";
import React, { useState } from "react";
import { db } from "../firebase/config"; // Import the Firestore database instance
import { getDocs, collection, query, where } from "firebase/firestore";
import { router } from "expo-router";

export default function Search() {
  const [text, setText] = useState("");
  const [items, setItems] = useState([]);

  const fetchItemsByTitle = async (searchTitle) => {
    try {
      const q = query(collection(db, "product"), where("title", ">=", searchTitle.trim().toUpperCase()));
      const querySnapshot = await getDocs(q);
      const fetchedItems = querySnapshot.docs.map(doc => ({
        id: doc.id,
        title: doc.data().title,
        image: doc.data().image,
        price: doc.data().price,
      }));
      setItems(fetchedItems);
      if (items.title.toUpperCase().startsWith(searchQuery.trim().toUpperCase())) {
        items.push(items);
      }
    }
    catch (error) {
      console.error("Error fetching items:", error);
    }
  };

  const searchItems = (searchFor) => {
    fetchItemsByTitle(searchFor);
  };

  return (
    <View style={styles.container}>

      <View style={styles.searchContainer}>
        <TextInput
          style={styles.input}
          placeholder="Search for"
          onChangeText={(t) => { setText(t); searchItems(t) }}
        />
        <Button color="#e1dfba" onPress={() => searchItems(text)} title="Search" />
      </View>
      <FlatList
        style={styles.list}
        data={items}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (

          <View style={styles.item} >

            <Pressable onPress={() => router.replace(`/account/product?title=${item.title}`)}>
              <View style={styles.item}>
                <Text style={styles.itemText}>Title: {item.title}</Text>
                <Image source={{ uri: item.image }} />
                <Text style={styles.itemText}>Price: {item.price} EGP</Text>
              </View>
            </Pressable>

          </View>

        )}
      />
      <Pressable style={styles.backButton} onPress={() => router.replace('/home')}>
        {/* <Text style={styles.backButtonText}>Back</Text> */}
        <Image source={require('../assets/left-arrow.png')} style={{ width: 50, height: 50 }} />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#E6F4EA',
    paddingHorizontal: 20,
    paddingTop: 50,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    marginVertical: 20
  },
  input: {
    flex: 1,
    backgroundColor: '#D1EAD7',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    marginRight: 10,
  },
  list: {
    flex: 1,
    // backgroundColor: '#E6F4EA',
    borderRadius: 10,
    padding: 10,
  },
  item: {
    marginBottom: 10,
    padding: 15,
    backgroundColor: '#D1EAD7',
    borderRadius: 10,
  },
  itemText: {
    fontSize: 16,
    color: '#333333',
  },
  backButton: {
    position: 'absolute',
    top: 20,
    left: 0,
    zIndex: 1,
    // backgroundColor: 'rgba(0,0,0,0.2)',
    padding: 10,
    borderRadius: 5,
  },
});
