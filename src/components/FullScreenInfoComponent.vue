<script>
import { store } from '../storage';

import axios from 'axios'

import PosterComponent from './PosterComponent.vue';



// FONT AWESOME
/* import the fontawesome core */
import { library } from '@fortawesome/fontawesome-svg-core'

/* import font awesome icon component */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

/* import specific icons */
import { faXmark } from '@fortawesome/free-solid-svg-icons'

library.add(faXmark)

export default{
    name:"info",
    data(){
        return {
            store,
            lastFilmId: null,
        }
    },
    methods: {
        hideInfo(){
            this.store.displayPosterInfo = false;
        },
        getMovieData(dataType){
            const posterUrl = this.store.apiPosterInfo  
            const posterType = this.store.posterToDisplay.posterType
            const posterId = this.store.posterToDisplay.defaultData.id
            if (posterId !== undefined){

                const params = {
                    api_key: this.store.key,
                    language: this.store.language,
                } 
                axios.get(posterUrl + posterType + "/" + posterId + "/" + dataType, {params}).then(
                    (response) => {
                        this.store.posterToDisplay[dataType] = response.data
    
                    }
                )
            }
        }
    },
    beforeUpdate(){
        if (this.lastFilmId !== this.store.posterToDisplay.defaultData.id){

            this.getMovieData('recommendations')
            this.getMovieData('credits')

            this.lastFilmId = this.store.posterToDisplay.defaultData.id
        }
    },
    components: {
        PosterComponent,
        'font-awesome-icon': FontAwesomeIcon,
    }
}
</script>

<template>

<div class="film-overlay" v-show="store.displayPosterInfo">
    <!-- BACKGROUND IMAGE -->
    <img class="background" :src="store.backdropImageUrl + store.posterToDisplay.defaultData.backdrop_path" alt="background image not found">
    
    <!-- CROSS TO QUIT -->
    <font-awesome-icon @click="hideInfo" icon="fa-solid fa-xmark" />
    
    <!-- CONTENT SECTION -->
    <div class="overlay">
        <div class="container">
            <h2>{{ store.posterToDisplay.defaultData.title || store.posterToDisplay.defaultData.name }}</h2>
            <h3 v-show="store.posterToDisplay.defaultData.original_title !== store.posterToDisplay.defaultData.title"> {{ `( ${store.posterToDisplay.defaultData.original_title} )` }}</h3>
            <p> {{ store.posterToDisplay.defaultData.overview }} </p>
            
            <!-- CAST MEMBERS -->
            <ul class="castList">
                <li v-for="(member, id) in store.posterToDisplay.credits.cast" v-show="id < 5">
                    <img :src="this.store.profileImageUrl + member.profile_path" alt="Image not found">
                    <h5>{{ member.name }}</h5>
                </li>   
            </ul>

            <!-- SUGGESTED FILMS -->
            <ul class="suggestedList">
                <li v-for="(film, id) in store.posterToDisplay.recommendations.results" v-show="id < 8" :key="`recommendations-${id}`" >
                <PosterComponent 
                :title="film.title"
                :original-title="film.original_title"
                :language="film.original_language"
                :posterImage="film.poster_path"
                :usersVote="film.vote_average"
                :overview="film.overview"
                @click="this.$emit('show-info', film)" />
            </li>
            </ul>
        </div>
    </div>
</div>

</template>

<style lang="scss" scoped>
.film-overlay{
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;

    background-color: rgb(0,0,0);
    
    color: white;
    text-shadow: 0px 0px 5px black;
    img.background{
        position: absolute;
        width: 100%;
        height: 100%;
        object-fit: cover;
        object-position: center;
        z-index: -1;
        filter: grayscale(1);
    }

    svg{
        position: absolute;
        right: 1rem;
        top: 1rem;
        font-size: 2rem;

        cursor: pointer;
        &:hover{
            color: rgba(255, 255, 255, 0.773);
        }
    }

    //DATA DIV
    div.overlay{
        background-color: rgba(0,0,0,0.6);
        height: 100%;
        .container{
            width: 90vw;
            margin: 0 auto;
            text-align: center;
            padding: 3rem 0;
            position: relative;
            height: 100%;
        
            p{
                margin: 2rem 0;
                max-height: 30vh;
                overflow-y: auto;

                &::-webkit-scrollbar{
                    display: none;
                }
            }

            ul{
                display: flex;
                
                overflow-x: auto;
                overflow-y: hidden;
                scroll-snap-type: x;

                &::-webkit-scrollbar{
                        display: none;
                    }
                &.castList{
                    justify-content: space-around;

                    li{
                        width: 120px;
                        flex-shrink: 0; 
    
                        img{
                            width: 70%;
                            height: calc(120px * 0.7);
                            object-fit: cover;
                            border-radius: 50%;
                        }
    
                        h5{
                            font-size: calc(0.5rem + 1vw);
                            white-space: nowrap;
                            overflow: hidden;
                            padding: 5px 5%;
                            text-overflow: ellipsis;
                        }
                    }
                }

                &.suggestedList{
                    position: absolute;
                    bottom: 2rem;
                    
                    li{
                        height: 250px;
                        
                        &:hover{
                            flex-shrink: 0;
                        }
                    }
                }

            }
        }
    }

}
</style>