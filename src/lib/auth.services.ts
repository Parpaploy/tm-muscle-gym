import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { doc, setDoc, serverTimestamp, getDoc } from "firebase/firestore";
import { auth, db } from "../lib/firebase";

export async function signupWithEmail(email: string, password: string) {
  const userCredential = await createUserWithEmailAndPassword(
    auth,
    email,
    password,
  );

  const uid = userCredential.user.uid;

  await setDoc(doc(db, "users", uid), {
    uid,
    email,
    role: "user",
    createdAt: serverTimestamp(),
  });

  return userCredential.user;
}

export async function loginWithEmail(email: string, password: string) {
  const cred = await signInWithEmailAndPassword(auth, email, password);

  const uid = cred.user.uid;

  const snap = await getDoc(doc(db, "users", uid));

  if (!snap.exists()) {
    throw new Error("ไม่พบข้อมูลผู้ใช้");
  }

  const userData = snap.data();

  return {
    uid,
    email: cred.user.email,
    role: userData.role,
  };
}

export async function logout() {
  await signOut(auth);
}
