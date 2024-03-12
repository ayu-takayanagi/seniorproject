<template>
  <div class="container">
    <div>
      <h1>Welcome, {{ name }}</h1>
      <br />
        <div class="container2">
          <h2>READY TO USE?</h2>
          <h3>HOW TO USE</h3>
          <p>Welcome to KIRINUKI! Are you new to this web app? I will take you to the instructions below!</p>
          <p>1. Decide what you want to learn this week</p>
          <p>2. Search an article relating to your topic on the Library page</p>
          <p>3. Read the article and record what you read on the Record page</p>
          <p>4. You can see your learning history on the Monthly Report page</p>
          <p>5. Don't forget to log out!</p>
        </div>
        <div>
          <img src="../components/homeimage.avif" />
        </div>
    </div>
  </div>

  <button class="logout" @click="Logout">Logout</button>

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
  margin-top: 70px;
}

.container2{
  float: left;
}
h1{
  font-size: 40px;
}

img{
  height:400px;
}
</style>
