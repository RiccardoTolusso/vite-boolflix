import { reactive } from 'vue';

export const store = reactive({
    // API CALL SETTINGS
    apiSearch:"https://api.themoviedb.org/3/search",  
    apiPosterInfo: "https://api.themoviedb.org/3/",
    
    key: "9d0f3fa0c8ae5773b297afa984c0304c",
    categories: ['movie', 'tv'], // movie / tv / multi
    query: "",
    language: 'it-IT',
    page: 1,
    adult: false,
    genre: "",

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
        total_results: 0,
    },

    genres: {
        both: [],
        "movie": [],
        "tv": []
    },

    // IMAGES HANDLING
    profileImageUrl: "https://image.tmdb.org/t/p/w185",
    imageUrl: "https://image.tmdb.org/t/p/w342",
    backdropImageUrl: "https://image.tmdb.org/t/p/w1280",


    // LISTS OF AVAILABLE FLAGS
    flags: [
        'it',
        'en'
    ],


    // FULL SCREEN INFO PAGE
    displayPosterInfo: false,
    posterToDisplay: {
        posterType: "",
        defaultData: {},
        credits: {},
        recommendations: {}
    }
})