const favouriteActorsSection = document.getElementsByClassName("favourites-actors");
let actorImages;
let actorID;


async function showPage() {

    const response = await fetch('/get-favourites-actors');
    const favouritesActors = await response.json();
    console.log('favouritesActors: ' + favouritesActors);
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyMGIyZjJlYWM5NzgyOGIwMzI4ZmQwOGQwMDM5MjY0YyIsInN1YiI6IjY0ODk3Mzk1ZTI3MjYwMDBlOGMzMDlhZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.MwlA_KvNWITCgQzesL6MSktQoeHTDtHXiRYszXtyBgY'
        }
    };

    const url = `https://api.themoviedb.org/3/person/${actorID}?language=en-US`;


    fetch(url, options)
    .then(res => res.json())
    .then(data => {
        actorImages = data.profiles;
    })
    .catch(err => console.error('error:' + err));
}

showPage();
