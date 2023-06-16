console.log("sunt aici");
const getData = (req, res) => {
    const data = {
      message: 'Hello, world!',
      timestamp: new Date().toISOString(),
    };
  
    res.setHeader('Content-Type', 'application/json');
    res.statusCode = 200;
    res.end(JSON.stringify(data));
  };
  
  module.exports = getData;