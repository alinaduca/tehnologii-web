const actorSection = document.getElementsByClassName("actor-section");
let actorImages;
let actorData;
let actorMovies;
let actorID;

function showPage() {

    const URL = window.location.href;
    const urlComponents = URL.split('/'); // Separă URL-ul în componente utilizând caracterul '/'
    actorID = urlComponents.pop();

    // console.log('actorID: ' + actorID);

    const imagesURL = `https://api.themoviedb.org/3/person/${actorID}/images`;

    // console.log('imagesURL: ' + imagesURL);

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

        // console.log('name: ' + actorData.name);
    })
    .catch(err => console.error('error:' + err));

    const moviesURL = `https://api.themoviedb.org/3/person/${actorID}/combined_credits?language=en-US`;

    fetch(moviesURL, options)
    .then(res => res.json())
    .then(data => {
        actorMovies = data.cast;

        renderActorBiography();
    })
    .catch(err => console.error('error:', err));

}

showPage();

async function renderActorBiography() {
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
    
    // verificam daca exista actorul este deja adaugat la favorite pentru a sti ce fel de buton adaugam
    const actorUrl = '/exists-fav-actor/' + actorID;

    let textSaveButton;

    fetch(actorUrl)
    .then(response => {
        if (!response.ok) {
            console.log('Network response was not ok');
            throw new Error('Network response was not ok');
        }
        return response.text(); // sau response.json() în funcție de tipul de conținut primit
    })
    .then(data => {
        textSaveButton = data;

        let saveToFavouritesButtonHTML;
        if(textSaveButton === "NU exista in db")
            saveToFavouritesButtonHTML = `<button class="save-button">&#10084; Save to Favorites</button>`;
        else if(textSaveButton === "exista in db")
            saveToFavouritesButtonHTML = `<button class="saved-button">&#10084; Actor saved</button>`;
        
        const birthInfoHTML = actorData.place_of_birth
            ? `<p class="profile-info">Birthday: ${actorData.birthday} | Place of Birth: ${actorData.place_of_birth}</p>`
            : `<p class="profile-info">Birthday: ${actorData.birthday}</p>`;
        const popularityHTML = `<p class="profile-popularity">Popularity: ${actorData.popularity}</p>`;
        const biographyHTML = `<p class="profile-bio">Biography: ${actorData.biography}</p>`;


        // Adăugarea HTML-ului generat în secțiunile corespunzătoare
        leftSection.innerHTML = carouselHTML;
        rightSection.innerHTML = actorNameHTML + saveToFavouritesButtonHTML + birthInfoHTML + popularityHTML + biographyHTML;

        const saveButton = rightSection.querySelector('.save-button');
        const savedButton = rightSection.querySelector('.saved-button');
        if (saveButton) {
            saveButton.addEventListener('click', () => {
                saveButtonClicked(actorID);
            });
        }

        if (savedButton) {
            savedButton.addEventListener('click', () => {
                saveButtonClicked(actorID);
            });
        }

        const moviesSection = document.getElementsByClassName("actor-movies")[0];

        // Adăugarea titlului "Movies:"
        const moviesTitleElement = document.createElement("div");
        moviesTitleElement.innerHTML = `<p id="movies-title">&darr; ${actorData.name}'s Movies: &darr;</p>`;
        moviesSection.insertBefore(moviesTitleElement, moviesSection.firstChild);

        actorMovies.slice(0, 4).forEach((movie, index) => {
            if (index % 4 === 0) {
                const rowElement = document.createElement("div");
                rowElement.classList.add("row");
                moviesSection.appendChild(rowElement);
            }

            const currentRow = moviesSection.lastElementChild;

            if(movie.poster_path) {
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
                } else if (!movie.original_title && movie.character) {
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
            }
        });
    })
    .catch(error => {
        console.error('A apărut o eroare:', error);
    });

    
}

function saveButtonClicked(actorID) {
    console.log('Apelată funcția pentru actorul:', actorID);
    
    const actorUrl = '/save-favourite/' + actorID;
    window.location.href = actorUrl;
  }
  