const cookie = require('cookie');
const { setEmail } = require('./authService');
const { setUsername } = require('./loginController');


function handleLogoutRequest(req, res) {
    // Clear the authentication token
    const expiredToken = ''; // or any other value you prefer
    const cookieToken = cookie.serialize('token', expiredToken, {
      maxAge: 0, // Set the maxAge to 0 to make the cookie immediately expire
      httpOnly: true,
    });
    setEmail("");
    setUsername("");
    res.setHeader('Set-Cookie', cookieToken);
    res.setHeader('Content-Type', 'text/html');
    res.end(`
      <script>window.location.href = "/";</script>
    `);
}

module.exports = { handleLogoutRequest };