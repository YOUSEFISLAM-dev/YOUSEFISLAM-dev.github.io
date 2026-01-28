import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth, signInAnonymously, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import {
  getFirestore,
  doc,
  collection,
  query,
  where,
  orderBy,
  limit,
  setDoc,
  updateDoc,
  getDoc,
  getDocs,
  addDoc,
  onSnapshot,
  serverTimestamp,
  runTransaction,
  deleteDoc,
  arrayUnion,
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
import { FIREBASE_CONFIG } from "./firebase-config.js";

export const firebaseEnabled = !!(FIREBASE_CONFIG && FIREBASE_CONFIG.apiKey);

export const fb = {
  app: null,
  auth: null,
  db: null,
};

export function initFirebase() {
  if (!firebaseEnabled) return null;
  fb.app = initializeApp(FIREBASE_CONFIG);
  fb.auth = getAuth(fb.app);
  fb.db = getFirestore(fb.app);
  return fb;
}

export function watchAuth(cb) {
  if (!firebaseEnabled) return () => {};
  return onAuthStateChanged(fb.auth, cb);
}

export async function ensureAnonAuth() {
  if (!firebaseEnabled) return null;
  if (fb.auth.currentUser) return fb.auth.currentUser;
  await signInAnonymously(fb.auth);
  return fb.auth.currentUser;
}

export const fs = {
  doc,
  collection,
  query,
  where,
  orderBy,
  limit,
  setDoc,
  updateDoc,
  getDoc,
  getDocs,
  addDoc,
  onSnapshot,
  serverTimestamp,
  runTransaction,
  deleteDoc,
  arrayUnion,
};

