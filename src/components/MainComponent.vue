<script>
import { store } from '../storage';
import PosterComponent from './PosterComponent.vue';

export default{
    name:'Main',
    data(){
        return {
            store
        }
    },
    components: {
    PosterComponent
},
    emits: ['search-again']
}
</script>
<template>
<input type="text" v-model="store.query">
<button @click="$emit('search-again')">Search</button>

<ul>
    <!-- FILMS -->
    <li v-for="film in store.movie.results">
        <PosterComponent 
        :title="film.title"
        :original-title="film.original_title"
        :langauge="film.original_language"
        :score="film.vote_average"
        :posterImage="film.poster_path"
        />
    </li>

    <!-- TV SHOWS -->
    <li v-for="tvShow in store.tv.results">
        <PosterComponent
        :title="tvShow.name"
        :original-title="tvShow.original_name"
        :langauge="tvShow.original_language"
        :score="tvShow.vote_average"
        :posterImage="tvShow.poster_path"
        />
    </li>
</ul>
</template>
<style scoped>

</style>