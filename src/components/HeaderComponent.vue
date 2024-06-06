<script>
import { store } from '../storage';

export default {
    name: 'Header',
    data(){
        return {
            store
        }
    },
    emits: [
        'search-again'
    ]
}
</script>

<template>

<input type="text" v-model="store.query">
<button @click="$emit('search-again')">Search</button>

</template>

<style></style>