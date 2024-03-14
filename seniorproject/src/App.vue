<template>
  <div class="header">
    <header class="logo">KIRINUKI</header>
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

body {
  background: #ffffec;
  font-family: "Nunito", sans-serif;
}

.logo {
  color: #597e52;
  font-size: 50px;
  font-weight: 800;
  /* margin-top: 20px; */
  margin-left: 20px;
  margin-right: 200px;
  width: 150px;
}

header {
  display: inline-block;
  width: 1200px;
  margin-top: 50px;
}
.navlink,
.header {
  margin-right: 15px;
  margin-left: 15px;
  font-weight: 500;
  font-size: 20px;
  color: #597e52;
  display: inline-flex;
  justify-content: space-between;
}

.navlink2 {
  color: #ffffec;
  margin-right: 15px;
  margin-left: 15px;
}

.navbar1 {
  text-align: center;
  color: #597e52;
  margin-top: 70px;
  padding-right: 100px;
}
.navbar2 {
  text-align: center;
  width: 200px;
  height: 40px;
  background: #597e52;
  border-radius: 20px;
  color: #ffffec;
  margin-top: 70px;
}
</style>
