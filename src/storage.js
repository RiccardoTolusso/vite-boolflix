import { reactive } from 'vue';

export const store = reactive({
    // API CALL SETTINGS
    apiUrl:"https://api.themoviedb.org/3/search",  
    key: "9d0f3fa0c8ae5773b297afa984c0304c",
    category: 'movie', // movie / tv / multi
    query: "le colline hanno gli occhi",
    language: 'en-US',
    page: 1,
    adult: false,

    // API CALL DATA
    currentPage: 0,
    results: [],
    total_pages: 0,
    total_results: 0,

    // LISTS OF OPTIONS
    // languages:{
    //     italian: {
    //         code: 'it-IT',
    //         image: null
    //     },
    //     english: {
    //         code: 'en-US',
    //         image: null
    //     },
    // },

})