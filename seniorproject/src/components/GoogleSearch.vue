<!-- GoogleSearch.vue -->
<template>
    <div>
      <div id="search-container"></div>
    </div>
  </template>
  
  <script>
  export default {
    mounted() {
      const cx = '019809168cdd849a3'; // Replace 'YOUR_SEARCH_ENGINE_ID' with your actual search engine ID
      const gcse = document.createElement('script');
      gcse.type = 'text/javascript';
      gcse.async = true;
      gcse.src = `https://cse.google.com/cse.js?cx=${cx}`;
      const s = document.getElementsByTagName('script')[0];
      s.parentNode.insertBefore(gcse, s);
    }
  };
  </script>
  