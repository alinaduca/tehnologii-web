function init() {
    var slidePosition = 0;
    SlideShow();
  
    function SlideShow() {
        var i;
        var slides = document.getElementsByClassName("Containers");
        for (i = 0; i < slides.length; i++) {
            slides[i].style.display = "none";
        }
        slidePosition++;
        if (slidePosition > slides.length) { slidePosition = 1 }
        slides[slidePosition - 1].style.display = "block";
        setTimeout(SlideShow, 2000); // Change image every 2 seconds
    }
  
    $('.bttn-nominalizations').click(function(e) {
      e.preventDefault();
      $('html, body').animate({
        scrollTop: $('#nominalizations').offset().top
      }, 1000); // timpul în milisecunde pentru tranziție
    });
  }
  
  window.onload = init;

var slideIndex = 1;
showSlides(slideIndex);

function plusSlides(n) {
    showSlides(slideIndex += n);
}

function currentSlide(n) {
    showSlides(slideIndex = n);
}

function showSlides(n) {
    var i;
    var slides = document.getElementsByClassName("mySlides");
    var dots = document.getElementsByClassName("dot");
    if (n > slides.length) { slideIndex = 1 }
    if (n < 1) { slideIndex = slides.length }
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    }
    slides[slideIndex - 1].style.display = "block";
    dots[slideIndex - 1].className += " active";
}
  