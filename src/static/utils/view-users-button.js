fetch('/check-rights')
    .then(response => response.json())
    .then(data => {
        const viewUsersButton = document.getElementById("view-users");
        if(data === "admin") {
            viewUsersButton.style.display = "block";
        }
        else {
            viewUsersButton.style.display = "none";
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });