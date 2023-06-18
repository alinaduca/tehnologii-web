//  // Set up the Apollo Client
//  const client = new ApolloClient({
//     uri: 'http://localhost:4000/graphql', // Replace with your GraphQL server endpoint
//   });

//   // Define your GraphQL query
//   const GET_STATISTICS = gql`
//     query {
//       statistics {
//         # Define the fields you want to retrieve for statistics
//       }
//     }
//   `;

//   // Execute the GraphQL query and handle the response
//   client.query({ query: GET_STATISTICS })
//     .then(response => {
//       const statisticsData = response.data.statistics;
//       // Process the retrieved data and update the HTML to display the statistics
//       const statisticsContainer = document.getElementById('statistics-container');
//       statisticsContainer.innerText = JSON.stringify(statisticsData);
//     })
//     .catch(error => {
//       console.error('Error occurred:', error);
//     });



const apiKey = '20b2f2eac97828b0328fd08d0039264c'; // înlocuiește cu cheia ta reală de la TMDb
const accessToken = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyMGIyZjJlYWM5NzgyOGIwMzI4ZmQwOGQwMDM5MjY0YyIsInN1YiI6IjY0ODk3Mzk1ZTI3MjYwMDBlOGMzMDlhZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.MwlA_KvNWITCgQzesL6MSktQoeHTDtHXiRYszXtyBgY'; // înlocuiește cu tokenul tău real de acces
const actorUrl = `https://api.themoviedb.org/3/person/popular?api_key=${apiKey}`;
// fetch(actorUrl, {
//   headers: {
//     Authorization: `Bearer ${accessToken}`,
//   },
// })
//   .then(response => response.json())
//   .then(data => {
//     const actors = data.results;
//     // const totalMovies = data.cast.length + data.crew.length;
//     // console.log(actors);
//     for(const actor of actors) {
//       console.log(actor.name);
//     }
//   })
//   .catch(error => {
//     console.error('Eroare la efectuarea cererii către TMDb:', error);
//   });



// fetch(actorUrl, {
//   headers: {
//     Authorization: `Bearer ${accessToken}`,
//   },
// })
//   .then(response => response.json())
//   .then(data => {
//     const actors = data.results;
//     const promises = actors.map(actor => {
//       const actorId = actor.id;
//       // const combinedCreditsUrl = `https://api.themoviedb.org/3/person/${actorId}/combined_credits`;
//       const combinedCreditsUrl = `https://api.themoviedb.org/3/person/${actorId}/combined_credits`;
//       const params = new URLSearchParams({
//         api_key: accessToken,
//       });
//       const url = `${combinedCreditsUrl}?${params}`;

//       return fetch(url)
//         .then(response => response.json())
//         .then(creditsData => {
//           const totalMovies = creditsData.cast.length + creditsData.crew.length;
//           console.log(`${actor.name} - Total Movies: ${totalMovies}`);
//         });
//     });

//     return Promise.all(promises);
//   })
//   .catch(error => {
//     console.error('Eroare la efectuarea cererii către TMDb:', error);
//   });



// function displayAllActors(page) {
//     const actorUrl2 = `https://api.themoviedb.org/3/person/popular?api_key=${apiKey}&page=${page}`;
//     return fetch(actorUrl2, {
//       headers: {
//         Authorization: `Bearer ${accessToken}`
//       }
//     })
//     .then(response => response.json())
//     .then(data => {
//       var actors = data.results;
//       var ok = 0;
//       for(actor of actors) {
//         console.log(actor.name);
//         if(actor.name === "Jenna Ortega") {
//           console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!hereee");
//           ok = 1;
//         }
//       }
//       return ok;
//     })
//     .catch(error => {
//       console.error('Eroare la efectuarea cererii către TMDb:', error);
//       throw error;
//     });
// }

// function showActors() {
//   var promises = [];

//   for (var i = 1; i <= 10; i++) {
//     promises.push(displayAllActors(i));
//   }

//   Promise.all(promises)
//     .then(results => {
//       console.log(results); // Array of 'ok' values
//     })
//     .catch(error => {
//       console.error('Error:', error);
//     });
// }

// showActors();


// displayAllActors(1);




// function searchActorByName(actorName) {
//   const searchUrl = `https://api.themoviedb.org/3/search/person?api_key=${apiKey}&query=${encodeURIComponent(actorName)}`;

//   return fetch(searchUrl, {
//     headers: {
//       Authorization: `Bearer ${accessToken}`,
//     },
//   })
//     .then(response => response.json())
//     .then(data => {
//       const actor = data.results.find(actor => actor.name.toLowerCase() === actorName.toLowerCase());
//       console.log(actor);
      // if (actor) {
      //   const actorId = actor.id;
      //   const actorDetailsUrl = `https://api.themoviedb.org/3/person/${actorId}?api_key=${apiKey}`;

      //   return fetch(actorDetailsUrl, {
      //     headers: {
      //       Authorization: `Bearer ${accessToken}`,
      //     },
      //   })
      //     .then(response => response.json())
      //     .then(details => {
      //       return details;
      //     });
      // } else {
      //   throw new Error(`Actor '${actorName}' not found.`);
      // }
//     });
// }

// const actorName = 'Dakota Johnson'; // Replace with the name of the actor you want to search for

// searchActorByName(actorName)
//   .then(actorDetails => {
//     console.log(actorDetails); // Object with detailed information about the actor
//   })
//   .catch(error => {
//     console.error('Error:', error);
//   });


function fetchMoviesByYearAndActor(year, actor) {
  const apiUrl = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&language=en-US&sort_by=popularity.desc&year=${year}&with_cast=${actor}`;
  return fetch(apiUrl, {
    headers: {
      Authorization: `Bearer ${accessToken}`
    }
  })
  .then(response => response.json())
  .then(data => data.results);
}

// Filter movies based on year and actor
function filterMoviesByYearAndActor(movies, year, actor) {
  return movies.filter(movie => {
    // console.log(movie);
    const releaseYear = parseInt(movie.release_date.split('-')[0]);
    // const hasActor = movie.cast.some(cast => cast.name === actor);
    console.log(movie);
    return releaseYear === year;
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
const actor = 'Hande Erçel';

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