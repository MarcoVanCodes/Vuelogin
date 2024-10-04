<template>
  <div class="container">
    <Navbar/>
      <!-- ////////// formulario Añadir ////////// -->
    <!-- Nombre -->
  <div class="container my-4">
  <form>  
    <div class="input-group mb-3">
    <span class="input-group-text label-blue">Nombre</span>
    <input v-model="usuario.nombre" type="text" class="form-control input-blue">
    </div>
    <!-- Correo -->
    <div class="input-group mb-3">
    <span class="input-group-text label-blue">Correo</span>
    <input v-model="usuario.correo" type="text" class="form-control input-blue">
    </div>
   
    <!-- Botón Guardar -->
    <div class="mt-3">  
    <button @click.prevent="agregarDato()" 
            class="btn btn-primary">Guardar
    </button>
    </div>
  </form>
  </div>
<!-- ////////// tabla ////////// -->
  <table class="table">
    <thead>
      <tr>
        <th scope="col">ID</th>
        <th scope="col">Nombre</th>
        <th scope="col">Correo</th>
        <th scope="col">Eliminar</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(item, index) in usuarios" :key="index">
        <th scope="row">{{ index }}</th>
        <td>{{ item.nombre }}</td>
        <td>{{ item.correo }}</td> 
        <td>
        <button @click.prevent="eliminarDato(item.id)" 
          class="btn btn-danger">Eliminar
        </button>
      </td>
      </tr>
    </tbody>
  </table>
  </div>
</template>

<script>
import Navbar from '@/components/Navbar.vue'
import { collection, getDocs, addDoc, deleteDoc, doc } from 'firebase/firestore/lite';
import { db } from "../main";
import router from '../router/index'

export default {
  name: 'Home',
  components: {
    Navbar
  },
  data() {
    return {
      usuarios: [],
      usuario: {
      nombre: '',
      correo: '',
      contrasena: '' // Mantener la propiedad para capturar la contraseña
    }
    }
  },
  methods: {
    async obtenerDatos () { 
      this.usuarios = []; // Limpia el array antes de llenarlo
      const querySnapshot = await getDocs(collection(db, "usuarios"));
      querySnapshot.forEach((doc) => {
        let usuario = doc.data();
        usuario.id = doc.id;
        this.usuarios.push(usuario);
        console.log(usuario);
      });
    },
    async agregarDato(){
      try {
        await addDoc(collection(db, "usuarios"), {
          nombre: this.usuario.nombre,
          correo: this.usuario.correo,
          contrasena: this.usuario.contrasena // La contraseña se sigue guardando en la base de datos pero no se muestra
        });
        console.log("Documento añadido");
        this.obtenerDatos(); // Actualiza la lista después de agregar
        this.usuario.nombre = ''; // Limpia los campos
        this.usuario.correo = '';
        this.usuario.contrasena = '';
      } catch (error) {
        console.error("Error al añadir el documento: ", error);
      }
    },
    // DELETE / ELIMINAR / BORRAR
    async eliminarDato (id){
      try {
        await deleteDoc(doc(db, "usuarios", id));
        console.log("Documento eliminado");
        this.obtenerDatos(); // Actualiza la lista después de eliminar
      } catch (error) {
        console.error("Error al eliminar el documento: ", error);
      }
    },
  },
  mounted() {
    this.obtenerDatos();
  },
}
</script>

<style scoped>
/* Estilo para los campos de entrada */
.input-blue {
  background-color: #d9f1ff; /* Azul cielo no tan fuerte */
  color: black; /* Texto negro */
}

.input-blue:focus {
  background-color: #c2e4ff; /* Un tono ligeramente más oscuro cuando se enfoca */
  outline: none;
  border-color: #80bfff; /* Borde azul al hacer clic */
}

/* Estilo para las etiquetas de Nombre y Correo */
.label-blue {
  color: #0044cc; /* Azul más fuerte */
  background-color: #d9f1ff; /* Mantener el fondo igual que el input */
}
</style>



