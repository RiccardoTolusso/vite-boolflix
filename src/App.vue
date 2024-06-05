<script>
import {store} from './storage'
import axios from 'axios'


export default{
  name:'MyApp',
  data(){
    return {
      store
    }
  },
  methods: {
    apiCall(){
      axios.get(`${this.store.apiUrl}/${this.store.category}`, {
        params:{
          api_key: this.store.key,
          query: this.store.query,
          language: this.store.language,
          include_adult: this.store.adult,
          page: this.store.page
        }
      })
      .then((result) => {
        console.log(result)
        this.store.currentPage = result.data.page;
        this.store.results = result.data.results;
        this.store.total_pages = result.data.total_pages;
        this.store.total_results = result.data.total_results;
      })
    }
  },
  created(){
    // axios.get(this.generateApiUrl())
    this.apiCall()
  }
}
</script>
<template>
  <!-- HEADER -->
  <!-- MAIN -->
</template>
<!-- <style></style> -->
