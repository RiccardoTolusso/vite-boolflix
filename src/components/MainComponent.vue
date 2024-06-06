<script>
import { store } from '../storage';
import FilmComponent from './FilmComponent.vue';

export default{
    name:'Main',
    data(){
        return {
            store
        }
    },
    components: {
        FilmComponent,
    },
    emits: ['search-again']
}
</script>
<template>
<input type="text" v-model="store.query">
<button @click="$emit('search-again')">Search</button>

<ul>
    <li v-for="film in store.results">
        <FilmComponent 
        :title="film.title"
        :original-title="film.original_title"
        :langauge="film.original_language"
        :score="film.vote_average"
        />
    </li>
</ul>
</template>
<style scoped>

</style>