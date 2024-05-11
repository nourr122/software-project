import { db } from "./config";
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
// Get a list of data from your database
async function getData() {
  const Col = collection(db, "product");
  const dataSnapshot = await getDocs(Col);
  const dataList = dataSnapshot.docs.map((doc) => {
    return { id: doc.id, ...doc.data() };
  });
  return dataList;
}


async function updateDataByTitle(title, updatedFields) {
  try {
    // Query Firestore to find document(s) with the specified title
    const q = query(collection(db, "product"), where("title", ">=", title.trim().toUpperCase()));
    const querySnapshot = await getDocs(q);

    // Iterate over the matching document(s)
    querySnapshot.forEach(async (doc) => {
      // Update each matching document with the provided fields
      await updateDoc(doc.ref, updatedFields);
      console.log("Document updated with title:", title);
      console.log("Document updated with updated fields", updatedFields);

    });
  } catch (error) {
    console.error("Error updating document:", error);
  }
}



async function deleteData(title) {
  try {
    const querySnapshot = await getDocs(query(collection(db, "product"), where("title", "==", title)));
    querySnapshot.forEach(async (doc) => {
      await deleteDoc(doc.ref);
      console.log("Document deleted with title: ", title);
    });
  } catch (error) {
    console.error("Error deleting document: ", error);
  }
}


async function addData(data) {
  try {
    const docRef = await addDoc(collection(db, "product"), data);
    console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}

function subscribe(callback) {
  const unsubscribe = onSnapshot(
    query(collection(db, "product")),
    (snapshot) => {
      const source = snapshot.metadata.hasPendingWrites ? "Local" : "Server";
      snapshot.docChanges().forEach((change) => {
        // console.log("changes", change, snapshot.metadata);
        if (callback) callback({ change, snapshot });
      });
      // console.log(source, " data: ", snapshot.data());
    }
  );
  return unsubscribe;
}

export { getData , addData,  subscribe , deleteData, updateDataByTitle};