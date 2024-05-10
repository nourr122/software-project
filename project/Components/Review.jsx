import React, { useState, useEffect } from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router, useLocalSearchParams } from 'expo-router';

const Review = () => {
  const {title} = useLocalSearchParams();
  const [usertitle] = useState(title);
  const [rating, setRating] = useState(0); // Define the rating state

  useEffect(() => {
    loadRating(); // Load rating when component mounts
  }, []);

  // Function to load rating from AsyncStorage
  const loadRating = async () => {
    try {
      const savedRating = await AsyncStorage.getItem(`rating_${usertitle}`);
      if (savedRating !== null) {
        setRating(parseInt(savedRating, 10));
      }
    } catch (error) {
      console.error('Error loading rating from AsyncStorage:', error);
    }
  };

  // Function to save rating to AsyncStorage
  const saveRating = async (selectedRating) => {
    try {
      await AsyncStorage.setItem(`rating_${title}`, selectedRating.toString());
      setRating(selectedRating); // Update rating state after saving
    } catch (error) {
      console.error('Error saving rating to AsyncStorage:', error);
    }
  };

  // Function to handle star press
  const handlePress = (selectedRating) => {
    saveRating(selectedRating);
  };

  // Render stars dynamically
  const renderStars = () => {
    const stars = [];
    // Loop to create 5 stars
    for (let i = 1; i <= 5; i++) {
      // Determine the color of the star based on the current rating
      const starColor = i <= rating ? '#FFD700' : '#FFFFFF';
      stars.push(
        <Pressable key={i} onPress={() => handlePress(i)}>
          <FontAwesome
            name="star"
            size={20}
            color={starColor}
            style={styles.starIcon}
          />
        </Pressable>
      );
    }
    return stars;
  };

  return (
    <View style={styles.container}>
      {renderStars()}
      <Text style={styles.ratingText}>{rating}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  starIcon: {
    marginRight: 5,
  },
  ratingText: {
    marginLeft: 5,
    fontSize: 16,
    fontWeight: 'bold',
    color: '#444',
  },
});

export default Review;
