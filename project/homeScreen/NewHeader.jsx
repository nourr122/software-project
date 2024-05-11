import React from 'react';
import { StyleSheet, Text, View, Image, TextInput } from 'react-native';

export default function NewHeader() {
  return (
    <View style={styles.container}>
      {/* Logo Image */}
      <Image
        source={require('../assets/Logo.jpg')}
        style={styles.logo}
        resizeMode="contain" // Adjust this based on your logo's aspect ratio
      />
      {/* Title Text */}
      <Text style={styles.title}>Local Grocer</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderBottomWidth: 2,
    borderBottomColor: '#ccc',
    flexDirection: 'row', // To align logo and title horizontally
    alignItems: 'center', // To vertically align logo and title
    paddingVertical: 7, // Adjust spacing as needed
    paddingHorizontal: 15,
  },
  logo: {
    width: 100, // Adjust width as needed
    height: 100, // Adjust height as needed
    marginRight: 10, // Adjust spacing between logo and title
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#333',
  },
});
