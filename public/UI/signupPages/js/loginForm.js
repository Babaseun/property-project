document.getElementById('postData').addEventListener('submit', postData);

function postData(event) {
  event.preventDefault();
  var email = document.getElementById('email').value;
  var password = document.getElementById('password').value;

  fetch('http://localhost:5000/api/v1/users/login', {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ email: email, password: password })
  })
    .then(res => res.json())
    .then(data => console.log(data))
    .catch(err => console.log(err));
}
