<!-- Add Google search -->

<template>
  <div>
    <h1>Google Search</h1>
    <GoogleSearch />
  </div>
  <!-- <div class="title">
    <h1>Resource Library</h1>
    <ResourceItemComponent v-for="resource in resources">
      <template v-slot:resourceTitle>
        <h3>{{ resource.title }}</h3>
      </template>

      <template v-slot:resourceInfo>
        <p>{{ resource.publisher }}</p>
        <p>{{ resource.link }}</p>
      </template>
    </ResourceItemComponent>

    <h1>Resource List by alphabetical order</h1>

    <h3>Add New Topic</h3>

    <h3>Add New Resource</h3>
    <form @submit.prevent="addNewResource">
      <label for="resourceTitle">Title: </label>
      <input v-model="newResource.title" type="text" id="resourceTitle" required />

      <label for="publisher">Publisher: </label>
      <input v-model="newResource.publisher" type="text" id="resourcePublisher" required>

      <label for="link">URL: </label>
      <input v-model="newResource.link" type="text" id="resourceLink" required />

      <h5 v-if="formIncomplete">Missing Info!</h5>

      <button :disabled="formIncomplete" type="submit">Add New Resource</button>
    </form>
  </div> -->
  
</template>

<script>
import GoogleSearch from '../components/GoogleSearch.vue';

export default {
  components: {
    GoogleSearch
  }
}
</script>