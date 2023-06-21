
let currentPage = 1;
const pageNumberElement1 = document.getElementById("page-number1");
const pageNumberElement2 = document.getElementById("page-number2");
const actorsSection = document.getElementById("actors-section");
const previousButton1 = document.getElementById("previous-button1");
const previousButton2 = document.getElementById("previous-button2");

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

  const apiUrl = `https://api.themoviedb.org/3/person/popular?language=en-US&page=${currentPage}`;

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

  // Verifică dacă currentPage este 1 și dezactivează butonul "Previous" în consecință
  if (currentPage === 1) {
    previousButton1.disabled = true;
    previousButton2.disabled = true;
  } else {
    previousButton1.disabled = false;
    previousButton2.disabled = false;
  }

  fetch(apiUrl, options)
    .then(res => res.json())
    .then(data => {
      const actorsData = data.results.filter(actor => actor.profile_path); 

      // Golește secțiunea actorsSection
      actorsSection.innerHTML = '';

      actorsData.forEach((actor, index) => {
        if (index % 4 === 0) {
          const rowElement = document.createElement("div");
          rowElement.classList.add("row");
          actorsSection.appendChild(rowElement);
        }
  
        const currentRow = actorsSection.lastElementChild;
  
        const profileUrl = 'https://image.tmdb.org/t/p/w500' + actor.profile_path;

        const actorElement = document.createElement("div");
        actorElement.classList.add("movie");
        actorElement.innerHTML = `
          <img id="poster" src="${profileUrl}" alt="Movie Poster" data-movie-id="${actor.id}">
          <h3 id="name">${actor.name}</h3>
          <button class="view-more-button">View more</button>
        `;
        currentRow.appendChild(actorElement);
      });
    })
    .catch(err => {
      console.error('Error:', err);
      throw err;
    });
}

topRatedMovies();
