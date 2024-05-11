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
    if (quantity < 1) {
      alert("Out of stock");
      return;
    }

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

export default AddToCart;
