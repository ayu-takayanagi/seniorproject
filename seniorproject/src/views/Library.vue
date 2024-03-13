<!-- https://vintage.ne.jp/blog/2015/06/411#:~:text=%E3%81%93%E3%81%AEAPI%E3%81%AB%E3%81%AF%E7%84%A1%E6%96%99,%E3%81%BE%E3%81%A7%E7%94%A8%E6%84%8F%E3%81%95%E3%82%8C%E3%81%A6%E3%81%84%E3%81%BE%E3%81%99%E3%80%82 -->

<template>
  <div class="description">
    <h2>Resource Library</h2>
    <p>Here's the place to find an article through Google</p>
    <p>If you want to keep a resource, you can add category name and resource information below!</p>
  </div>

  <!-- <div class="google">
    <h2>Google Search</h2>
    <SearchBar @start-search="doSearch($event)"/>
    <ResultSet :resultsList="searchResults"/>
  </div> -->

  <!-- <div>
    <div class="google-search">
      <input type="text" v-model="query" @keydown.enter="search" placeholder="Search...">
      <button @click="search">Search</button>
    </div>
    <div class="search-results">
      <h4>Search Results</h4>
      <ul>
        <li v-for="(result, index) in searchResults" :key="index">
          <a :href="result.link" target="_blank">{{ result.title }}</a>
          <p>{{ result.snippet }}</p>
        </li>
      </ul>
    </div>
  </div> -->

  <div class="form">
    <!-- Add Category Form -->
    <h2>Add Category</h2>
    <form @submit.prevent="addCategory">
      <input type="text" v-model="newCategoryName" placeholder="Category Name" required>
      <button type="submit">Add Category</button>
    </form>

    <!-- Add Resource Form -->
    <h2>Add Resource</h2>
    <form @submit.prevent="addResource">
      <select v-model="selectedCategory">
        <option v-for="category in categories" :key="category.id" :value="category.id">{{ category.name }}</option>
      </select>
      <input type="text" v-model="newResourceTitle" placeholder="Resource Title" required>
      <input type="text" v-model="newResourceLink" placeholder="Resource Link" required>
      <button type="submit">Add Resource</button>
    </form>

    <!-- Display Categories and Resources -->
    <div class="display">
      <h2>Categories</h2>
      <ul>
        <li v-for="category in categories" :key="category.id">
          {{ category.name }}
          <ul>
            <li v-for="resource in category.resources" :key="resource.id">
              <a :href="resource.link">{{ resource.title }}</a>
              <button @click="deleteResource(category.id, resource.id)">Delete Resource</button>
            </li>
          </ul>
          <button @click="deleteCategory(category.id)">Delete Category</button>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { collection, addDoc, onSnapshot, doc, deleteDoc, query, where } from 'firebase/firestore'; // Import Firestore functionalities
import db from '../main.js';
// import SearchBar from '../components/SearchBar.vue'; 
// import ResultSet from '../components/ResultSet.vue'; 
// var axios = require('axios');

export default {
  // components: {
  //   SearchBar,
  //   ResultSet,
  // },

  data() {
    return {
      newCategoryName: '', // Input for new category name
      newResourceTitle: '', // Input for new resource title
      newResourceLink: '', // Input for new resource link
      selectedCategory: null, // Selected category for adding resource
      categories: [], // Initialize categories array to store fetched data
      query: '',
      searchResults: [],
    };
  },
  mounted() {
    // Fetch categories from Firestore collection on component mount
    onSnapshot(collection(db, 'category'), (querySnapshot) => {
      const categories = [];
      querySnapshot.forEach((doc) => {
        const category = {
          id: doc.id,
          name: doc.data().name,
          resources: [] // Initialize resources array for each category
        };
        categories.push(category); // Push category to categories array
      });
      this.categories = categories; // Update the component's categories data property with the fetched data

      // Fetch resources for each category
      categories.forEach((category) => {
        const resourceQuery = query(collection(db, 'resource'), where('categoryName', '==', category.name));
        onSnapshot(resourceQuery, (resourceSnapshot) => {
          const resources = [];
          resourceSnapshot.forEach((doc) => {
            const resource = {
              id: doc.id,
              title: doc.data().title,
              link: doc.data().link,
            };
            resources.push(resource); // Push resource to resources array
          });
          // Update the resources property of the corresponding category
          const index = this.categories.findIndex((cat) => cat.id === category.id);
          this.categories[index].resources = resources;
        });
      });
    });
  },
  methods: {
    // search() {
    //   const cx = '019809168cdd849a3'; // Replace 'YOUR_SEARCH_ENGINE_ID' with your actual search engine ID
    //   const gcse = document.createElement('script');
    //   gcse.type = 'text/javascript';
    //   gcse.async = true;
    //   gcse.src = 'https://cse.google.com/cse.js?cx=019809168cdd849a3';
    //   const s = document.getElementsByTagName('script')[0];
    //   s.parentNode.insertBefore(gcse, s);
    //   const url = 'https://cse.google.com/cse?cx=019809168cdd849a3';

    //   fetch(url)
    //     .then(response => response.json())
    //     .then(data => {
    //       if (data.items) {
    //         this.searchResults = data.items.map(item => ({
    //           title: item.title,
    //           link: item.link,
    //           snippet: item.snippet
    //         }));
    //       } else {
    //         this.searchResults = [];
    //       }
    //     })
    //     .catch(error => {
    //       console.error('Error fetching search results:', error);
    //     });
    // },

    // doSearch(String){
    //   var that = this
    //   axios.get('http://localhost:8080/#/library/https://cse.google.com/cse?cx=019809168cdd849a3', this.String)
    //   .then((response) => {
    //     that.searchResults = response.data;
    //     console.log(that.searchResults);
    //   })
    //   .catch((error) => console.error(error))
    // },

    // Add new category
    async addCategory() {
      if (this.newCategoryName.trim() !== '') {
        await addDoc(collection(db, 'category'), {
          name: this.newCategoryName.trim(),
        });
        this.newCategoryName = ''; // Clear input
      }
    },
    // Add new resource
    async addResource() {
      if (this.selectedCategory && this.newResourceTitle.trim() !== '' && this.newResourceLink.trim() !== '') {
        await addDoc(collection(db, 'resource'), {
          categoryName: this.categories.find(cat => cat.id === this.selectedCategory).name,
          title: this.newResourceTitle.trim(),
          link: this.newResourceLink.trim(),
        });
        this.newResourceTitle = ''; // Clear inputs
        this.newResourceLink = '';
      }
    },
    // Delete category
    async deleteCategory(categoryId) {
      await deleteDoc(doc(db, 'category', categoryId));
    },
    // Delete resource
    async deleteResource(categoryId, resourceId) {
      await deleteDoc(doc(db, 'resource', resourceId));
    },
  },
};
</script>

<style>
.description{
  text-align: center;
  margin-top: 50px;
  background-color: #F1E4C3;
  margin-right: 10%;
  margin-left: 10%;
  margin-bottom: 90px;
  height: 200px;
  padding-top: 10px;
  border-radius: 20px;;
}

.google{
  text-align: center;
  margin-top: 50px;
}

.search-results {
  border: 1px solid #ccc;
  padding: 10px;
}
.search-results ul {
  list-style-type: none;
  padding: 0;
}
.search-results ul li {
  margin-bottom: 10px;
}

.form{
  text-align: center;
  margin-top: 50px;
}

.display{
  margin-top: 50px;
}
</style>