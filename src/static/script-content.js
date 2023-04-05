var images = [
	"https://i.postimg.cc/XYnsW7PM/R2.jpg",
	"https://i.postimg.cc/W19Cfk1Y/R-1-1.jpg",
	// "https://i.postimg.cc/KjTrt49Y/OIP-2.jpg"
];
var currentImageIndex = 0;

setInterval(function() {
	currentImageIndex = (currentImageIndex + 1) % images.length;
	document.body.style.backgroundImage = "url('" + images[currentImageIndex] + "')";
}, 3000);