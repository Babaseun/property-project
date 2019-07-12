var loginForm = document.getElementById('postData');
loginForm.addEventListener('submit', postData);

function postData(event) {
  event.preventDefault();
  var email = document.getElementById('email').value;
  var password = document.getElementById('password').value;

  fetch('http://localhost:5000/api/v1/users/login', {
    method: 'POST',
    credentials: 'include',
    body: JSON.stringify({ email: email, password: password }),

    headers: {
      'content-type': 'application/json'
    }
  })
    .then(res => res.json())
    .then(data => {
      if (data.token) {
        window.location = 'http://localhost:5000';
        localStorage.setItem('x-access-token', data.token);
      }
    })
    .catch(err => console.log(err));
}
