<script>
// only source of truth
import {store} from './storage'

// axios
import axios from 'axios'

// models
import MainComponent from './components/MainComponent.vue'

export default{
  name:'MyApp',
  data(){
    return {
      store
    }
  },
  methods: {
    apiCall(){
      if (!this.store.query){
        return
      }
      this.store.categories.forEach((category) => {
        axios.get(`${this.store.apiUrl}/${category}`, {
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
          this.store[category].currentPage = result.data.page;
          this.store[category].results = result.data.results;
          this.store[category].total_pages = result.data.total_pages;
          this.store[category].total_results = result.data.total_results;
        })
      })
    }
  },
  components: {
    MainComponent,
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
  <MainComponent @search-again="apiCall"/>
</template>
<!-- <style></style> -->
