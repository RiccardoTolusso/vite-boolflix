<script>
import { store } from '../storage';
import PosterComponent from './PosterComponent.vue';
import FullScreenInfoComponent from './FullScreenInfoComponent.vue';

export default{
    name:'Main',
    data(){
        return {
            store
        }
    },
    components: {
        PosterComponent,
        FullScreenInfoComponent
    },
    emits: ['search-again', 'load-more'],
    methods: {
        resetScroll(){
            console.log("reset")
            this.$refs.film.scrollTo({top:0, left:0, behaviour:'instant'})
            this.$refs.tvShow.scrollTo({top:0, left:0, behaviour:'instant'})    
        },
        showInfo(defaultData, posterType){
            console.log(defaultData)
            this.store.posterToDisplay.defaultData = defaultData
            this.store.posterToDisplay.posterType = posterType
            this.store.displayPosterInfo = true;
        }
    },
    expose: [ 'resetScroll' ]

}

</script>
<template>
<main>
    <div class="container">

        <!-- FILMS -->
        <h2>Film</h2>
        <ul ref="film">
            <li v-for="(film, id) in store.movie.results" :key="`film-${id}`" >
                <PosterComponent 
                :title="film.title"
                :original-title="film.original_title"
                :language="film.original_language"
                :posterImage="film.poster_path"
                :usersVote="film.vote_average"
                :overview="film.overview"
                @click="() => {
                    showInfo(film, 'movie')
                }" />
            </li>
            <li>
                <img class="add-more" src="../images/load-more.jpg" alt="load more image" @click="this.$emit('load-more', 'movie')">
            </li>
        </ul>
        
        <!-- TV SHOWS -->
        <h2>Serie Tv</h2>
        <ul ref="tvShow">
            <li v-for="(tvShow, id) in store.tv.results" :key="`tv-show-${id}`">
                <PosterComponent
                :title="tvShow.name"
                :original-title="tvShow.original_name"
                :langauge="tvShow.original_language"
                :posterImage="tvShow.poster_path"
                :usersVote="tvShow.vote_average"
                :overview="tvShow.overview"
                @click="() => {
                    showInfo(tvShow, 'tv')
                }"
                />
            </li>
            <FullScreenInfoComponent @show-info="showInfo"/>
        </ul>
    
        
    </div>
</main>

</template>

<style scoped>
@media screen and (max-width: 800px) {
    li{
        width: calc(100% / 4) !important;
    }
}
@media screen and (max-width: 630px) {
    li{
        width: calc(100% / 3) !important;
    }
}
@media screen and (max-width: 430px) {
    li{
        width: calc(100% / 2) !important;
    }
}

main{
    overflow-y: auto;
    
    .container{
        width: 90vw;
        margin: 0 auto;
        
        /* TITLES */
        h2{
            color: white;
        }

        /* LISTS OF FILMS */
        ul{
            display: flex;
            margin-bottom: 2vh;
            overflow-x: auto;
            overflow-y: hidden;
            scroll-snap-type: x;

            &::-webkit-scrollbar{
                display: none;
            }

            /* FILM CONTAINER */
            li{
                width: calc(100% / 5 );
                flex-shrink: 0;

                /* LOAD MORE IMAGE */
                img.add-more {
                    height: 0px;
                    min-height: 100%;
                    width: 100%;
                    cursor: pointer;
                    border: 0px;
                    transition: border 0.3s;

                    &:hover{
                        border: 5px solid white;
                    }
                }
            }
            
        }
        /* END OF LIST OF FILMS*/

        /* FILM INFO */
        
    }

}
</style>