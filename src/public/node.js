// Declarar las variables fuera del bloque if
let headerSection, trendingPreviewSection, categoriesPreviewSection, genericSection, movieDetailSection;
let searchForm, trendingMoviesPreviewList, categoriesPreviewList, movieDetailCategoriesList, relatedMoviesContainer;
let headerTitle, searchFormInput, searchFormBtn, trendingBtn, movieDetailTitle, movieDetailDescription, movieDetailScore;

if (typeof document !== 'undefined') {
    // Sections
    headerSection = document.querySelector('#header');
    trendingPreviewSection = document.querySelector('#trendingPreview');
    categoriesPreviewSection = document.querySelector('#categoriesPreview');
    genericSection = document.querySelector('#genericList');
    movieDetailSection = document.querySelector('#movieDetail');

    // Lists & Containers
    searchForm = document.querySelector('#searchForm');
    trendingMoviesPreviewList = document.querySelector('.trendingPreview-movieList');
    categoriesPreviewList = document.querySelector('.categoriesPreview-list');
    movieDetailCategoriesList = document.querySelector('#movieDetail .categories-list');
    relatedMoviesContainer = document.querySelector('.relatedMovies-scrollContainer');

    // Elements
    headerTitle = document.querySelector('.header-title');
    searchFormInput = document.querySelector('#searchForm input');
    searchFormBtn = document.querySelector('#searchBtn');
    trendingBtn = document.querySelector('.trendingPreview-btn');
    movieDetailTitle = document.querySelector('.movieDetail-title');
    movieDetailDescription = document.querySelector('.movieDetail-description');
    movieDetailScore = document.querySelector('.movieDetail-score');
}

// Exportar las variables
/* export {
    headerSection,
    trendingPreviewSection,
    categoriesPreviewSection,
    genericSection,
    movieDetailSection,
    searchForm,
    trendingMoviesPreviewList,
    categoriesPreviewList,
    movieDetailCategoriesList,
    relatedMoviesContainer,
    headerTitle,
    searchFormInput,
    searchFormBtn,
    trendingBtn,
    movieDetailTitle,
    movieDetailDescription,
    movieDetailScore,
}; */
