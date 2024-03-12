<template>
    <div class="search-bar">
      This is the result set
      <SingleResult v-for="res in resultsList" :title="res.title" :desc="res.desc"/>
    </div>
</template>

<script>
import SingleResult from './SingleResult'

export default {
  name: 'ResultSet',
  props: {
    resultsList: []
  },
  components: {
    SingleResult
  },
  data: function(){
    return {

    }
  },
  methods: {
    
  }
}
</script>
  