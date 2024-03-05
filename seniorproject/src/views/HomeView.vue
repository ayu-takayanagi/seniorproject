<template>
  <div class="container">
    <h1>Welcome, User</h1>
    <br />
    <h3>HOW TO USE</h3>
    <p>Welcome to KIRINUKI! Are you new to this web app? I will take you to the instructions below!</p>
    <p>1. Decide what you want to learn this week</p>
    <p>2. Search an article relating to your topic on the Library page</p>
    <p>3. Read the article and record what you read on the Record page</p>
    <p>4. You can see your learning history on the Monthly Report page</p>
    <p>5. Don't forget to log out!</p>
    <button class="logout" @click="Logout">Logout</button>
  </div>
</template>

<script>
import { ref, onBeforeMount } from "vue";
import firebase from "firebase/compat/app";

export default {
  setup() {
    const name = ref("");

    onBeforeMount(() => {
      const user = firebase.auth().currentUser;
      if (user) {
        name.value = user.email.split("@")[0];
      }
    });

    const Logout = () => {
      firebase
        .auth()
        .signOut()
        .then(() => console.log("Signed out"))
        .catch((err) => alert(err.message));
    };

    return {
      name,
      Logout,
    };
  },
};
</script>

<style>
.container {
  text-align: center;
}
</style>
