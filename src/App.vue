<script>
// roboto
import "@fontsource/roboto";

// only source of truth
import {store} from './storage'

// axios
import axios from 'axios'

// models
import MainComponent from './components/MainComponent.vue'
import HeaderComponent from './components/HeaderComponent.vue'

export default{
  name:'MyApp',
  data(){
    return {
      store
    }
  },
  methods: {
    startNewSearch(){
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
    },

    // constolla se ci sono altre pagine da caricare e carica anche la successiva
    loadMore(category){
      if (!this.store.query || this.store[category] == null){
        return
      }
      
      if (this.store[category].currentPage < this.store[category].total_pages){
        // se ci sono altre pagine da caricare
        axios.get(`${this.store.apiUrl}/${category}`, {
          params:{
            api_key: this.store.key,
            query: this.store.query,
            language: this.store.language,
            include_adult: this.store.adult,
            page: this.store[category].currentPage + 1
          }
        })
        .then((result) => {
          console.log(result)
          this.store[category].currentPage = result.data.page;
          this.store[category].results = this.store[category].results.concat(result.data.results);
          this.store[category].total_pages = result.data.total_pages;
          this.store[category].total_results = result.data.total_results;
        })
      }
      
    }
  },
  components: {
    MainComponent,
    HeaderComponent
  },
  created(){
    // axios.get(this.generateApiUrl())
    this.startNewSearch()
  }
}
</script>
<template>
  <!-- HEADER -->
  <HeaderComponent @search-again="startNewSearch"/>
  <!-- MAIN -->
  <MainComponent @load-more="loadMore"/>
</template>
<style>
body{
  font-family: "Roboto";
}
</style>
