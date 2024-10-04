// Importaciones principales
import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';

import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

// Importaciones de Firebase
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore/lite';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";

// Nueva configuración de Firebase-
const firebaseConfig = {
  apiKey: "AIzaSyDZv4thwnbVJmZwPgYrRGNochK6MdkAwh4",
  authDomain: "proyecto01-847a2.firebaseapp.com",
  projectId: "proyecto01-847a2",
  storageBucket: "proyecto01-847a2.appspot.com",
  messagingSenderId: "24671510146",
  appId: "1:24671510146:web:d8ea66b5867e612fff1e9b",
  measurementId: "G-JH1H0D1TZF"
};

// Inicialización de Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app); // Inicializamos Firestore
export { db };

// Inicializa Analytics si es necesario
const analytics = getAnalytics(app);

// Configuración de autenticación de Firebase
const auth = getAuth(app); // Nos aseguramos de que auth está ligado a nuestra instancia app

// Verificamos el estado de autenticación y actualizamos el store
onAuthStateChanged(auth, (user) => {
  if (user) {
    console.log(user);
    const usuarioActivo = {
      email: user.email,
      uid: user.uid
    };
    store.dispatch('detectarUsuario', usuarioActivo);
    console.log(usuarioActivo);
  } else {
    console.log(user);
    store.dispatch('detectarUsuario', null);
  }
});

// Montamos la aplicación de Vue
createApp(App)
  .use(store)
  .use(router)
  .mount('#app');