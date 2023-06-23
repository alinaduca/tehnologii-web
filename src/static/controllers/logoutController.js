const cookie = require('cookie');
const { setUsername, setEmail } = require('./loginController');

function handleLogoutRequest(req, res) {
    // Clear the authentication token
    const expiredToken = ''; // or any other value you prefer
    const cookieToken = cookie.serialize('token', expiredToken, {
      maxAge: 0, // Set the maxAge to 0 to make the cookie immediately expire
      httpOnly: true,
    });
    setUsername("");
    setEmail("");
    res.setHeader('Set-Cookie', cookieToken);
    res.setHeader('Content-Type', 'text/html');
    res.end(`
      <script>window.location.href = "/";</script>
    `);
}

module.exports = { handleLogoutRequest };