import React from 'react';
import { View, FlatList, StyleSheet, Pressable, Text, Animated } from 'react-native';
import { router } from 'expo-router';
import { FontAwesome } from '@expo/vector-icons'; // Import FontAwesome icons

export default function Navbarr() {
  const navItems = [
    { id: 'homee', title: 'Home', icon: 'home' },
    { id: 'profile', title: 'Profile', icon: 'user' },
    { id: 'cart', title: 'Cart', icon: 'cart-plus' }, // Added cart icon
    // { id: 'AboutUs', title: 'About Us' },
    { id: 'Search',title:'Search', icon: 'search' }, // Added an icon property for the search item
  ];

  return (
    <Animated.View style={styles.container}>
    <FlatList
    data={navItems}
    renderItem={({ item }) => (
    <Pressable style={[styles.item, item.special && styles.specialItem]} onPress={() => router.replace(`/account/${item.id}`)}>
      <View style={styles.iconContainer}>
        <FontAwesome name={item.icon} size={20} color="black" style={styles.icon} />
        <Text style={styles.title}>{item.title}</Text>
      </View>
    </Pressable>
  )}
  keyExtractor={item => item.id}
  horizontal={true}
  contentContainerStyle={styles.flatListContainer}
/>

    </Animated.View>
  );
}


const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 70,
    backgroundColor: '#e1dfba',
    borderTopWidth: 2,
    borderTopColor: '#f0f5f9',
    zIndex: 1,
  },
  item: {
    padding: 10,
    marginHorizontal: 10,
  },
  specialItem: {
    backgroundColor: 'orange',
    borderRadius: 5,
  },
  title: {
    fontSize: 12,
    textAlign: 'center',
  },
  icon: {
    marginRight: 5,
  },
  flatListContainer: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  iconContainer: {
    flexDirection: 'column',
    alignItems: 'center',
  },
});