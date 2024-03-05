<template>
  <div class="login">
    <h1>Login</h1>
    <form @submit.prevent="Login">
      <input type="text" placeholder="Email" v-model="email" />
      <input type="password" placeholder="Password" v-model="password" />
      <br />
      <input class="button" type="submit" value="Login" />
      <p>
        Need an account? <router-link to="/register">Register Here</router-link>
      </p>
    </form>
  </div>
</template>

<script>
import { ref } from "vue";
import firebase from "firebase/compat/app";

export default {
  setup() {
    const email = ref("");
    const password = ref("");

    const Login = () => {
      firebase
        .auth()
        .signInWithEmailAndPassword(email.value, password.value)
        .then((data) => console.log("Welcome!"))
        .catch((err) => alert("Your email address or password is incorret."));
    };

    return {
      Login,
      email,
      password,
    };
  },
};
</script>

<style>
input {
  margin-right: 20px;
}

.button {
  margin-top: 20px;
}

.login {
  text-align: center;
  justify-content: center;
  margin-top: 100px;
  margin-right: 400px;
  margin-left: 400px;
  padding-top: 10px;
  padding-bottom: 10px;
  border: 2mm solid #597e52;
  border-radius: 30px;
}
</style>
