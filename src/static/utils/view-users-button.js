fetch('/check-rights')
    .then(response => response.json())
    .then(data => {
        if(data === "admin") {
            fetch('/check-token')
                .then(response => response.json())
                .then(data => {
                    const viewUsersButton = document.getElementById("view-users");
                    if(data.hasToken) {
                        viewUsersButton.style.display = "block";
                    } else {
                        viewUsersButton.style.display = "none";
                    }
                })
                .catch(error => {
                    console.log('Error:', error);
                });
        }
        else {
            viewUsersButton.style.display = "none";
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });