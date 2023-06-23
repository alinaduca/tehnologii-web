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
  
    const fetchActorData = async (actorID, index) => {
      const url = `https://api.themoviedb.org/3/person/${actorID}?language=en-US`;
    
      try {
        const res = await fetch(url, options);
        const data = await res.json();
        actorData = data;
    
        const imageUrl = 'https://image.tmdb.org/t/p/w500' + actorData.profile_path;
    
        const actorElement = document.createElement('div');
        actorElement.classList.add('actor');
        actorElement.innerHTML = `
          <img src="${imageUrl}" alt="actor-name">
          <h3>${actorData.name}</h3>
          <p>Popularity: ${actorData.popularity}</p>
          <button class="remove-fav-actor-button" data-actorid="${actorID}">&#10084; Remove</button>
          <button class="view-more-button" data-actorid="${actorID}">View more</button>
        `;
        favouriteActorsSection.appendChild(actorElement);
    
        const viewMoreButton = actorElement.querySelector('.view-more-button');
        viewMoreButton.addEventListener('click', () => {
          const actorId = viewMoreButton.dataset.actorid;
          viewMoreButtonClicked(actorId);
        });

        const removeFavActorButton = actorElement.querySelector('.remove-fav-actor-button');
        removeFavActorButton.addEventListener('click', () => {
          const actorId = viewMoreButton.dataset.actorid;
          removeFavActorButtonClicked(actorId);
        });
    
      } catch (error) {
        console.error('Error:', error);
      }
    }; 
    const actorPromises = favouritesActors.map((actorID, index) => fetchActorData(actorID, index));
}
  showPage();

function viewMoreButtonClicked(id) {
  const actorUrl = '/actors/' + id;
  window.location.href = actorUrl;
}

function removeFavActorButtonClicked(id) {
  const actorUrl = '/remove-fav-actors/' + id;
  window.location.href = actorUrl;
}
  

  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4) {
      if (this.status == 200) {
        var data = JSON.parse(this.responseText);
        var userField = document.getElementById('username');
        userField.innerText = data;
      } else {
        console.error('Error: ' + this.status);
      }
    }
  };
  xhttp.open('GET', '/get-username', true);
  xhttp.send();


  var xhttp1 = new XMLHttpRequest();
  xhttp1.onreadystatechange = function() {
    if (this.readyState == 4) {
      if (this.status == 200) {
        var data = JSON.parse(this.responseText);
        var historySection = document.getElementById('history');
        for (var title of data) {
          var dataDiv = document.createElement("div");
          dataDiv.classList.add("titlu-diagrama");
          dataDiv.innerText = title.title;
          historySection.appendChild(dataDiv);
        }
      } else {
        console.error('Error: ' + this.status);
      }
    }
  };
  xhttp1.open('GET', '/get-history', true);
  xhttp1.send();