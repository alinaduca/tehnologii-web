function handleCreateAccountSubmit(event) {
    event.preventDefault(); // Previne comportamentul implicit de reîncărcare a paginii
  
    const form = document.getElementById('createAccountForm');
    const formData = new FormData(form);
  
    const username = formData.get('username');
    const forgotEmail = formData.get('forgotEmail');
    const password = formData.get('password');
    const confirmPassword = formData.get('confirmPassword');
  
    const data = {
      username: username,
      forgotEmail: forgotEmail,
      password: password,
      confirmPassword: confirmPassword
    };
  
    fetch('/create-account', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then(response => response.text())
      .then(responseText => {
        console.log(responseText);
      })
      .catch(error => {
        console.error('Eroare la trimiterea datelor:', error);
      });
  }
  