
let currentPageNumber = 1;
let currentPage = 'sortPage';
const pageNumberElement1 = document.getElementById("page-number1");
const pageNumberElement2 = document.getElementById("page-number2");
const actorsSection = document.getElementById("actors-section");
const previousButton1 = document.getElementById("previous-button1");
const previousButton2 = document.getElementById("previous-button2");
const nextButton1 = document.getElementById("next-button1");
const nextButton2 = document.getElementById("next-button2");
let sortValue = 'relevance';
let actorName = '';

function firstPage() {
  currentPageNumber=1;
  console.log('page nr: ' + currentPageNumber + ', page name: ' + currentPage);
  // Apelează funcția topRatedMovies() pentru a reîncărca filmele din prima pagina
  switch (currentPage) {
    case 'sortPage':
      relevanceSort(sortValue);
      break;
    case 'searchPage':
      searchActorByName(actorName);
      break;
    default:
      relevanceSort(sortValue);
      break;
  }
} 

function lastPage() {
  currentPageNumber=500;
  // Apelează funcția topRatedMovies() pentru a reîncărca filmele din prima pagina
  switch (currentPage) {
    case 'sortPage':
      relevanceSort(sortValue);
      break;
    case 'searchPage':
      console.log('search last: ' + currentPageNumber);
      searchActorByName(actorName);
      break;
    default:
      relevanceSort(sortValue);
      break;
  }
} 

function previousPage() {
  if (currentPageNumber > 1) {
    currentPageNumber--;
    // Apelează funcția topRatedMovies() pentru a reîncărca filmele cu pagina anterioară
    switch (currentPage) {
      case 'sortPage':
        relevanceSort(sortValue);
        break;
      case 'searchPage':
        searchActorByName(actorName);
        break;
      default:
        relevanceSort(sortValue);
        break;
    }
  }
} 

function nextPage() {
  currentPageNumber++;
  // Apelează funcția topRatedMovies() pentru a reîncărca filmele cu pagina următoare
  switch (currentPage) {
    case 'sortPage': {
      relevanceSort(sortValue);
      break; 
    }
    case 'searchPage': {
      searchActorByName(actorName);
      break;
    }
    default: {
      relevanceSort(sortValue);
      break;
    }
  }
}

function resetFilters() {
  currentPageNumber = 1;
  sortValue = 'relevance';
  currentPage = 'sortPage';
  relevanceSort(sortValue);
}

// SORT SECTION

const orderBySelect = document.getElementById("order-by");
orderBySelect.addEventListener("change", handleOrderByChange);

function handleOrderByChange() {
  sortValue = orderBySelect.value;

  console.log('sortValue: ' + sortValue);

  relevanceSort(sortValue);
}

function relevanceSort(sortValue) {

  const apiUrl = `https://api.themoviedb.org/3/person/popular?language=en-US&page=${currentPageNumber}`;

  const options = {
      method: 'GET',
      headers: {
          accept: 'application/json',
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyMGIyZjJlYWM5NzgyOGIwMzI4ZmQwOGQwMDM5MjY0YyIsInN1YiI6IjY0ODk3Mzk1ZTI3MjYwMDBlOGMzMDlhZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.MwlA_KvNWITCgQzesL6MSktQoeHTDtHXiRYszXtyBgY'
      }
  };

  // Actualizarea numărului paginii
  pageNumberElement1.textContent = `Page ${currentPageNumber}`;
  pageNumberElement2.textContent = `Page ${currentPageNumber}`;

  // Verifică dacă currentPageNumber este 1 și dezactivează butonul "Previous" în consecință
  if (currentPageNumber === 1) {
    previousButton1.disabled = true;
    previousButton2.disabled = true;
  } else if(currentPageNumber === 500) {
    nextButton1.disabled = true;
    nextButton2.disabled = true;
  } else {
    previousButton1.disabled = false;
    previousButton2.disabled = false;
    nextButton1.disabled = false;
    nextButton2.disabled = false;
  }

  fetch(apiUrl, options)
    .then(res => res.json())
    .then(data => {
      let actorsData = null;

      switch (sortValue) {
        case 'relevance':
          actorsData = data.results
            .filter(actor => actor.profile_path)
            .sort((a, b) => b.popularity - a.popularity);
          break;
        case 'name-asc':
          actorsData = data.results
            .filter(actor => actor.profile_path)
            .sort((actor1, actor2) => {
              const name1 = actor1.name.toLowerCase();
              const name2 = actor2.name.toLowerCase();
              if (name1 < name2) {
                return -1;
              } else if (name1 > name2) {
                return 1;
              }
              return 0;
            });
          break;
        case 'name-desc':
          actorsData = data.results
            .filter(actor => actor.profile_path)
            .sort((actor1, actor2) => {
              const name1 = actor1.name.toLowerCase();
              const name2 = actor2.name.toLowerCase();
              if (name1 > name2) {
                return -1;
              } else if (name1 < name2) {
                return 1;
              }
              return 0;
            });
          break;
        case 'popularity-asc':
          actorsData = data.results
            .filter(actor => actor.profile_path)
            .sort((a, b) => a.popularity - b.popularity);
          break;
        default:
          actorsData = data.results
            .filter(actor => actor.profile_path)
            .sort((a, b) => b.popularity - a.popularity);
          break;
      }

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
          <p id="popularity">Popularity: ${actor.popularity}</p>
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

relevanceSort(sortValue);

// SEARCH SECTION


const searchButton = document.getElementById('search-button');
searchButton.addEventListener('click', firstSearch);

function firstSearch() {
  currentPageNumber = 1;

  const actorInput = document.getElementById('actor');
  actorName = actorInput.value.trim(); // Elimină spațiile de la început și de la sfârșitul șirului

  searchActorByName(actorName);
}

// Funcția de căutare după numele actorului
function searchActorByName(actorName) {
  // Actualizarea numărului paginii
  pageNumberElement1.textContent = `Page ${currentPageNumber}`;
  pageNumberElement2.textContent = `Page ${currentPageNumber}`;

  const actorInput = document.getElementById('actor');

  if (actorName !== '') {
    currentPage = 'searchPage';

    const url = `https://api.themoviedb.org/3/search/person?query=${actorName}&include_adult=false&language=en-US&page=${currentPageNumber}`;
    
    // const url = 'https://api.themoviedb.org/3/search/person?query=Tom&include_adult=false&language=en-US&page=1';
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyMGIyZjJlYWM5NzgyOGIwMzI4ZmQwOGQwMDM5MjY0YyIsInN1YiI6IjY0ODk3Mzk1ZTI3MjYwMDBlOGMzMDlhZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.MwlA_KvNWITCgQzesL6MSktQoeHTDtHXiRYszXtyBgY'
      }
    };

    fetch(url, options)
      .then(res => res.json())
      .then(data => {
        actorsData = data.results
              .filter(actor => actor.profile_path);

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
            <p id="popularity">Popularity: ${actor.popularity}</p>
            <button class="view-more-button">View more</button>
          `;
          currentRow.appendChild(actorElement);
        });

      })
      .catch(err => console.error('error:' + err));
  }
  else {
    currentPage = 'sortPage';
    relevanceSort(sortValue);
  }
  actorInput.value = "";
}
