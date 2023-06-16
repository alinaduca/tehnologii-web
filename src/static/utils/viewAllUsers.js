fetch('/api/all-users')
    .then(response => response.json())
    .then(data => {
        const dataDiv = document.getElementById("numeUser");
        dataDiv.innerText = JSON.stringify(data);
    })
    .catch(error => {
        console.error('Error:', error);
    });