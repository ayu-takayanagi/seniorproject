<template>
  <div class="container">
    <div>
      <div class="title">
        <h1>Welcome, {{ name }}</h1>
      </div>
      <div class="underTitle">
        <div class="container2">
          <h2>READY TO LEARN SOMETHING NEW?</h2>
          <h3>HOW TO USE</h3>
          <p>
            Welcome to KIRINUKI! Are you new to this web app? <br />
            I will take you to the instructions below!
          </p>
          <p>1. Decide what you want to learn this week</p>
          <p>2. Search an article relating to your topic on the Library page</p>
          <p>3. Read the article and record what you read on the Record page</p>
          <p>4. You can see your learning history on the Monthly Report page</p>
          <p>5. Don't forget to log out!</p>
          <div class="button">
            <router-link to="/library" class="buttonLink"
              >Get Started >></router-link
            >
          </div>
        </div>
        <div>
          <img src="../components/homeimage.avif" />
        </div>
      </div>
    </div>
  </div>

  <div class="weeklyTopic">
    <h2>Weekly Topic</h2>
    <p id="date">This week (2024/3/10 - 2024/3/16)</p>
  </div>
</template>

<script>
import { ref, onBeforeMount } from "vue";
import firebase from "firebase/compat/app";
import Footer from "../components/Footer.vue";

export default {
  components: [Footer],
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
  margin-top: 70px;
}

.container2 {
  float: left;
  margin-left: 15%;
}

.underTitle {
  background-color: #f1e4c3;
  height: 450px;
}

h1 {
  font-size: 50px;
}

h2 {
  font-size: 30px;
}
.title {
  text-align: center;
}
.button {
  background-color: #597e52;
  width: 150px;
  height: 30px;
  text-align: center;
  border-radius: 20px;
  justify-content: center;
}
.buttonLink {
  color: #ffffec;
}
img {
  height: 400px;
  margin-left: 8%;
}
.logout {
  margin-top: 80px;
  font-size: 20px;
  background: #597e52;
  border-radius: 20px;
  color: #ffffec;
  justify-content: center;
}
.weeklyTopic {
  text-align: center;
}
</style>
