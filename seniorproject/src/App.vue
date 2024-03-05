<template>
  <div class="header">
    <nav>
      <router-link to="/" class="navlink">Home</router-link>
      <router-link to="/library" class="navlink">Library</router-link>
      <router-link to="/record" class="navlink">Record</router-link>
      <router-link to="/monthlyreport" class="navlink"
        >Monthly Report</router-link
      >
      <router-link to="/login" class="navlink">Login</router-link>
      <router-link to="/register" class="navlink">Register</router-link>
    </nav>
  </div>
  <router-view />
</template>

<script>
import { onBeforeMount } from "vue";
import { useRouter, useRoute } from "vue-router";
import firebase from "firebase/compat/app";

export default {
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

nav {
  width: 100%;
  height: 70px;
  background-color: #597e52;
  text-align: right;
}

.navlink {
  margin-right: 30px;
  color: #ffffec;
  font-weight: 500;
  font-size: 20px;
}
</style>
