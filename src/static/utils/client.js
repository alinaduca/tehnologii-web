var searchForm = document.getElementById("searchForm");
var actorNameInput = document.getElementById("actorName");
var articleList = document.getElementById("articleList");

searchForm.addEventListener("submit", function(event) {
  event.preventDefault(); // Previne acțiunea implicită de trimitere a formularului

  var actorName = actorNameInput.value.trim(); // Obțineți numele actorului din câmpul de introducere

  if (actorName !== "") {
    var apiUrl = "http://localhost:5000/news/" + encodeURIComponent(actorName);

    fetch(apiUrl)
  .then(function(response) {
    if (response.ok) {
      return response.json();
    } else {
      throw new Error("Error retrieving articles from API.");
    }
  })
  .then(function(data) {
    var articleList = document.getElementById("articleList");
    // articleList.innerHTML = ""; // Golește lista de articole existentă

    data.forEach(function(article) {
      var listItem = document.createElement("li");
      var link = document.createElement("a");
      link.textContent = article.title;
      link.href = article.url;
      listItem.appendChild(link);
      console.log(listItem);
      articleList.appendChild(listItem);
    });
  })
  .catch(function(error) {
    console.error(error);
  });
  }
});
console.log(articleList);