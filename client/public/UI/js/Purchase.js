'use strict';

var button = document.getElementById('purchase-btn');
button.addEventListener('click', purchaseFunction);
function purchaseFunction() {
  var amount = document.querySelector('.price-point').innerHTML;
  var image = document.querySelector('#img').src;
  var location = document.querySelector('#location').innerHTML;
  var numberOfRooms = document.querySelector('#numberOfRooms').innerHTML;

  fetch('/api/v1/products', {
    method: 'POST',
    headers: {
      'x-access-token': localStorage.getItem('x-access-token'),
      'content-type': 'application/json'
    },
    body: JSON.stringify({
      picture: image.toString(),
      location: location,
      price: amount,
      numberOfRooms: numberOfRooms
    })
  }).then(function (res) {
    return res.json();
  }).then(function (data) {
    console.log(data);

    if (data.message === 'Token is not provided' || data.name === 'JsonWebTokenError') {
      window.location = '/signupPages/register.html';
    } else {
      window.location = '/signupPages/test.html';
    }
  }).catch(function (e) {
    return console.log(e);
  });
}
//# sourceMappingURL=Purchase.js.map