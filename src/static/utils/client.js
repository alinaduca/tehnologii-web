function fetchActorNews(actorName) {
  const apiKey = '409e91ad98dc47919d456b7b91b91e5a'; // Înlocuiește cu cheia ta de API pentru știri
  const apiUrl = `https://newsapi.org/v2/everything?q=${encodeURIComponent(actorName)}&apiKey=${apiKey}`;

  return fetch(apiUrl)
    .then(response => {
      if (!response.ok) {
        throw new Error('Error retrieving actor news');
      }
      return response.json();
    })
    .then(data => data.articles)
    .catch(error => {
      console.error(error);
      throw new Error('Failed to retrieve actor news');
    });
}

// Exemplu de utilizare
const actorName = 'John Doe'; // Înlocuiește cu numele actorului dorit

fetchActorNews(actorName)
  .then(news => {
    // Utilizează rezultatele primite
    console.log(news);
  })
  .catch(error => {
    console.error(error);
  });


var searchForm = document.getElementById("searchForm");
var actorNameInput = document.getElementById("actorName");
var articleList = document.getElementById("articleList");
console.log("SUNT AICI 10000");
var myDiv = document.getElementById("buton-actori");
myDiv.addEventListener("click", function(event) {

  event.preventDefault(); // Previne acțiunea implicită de trimitere a formularului

  var actorName = actorNameInput.value.trim(); // Obțineți numele actorului din câmpul de introducere
  console.log(actorName);

  if (actorName !== "") {
    //var apiUrl = "http://localhost:3000/news/" + encodeURIComponent(actorName);
    const apiKey = '409e91ad98dc47919d456b7b91b91e5a'; // Înlocuiește cu cheia ta de API pentru știri
  const apiUrl = `https://newsapi.org/v2/everything?q=${encodeURIComponent(actorName)}&apiKey=${apiKey}`;
    console.log(apiUrl);


    fetch(apiUrl)
    .then(function(data) {
      console.log("aici1");
      if (Array.isArray(data) || typeof data === 'object') {
        console.log("aici2");
        for (var i = 0; i < data.length; i++) {
          var article = data[i];
          var listItem = document.createElement("li");
          var link = document.createElement("a");
          link.textContent = article.title;
          link.href = article.url;
          listItem.appendChild(link);
          console.log(listItem);
          articleList.appendChild(listItem);
          console.log("aici3");
        }
                } else {
        throw new Error("Invalid response data. Expected an array or an object.");
      }
      // openlist1();
    })
    .catch(function(error) {
      console.error(error);
    });
  }
});
console.log("...............................xcdfghjkl..............");
console.log(articleList);

function openlist1()
{
  articleList.style.display = "block";
}