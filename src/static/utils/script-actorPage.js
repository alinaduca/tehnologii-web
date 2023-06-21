const actorSection = document.getElementsByClassName("actor-section");
let actorImages;
let actorData;
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

        renderActorBiography();
    })
    .catch(err => console.error('error:' + err));
}

showPage();

function renderActorBiography() {
    console.log('am intrat in fct');

    // if (actorImages && actorData) {
        console.log('am intrat in if');
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
        const saveToFavouritesButtonHTML = `<button class="save-button">Save to Favorites</button>`;
        const birthInfoHTML = actorData.place_of_birth
            ? `<p>Birthday: ${actorData.birthday} | Place of Birth: ${actorData.place_of_birth}</p>`
            : `<p>Birthday: ${actorData.birthday}</p>`;
        const popularityHTML = `<p>Popularity: ${actorData.popularity}</p>`;
        const biographyHTML = `<p>Biography: ${actorData.biography}</p>`;

        // Adăugarea HTML-ului generat în secțiunile corespunzătoare
        leftSection.innerHTML = carouselHTML;
        rightSection.innerHTML = actorNameHTML + saveToFavouritesButtonHTML + birthInfoHTML + popularityHTML + biographyHTML;
    // }
}
