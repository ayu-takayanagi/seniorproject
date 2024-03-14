<template>
  <button class="logout" @click="Logout">Logout</button>
</template>

<script>
import firebase from "firebase/compat/app";

export default {
  setup() {
    const Logout = () => {
      firebase
        .auth()
        .signOut()
        .then(() => console.log("Signed out"))
        .catch((err) => alert(err.message));
    };

    return {
      Logout,
    };
  },
};
</script>
