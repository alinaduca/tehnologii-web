let actorData;
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
  
    const favouriteActorsSection = document.getElementsByClassName("favourites-actors")[0];
  
    const fetchActorData = async (actorID) => {
      const url = `https://api.themoviedb.org/3/person/${actorID}?language=en-US`;
  
      try {
        const res = await fetch(url, options);
        const data = await res.json();
        console.log('1.date-actor: ' + data);
        actorData = data;
        console.log('2.date-actor: ' + data);

        console.log('profile_path: ' + actorData.profile_path);
        console.log('name: ' + actorData.name);

        const imageUrl = 'https://image.tmdb.org/t/p/w500' + actorData.profile_path;
  
        const actorElement = document.createElement('div');
        actorElement.classList.add('actor');
        actorElement.innerHTML = `
          <img src="${imageUrl}" alt="actor-name">
          <h3>${actorData.name}</h3>
          <p>Popularity: ${actorData.popularity}</p>
        `;
        // actorElement.innerHTML = `
        //   <img src="${imageUrl}" alt="actor-name">
        //   <h3>${actorData.name}</h3>
        //   <p>Popularity: ${actorData.popularity}</p>
        //   <button class="view-more-button">View more</button>
        // `;
        favouriteActorsSection.appendChild(actorElement);

        const viewMoreButton = actorElement.querySelector('.view-more-button');
          viewMoreButton.addEventListener('click', () => {
            viewMoreButtonClicked(actorData.id);
          });

      } catch (error) {
        console.error('Error:', error);
      }
    };
    const actorPromises = favouritesActors.map(actorID => fetchActorData(actorID));

  }
  
  showPage();
  

fetch('/get-username')
    .then(response => response.json())
    .then(data => {
        const userField = document.getElementById('username');
        userField.innerText = data;
    })
    .catch(err => console.error('error:' + err));


    fetch('/get-history')
    .then(response => response.json())
    .then(data => {
        const historySection = document.getElementById('history');
        for(var title of data) {
            var dataDiv = document.createElement("div");
            dataDiv.classList.add("titlu-diagrama");
            dataDiv.innerText = title.title;
            historySection.appendChild(dataDiv);
        }
    })
    .catch(err => console.error('error:' + err));

