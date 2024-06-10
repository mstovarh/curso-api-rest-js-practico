import axios from 'axios';
import API_KEY from '../secret.js';

const api = axios.create({
  baseURL: 'https://api.themoviedb.org/3/',
  headers: {
    'Content-Type': 'application/json charset=utf-8',
  },
  params: {
    api_key: API_KEY,
  },
});

document.addEventListener('DOMContentLoaded', () => {
  const headerSection = document.querySelector('#header');
  const trendingPreviewSection = document.querySelector('#trendingPreview');
  const categoriesPreviewSection = document.querySelector('#categoriesPreview');
  const genericSection = document.querySelector('#genericList');
  const movieDetailSection = document.querySelector('#movieDetail');

  const searchForm = document.querySelector('#searchForm');
  const trendingMoviesPreviewList = document.querySelector('.trendingPreview-movieList');
  const categoriesPreviewList = document.querySelector('.categoriesPreview-list');
  const movieDetailCategoriesList = document.querySelector('#movieDetail .categories-list');
  const relatedMoviesContainer = document.querySelector('.relatedMovies-scrollContainer');

  const headerTitle = document.querySelector('.header-title');
  const searchFormInput = document.querySelector('#searchForm input');
  const searchFormBtn = document.querySelector('#searchBtn');
  const trendingBtn = document.querySelector('.trendingPreview-btn');
  const movieDetailTitle = document.querySelector('.movieDetail-title');
  const movieDetailDescription = document.querySelector('.movieDetail-description');
  const movieDetailScore = document.querySelector('.movieDetail-score');

  function createMovies(movies, container) {
    container.innerHTML = '';

    movies.forEach((movie) => {
      const movieContainer = document.createElement('div');
      movieContainer.classList.add('movie-container');
      movieContainer.addEventListener('click', () => {
        location.hash = '#movie=' + movie.id;
      });

      const movieImg = document.createElement('img');
      movieImg.classList.add('movie-img');
      movieImg.setAttribute('alt', movie.title);
      movieImg.setAttribute('src', 'https://image.tmdb.org/t/p/w300' + movie.poster_path);

      movieImg.style.borderRadius = '1.5rem';
      movieImg.style.cursor = 'pointer';

      movieContainer.appendChild(movieImg);
      container.appendChild(movieContainer);
    });
  }

  function createCategories(categories, container) {
    container.innerHTML = '';

    categories.forEach((category) => {
      const categoryContainer = document.createElement('div');
      categoryContainer.classList.add('category-container');

      const categoryTitle = document.createElement('h3');
      categoryTitle.classList.add('category-title');
      categoryTitle.addEventListener('click', () => {
        const activeElements = document.querySelectorAll('.category-container.active');
        activeElements.forEach(element => element.classList.remove('active'));
  
        categoryContainer.classList.add('active');
  
        location.hash = `#category=${category.id}-${category.name}`;
      });
      const categoryTitleText = document.createTextNode(category.name);
  
      categoryTitle.appendChild(categoryTitleText);
      categoryContainer.appendChild(categoryTitle);
      container.appendChild(categoryContainer);
    });
  }

  // Llamadas a la API
  async function getTrendingMoviesPreview() {
    const { data } = await api('trending/movie/day');
    const movies = data.results;
    console.log(movies);

    createMovies(movies, trendingMoviesPreviewList);
  }

  async function getCategoriesPreview() {
    const { data } = await api('genre/movie/list');
    const categories = data.genres;

    createCategories(categories, categoriesPreviewList);
  }

  async function getMoviesByCategory(id) {
    const { data } = await api.get('discover/movie', {
      params: {
        with_genres: id,
      },
    });
    const movies = data.results;

    createMovies(movies, genericSection);
  }

  async function getMoviesBySearch(query) {
    const { data } = await api.get('search/movie', {
      params: {
        query,
      },
    });
    const movies = data.results;

    createMovies(movies, genericSection);
  }

  async function getTrendingMovies() {
    const { data } = await api.get('trending/movie/day');
    const movies = data.results;

    createMovies(movies, genericSection);
  }

  async function getMovieById(id) {
    const { data: movie } = await api.get('movie/' + id);
    //console.log({movie});

    const movieImgUrl = 'https://image.tmdb.org/t/p/w500' + movie.poster_path;
    //console.log(movieImgUrl);
    headerSection.style.background = `
      linear-gradient(
        180deg,
        rgba(0, 0, 0, 0.35) 19.27%,
        rgba(0, 0, 0, 0) 29.17%
      ),
      url(${movieImgUrl})
    `;

    movieDetailTitle.textContent = movie.title;
    movieDetailDescription.textContent = movie.overview;
    movieDetailScore.textContent = movie.vote_average;

    createCategories(movie.genres, movieDetailCategoriesList);

    getRelatedMoviesId(id);
  }

  async function getRelatedMoviesId(id) {
    const { data } = await api.get(`movie/${id}/recommendations`);
    const relatedMovies = data.results;

    createMovies(relatedMovies, relatedMoviesContainer);
  }

  // Eventos de búsqueda y tendencias
  searchFormBtn.addEventListener('click', () => {
    location.hash = '#search=' + searchFormInput.value;
  });

  trendingBtn.addEventListener('click', () => {
    location.hash = '#trends';
  });

  // Eventos del navegador
  window.addEventListener('DOMContentLoaded', navigator, false);
  window.addEventListener('hashchange', navigator, false);

  function navigator() {
    console.log({ location });

    if (location.hash.startsWith('#trends')) {
      trendsPage();
    } else if (location.hash.startsWith('#search=')) {
      searchPage();
    } else if (location.hash.startsWith('#movie=')) {
      movieDetailsPage();
    } else if (location.hash.startsWith('#category=')) {
      categoriesPage();
    } else {
      homePage();
    }

    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }

  // Funciones de navegación de páginas
  function homePage() {
    console.log('Home!!');

    trendingPreviewSection.style.display = 'grid';
    categoriesPreviewSection.style.display = 'grid';
    genericSection.style.display = 'none';
    movieDetailSection.style.display = 'none';

    headerTitle.innerHTML = 'Movieland';
    headerSection.style.background = '8D69BF';

    getTrendingMoviesPreview();
    getCategoriesPreview();
  }

  function categoriesPage() {
    console.log('categories!!');

    trendingPreviewSection.style.display = 'none';
    categoriesPreviewSection.style.display = 'grid';
    genericSection.style.display = 'grid';
    movieDetailSection.style.display = 'none';

    const [_, categoryData] = location.hash.split('=');
    const [categoryId, categoryName] = categoryData.split('-');

    headerTitle.innerHTML = categoryName;

    getMoviesByCategory(categoryId);
  }

  function movieDetailsPage() {
    console.log('Movie!!');

    trendingPreviewSection.style.display = 'none';
    categoriesPreviewSection.style.display = 'none';
    genericSection.style.display = 'none';
    movieDetailSection.style.display = 'grid';

    const [_, movieId] = location.hash.split('=');
    getMovieById(movieId);
  }

  function searchPage() {
    console.log('Search!!');

    trendingPreviewSection.style.display = 'none';
    categoriesPreviewSection.style.display = 'none';
    genericSection.style.display = 'grid';
    movieDetailSection.style.display = 'none';

    const [_, query] = location.hash.split('=');
    getMoviesBySearch(query);
  }

  function trendsPage() {
    console.log('TRENDS!!');

    trendingPreviewSection.style.display = 'none';
    categoriesPreviewSection.style.display = 'none';
    genericSection.style.display = 'grid';
    movieDetailSection.style.display = 'none';

    headerTitle.innerHTML = 'Tendencias';

    getTrendingMovies();
  }
});
