const emailElement = document.getElementById("email11");
emailElement.addEventListener("click", function() {
    const email = "alina_duca@yahoo.com";
    const subject = "Regarding";
    const body = "Hello Alina,";
    const mailtoUrl = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.open(mailtoUrl);
});

const emailElement1 = document.getElementById("email12");
emailElement1.addEventListener("click", function() {
    const email = "claudiu.chichirau@yahoo.com";
    const subject = "Regarding";
    const body = "Hello Claudiu,";
    const mailtoUrl = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.open(mailtoUrl);
});

const emailElement2 = document.getElementById("email14");
emailElement2.addEventListener("click", function() {
    const email = "bianca.renghiuc@yahoo.com";
    const subject = "Regarding";
    const body = "Hello Bianca,";
    const mailtoUrl = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.open(mailtoUrl);
});