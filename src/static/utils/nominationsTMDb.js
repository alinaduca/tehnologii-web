const apiKey = '20b2f2eac97828b0328fd08d0039264c'; // înlocuiește cu cheia ta reală de la TMDb
const accessToken = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyMGIyZjJlYWM5NzgyOGIwMzI4ZmQwOGQwMDM5MjY0YyIsInN1YiI6IjY0ODk3Mzk1ZTI3MjYwMDBlOGMzMDlhZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.MwlA_KvNWITCgQzesL6MSktQoeHTDtHXiRYszXtyBgY'; // înlocuiește cu tokenul tău real de acces
const actorUrl = `https://api.themoviedb.org/3/person/popular?api_key=${apiKey}&language=en-US&page=1`;

fetch(actorUrl, {
  headers: {
    Authorization: `Bearer ${accessToken}`,
  },
})
  .then(response => response.json())
  .then(data => {
    const actors = data.results;

    const actorListElement = document.getElementById('actor-list');
    actors.forEach(actor => {
      const li = document.createElement('li');
      li.textContent = actor.name;
      actorListElement.appendChild(li);
    });
  })
  .catch(error => {
    console.error('Eroare la efectuarea cererii către TMDb:', error);
  });
