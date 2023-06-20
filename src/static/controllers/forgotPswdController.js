// const fs = require('fs');
// const path = require('path');
// const nodemailer = require('nodemailer');
// const { google } = require('googleapis');
// const keyFile = path.join(__dirname, 'C:\Users\Lenovo\Downloads\client_secret_890265273726-rhb8e44ico45jlsmm4hlc43rafhn8odb.apps.googleusercontent.com.json');


// function handleForgotPswdRequest(req, res) {
//   const filePath = path.join(__dirname, '../pages/forgotPassword.html');

//   fs.readFile(filePath, (err, data) => {
//     if (err) {
//       res.writeHead(404);
//       res.end('404 Not Found');
//     } else {
//       res.writeHead(200, { 'Content-Type': 'text/html' });
//       res.end(data);
//     }
//   });
// }

// const mailOptions = {
//   from: 'office.firestream@gmail.com', // Adresa de email de pe care se trimite
//   to: '', // Adresa de email a destinatarului (va fi completată din formular)
//   subject: 'Reset your password', // Subiectul emailului
//   text: 'Aici puteți adăuga conținutul text al emailului', // Conținut text al emailului
//   html: '<p>Aici puteți adăuga conținutul HTML al emailului</p>' // Conținut HTML al emailului
// };

// // Crearea transportului de email cu nodemailer
// // const transporter = nodemailer.createTransport({
// //   service: 'gmail',
// //   auth: {
// //     user: 'office.firestream@gmail.com', // Adresa de email pentru autentificare
// //     pass: 'claudiuAlinaBianca2002' // Parola pentru autentificare
// //   }
// // });

// // // Funcția de tratare a cererii POST pentru ruta /forgot-password
// // function handleForgotPasswordSubmission(req, res) {
// //   let body = '';
// //   req.on('data', chunk => {
// //     body += chunk.toString();
// //   });
// //   req.on('end', async () => {
// //     const formData = new URLSearchParams(body);
// //     const email = formData.get('forgotEmail');

// //     // Actualizăm adresa de email destinatar în opțiunile emailului
// //     mailOptions.to = email;

// //     // Trimiterea emailului
// //     transporter.sendMail(mailOptions, function(error, info){
// //       if (error) {
// //         console.log(error);
// //         res.end('Eroare la trimiterea emailului');
// //       } else {
// //         console.log('Email trimis: ' + info.response);
// //         res.writeHead(302, { 'Location': '/login' });
// //         res.end('Email trimis cu succes');
// //       }
// //     });
// //   });
// // }

// // module.exports = { handleForgotPswdRequest, handleForgotPasswordSubmission };


// function handleForgotPasswordSubmission(req, res) {
//   let body = '';
//   req.on('data', chunk => {
//     body += chunk.toString();
//   });
//   req.on('end', async () => {
//     const formData = new URLSearchParams(body);
//     const email = formData.get('forgotEmail');

//     // Actualizăm adresa de email destinatar în opțiunile emailului
//     mailOptions.to = email;

//     // Configurăm clientul OAuth2
//     const oAuth2Client = new google.auth.OAuth2();
//     oAuth2Client.setCredentials({
//       client_id: '890265273726-rhb8e44ico45jlsmm4hlc43rafhn8odb.apps.googleusercontent.com',
//       client_secret: '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',
//       redirect_uri: 'http://localhost:3000/forgot-password'
//     });

//     // Obținem URL-ul de autorizare
//     const authUrl = oAuth2Client.generateAuthUrl({
//       access_type: 'offline',
//       scope: 'https://mail.google.com/'
//     });

//     // Redirecționăm utilizatorul către URL-ul de autorizare
//     res.writeHead(302, { 'Location': authUrl });
//     res.end();
//     //handleRedirectUri(req, res);
//   });
 
// }

// // Funcția de tratare a rutei de redirecționare specificată în YOUR_REDIRECT_URI
// async function handleRedirectUri(req, res) {
//   const url = require('url');
// const parsedUrl = url.parse(req.url, true);
// const code = parsedUrl.query.code;


//   // Configurăm clientul OAuth2
//   const oAuth2Client = new google.auth.OAuth2();
//   oAuth2Client.setCredentials({
//     client_id: '890265273726-rhb8e44ico45jlsmm4hlc43rafhn8odb.apps.googleusercontent.com',
//     client_secret: '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',
//     redirect_uri: 'http://localhost:3000/forgot-password'
//   });

//   // Obținem tokenul de autentificare utilizând codul primit în URL-ul de redirecționare
//   const { tokens } = await oAuth2Client.getToken(code);

//   // Actualizăm credențialele transportatorului de email cu tokenul de autentificare
//   transporter.setCredentials(tokens);

//   // Trimiterea emailului
//   transporter.sendMail(mailOptions, function(error, info) {
//     if (error) {
//       console.log(error);
//       res.end('Eroare la trimiterea emailului');
//     } else {
//       console.log('Email trimis: ' + info.response);
//       res.writeHead(302, { 'Location': '/login' });
//       res.end('Email trimis cu succes');
//     }
//   });
// }

// // Adaugă ruta de redirecționare la serverul tău Express
// module.exports = { handleRedirectUri, handleForgotPasswordSubmission};



const nodemailer = require('nodemailer');

// Configurarea transporterului de e-mail
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'office.firestream@gmail.com',
    pass: 'claudiuAlinaBianca2002'
  }
});

// Definirea funcției pentru trimiterea e-mailului
function sendResetEmail(email) {
  const mailOptions = {
    from: 'office.firestream@gmail.com',
    to: email,
    subject: 'Resetare parolă',
    text: 'Pentru a reseta parola contului, accesați următorul link: https://www.example.com/reset'
  };

  transporter.sendMail(mailOptions, function(error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log('E-mail trimis: ' + info.response);
    }
  });
}

// Exemplu de apel al funcției sendResetEmail
module.exports = sendResetEmail;
