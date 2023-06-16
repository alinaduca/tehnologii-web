fetch('/api/all-users')
    .then(response => response.json())
    .then(data => {
        const dataSection = document.getElementById("users");
        for(user of data) {
            var dataDiv = document.createElement("div");
            dataDiv.classList.add("container");
            var dataP = document.createElement("p");
            dataP.innerText = user.username;
            dataImg = document.createElement("img");
            dataImg.src = "https://i.ibb.co/kh6mXCj/bin.png";
            dataImg.title = "Remove";
            dataImg.alt = user.username;
            dataImg.onclick = function() {
                alert("User has been removed.");
            };
            dataDiv.appendChild(dataP);
            dataDiv.appendChild(dataImg);
            dataSection.appendChild(dataDiv);
        }
        // dataDiv.innerText = data[0].username;//JSON.stringify(data);
    })
    .catch(error => {
        console.error('Error:', error);
    });

// function display(username) {
//     alert(username + " has been removed.");
// }