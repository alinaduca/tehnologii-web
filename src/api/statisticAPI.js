const https = require('https');

// Make an API request to retrieve movie data based on year and actor
function fetchMoviesByYearAndActor(year, actor) {
  const apiKey = 'YOUR_API_KEY'; // Replace with your actual API key
  const apiUrl = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&language=en-US&sort_by=popularity.desc&year=${year}&with_cast=${actor}`;

  return new Promise((resolve, reject) => {
    https.get(apiUrl, response => {
      let data = '';

      response.on('data', chunk => {
        data += chunk;
      });

      response.on('end', () => {
        const movies = JSON.parse(data).results;
        resolve(movies);
      });
    }).on('error', error => {
      reject(`Error fetching movies: ${error.message}`);
    });
  });
}

// Filter movies based on year and actor
function filterMoviesByYearAndActor(movies, year, actor) {
  return movies.filter(movie => {
    const releaseYear = parseInt(movie.release_date.split('-')[0]);
    const hasActor = movie.cast.some(cast => cast.name === actor);
    return releaseYear === year && hasActor;
  });
}

// Calculate statistics based on the filtered movies
function calculateStatistics(movies) {
  const averageRating = movies.reduce((sum, movie) => sum + movie.vote_average, 0) / movies.length;
  const movieCount = movies.length;

  return {
    averageRating,
    movieCount
  };
}

// Example usage
const year = 2022;
const actor = 'Tom Hanks';

fetchMoviesByYearAndActor(year, actor)
  .then(movies => filterMoviesByYearAndActor(movies, year, actor))
  .then(filteredMovies => calculateStatistics(filteredMovies))
  .then(statistics => {
    console.log(`Average rating: ${statistics.averageRating}`);
    console.log(`Movie count: ${statistics.movieCount}`);
  })
  .catch(error => {
    console.error('Error:', error);
  });