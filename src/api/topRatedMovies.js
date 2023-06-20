
// Make an API request to retrieve movie data based on year and actor
function topRatedMovies(res, res) {
    const apiUrl = 'https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1';

    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyMGIyZjJlYWM5NzgyOGIwMzI4ZmQwOGQwMDM5MjY0YyIsInN1YiI6IjY0ODk3Mzk1ZTI3MjYwMDBlOGMzMDlhZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.MwlA_KvNWITCgQzesL6MSktQoeHTDtHXiRYszXtyBgY'
        }
    };

    return fetch(apiUrl, options)
    .then(res => res.json())
    .then(data => data.results)
    .catch(err => {
      console.error('Error:', err);
      throw err;
    });
}

module.exports = { topRatedMovies };