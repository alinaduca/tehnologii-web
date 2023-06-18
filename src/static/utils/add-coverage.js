const overlayList = document.getElementsByClassName('overlay')[0];

fetch('/check-token')
    .then(response => response.json())
    .then(data => {
        if(data.hasToken) {
            overlayList.style.display = "none";
        } else {
            overlayList.style.display = "flex";
        }
    })
    .catch(error => {
        console.log('Error:', error);
    });