fetch('/api/all-users')
    .then(response => response.json())
    .then(data => {
        const dataSection = document.getElementById("users");
        for(user of data) {
            var dataDiv = document.createElement("div");
            dataDiv.classList.add("container");
            dataDiv.id = user.email;
            var dataP = document.createElement("p");
            dataP.innerText = user.username;
            dataDiv.appendChild(dataP);
            if(user.type === "user") {
                dataImg = document.createElement("img");
                dataImg.src = "https://i.ibb.co/kh6mXCj/bin.png";
                dataImg.title = "Remove";
                dataImg.onclick = createClickHandler(user.email);
                dataDiv.appendChild(dataImg);
            }
            dataSection.appendChild(dataDiv);
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });

function createClickHandler(username) {
    return function() {
        display(username);
    };
}

function display(username) {
    fetch(`/api/delete-user/${username}`, {
        method: 'DELETE'
    })
    .then(response => {
        alert("User has been deleted from the database.");
        var divComp = document.getElementById(username);
        divComp.style.display = "none";
    })
    .catch(error => {
        console.error('Error:', error);
    });
}