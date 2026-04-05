// js/config.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore, doc, setDoc, getDoc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyC7QMIPaEWCLYKGdVoZqgI6rkm2AD-Psd0",
    authDomain: "mototaxi-app-3f9b3.firebaseapp.com",
    projectId: "mototaxi-app-3f9b3",
    storageBucket: "mototaxi-app-3f9b3.firebasestorage.app",
    messagingSenderId: "38018486321",
    appId: "1:38018486321:web:9211d47ada4fd3f8ed0510"
};

// Inicializamos Firebase y la base de datos
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Exportamos 'db' y las funciones para usarlas en el registro
export { db, doc, setDoc, getDoc };