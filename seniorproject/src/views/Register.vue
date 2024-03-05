<template>
  <div class="register">
    <h1>Register</h1>
    <form @submit.prevent="Register">
      <input type="text" placeholder="Email" v-model="email" />
      <input type="password" placeholder="Password" v-model="password" />
      <br />
      <input class="button" type="submit" value="Register" />
    </form>
    <p><button @click="signInWithGoogle">Sign in with Google</button></p>
    <p>Have an account? <router-link to="/login">Login Here</router-link></p>
  </div>
</template>

<script>
import firebase from "firebase/compat/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { ref } from "vue";

export default {
  setup() {
    const email = ref("");
    const password = ref("");

    const Register = () => {
      firebase
        .auth()
        .createUserWithEmailAndPassword(email.value, password.value)
        .then((user) => {
          alert("Successfully Registered!");
        })
        .catch((err) => alert(err.message));
    };

    const signInWithGoogle = () => {
      const provider = new GoogleAuthProvider();
      signInWithPopup(getAuth(), provider)
        .then((result) => {
          console.log(result.user);
          router.push("/");
        })
        .catch((err) => alert(err.message));
    };

    return {
      Register,
      signInWithGoogle,
      email,
      password,
    };
  },
};
</script>

<style>
.register {
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

.button {
  margin-top: 20px;
}
</style>
