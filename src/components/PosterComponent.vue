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
            store
        }
    },
    components:{
        'font-awesome-icon': FontAwesomeIcon
    },
    props: {
        title: String,
        originalTitle: String,
        langauge: String,
        posterImage: String,
        usersVote: Number
    },
    computed:{
        roundedVote(){
            // porto il numero in scala 1 a 5 e lo arrotondo per eccesso
            return Math.ceil(this.usersVote/2);
        }
    }
}
</script>
<template>
    <hr>
    <div>
        {{ title }}
    </div>
    <div>
        {{ originalTitle }}
    </div>
    <div>
        {{ langauge }}
    </div>
    <img :src="store.imageUrl+posterImage" alt="">
    <div v-for="n in roundedVote">
        <font-awesome-icon icon="fa-solid fa-star" />
    </div>
    <div v-for="n in (5 - roundedVote)">
        <font-awesome-icon icon="fa-regular fa-star" />
    </div>
    <hr>
</template>
<style></style>