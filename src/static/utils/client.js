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
    var apiUrl = "http://localhost:5000/news/" + encodeURIComponent(actorName);
    console.log(apiUrl);
    
  
    fetch(apiUrl)
  // .then(function(response) {
  //   if (response.ok) {
  //     console.log("SUNT AICI 7");
  //     return response.json();

  //   } else {
  //     console.log("SUNT AICI 8");

  //     throw new Error("Error retrieving articles from API.");
  //   }
  // })
  // .then(function(data) {
  //   var articleList = document.getElementById("articleList");
  //   // articleList.innerHTML = ""; // Golește lista de articole existentă
  //   console.log("SUNT AICI 9");
    
  //   data.forEach(function(article) {
  //     var listItem = document.createElement("li");
  //     var link = document.createElement("a");
  //     link.textContent = article.title;
  //     link.href = article.url;
  //     listItem.appendChild(link);
  //     console.log("SUNT AICI 10");
  //     console.log(listItem);
  //     articleList.appendChild(listItem);
  //   });
  // })
  // .catch(function(error) {
  //   console.error(error);
  // });
  }
});

// console.log("im hereeeeeeeeeeeeeeee");
// function apelareClient() {

//   console.log("Viata e grele.");
// }

// var listaActori = document.getElementById("actorsList");
// var actorName = "jenna ortega";

// console.log(articleList);