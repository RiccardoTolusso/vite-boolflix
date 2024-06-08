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
    getApiCallUrl(category){
      if (this.store.query === ""){
        // se la query è vuota quindi nessuno ha cercato nulla mostro i più popolari
        return this.store.apiPosterInfo + category + "/popular"
        
      } else {
        // e l'utente ha inserito qualcosa
        return this.store.apiSearch + "/" + category
      }
    },
    startNewSearch(){
      this.store.categories.forEach((category) => {
        const urlForApiCall = this.getApiCallUrl(category)
        axios.get(urlForApiCall , {
          params:{
            api_key: this.store.key,
            query: this.store.query,
            language: this.store.language,
            include_adult: this.store.adult,
            page: this.store.page
          }
        })
        .then((result) => {
          this.store[category].currentPage = result.data.page;
          this.store[category].results = result.data.results;
          this.store[category].total_pages = result.data.total_pages;
          this.store[category].total_results = result.data.total_results;
        })
      })
    },

    // constolla se ci sono altre pagine da caricare e carica anche la successiva
    loadMore(category){
      const urlForApiCall = this.getApiCallUrl(category)
      if ( this.store[category] == null){
        return
      }
      
      if (this.store[category].currentPage < this.store[category].total_pages){
        // se ci sono altre pagine da caricare
        axios.get(`${urlForApiCall}`, {
          params:{
            api_key: this.store.key,
            query: this.store.query,
            language: this.store.language,
            include_adult: this.store.adult,
            page: this.store[category].currentPage + 1
          }
        })
        .then((result) => {
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
    // axios.get(this.generateapiSearch())
    this.startNewSearch()
  }
}
</script>
<template>
  <!-- HEADER -->
  <HeaderComponent @search-again="startNewSearch"/>
  <!-- MAIN -->
  <MainComponent @load-more="loadMore" ref="mainComponent"/>
</template>
<style>
#app{
  display: flex;
  flex-direction: column;
  height: 100vh;
}
body{
  font-family: "Roboto";
}
</style>
