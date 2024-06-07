<script>
import { store } from '../storage';

// FONT AWESOME
/* import the fontawesome core */
import { library } from '@fortawesome/fontawesome-svg-core'

/* import font awesome icon component */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

/* import specific icons */
import { faStar as faStarFull} from '@fortawesome/free-solid-svg-icons'
import { faStar as faStarEmpty } from '@fortawesome/free-regular-svg-icons'

library.add(faStarFull)
library.add(faStarEmpty)
// END OF FONT AWESOME


export default{
    name: 'Film',
    data(){
        return {
            store,
            shownTitle: this.title,
            flagsUrl: "./flags_svg/"
        }
    },
    components:{
        'font-awesome-icon': FontAwesomeIcon
    },
    props: {
        title: String,
        originalTitle: String,
        language: String,
        posterImage: String,
        overview:String,
        usersVote: Number,
    },
    computed:{
        roundedVote(){
            // porto il numero in scala 1 a 5 e lo arrotondo per eccesso
            return Math.ceil(this.usersVote/2);
        },
        flagExist(){
            // controlla se esiste una bandiera nello store per la lingua di riferimento
            const flag = this.store.flags[this.language]
            if (flag != null){
                return true 
            }
            else{
                return false
            }
        }
    },
    methods:{
        switchTitle(){
            // al clik sul titolo scambio il titolo tradotto con quello originale e viceversa
            if (this.shownTitle === this.title){
                this.shownTitle = this.originalTitle
            } else {
                this.shownTitle = this.title
            }
            console.log("switch")
        }
    },
    beforeUpdate(){
        // quando sta per venire aggiornata la scheda se il titolo non è uno dei 2 titoli corretti allora lo reimposto
        // questo avviene solo quando avvio una nuova ricerca e non quando aggiungo dati
        if (this.shownTitle !== this.originalTitle && this.shownTitle !== this.title){
            this.shownTitle = this.title            
        }
    },
}
</script>
<template>
    <div class="poster">

        <!-- INFORMATION PAGE -->
        <div class="info">
    
            <!-- TITOLO DEL FILM -->
            <h4 @click.stop="switchTitle" >{{ shownTitle }}</h4>
            
            <!-- DESCRIZIONE DEL FILM -->
            <p> {{ overview }} </p>

            <!-- BANDIERA O TESTO DELLA LINGUA -->
            <img class="lang" v-if="flagExist" :src="this.flagsUrl + this.store.flags[this.language]"/>
            <div class="lang" v-else>{{ this.language }}</div>
    
            <!-- STARS -->
            <div class="stars">
                <div v-for="n in roundedVote">
                    <font-awesome-icon icon="fa-solid fa-star" />
                </div>
                <div v-for="n in (5 - roundedVote)">
                    <font-awesome-icon icon="fa-regular fa-star" />
                </div>
            </div>
    
        </div>
    
        <!-- FRONT IMAGE -->
        <img class="posterImg" v-if="posterImage != null" :src="store.imageUrl+posterImage" :alt="`${originalTitle} Poster`">
        <img class="posterImg" v-else src="../images/poster-default.jpg" :alt="`${originalTitle} Poster`">
    </div>
    
</template>

<style lang="scss" scoped>
.poster{
    position: relative;
    height: 100%;
    user-select: none;
    cursor: pointer;
    
    // BLOCCO CONTENENTE LE INFO CHE APPAIONO ON HOVER
    .info{
        position: absolute;
        height: 100%;
        width: 100%;
        background-color: rgba(0, 0, 0, 0.666);
        color: white;
        opacity: 0;
        transition: opacity 0.4s;
        padding: 10px;
        text-align: center;
        scroll-snap-align: start;
        &:hover{
            opacity: 1;
        }

        // TITOLO DEL FILM
        h4{
            margin-top: 10px;
            height: 20%;
        } 

        //LINGUA DEL FILM
        .lang{
            margin-bottom: 10px;
            height: 10%;
        }

        // DESCRIZIONE DEL FILM
        p{
            height: 50%;
            overflow: auto;
            text-align: justify;
            text-align-last: center;
            margin-bottom: 10px;

            &::-webkit-scrollbar{
                display: none;
            }
        }

        // STELLE
        .stars{
            div{
                display: inline-block;
            }
        }

    }

    // IMMAGINE GRANDE DI COPERTINA
    img.posterImg{
        display: block;
        height: 100%;
        width: 100%;
    }
}

</style>