import {
  getDocs,
  doc,
  getDoc,
  setDoc,
  addDoc,
  deleteDoc,
  collection,
  query,
  where,
  onSnapshot,
  updateDoc
} from "firebase/firestore";
import { db } from "../firebase/config";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {  Alert} from 'react-native';


const AddToCart = async (category, cart, setCart, quantity) => {
  try {
    // Query the "cart" collection to check if the product exists
    const cartQuery = query(collection(db, "cart"), where("title", "==", category.title));
    const cartSnapshot = await getDocs(cartQuery);

    // If the product already exists in the cart, alert and return
    if (!cartSnapshot.empty) {
      alert("Product is already in the cart");
      return;
    }

    // If quantity is less than 1, alert and return
    // if (quantity < 1) {
    //   alert("Out of stock");
    //   return;
    // }

    // Add the item to the cart collection
    await addDoc(collection(db, "cart"), category);
    console.log("Document added to cart collection:", category.title);

    // Update the local state with the new cart item
    const updatedCart = [...cart, category];
    setCart(updatedCart);
  } catch (error) {
    console.error("Error adding document to cart collection:", error);
  }
};

// const AddToCart = async (category, cart, setCart, quantity) => {
//   const cartItemsFromStorage = await AsyncStorage.getItem('cart');
//   const existingCart = cartItemsFromStorage ? JSON.parse(cartItemsFromStorage) : [];
//   console.log("Existing Cart:", existingCart); 
//   const productInCart = existingCart.find(({ title }) => title === category.title);

//   if (productInCart) {
//     alert("Product is already in the cart ");
//     return;
//   }
//   else if(quantity < 1 ) {
//     alert("Out of stock")
//   }
//   // Add the item to the cart
//   const updatedCart = [...cart, category];
//   setCart(updatedCart);

//   try {
//     await AsyncStorage.setItem('cart', JSON.stringify(updatedCart));
//   //  console.log("Cart updated in AsyncStorage");
//   } catch (error) {
//   //  console.error("Error updating cart in AsyncStorage:", error);
//   }

//   try {
//     await addDoc(collection(db, "cart"), category);
//     console.log("Document added to cart collection:", category.title);
//   } catch (error) {
//     console.error("Error adding document to cart collection:", error);
//   }
// };

// const AddToCart = async (category, cart, setCart, quantity) => {
//    const productInCart = cart.find(({ title }) => title === category.title);
//  // console.log("aaaaa", category.title);
//  // console.log("Cart before:", cart);
//  // const productInCart = cart.find(item => item.id === category.id);
  
//   // If the product is already in the cart, show a message and return
//   if (productInCart) {
//     alert("Product is already in the cart ");
//     return;
//   } else if (quantity < 1) {
//     alert("Out of stock")
//     return;
//   }

//   // Add the item to the cart
//   const updatedCart = [...cart, category];
//   setCart(updatedCart);

//   try {
//     await addDoc(collection(db, "cart"), category);
//     console.log("Document added to cart collection:", category.title);
//   } catch (error) {
//     console.error("Error adding document to cart collection:", error);
//   }
 
// };

export default AddToCart;
