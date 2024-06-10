<script>
import { store } from '../storage';

// FONT AWESOME
/* import the fontawesome core */
import { library } from '@fortawesome/fontawesome-svg-core'

/* import font awesome icon component */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

/* import specific icons */
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'

library.add(faMagnifyingGlass)
// END OF FONT AWESOME


export default {
    name: 'Header',
    data(){
        return {
            store
        }
    },
    emits: [
        'search-again'
    ],
    components:{  
        'font-awesome-icon': FontAwesomeIcon
    },
    methods:{
        resetToHomePage(){
            this.store.query = "";
            this.store.genre = null
            this.$emit("search-again")
        },
        log(event){
            this.store.genre = event.target.value
            this.$emit("search-again")
        }
    }
}
</script>

<template>
<header>
    <h1 @click="resetToHomePage">Boolflix</h1>
    <!-- GENRE SELECT MENU -->
    <select id="genreMenu" @input="log">
        <option :value="null">Cerca per titolo</option>
        <optgroup label="Film & Serie Tv">
            <option v-for="genre in store.genres.both" :value="genre.id">{{ genre.name }}</option>
        </optgroup>
        <optgroup label="Film">
            <option v-for="genre in store.genres.movie" :value="genre.id">{{ genre.name }}</option>
        </optgroup>
        <optgroup label="Serie Tv">
            <option v-for="genre in store.genres.tv" :value="genre.id">{{ genre.name }}</option>
        </optgroup>
    </select>
    <div v-show="this.store.genre === null">
        <!-- QUERY INPUT ELEMENT -->
        <input @keydown.enter="$emit('search-again')" type="text" v-model="store.query" >

        <!-- SEARCH BUTTON -->
        <font-awesome-icon icon="fa-solid fa-magnifying-glass"  @click="$emit('search-again')"/>
    </div>
</header>

</template>

<style lang="scss" scoped>
@use "../assets/scss/partials/variables" as *;

header{
    padding: 2vh 0;
    width: 90vw;
    margin: 0 auto;
    position: relative;

    h1{
        color: $title-color;
        display: inline-block;
        cursor: pointer;
    }

    select{
        background-color: transparent;
        color: white;
        font-size: 1.2rem;
        margin-left: 1rem;
        padding: 5px 10px;
        border-radius: 10px;

        option, optgroup{
            background-color: black;
        }

        
    }

    div{
        display: inline-block;
        position: absolute;
        right: 0;
        top: 50%;
        transform: translateY(-50%);
    
        input{
            background-color: transparent;
            border: 0;
            border-bottom: 1px dotted white;
            font-size: calc(1rem + 1vw);
            color: white;
            text-transform: capitalize;
            padding: 5px;

            &:focus-visible{
                outline: 0;

            }
        }

        svg{
            color: white;
            cursor: pointer;
        }

        svg, input{
            font-size: calc(1rem + 1vw);
        }
    }

}
</style>