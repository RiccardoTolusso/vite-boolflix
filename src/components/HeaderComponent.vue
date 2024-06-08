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
            this.$emit("search-again")
        }
    }
}
</script>

<template>
<header>
    <h1 @click="resetToHomePage">Boolflix</h1>
    <div>
        <input @keydown.enter="$emit('search-again')" type="text" v-model="store.query" >
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