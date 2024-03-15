<template>
  <div class="container">
    <div>
      <div class="title">
        <h1>Welcome, {{ name }}</h1>
      </div>
      <div class="underTitle">
        <div class="container2">
          <h2>READY TO LEARN SOMETHING NEW?</h2>
          <p>
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


  <div>
    <h2>Weekly Topics</h2>
    <form class="weeklyTopicForm" @submit.prevent="addWeeklyTopic">
      <label for="date">Date:</label>
      <input type="date" id="date" v-model="newTopic.date" required>
      <label for="topic">Topic:</label>
      <input type="text" id="topic" v-model="newTopic.topic" required>
      <button type="submit">Add Topic</button>
    </form>

    <div v-if="weeklyTopics.length > 0">
      <h2>Previous Weekly Topics</h2>
      <ul>
        <li v-for="topic in weeklyTopics" :key="topic.id">
          <strong>{{ topic.date }}:</strong> {{ topic.topic }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { ref, onBeforeMount } from "vue";
import firebase from "firebase/compat/app";
import Footer from "../components/Footer.vue";
import { collection, addDoc, getDocs, orderBy, query } from 'firebase/firestore';
import { db } from '../firebase/init.js';

export default {
  components: [Footer],
  data() {
    return {
      newTopic: {
        date: '',
        topic: ''
      },
      weeklyTopics: []
    };
  },
  
  async mounted(){
    this.fetchWeeklyTopics();
  },

  methods: {
    async addWeeklyTopic() {
      try {
        await addDoc(collection(db, 'weeklyTopics'), this.newTopic);
        this.newTopic.date = '';
        this.newTopic.topic = '';
        this.fetchWeeklyTopics();
      } catch (error) {
        console.error('Error adding weekly topic:', error);
      }
    },
    async fetchWeeklyTopics() {
      try {
        const querySnapshot = await getDocs(query(collection(db, 'weeklyTopics'), orderBy('date', 'desc')));
        this.weeklyTopics = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      } catch (error) {
        console.error('Error fetching weekly topics:', error);
      }
    }
  },

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
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 5px;
  margin-top: 3%;;
}

h1 {
  font-size: 40px;
}

h2 {
  font-size: 25px;
}

p{
  font-weight:600;
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
  margin-right: 200px;
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
.weeklyTopicForm{
  text-align: center;
}
</style>
