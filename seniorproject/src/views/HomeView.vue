<template>
  <div class="container">
    <div>
      <div class="title">
        <h1>Welcome, {{ name }}</h1>
      </div>
      <div class="underTitle">
        <div class="container2">
          <h2>READY TO LEARN SOMETHING NEW?</h2>
          <p>I will take you to the instructions below!</p>
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
    <!-- Form to add new topic -->
    <h2>Add Weekly Topic</h2>
    <form @submit.prevent="addTopic" class="weeklyTopicForm">
      <input type="date" v-model="newTopicDate" required />
      <input
        type="text"
        v-model="newTopicName"
        placeholder="Topic Name"
        required
      />
      <button type="submit">Add Topic</button>
    </form>

    <!-- This Week's Topic -->
    <h2>This Week's Topic</h2>
    <div class="thisWeekTopic" v-if="thisWeekTopic">
      <p>Date: {{ thisWeekTopic.date }}</p>
      <p>Topic: {{ thisWeekTopic.name }}</p>
      <button @click="editTopic(thisWeekTopic.id)">Edit</button>
      <button @click="deleteTopic(thisWeekTopic.id)">Delete</button>
    </div>

    <!-- Previous Weekly Topics -->
    <h2>Previous Weekly Topics</h2>
    <div
      class="weeklyTopic"
      v-for="topic in previousWeekTopics"
      :key="topic.id"
    >
      <p>{{ topic.date }}: {{ topic.name }}</p>
      <button @click="editTopic(topic.id)">Edit</button>
      <button @click="deleteTopic(topic.id)">Delete</button>
    </div>
  </div>

  <button class="logout" @click="Logout">Logout</button>
</template>

<script>
import { ref, onBeforeMount } from "vue";
import firebase from "firebase/compat/app";
import {
  collection,
  addDoc,
  getDocs,
  orderBy,
  query,
  updateDoc,
  doc,
  deleteDoc,
  limit,
} from "firebase/firestore";
import db from "../firebase/init.js";

export default {
  data() {
    return {
      newTopicDate: "", // Input for new topic date
      newTopicName: "", // Input for new topic name
      weeklyTopics: [],
      thisWeekTopic: null, // Object to store this week's topic
      previousWeekTopics: [], // Array to store previous week's topics
    };
  },

  async mounted() {
    await this.fetchWeeklyTopics();
  },

  methods: {
    async fetchWeeklyTopics() {
      // Get today's date
      const today = new Date();
      const todayString = today.toISOString().split("T")[0];

      // Query to get topics
      const q = query(collection(db, "weeklyTopics"));

      // Fetch topics
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        const topic = {
          id: doc.id,
          date: doc.data().date,
          name: doc.data().name,
        };

        // Check if the topic is for this week or previous weeks
        if (topic.date === todayString) {
          // This week's topic
          this.thisWeekTopic = topic;
        } else {
          // Previous week's topics
          this.previousWeekTopics.push(topic);
        }
      });
    },
    async addTopic() {
      if (this.newTopicDate && this.newTopicName) {
        // Add new topic to Firestore
        await addDoc(collection(db, "weeklyTopics"), {
          date: this.newTopicDate,
          name: this.newTopicName,
        });

        // Clear input fields after adding topic
        this.newTopicDate = "";
        this.newTopicName = "";

        // Fetch the last added topic to display
        const lastAddedTopicQuery = query(
          collection(db, "weeklyTopics"),
          orderBy("date", "desc"),
          limit(1)
        );
        const snapshot = await getDocs(lastAddedTopicQuery);
        if (!snapshot.empty) {
          const lastAddedTopic = snapshot.docs[0].data();
          this.weeklyTopics.push({
            date: lastAddedTopic.date,
            name: lastAddedTopic.name,
          });
        }
      }
    },

    async editTopic(topicId) {
      const newName = prompt("Enter new topic name:");
      if (newName !== null && newName.trim() !== "") {
        // Update topic name in Firestore
        await updateDoc(doc(db, "weeklyTopics", topicId), {
          name: newName.trim(),
        });

        // Update topic name in UI
        const topicIndex = this.previousWeekTopics.findIndex(
          (topic) => topic.id === topicId
        );
        if (topicIndex !== -1) {
          this.previousWeekTopics[topicIndex].name = newName.trim();
        } else if (this.thisWeekTopic && this.thisWeekTopic.id === topicId) {
          this.thisWeekTopic.name = newName.trim();
        }
      }
    },
    async deleteTopic(topicId) {
      const confirmDelete = confirm(
        "Are you sure you want to delete this topic?"
      );
      if (confirmDelete) {
        // Delete topic from Firestore
        await deleteDoc(doc(db, "weeklyTopics", topicId));

        // Remove topic from UI
        const topicIndex = this.previousWeekTopics.findIndex(
          (topic) => topic.id === topicId
        );
        if (topicIndex !== -1) {
          this.previousWeekTopics.splice(topicIndex, 1);
        } else if (this.thisWeekTopic && this.thisWeekTopic.id === topicId) {
          this.thisWeekTopic = null;
        }
      }
    },
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
  margin-top: 3%;
}

h1 {
  font-size: 40px;
}

h2 {
  font-size: 25px;
}

p {
  font-weight: 600;
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
.weeklyTopicForm {
  text-align: center;
}
.thisWeekTopic {
  text-align: center;
}
</style>
