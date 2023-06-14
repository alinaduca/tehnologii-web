const http = require('http');
const url = require('url');
const axios = require('axios');

const server = http.createServer(async (req, res) => {
  const parsedUrl = url.parse(req.url, true);
  const actorName = parsedUrl.pathname.split('/')[2];

  if (parsedUrl.pathname.startsWith('/news/') && actorName) {
    try {
      const news = await fetchActorNews(actorName);
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(news));
    } catch (error) {
      res.writeHead(500, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'Failed to retrieve actor news' }));
    }
  } else {
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: 'Invalid endpoint' }));
  }
});

const PORT = 5000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

async function fetchActorNews(actorName) {
  const apiKey = '409e91ad98dc47919d456b7b91b91e5a'; // Replace with your actual news API key
  const apiUrl = `https://newsapi.org/v2/everything?q=${actorName}&apiKey=${apiKey}`;

  const response = await axios.get(apiUrl);
  return response.data.articles;
}
