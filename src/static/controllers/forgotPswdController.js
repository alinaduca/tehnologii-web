const fs = require('fs');
const path = require('path');
const nodemailer = require('nodemailer');

function handleForgotPswdRequest(req, res) {
  const filePath = path.join(__dirname, '../pages/forgotPassword.html');

  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(404);
      res.end('404 Not Found');
    } else {
      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.end(data);
    }
  });
}

const mailOptions = {
  from: 'office.firestream@gmail.com', // Adresa de email de pe care se trimite
  to: '', // Adresa de email a destinatarului (va fi completată din formular)
  subject: 'Reset your password', // Subiectul emailului
  text: 'Aici puteți adăuga conținutul text al emailului', // Conținut text al emailului
  html: '<p>Aici puteți adăuga conținutul HTML al emailului</p>' // Conținut HTML al emailului
};

// Crearea transportului de email cu nodemailer
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'office.firestream@gmail.com', // Adresa de email pentru autentificare
    pass: 'claudiuAlinaBianca2002' // Parola pentru autentificare
  }
});

// Funcția de tratare a cererii POST pentru ruta /forgot-password
function handleForgotPasswordSubmission(req, res) {
  let body = '';
  req.on('data', chunk => {
    body += chunk.toString();
  });
  req.on('end', async () => {
    const formData = new URLSearchParams(body);
    const email = formData.get('forgotEmail');

    // Actualizăm adresa de email destinatar în opțiunile emailului
    mailOptions.to = email;

    // Trimiterea emailului
    transporter.sendMail(mailOptions, function(error, info){
      if (error) {
        console.log(error);
        res.end('Eroare la trimiterea emailului');
      } else {
        console.log('Email trimis: ' + info.response);
        res.writeHead(302, { 'Location': '/login' });
        res.end('Email trimis cu succes');
      }
    });
  });
}

module.exports = { handleForgotPswdRequest, handleForgotPasswordSubmission };
