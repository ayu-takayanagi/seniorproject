<!-- GoogleSearch.vue -->
<!-- <template>
    <div>
      <div id="search-container"></div>
    </div>
  </template>
  
  <script>
  export default {
    mounted() {
      console.log('Google Search Component mounted');
      const cx = '019809168cdd849a3'; // Replace 'YOUR_SEARCH_ENGINE_ID' with your actual search engine ID
      const gcse = document.createElement('script');
      gcse.type = 'text/javascript';
      gcse.async = true;
      gcse.src = `https://cse.google.com/cse.js?cx=${cx}`;
      const s = document.getElementsByTagName('script')[0];
      s.parentNode.insertBefore(gcse, s);
    }
  };
  </script> -->

<template>
    <div class="search-bar">
      Search: <input type="text" v-model="selfdata" placeholder="Enter search"/>
      <button @click="search()">Search</button>
    </div>
</template>

<script>
export default {
  name: 'SearchBar',
  props: {
    propdata: String
  },
  data: function(){
    return {
      selfdata:""
    }
  },
  // mounted() {
  //     console.log('Google Search Component mounted');
  //     const cx = '019809168cdd849a3'; // Replace 'YOUR_SEARCH_ENGINE_ID' with your actual search engine ID
  //     const gcse = document.createElement('script');
  //     gcse.type = 'text/javascript';
  //     gcse.async = true;
  //     gcse.src = `https://cse.google.com/cse.js?cx=${cx}`;
  //     const s = document.getElementsByTagName('script')[0];
  //     s.parentNode.insertBefore(gcse, s);
  //   },
  methods: {
    search() {
      this.$emit('start-search', this.selfdata)
    }
  }
}
</script>
  