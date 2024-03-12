<template>
    <div class="search-bar">
        <span class="title">{{ title }}</span><br>
        <span class="desc">{{ desc }}</span><br><br>
    </div>
</template>

<script>
export default {
  name: 'SingleResult',
  props: {
    title: String,
    desc: String
  },
  data: function(){
    return {

    }
  },
  methods: {
    
  }
}
</script>

<style>
.title{
    font-size: 17px;
    color: blue
}
.desc{
    font-size: 13px;
    color: green;
}
</style>
  