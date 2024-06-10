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
    getGeneres(){
      const params = {
            api_key: this.store.key,
            language: this.store.language
      }
      this.store.categories.forEach(
        (category) => {
          axios.get(`${this.store.apiPosterInfo}genre/${category}/list`, {params}).then(
            (response) =>{
              this.store.genres[category] = response.data.genres
              if (this.store.genres.movie.length !== 0 && this.store.genres.tv.length !== 0){
                // sostituisco l'array genre movies con l'array filtrato
                this.store.genres.movie = this.store.genres.movie.filter(
                  (movieGenre, id) => {
                    // scorro finchè non trovo un valore corrispondente nelle serie tv
                    let count = 0;
                    while (count < this.store.genres.tv.length){
                      if (this.store.genres.tv[count].id === movieGenre.id){
                        // se lo trovo lo rimuovo dalle serie tv
                        this.store.genres.tv.splice(count, 1);
                        this.store.genres.both.push(movieGenre)
                        // escludo il valore dall'array risultante
                        return false
                      }
                      count++
                    }
                    return true
                  }
                )
              }
            }
          )
        }
      )
    },
    getApiCallUrl(category){
      if (this.store.genre !== ""){
        return this.store.apiPosterInfo + 'discover/' + category
      }
      if (this.store.query === ""){
        // se la query è vuota quindi nessuno ha cercato nulla mostro i più popolari
        return this.store.apiPosterInfo + category + "/popular"
        
      } else {
        // e l'utente ha inserito qualcosa
        return this.store.apiSearch + "/" + category
      }
    },
    startNewSearch(){
      // inizia una nuova ricerca chiamano l'api per i movie e i tv show
      this.store.categories.forEach((category) => {
        const urlForApiCall = this.getApiCallUrl(category)
        const params = {
          api_key: this.store.key,
          language: this.store.language,
          include_adult: this.store.adult,
          page: this.store.page
        }
        if (this.store.genre === null){
          params.query = this.store.query;
        } else {
          params.with_genres = this.store.genre
        }
        axios.get(urlForApiCall , { params })
        .then((result) => {
          console.log(result)
          if (result.data.results.length === 0){
            this.store[category].results = []
          } else {
            this.store[category].currentPage = result.data.page;
            this.store[category].results = result.data.results;
            this.store[category].total_pages = result.data.total_pages;
            this.store[category].total_results = result.data.total_results;
          }
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
    this.getGeneres()
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
