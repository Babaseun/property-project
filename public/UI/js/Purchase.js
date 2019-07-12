var button = document.getElementById('purchase-btn');
button.addEventListener('click', purchaseFunction);
function purchaseFunction() {
  var amount = document.querySelector('.price-point').innerHTML;
  var image = document.querySelector('#img').src;
  var location = document.querySelector('#location').innerHTML;
  var numberOfRooms = document.querySelector('#numberOfRooms').innerHTML;

  fetch('http://localhost:5000/api/v1/products', {
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
  })
    .then(res => res.json())
    .then(data => {
      console.log(data);

      if (
        data.message === 'Token is not provided' ||
        data.name === 'JsonWebTokenError'
      ) {
        window.location = 'http://localhost:5000/signupPages/register.html';
      } else {
        window.location = 'http://localhost:5000/signupPages/test.html';
      }
    })
    .catch(e => console.log(e));
}
