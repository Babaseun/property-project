'use strict';

getAll();
function getAll() {
  fetch('/api/v1/products', {
    method: 'GET',
    headers: { 'x-access-token': localStorage.getItem('x-access-token') }
  }).then(function (res) {
    return res.json();
  }).then(function (data) {
    var output = '';
    var count = 0;
    data.rows.forEach(function (value) {
      var id = value.id,
          location = value.location,
          numberofrooms = value.numberofrooms,
          created_date = value.created_date,
          price = value.price;

      output += '\n                 <div class= "container results">\n                     <div class="rows">\n                    \n                    <table  class="table table-bordered">\n                    <h1>Order details</h1>\n                    <thead>\n                    <tr>\n                \n                 <th scope="col">Location</th>\n                 <th scope="col">Rooms</th>\n                 <th scope="col">Date</th>\n                 <th scope="col">Price</th>\n                 <th scope="col">???</th>\n                 </tr>\n                 </thead>\n                 <tr>\n            \n              <td>' + location + '</td>\n                <td>' + numberofrooms + '</td>\n                <td>' + created_date + '</td>\n               \n                <td>' + price + '</td>\n                 <td><button class="delete"  onclick=deleteButton("' + id + '",' + count + ')><div class="message">Delete</div>\n                 </button></td></tr></table>\n                 </div>\n                 \n                 </div> ';
      count++;
    });
    document.querySelector('.result').innerHTML = output;
    console.log(data);
    console.log(count);
  });
}
function deleteButton(id, track) {
  fetch('/api/v1/products/' + id, {
    method: 'DELETE',
    headers: { 'x-access-token': localStorage.getItem('x-access-token') }
  }).then(function (res) {
    return res.json();
  }).then(function (data) {
    var button = document.querySelectorAll('.delete')[track];
    button.style.backgroundColor = 'green';
    document.querySelectorAll('.message')[track].textContent = data.message;
    setTimeout(function () {
      return location.reload();
    }, 1000);
  }).catch(function (e) {
    return console.log(e);
  });
}
document.getElementById('logout').addEventListener('click', clear);
function clear() {
  return localStorage.removeItem('x-access-token');
}
//# sourceMappingURL=test.js.map