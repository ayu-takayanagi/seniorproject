<template>
    <div class="header">
    <header class="logo"><span class="material-symbols-outlined">
content_cut
</span>KIRINUKI</header>
    <nav class="navbar1">
      <router-link to="/" class="navlink">Home</router-link>
      <router-link to="/library" class="navlink">Library</router-link>
      <router-link to="/record" class="navlink">Record</router-link>
      <router-link to="/monthlyreport" class="navlink"
        >Monthly Report</router-link
      >
    </nav>
    <nav class="navbar2">
      <router-link to="/login" class="navlink2">Login</router-link
      ><span>/</span>
      <router-link to="/register" class="navlink2">Register</router-link>
    </nav>
  </div>
  <router-view />
  <Footer />
</template>

<script>
import { onBeforeMount } from "vue";
import { useRouter, useRoute } from "vue-router";
import firebase from "firebase/compat/app";
import Footer from "./components/Footer.vue";

export default {
  components: [Footer],
  setup() {
    const router = useRouter();
    const route = useRoute();

    onBeforeMount(() => {
      firebase.auth().onAuthStateChanged((user) => {
        if (!user) {
          router.replace("/login");
        } else if (route.path == "/login" || route.path == "/register") {
          router.replace("/");
        }
      });
    });
  },
};
</script>

<style>
/* color palette: https://colorhunt.co/palette/ffffecf1e4c3c6a969597e52 */
.material-symbols-outlined {
  font-variation-settings:
  'FILL' 0,
  'wght' 600,
  'GRAD' 0,
  'opsz' 24
}

body {
  background: #ffffec;
  font-family: "Nunito", sans-serif;
}


.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 5px;
  margin-top: 3%;;
}

.logo {
  margin-left: 40px;
  font-size: 24px;
  color: #597e52;
  font-size: 45px;
  font-weight: 1000;
}

.navbar1 {
  display: flex;
  font-size: 20px;
  font-weight:700;
}

.navbar1 .navlink {
  margin: 0 15px;
  color: #597e52;
  text-decoration: none;
}

.navbar2 {
  display: flex;
  align-items: center;
  background-color: #597e52;
  color: #ffffec;
  border-radius: 10%;
  font-size: 20px;
  font-weight:700;
}

.navbar2 .navlink2 {
  margin: 0 10px;
  color: #ffffec;
  text-decoration: none;
}
</style>
