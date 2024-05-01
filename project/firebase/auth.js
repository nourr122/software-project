import { auth } from "./config";
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  confirmPasswordReset,
  signInWithCredential,
  FacebookAuthProvider,
  signOut
} from "firebase/auth";
// Listen for authentication state to change.
onAuthStateChanged(auth, (user) => {
  if (user != null) {
    console.log("We are authenticated now!");
  }

  // Do other things
});

async function resetPassword(email) {
  return await sendPasswordResetEmail(auth, email).then((a) => {
    alert("Password reset email sent")
  })
}

async function register(userName, email, password) {
  const cred = await createUserWithEmailAndPassword(auth, email, password);
  return cred;
}

async function login(email, password) {
 const cred = await signInWithEmailAndPassword(auth, email, password);
 return cred;
}
async function forgotpass(email) {
  await sendPasswordResetEmail(auth, email);
}
async function logout(email, password) {
  await signOut(auth, email, password);
}

export { register, login, forgotpass, logout, resetPassword };