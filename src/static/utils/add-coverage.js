const overlayList = document.getElementsByClassName('overlay')[0];

fetch('/check-token')
    .then(response => response.json())
    .then(data => {
        if(data.hasToken) {
            // "token" cookie exists, hide overlay
            // for(overlay of overlayList) {
            //     overlay.style.display = "none";
            // }
            overlayList.style.display = "none";
            console.log("here1");
        } else {
            // "token" cookie doesn't exist, show overlay
            // for(overlay of overlayList) {
            //     overlay.style.display = "flex";
            // }
            overlayList.style.display = "flex";
            console.log("here2");
        }
    })
    .catch(error => {
    console.log('Error:', error);
    });