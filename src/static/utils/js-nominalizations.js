
let currentPage = 1;
const pageNumberElement1 = document.getElementById("page-number1");
const pageNumberElement2 = document.getElementById("page-number2");
const moviesSection = document.getElementById("movies-section");

function previousPage() {
  if (currentPage > 1) {
    currentPage--;
    // Apelează funcția topRatedMovies() pentru a reîncărca filmele cu pagina anterioară
    topRatedMovies();
  }
} 

// Funcția nextPage() pentru butonul "Next"
function nextPage() {
  currentPage++;
  // Apelează funcția topRatedMovies() pentru a reîncărca filmele cu pagina următoare
  topRatedMovies();
}

function topRatedMovies() {
  console.log('nr paginii: ' + currentPage);

  const apiUrl = 'https://api.themoviedb.org/3/movie/top_rated?language=en-US&page="${currentPage}"';

  const options = {
      method: 'GET',
      headers: {
          accept: 'application/json',
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyMGIyZjJlYWM5NzgyOGIwMzI4ZmQwOGQwMDM5MjY0YyIsInN1YiI6IjY0ODk3Mzk1ZTI3MjYwMDBlOGMzMDlhZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.MwlA_KvNWITCgQzesL6MSktQoeHTDtHXiRYszXtyBgY'
      }
  };

  // Actualizarea numărului paginii
  pageNumberElement1.textContent = `Page ${currentPage}`;
  pageNumberElement2.textContent = `Page ${currentPage}`;

  fetch(apiUrl, options)
    .then(res => res.json())
    .then(data => {
      const moviesData = data.results;

      // Golește secțiunea moviesSection
      moviesSection.innerHTML = '';

      moviesData.forEach((movie, index) => {
        if (index % 4 === 0) {
          const rowElement = document.createElement("div");
          rowElement.classList.add("row");
          moviesSection.appendChild(rowElement);
        }
  
        const currentRow = moviesSection.lastElementChild;
  
        const posterUrl = 'https://image.tmdb.org/t/p/w500' + movie.poster_path;

        const movieElement = document.createElement("div");
        movieElement.classList.add("movie");
        movieElement.innerHTML = `
          <img id="poster" src="${posterUrl}" alt="Movie Poster" data-movie-id="${movie.id}">
          <h3 id="title">${movie.title}</h3>
          <p id="release_date">Release Date: ${movie.release_date}</p>
          <button class="view-more-button">View more</button>
        `;
        currentRow.appendChild(movieElement);
      });
    })
    .catch(err => {
      console.error('Error:', err);
      throw err;
    });
}

topRatedMovies();
