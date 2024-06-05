import { reactive } from 'vue';

export const store = reactive({
    // API CALL SETTINGS
    apiUrl:"https://api.themoviedb.org/3/search/",
    key: 'movie', // movie / tv / multi
    query: "",
    language: 'italian',
    languages:{
        italian: {
            code: 'it-IT',
            image: null
        },
        englis: {
            code: 'en-US',
            image: null
        },
    },
    page: 1,

    // API CALL DATA
    currentPage: 0,
    results: [],
    total_pages: 0,
    total_results: 0,


})