<script>
import { store } from '../storage';

export default{
    name: 'Film',
    data(){
        return {
            store
        }
    },
    props: {
        title: String,
        originalTitle: String,
        langauge: String,
        score: Number,
        posterImage: String
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
    <div>
        {{ score }}
    </div>
    <img :src="store.imageUrl+posterImage" alt="">
    <hr>
</template>
<style></style>