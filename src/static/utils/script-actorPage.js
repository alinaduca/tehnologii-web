const actorSection = document.getElementsByClassName("actor-section");
let actorImages;
let actorData;
let actorMovies;
let actorID;


function showPage() {

    const URL = window.location.href;
    const urlComponents = URL.split('/'); // Separă URL-ul în componente utilizând caracterul '/'
    actorID = urlComponents.pop();

    console.log('actorID: ' + actorID);

    const imagesURL = `https://api.themoviedb.org/3/person/${actorID}/images`;

    console.log('imagesURL: ' + imagesURL);

    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyMGIyZjJlYWM5NzgyOGIwMzI4ZmQwOGQwMDM5MjY0YyIsInN1YiI6IjY0ODk3Mzk1ZTI3MjYwMDBlOGMzMDlhZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.MwlA_KvNWITCgQzesL6MSktQoeHTDtHXiRYszXtyBgY'
        }
    };

    fetch(imagesURL, options)
    .then(res => res.json())
    .then(data => {
        actorImages = data.profiles;
    })
    .catch(err => console.error('error:' + err));

    const dataURL = `https://api.themoviedb.org/3/person/${actorID}?language=en-US`;

    fetch(dataURL, options)
    .then(res => res.json())
    .then(data => {
        actorData = data;

        console.log('name: ' + actorData.name);
    })
    .catch(err => console.error('error:' + err));

    const moviesURL = `https://api.themoviedb.org/3/person/${actorID}/combined_credits?language=en-US`;

    fetch(moviesURL, options)
    .then(res => res.json())
    .then(data => {
        console.log('data1:', data);
        actorMovies = data.cast;
        console.log('data2:', actorMovies);

        actorMovies.forEach((movie, index) => {
            console.log('Title:', movie.original_title); // original_name
        });

        renderActorBiography();
    })
    .catch(err => console.error('error:', err));

}

showPage();

function renderActorBiography() {
    console.log('am intrat in fct');

    // Golește secțiunea actorSection
    actorSection.innerHTML = '';

    const leftSection = document.getElementsByClassName("left-section")[0];
    const rightSection = document.getElementsByClassName("right-section")[0];

    // Generare HTML pentru caruselul cu pozele luate din "actorImages" în partea stângă
    let carouselHTML = '<div id="profile-img">';
    const imageUrl = 'https://image.tmdb.org/t/p/w500' + actorData.profile_path;
    carouselHTML += `<img src="${imageUrl}" alt="Actor Image">`;
    carouselHTML += '</div>';

        // Generare HTML pentru datele din "actorData" în partea dreaptă
        const actorNameHTML = `<h2 class="actor-name">${actorData.name}</h2>`;
        const saveToFavouritesButtonHTML = `<button class="save-button">&#10084; Save to Favorites</button>`;
        const birthInfoHTML = actorData.place_of_birth
            ? `<p class="profile-info">Birthday: ${actorData.birthday} | Place of Birth: ${actorData.place_of_birth}</p>`
            : `<p class="profile-info">Birthday: ${actorData.birthday}</p>`;
        const popularityHTML = `<p class="profile-popularity">Popularity: ${actorData.popularity}</p>`;
        const biographyHTML = `<p class="profile-bio">Biography: ${actorData.biography}</p>`;

    // Adăugarea HTML-ului generat în secțiunile corespunzătoare
    leftSection.innerHTML = carouselHTML;
    rightSection.innerHTML = actorNameHTML + saveToFavouritesButtonHTML + birthInfoHTML + popularityHTML + biographyHTML;


    // movies section
    const moviesSection = document.getElementsByClassName("actor-movies")[0];

    // actorMovies.slice(0, 4).forEach((movie, index) => {
    //     console.log('Title:', movie.original_title);
    // });

    actorMovies.slice(0, 4).forEach((movie, index) => {
        if (index % 4 === 0) {
          const rowElement = document.createElement("div");
          rowElement.classList.add("row");
          moviesSection.appendChild(rowElement);
        }
      
        const currentRow = moviesSection.lastElementChild;
      
        const posterUrl = 'https://image.tmdb.org/t/p/w500' + movie.poster_path;
      
        const movieElement = document.createElement("div");
        movieElement.classList.add("movie");
        if (movie.original_title && movie.character) {
            movieElement.innerHTML = `
              <img id="poster" src="${posterUrl}" alt="Movie Poster" data-movie-id="${movie.id}">
              <h3 id="title">${movie.original_title}</h3>
              <p id="character">Character: ${movie.character}</p>
              <p id="vote_average">Average vote: ${movie.vote_average}</p>
            `;
        } else if (movie.original_title && !movie.character) {
            movieElement.innerHTML = `
              <img id="poster" src="${posterUrl}" alt="Movie Poster" data-movie-id="${movie.id}">
              <h3 id="title">${movie.original_title}</h3>
              <p id="vote_average">Average vote: ${movie.vote_average}</p>
            `;
        } else if(!movie.original_title && movie.character) {
            movieElement.innerHTML = `
              <img id="poster" src="${posterUrl}" alt="Movie Poster" data-movie-id="${movie.id}">
              <h3 id="title">${movie.original_name}</h3>
              <p id="character">Character: ${movie.character}</p>
              <p id="vote_average">Average vote: ${movie.vote_average}</p>
            `;
        } else {
            movieElement.innerHTML = `
              <img id="poster" src="${posterUrl}" alt="Movie Poster" data-movie-id="${movie.id}">
              <h3 id="title">${movie.original_name}</h3>
              <p id="vote_average">Average vote: ${movie.vote_average}</p>
            `;
        }
        currentRow.appendChild(movieElement);
      
      });
    
}
