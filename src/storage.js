import { reactive } from 'vue';

export const store = reactive({
    // API CALL SETTINGS
    apiUrl:"https://api.themoviedb.org/3/search",  
    key: "9d0f3fa0c8ae5773b297afa984c0304c",
    categories: ['movie', 'tv'], // movie / tv / multi
    query: "le",
    language: 'en-US',
    page: 1,
    adult: false,

    // API CALL DATA
    "movie": {
        currentPage: 0,
        results: [],
        total_pages: 0,
        total_results: 0,
    },

    "tv": {
        currentPage: 0,
        results: [],
        total_pages: 0,
        total_results: 0
    },

    // IMAGES HANDLING
    imageUrl: "https://image.tmdb.org/t/p/w342",



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