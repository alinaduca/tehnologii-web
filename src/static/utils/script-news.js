function fetchActorNews(actorName, actorName2) {
  const apiKey = '409e91ad98dc47919d456b7b91b91e5a';
  var apiUrl = '';
  console.log(actorName);
  var firstPage = 'false';
  if (actorName != '' && actorName2 != '') {
    apiUrl = `https://newsapi.org/v2/everything?q=${encodeURIComponent(actorName)}+${encodeURIComponent(actorName2)}&apiKey=${apiKey}`;
  } else if (actorName != '') {
    apiUrl = `https://newsapi.org/v2/everything?q=${encodeURIComponent(actorName)}&apiKey=${apiKey}`;
  } else if (actorName2 != '') {
    apiUrl = `https://newsapi.org/v2/everything?q=${encodeURIComponent(actorName2)}&apiKey=${apiKey}`;
  }
  else {
    firstPage = 'true';
    apiUrl = `https://newsapi.org/v2/everything?q=${encodeURIComponent('hollywood')}&apiKey=${apiKey}`;
  }
  console.log(apiUrl);
  return fetch(apiUrl)
    .then((response) => {
      if (!response.ok) {
        throw new Error('Error retrieving actor news');
      }
      return response.json();
    })
    .then((data) => {
      const articles = data.articles;

      const dataSection = document.getElementById('articleList');

      const existingNews = dataSection.getElementsByClassName('news_section_2');
      while (existingNews.length > 0) {
        existingNews[0].remove();
      }

      var sortedArticles = articles;
      
      if(firstPage == 'false') {
      sortedArticles = articles.sort(
        (a, b) => new Date(b.publishedAt) - new Date(a.publishedAt)
      );
      } else {
        sortedArticles = articles
          .sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt))
          .slice(0, 5);

      }

      for (const article of sortedArticles) {
        const imageUrl = article.urlToImage;
        if (imageUrl) {
          const newsSection2 = document.createElement('div');
          newsSection2.classList.add('news_section_2');

          const row = document.createElement('div');
          row.classList.add('row');

          const box = document.createElement('div');
          box.classList.add('box_news');

          const dateText = document.createElement('h6');
          dateText.classList.add('date_text');
          const date = new Date(article.publishedAt);
          const day = date.getDate();
          const month = new Intl.DateTimeFormat('en-US', {
            month: 'short',
          }).format(date);
          dateText.innerHTML = `${day}<br>${month}`;

          const boxText = document.createElement('div');
          boxText.classList.add('box_text');

          const newsTitleLeft = document.createElement('h4');
          newsTitleLeft.classList.add('titlu_stire_left');
          newsTitleLeft.textContent = article.title;

          const newsDetails = document.createElement('p');
          newsDetails.classList.add('detalii_stire');
          newsDetails.textContent = article.description;

          const likeButton = document.createElement('div');
          likeButton.classList.add('like_bt');
          likeButton.innerHTML = '<a href="' + article.url + '">See full source</a>';

          // const commentButton = document.createElement('div');
          // commentButton.classList.add('comment_bt', 'col');
          // commentButton.innerHTML = '<a href="' + article.url + '">Comment</a>';

          const box2 = document.createElement('div');
          box2.classList.add('box_news');

          const imageRight = document.createElement('div');
          imageRight.classList.add('image_right');
          const newsImg = document.createElement('img');
          newsImg.classList.add('news-img');
          newsImg.src = article.urlToImage;
          const author = document.createElement('p');
          author.classList.add('author_stire');
          author.textContent = 'Author:' + article.author;

          newsImg.addEventListener('error', function () {
            newsSection2.remove();
          });

          box.appendChild(dateText);
          boxText.appendChild(newsTitleLeft);
          boxText.appendChild(newsDetails);
          boxText.appendChild(likeButton);
          //boxText.appendChild(commentButton);
          box.appendChild(boxText);

          box2.appendChild(imageRight);
          imageRight.appendChild(newsImg);
          imageRight.appendChild(author);

          row.appendChild(box);
          row.appendChild(box2);

          newsSection2.appendChild(row);
          dataSection.appendChild(newsSection2);
        }
      }
    })
    .catch((error) => {
      console.error(error);
      throw new Error('Failed to retrieve actor news');
    });
}

var searchForm = document.getElementById('searchForm');
var actorNameInput = document.getElementById('actorName');
var actorNameInput2 = document.getElementById('actorName2');
var myButton = document.getElementById('buton-actori');
if (myButton) {
  myButton.addEventListener('click', function (event) {
    event.preventDefault();
    var actorName = actorNameInput.value.trim();
    var actorName2 = actorNameInput2.value.trim();
    console.log(actorName);
    console.log(actorName2);
    if (actorName !== '' || actorName2 !== '') {
      fetchActorNews(actorName, actorName2);
    }
  });
} else {
  fetchActorNews('', '');
}

function showhide(id) {
  var e = document.getElementById(id);
  e.style.display = e.style.display == 'block' ? 'none' : 'block';
  if (e.style.display == 'block') {
    var actorName = actorNameInput.value.trim();
    var actorName2 = actorNameInput2.value.trim();
    if (actorName !== '' || actorName2 !== '') {
      fetchActorNews(actorName, actorName2);
    }
  } else {
    const dataSection = document.getElementById('articleList');
    while (dataSection.firstChild) {
      dataSection.firstChild.remove();
    }
    e.style.display='block';
    var actorName = actorNameInput.value.trim();
    var actorName2 = actorNameInput2.value.trim();
    if (actorName !== '' || actorName2 !== '') {
      fetchActorNews(actorName, actorName2);
    }
  }
}







