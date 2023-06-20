// const https = require('https');

// // Make an API request to retrieve movie data based on year and actor
// function fetchMoviesByYearAndActor(year, actor) {
//   const apiKey = 'YOUR_API_KEY'; // Replace with your actual API key
//   const apiUrl = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&language=en-US&sort_by=popularity.desc&year=${year}&with_cast=${actor}`;

//   return new Promise((resolve, reject) => {
//     https.get(apiUrl, response => {
//       let data = '';

//       response.on('data', chunk => {
//         data += chunk;
//       });

//       response.on('end', () => {
//         const movies = JSON.parse(data).results;
//         resolve(movies);
//       });
//     }).on('error', error => {
//       reject(`Error fetching movies: ${error.message}`);
//     });
//   });
// }

// // Filter movies based on year and actor
// function filterMoviesByYearAndActor(movies, year, actor) {
//   return movies.filter(movie => {
//     const releaseYear = parseInt(movie.release_date.split('-')[0]);
//     const hasActor = movie.cast.some(cast => cast.name === actor);
//     return releaseYear === year && hasActor;
//   });
// }

// // Calculate statistics based on the filtered movies
// function calculateStatistics(movies) {
//   const averageRating = movies.reduce((sum, movie) => sum + movie.vote_average, 0) / movies.length;
//   const movieCount = movies.length;

//   return {
//     averageRating,
//     movieCount
//   };
// }

// // Example usage
// const year = 2022;
// const actor = 'Tom Hanks';

// fetchMoviesByYearAndActor(year, actor)
//   .then(movies => filterMoviesByYearAndActor(movies, year, actor))
//   .then(filteredMovies => calculateStatistics(filteredMovies))
//   .then(statistics => {
//     console.log(`Average rating: ${statistics.averageRating}`);
//     console.log(`Movie count: ${statistics.movieCount}`);
//   })
//   .catch(error => {
//     console.error('Error:', error);
//   });












const http = require('http');
// const { gql } = require('apollo-server');

const fs = require('fs');
const path = require('path');


// function ok(res, req) {
    // var okk = ApolloServer(a);



// }

// // Read the HTML file
// const html = fs.readFileSync(path.join(__dirname, 'index.html'), 'utf8');

// // Define the GraphQL schema
// const schema = buildSchema(`
//   type Year {
//     year: Int
//     value: Float
//   }

//   type Query {
//     years: [Year]
//   }
// `);

// // Define the resolver functions
// const root = {
//   years: () => {
//     // Replace this with your actual data source or logic
//     return [
//       { year: 2021, value: 100 },
//       { year: 2022, value: 200 },
//       { year: 2023, value: 150 }
//     ];
//   }
// };



const getStatistic = (req, res) => {
    // Parse the incoming GraphQL query
    // let body = '';
    // req.on('data', (chunk) => {
    //   body += chunk;
    // });
    // req.on('end', () => {
    //   // Execute the GraphQL query
    //   graphql(schema, JSON.parse(body).query, root)
    //     .then((result) => {
    //       res.writeHead(200, { 'Content-Type': 'application/json' });
    //       res.end(JSON.stringify(result));
    //     })
    //     .catch((error) => {
          res.writeHead(500, { 'Content-Type': 'application/json' });
          res.end("ok");
    //     });
    // });
  };

module.exports = getStatistic;