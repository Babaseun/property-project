'use strict';

var loginForm = document.getElementById('postData');
loginForm.addEventListener('submit', postData);

function postData(event) {
  event.preventDefault();
  var email = document.getElementById('email').value;
  var password = document.getElementById('password').value;

  fetch('/api/v1/users/login', {
    method: 'POST',
    credentials: 'include',
    body: JSON.stringify({ email: email, password: password }),

    headers: {
      'content-type': 'application/json'
    }
  }).then(function (res) {
    return res.json();
  }).then(function (data) {
    if (data.token) {
      window.location = '/';
      localStorage.setItem('x-access-token', data.token);
    }
  }).catch(function (err) {
    return console.log(err);
  });
}
//# sourceMappingURL=loginForm.js.map