var button = document.getElementById('purchase-btn');
button.addEventListener('click', purchaseFunction);
function purchaseFunction() {
  var amount = document.querySelector('.amount').innerHTML;
  var location = document.querySelector('.location').innerHTML;
  var numberOfRooms = document.querySelector('.numberOfRooms').innerHTML;

  fetch('/api/v1/products', {
    method: 'POST',
    headers: {
      'x-access-token': localStorage.getItem('x-access-token'),
      'content-type': 'application/json'
    },
    body: JSON.stringify({
      picture: location,
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
        window.location = '/pages/register.html';
      } else {
        window.location = '/pages/test.html';
      }
    })
    .catch(e => console.log(e));
}
