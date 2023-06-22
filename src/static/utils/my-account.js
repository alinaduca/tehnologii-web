fetch('/get-username')
    .then(response => response.json())
    .then(data => {
        console.log(data);
        const userField = document.getElementById('username');
        userField.innerText = data;
    })
    .catch();


