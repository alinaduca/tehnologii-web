const apiKey = '409e91ad98dc47919d456b7b91b91e5a';
const apiUrl = 'https://newsapi.org/v2/everything?domains=wsj.com&apiKey=409e91ad98dc47919d456b7b91b91e5a';

fetch(`${apiUrl}&apiKey=${apiKey}`)
  .then(response => response.json())
  .then(data => {
    const articles = data.articles; // obțineți array-ul de articole din răspuns

    // Parcurgeți fiecare articol și utilizați informațiile relevante
    articles.forEach(article => {
      const sourceName = article.source.name;
      const author = article.author;
      const title = article.title;
      const description = article.description;
      const url = article.url;
      const imageUrl = article.urlToImage;
    //   const publishedAt = article.publishedAt;
      const content = article.content;

      // Aici puteți efectua orice acțiuni suplimentare cu datele fiecărui articol
      // de exemplu, puteți afișa titlul și descrierea într-o listă HTML

      const articleElement = document.createElement('li');
      articleElement.innerHTML = `<h2>${title}</h2><p>${description}</p>`;
      document.getElementById('news-list').appendChild(articleElement);
    });
  })
  .catch(error => {
    console.error('A apărut o eroare:', error);
    // Aici puteți trata eroarea în mod adecvat
  });
